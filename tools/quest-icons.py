#!/usr/bin/env python3
"""Renders the item pictures of the quest book in the running game.

Only the game can draw its items (machines, tinted materials, items with data). This asks the
game, through Astra's harness (../greg), to draw each item of the quest book once into a small
off-screen picture and to write the raw pixels to .icons/icons.rgba. It does no input and the
recorder ignores it. The picture on screen is not used: each item goes to its own framebuffer,
and the graphics state is put back after every item.

usage: python3 tools/quest-icons.py --probe     say what the game would draw; draws nothing
       python3 tools/quest-icons.py --trial     draw two plain items into .icons/trial.rgba
       python3 tools/quest-icons.py             draw every item, a few at a time
Then run: node tools/quest-sheet.mjs && node tools/questbook.mjs
"""
import json, os, sys, time

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(HERE, "..", "greg", "harness"))
import core  # noqa: E402

SIZE = 64          # pixels on a side; the sheet builder can halve it
BATCH = 30         # items for each call, so that no game tick waits long
WORK = os.path.join(HERE, ".icons")

# The items of the book in a fixed order, each one once. The same code runs for every call,
# so a call needs no state from the call before it.
COLLECT = r"""
var QDB = Java.type('betterquesting.questing.QuestDatabase').INSTANCE;
var LDB = Java.type('betterquesting.questing.QuestLineDatabase').INSTANCE;
var NativeProps = Java.type('betterquesting.api.properties.NativeProps');
var TaskRetrieval = Java.type('betterquesting.questing.tasks.TaskRetrieval');
var RewardItem = Java.type('betterquesting.questing.rewards.RewardItem');
var RewardChoice = Java.type('betterquesting.questing.rewards.RewardChoice');
function collect() {
  var stacks = [], index = {}, map = { quests: {}, lines: {} };
  function slot(big) {
    try {
      var base = big.getBaseStack();
      if (base == null || M.call(base, 'isEmpty')) return -1;
      var one = M.call(base, 'copy');
      M.call(one, 'setCount', 1);
      var key = String(one.serializeNBT().toString());
      if (!(key in index)) { index[key] = stacks.length; stacks.push(one); }
      return index[key];
    } catch (e) { return -1; }
  }
  function slots(javaList) { return list(javaList).map(slot); }
  var entries = list(QDB.getEntries());
  entries.sort(function (a, b) { return a.getID() - b.getID(); });
  entries.forEach(function (e) {
    var q = e.getValue();
    var o = { icon: slot(q.getProperty(NativeProps.ICON)), tasks: {}, rewards: {} };
    list(q.getTasks().getEntries()).forEach(function (t) {
      var v = t.getValue();
      if (v instanceof TaskRetrieval) o.tasks[t.getID()] = slots(v.requiredItems);
    });
    list(q.getRewards().getEntries()).forEach(function (r) {
      var v = r.getValue();
      if (v instanceof RewardItem) o.rewards[r.getID()] = slots(v.items);
      else if (v instanceof RewardChoice) o.rewards[r.getID()] = slots(v.choices);
    });
    map.quests[e.getID()] = o;
  });
  var lines = list(LDB.getEntries());
  lines.sort(function (a, b) { return a.getID() - b.getID(); });
  lines.forEach(function (e) { map.lines[e.getID()] = slot(e.getValue().getProperty(NativeProps.ICON)); });
  return { stacks: stacks, map: map };
}
function trialStacks() {
  var Item = Java.type('net.minecraft.item.Item');
  return ['minecraft:iron_ingot', 'minecraft:furnace'].map(function (name) {
    return M.make('net.minecraft.item.ItemStack', M.call(Item, 'getByNameOrId', name));
  });
}
"""

# Looks only: how many items there are, and the graphics state between frames.
PROBE = COLLECT + r"""
var GL11 = Java.type('org.lwjgl.opengl.GL11');
var OGL = Java.type('net.minecraft.client.renderer.OpenGlHelper');
var all = collect();
var trial = trialStacks();
return {
  items: all.stacks.length,
  first: all.stacks.slice(0, 3).map(function (s) { return str(M.call(s, 'getDisplayName')); }),
  trial: trial.map(function (s) { return str(M.call(s, 'getDisplayName')); }),
  framebuffers: M.call(OGL, 'isFramebufferEnabled'),
  bound: GL11.glGetInteger(0x8CA6),
  modelview_depth: GL11.glGetInteger(0x0BA3),
  projection_depth: GL11.glGetInteger(0x0BA4),
  matrix_mode: GL11.glGetInteger(0x0BA0),
  window: [M.get(mc, 'displayWidth'), M.get(mc, 'displayHeight')],
  map: args.map ? all.map : null
};
"""

# Draws items [start, start + count) and appends each one's pixels to the file, bottom row
# first, RGBA. An item that fails leaves an empty picture, so the file keeps its order.
RENDER = COLLECT + r"""
var GL11 = Java.type('org.lwjgl.opengl.GL11');
var BufferUtils = Java.type('org.lwjgl.BufferUtils');
var GSM = Java.type('net.minecraft.client.renderer.GlStateManager');
var RenderHelper = Java.type('net.minecraft.client.renderer.RenderHelper');
var OGL = Java.type('net.minecraft.client.renderer.OpenGlHelper');
var size = args.size;
var stacks = args.trial ? trialStacks() : collect().stacks;
var from = args.start, to = Math.min(stacks.length, from + args.count);
if (!M.call(OGL, 'isFramebufferEnabled')) return { error: 'framebuffers are off in this game' };

var before = { bound: GL11.glGetInteger(0x8CA6), modelview: GL11.glGetInteger(0x0BA3), projection: GL11.glGetInteger(0x0BA4), mode: GL11.glGetInteger(0x0BA0) };
var lightUnit = M.get(OGL, 'lightmapTexUnit');
var renderItem = M.call(mc, 'getRenderItem');
var pixels = BufferUtils.createByteBuffer(size * size * 4);
var empty = BufferUtils.createByteBuffer(size * size * 4);
var stream = new (Java.type('java.io.FileOutputStream'))(args.out, true);
var channel = stream.getChannel();
var failed = [];
var fb = M.make('net.minecraft.client.shader.Framebuffer', size, size, true);
function unwind() {
  // Leave both matrix stacks as deep as they were, also after an item that failed half way.
  GL11.glMatrixMode(GL11.GL_PROJECTION);
  while (GL11.glGetInteger(0x0BA4) > before.projection) GL11.glPopMatrix();
  GL11.glMatrixMode(GL11.GL_MODELVIEW);
  while (GL11.glGetInteger(0x0BA3) > before.modelview) GL11.glPopMatrix();
}
try {
  M.call(fb, 'setFramebufferColor', 0, 0, 0, 0);
  for (var i = from; i < to; i++) {
    var ok = false;
    try {
      M.call(fb, 'framebufferClear');
      M.call(fb, 'bindFramebuffer', true);
      GL11.glMatrixMode(GL11.GL_PROJECTION); GL11.glPushMatrix(); GL11.glLoadIdentity(); GL11.glOrtho(0, 16, 16, 0, 1000, 3000);
      GL11.glMatrixMode(GL11.GL_MODELVIEW); GL11.glPushMatrix(); GL11.glLoadIdentity(); GL11.glTranslatef(0, 0, -2000);
      try {
        M.call(RenderHelper, 'enableGUIStandardItemLighting');
        M.call(OGL, 'setLightmapTextureCoords', lightUnit, 240, 240);
        M.call(GSM, 'enableRescaleNormal');
        M.call(GSM, 'enableDepth');
        M.call(GSM, 'depthMask', true);
        M.call(GSM, 'color', 1, 1, 1, 1);
        M.call(renderItem, 'renderItemAndEffectIntoGUI', stacks[i], 0, 0);
        pixels.clear();
        GL11.glPixelStorei(GL11.GL_PACK_ALIGNMENT, 1);
        GL11.glReadPixels(0, 0, size, size, GL11.GL_RGBA, GL11.GL_UNSIGNED_BYTE, pixels);
        ok = true;
      } finally {
        M.call(RenderHelper, 'disableStandardItemLighting');
        M.call(GSM, 'disableRescaleNormal');
        unwind();
      }
    } catch (e) {
      failed.push({ i: i, error: String(e).slice(0, 200) });
    }
    var out = ok ? pixels : empty;
    out.clear();
    while (out.hasRemaining()) channel.write(out);
  }
} finally {
  // Put everything back. Each step stands alone, so that one that fails does not stop the rest.
  var undo = [
    function () { unwind(); },
    function () { M.call(fb, 'unbindFramebuffer'); },
    function () { if (before.bound !== 0) M.call(OGL, 'glBindFramebuffer', M.get(OGL, 'GL_FRAMEBUFFER'), before.bound); },
    function () { GL11.glViewport(0, 0, M.get(mc, 'displayWidth'), M.get(mc, 'displayHeight')); },
    function () { GL11.glMatrixMode(before.mode); },
    function () { M.call(fb, 'deleteFramebuffer'); },
    function () { channel.close(); },
    function () { stream.close(); }
  ];
  for (var u = 0; u < undo.length; u++) { try { undo[u](); } catch (e) { failed.push({ cleanup: u, error: String(e).slice(0, 200) }); } }
}
var after = { bound: GL11.glGetInteger(0x8CA6), modelview: GL11.glGetInteger(0x0BA3), projection: GL11.glGetInteger(0x0BA4), mode: GL11.glGetInteger(0x0BA0), error: GL11.glGetError() };
return { from: from, to: to, total: stacks.length, failed: failed, before: before, after: after };
"""


def call(script, args):
    return core.bridge.call("js", {"code": core.js_prelude() + script, "args": args, "quiet": True})


def main():
    os.makedirs(WORK, exist_ok=True)
    if "--probe" in sys.argv:
        out = call(PROBE, {"map": False})
        print(json.dumps(out, indent=1))
        return
    if "--trial" in sys.argv:
        target = os.path.join(WORK, "trial.rgba")
        if os.path.exists(target):
            os.remove(target)
        out = call(RENDER, {"trial": True, "start": 0, "count": 2, "size": SIZE, "out": target})
        print(json.dumps(out, indent=1))
        print("wrote", target, os.path.getsize(target), "bytes")
        return
    plan = call(PROBE, {"map": True})
    total = plan["items"]
    target = os.path.join(WORK, "icons.rgba")
    if os.path.exists(target):
        os.remove(target)
    failed = []
    for start in range(0, total, BATCH):
        out = call(RENDER, {"trial": False, "start": start, "count": BATCH, "size": SIZE, "out": target})
        if out.get("error"):
            sys.exit(out["error"])
        if out["total"] != total:
            sys.exit(f"the item list changed during the run ({total} -> {out['total']}); start again")
        if out["after"]["bound"] != out["before"]["bound"] or out["after"]["modelview"] != out["before"]["modelview"] or out["after"]["projection"] != out["before"]["projection"]:
            sys.exit(f"the graphics state did not come back after items {start}..{out['to']}: {out['before']} -> {out['after']}; stopped")
        failed += out["failed"]
        print(f"{out['to']}/{total}", flush=True)
        time.sleep(0.4)   # let the game draw a few frames between calls
    want = total * SIZE * SIZE * 4
    have = os.path.getsize(target)
    if have != want:
        sys.exit(f"the pixel file has {have} bytes, not {want}")
    with open(os.path.join(WORK, "icons.json"), "w") as f:
        json.dump({"size": SIZE, "count": total, "map": plan["map"], "failed": failed}, f)
    print(f"wrote {target}: {total} items, {len(failed)} failed")
    for item in failed[:10]:
        print("  failed", item)


if __name__ == "__main__":
    main()
