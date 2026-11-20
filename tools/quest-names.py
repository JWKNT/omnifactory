#!/usr/bin/env python3
"""Reads the display names of the quest book's items from the running game.

The quest file of the pack names an item by its id and number. Only the game knows the name a
player sees ("Steel Ingot"). This asks the game through Astra's harness (../greg) and writes
data/quests/names.json. The call only reads: it does no input, and the recorder ignores it.

usage: python3 tools/quest-names.py        (the game must be running)
Then run: node tools/questbook.mjs
"""
import json, os, sys

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(HERE, "..", "greg", "harness"))
import core  # noqa: E402

SCRIPT = r"""
var QDB = Java.type('betterquesting.questing.QuestDatabase').INSTANCE;
var LDB = Java.type('betterquesting.questing.QuestLineDatabase').INSTANCE;
var NativeProps = Java.type('betterquesting.api.properties.NativeProps');
var TaskRetrieval = Java.type('betterquesting.questing.tasks.TaskRetrieval');
var TaskFluid = Java.type('betterquesting.questing.tasks.TaskFluid');
var RewardItem = Java.type('betterquesting.questing.rewards.RewardItem');
var RewardChoice = Java.type('betterquesting.questing.rewards.RewardChoice');
function name(big) {
  try { return str(M.call(big.getBaseStack(), 'getDisplayName')); } catch (e) { return null; }
}
function names(javaList) { return list(javaList).map(name); }
function fluid(f) { try { return str(f.getLocalizedName()); } catch (e) { return null; } }
var quests = {};
list(QDB.getEntries()).forEach(function (e) {
  var q = e.getValue();
  var o = { icon: name(q.getProperty(NativeProps.ICON)), tasks: {}, rewards: {} };
  list(q.getTasks().getEntries()).forEach(function (t) {
    var v = t.getValue();
    if (v instanceof TaskRetrieval) o.tasks[t.getID()] = names(v.requiredItems);
    else if (v instanceof TaskFluid) o.tasks[t.getID()] = list(v.requiredFluids).map(fluid);
  });
  list(q.getRewards().getEntries()).forEach(function (r) {
    var v = r.getValue();
    if (v instanceof RewardItem) o.rewards[r.getID()] = names(v.items);
    else if (v instanceof RewardChoice) o.rewards[r.getID()] = names(v.choices);
  });
  quests[e.getID()] = o;
});
var lines = {};
list(LDB.getEntries()).forEach(function (e) { lines[e.getID()] = name(e.getValue().getProperty(NativeProps.ICON)); });
return { quests: quests, lines: lines };
"""


def main():
    out = core.bridge.call("js", {"code": core.js_prelude() + SCRIPT, "args": {}, "quiet": True})
    quests = out["quests"]
    target = os.path.join(HERE, "data", "quests", "names.json")
    os.makedirs(os.path.dirname(target), exist_ok=True)
    with open(target, "w") as f:
        json.dump(out, f, ensure_ascii=False, sort_keys=True, indent=0)
        f.write("\n")
    named = sum(1 for q in quests.values() if q.get("icon"))
    print(f"wrote {target}: {len(quests)} quests, {named} with an icon name")


if __name__ == "__main__":
    main()
