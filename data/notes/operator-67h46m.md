# Operating the void workshop after 67h46m

From the project root, read AGENTS.md and resume.md. Only one process may drive the player at a time. A stock survey using `ev_workshop_round.stock()` may move, stow tools and open the terminal. Treat it as a player action. The JSON files under `run/handoff-67h/` are safe offline readings.

## Start, check and stop

```sh
python3 harness/cli.py state
python3 scripts/launch.py --world Astra --wait
python3 harness/cli.py recording
python3 harness/cli.py state
ps -Ao pid,ppid,pgid,command | rg '[P]ython.*(scripts/|harness/cli)'
```

Launch only when the game is down. Confirm survival, Peaceful and recording before input. If recording is off, use `python3 harness/cli.py recording action=start` and check again. Use `python3 scripts/book_standing.py` for the deduplicated chapter count. `python3 harness/cli.py quests id=144` reads the Yttrium page; `python3 scripts/quest_page.py 144` acts in the book when the requirements are ready. Only run acting commands while the campaign is stopped.

To inspect the two dynamo fuel queues and the chambers, run this from the project root with the game open:

```sh
PYTHONPATH=harness:scripts python3 - <<'PY'
from core import js_call
from farm_shell import at
from dml_status import status
for pos in ((7,80,8),(12,83,7)):
    print(pos, js_call("steam","status",at(pos)))
for options in ({},{"second":True},{"spider":True}):
    print(status(**options))
PY
```

For the first centrifuge build, with power checked and **no other player process**, use the following. The first call crafts when the parts are present. A later call places and configures the machine. Check each result and actual position before retrying. The destination and the next interface may require a new stand.

```sh
PYTHONPATH=harness:scripts python3 - <<'PY'
from ev_workshop_round import stock
from ore_centrifuge import service
service(stock())
PY
python3 harness/cli.py machine x=10 y=84 z=1
```

To start the regular campaign in an identifiable process group and keep the log inside the project, use the following command once. The Python launcher forks a new session for the campaign, writes its process group leader to a file, then exits. The script takes up to 80 rounds per invocation. If it exits, inspect the last exception and verify the quest before deciding to restart. Source edits to long-lived imported modules take effect in the next Python process.

```sh
python3 - <<'PY'
import pathlib, subprocess, sys
with open("run/iv-campaign.log", "a") as log:
    p = subprocess.Popen([sys.executable, "-u", "scripts/ev_board_campaign.py", "--through-iv-assembler"],
                         start_new_session=True, stdout=log, stderr=subprocess.STDOUT)
pathlib.Path("run/iv-campaign.pgid").write_text(str(p.pid))
print(p.pid)
PY
tail -30 run/iv-campaign.log
ps -Ao pid,ppid,pgid,command | rg '[P]ython.*(scripts/|harness/cli)'
python3 harness/cli.py state
```

For a clean stop, look at the current child, its screen and the recent log. Prefer a closed screen between jobs. Check that the saved group ID still belongs to this campaign in the process list before sending the group signal. These commands are for that isolated group:

```sh
kill -TERM -- -"$(cat run/iv-campaign.pgid)"
python3 harness/cli.py stop
ps -Ao pid,ppid,pgid,command | rg '[P]ython.*(scripts/|harness/cli)'
python3 harness/cli.py screen
python3 harness/cli.py state
```

Finish or undo an interrupted inventory transfer, clear the cursor, close the screen and stand on solid ground. Read the queues and cargo, then run `scripts/stop.sh`. Check the game log for player/world saves and the final recording in the timeline. Preserve recordings. The server for greg tools can stay up. At this handoff the campaign group and bridge action were stopped during the coil pickup sequence, the fifth coil and wrench were in the pack, and the screen and cursor were clear. The saved campaign log ends before some final actions because process termination can leave child output buffered.

## What keeps moving

- With the world loaded, ME CPUs run their own orders, drawers buffer their products, the northern cobble → gravel → sand → dust → clay machines transfer directly, water refills locally and the freezer can return hot-metal orders. The west diamond dynamo has a direct physical feed from the Shulker fabricator. These systems still depend on power, available inputs and room for outputs.
- The campaign places stock orders, carries sand and clay until the drawer bus is online, replenishes clathrate/quartz and model fuel, rotates models and loads shared machines. The game has no independent process to replace those visits. Check DML and power each round and immediately after a restart. All three fuel slots were empty at the stop. For a shortage see tungsten-power-restart.md, shulker-polymer-feed.md and scripts/lapidary_restart_stock.py. Use stored diamonds or the physical fuel reserve for a cold start; observe an actual Shulker run and fuel moving to the generator. EV load control handles charge thresholds. The surveyed EV assembler and electrolyzer were enabled at shutdown.
- Watch fluid **types**, destination compatibility, leftover reagent and reserved output space. If a transfer loses its source to an active ME bus, read the actual source and portable tank before trying again. Use the direct desulfurizer hydrogen feed for fresh hydrochloric acid; recover diluted acid separately. Silicone stage was “rubber”. The wrapper held 2,064 mB silicone rubber and its selector stays on 24. See cable-acid-recovery.md and iron-and-stainless-for-iv.md.
- Use JEI, quest descriptions and payouts together before committing. Read upcoming chapters, side quests and alternative machine recipes. Compare actual usable circuit substitutions, batch size, yield, voltage, by-products, energy and wiring. Consider parallel machines and higher tiers as soon as queues form. Replace repeated player trips and vanilla arrangements early when a modded tool, buffer or permanent line will remove them. Give widespread inputs dedicated replenishment and a bounded reserve. Add autocrafting patterns and independent CPUs so unrelated consumers can work together. Rebuild an unsuitable aisle or machine row when it costs more time to keep working around it.
- Every two **played** hours, and sooner if a single ingredient starts consuming hours, step back from the current quest. Compare actual deliveries, player loads, CPU occupancy, power interruptions and items that held up other lines. Re-read the original tenets and review-questions.md. Check the best recipe for the next machine against its alternatives and the side quests. Record what decision changed and why. Run `python3 scripts/strategy_review.py --evidence` at 69h04m35s; only run `python3 scripts/strategy_review.py --reviewed` once the review is written. Keep one public note per subject and send it when changed with `python3 harness/cli.py note_send`. Work autonomously and use machine time for other jobs.

## Tool changes, dead ends and remaining tests

The narrow Ender IO conduit arm can be visible while its external control plate is occluded. The quartz and clay hatches give a lower sight line to both upper plates. scripts/conduit_sight.py samples near the edges; use connector=True in reach_port when opening those GUIs. scripts/north_service_hatch.py installed the north hatch, and scripts/north_clay_feed.py set the red ports and produced clay. The final receipt change recognizes a filled drawer on the next visit if the first product arrives after configuration. It compiled and passed an offline check for empty and filled drawers. The live line already has its receipt. The active hopper cleaner also recovers stray non-cane items; it recovered two charged crystals. The ten-tick cane timer is on the south wall; the Enderman fuel connector belongs on the chamber lid. Leave the north crop wall closed.

scripts/tungstate_milling.py encodes mission ore metadata 1 and the primary output, with the interface pointing down. The mill returns items south through the washer conduit. Wrenching it upward wasted time. scripts/network_cable_wrapper.py can order two gold cables when two wires are available even without a bare-wire pattern; the cables were delivered. scripts/iv_dense_iron.py, fluid_terminal.py and silicone_refill.py handle the acid transfers; the first dense block is proved, the complete repeated cycle is still to test. scripts/ore_centrifuge.py and the new wiremill.py station have yet to commission the HV centrifuge. Verify the rare-earth batch and tungstate pattern before declaring the new station automatic. The north controller, stock bus and fourth CPU helpers are partial factory builds, with their intended acceptance checks in resume.md.

Long walks sometimes time out within a few blocks of a target. Check the actual player position; a short approach from the service aisle can finish the job. Some carried items use nonzero metadata, including terracotta and worn tools. Avoid a long terminal trip caused by a false zero count. Leaving a GUI closed and recording an actual stock increase proved more reliable than inferring delivery from a successfully started job.

The stop snapshot, previous campaign log and shutdown confirmation are under run/handoff-67h/. Temporary scratch experiments, old stdout logs and paths printed under /tmp in earlier notes are expendable. None is required to launch the next campaign. Older reviews are time-stamped history. Use their reasoning and repeat observations where the stop ledger has no reading.
