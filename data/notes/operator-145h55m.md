# Operating the wetware workshop

## Session rules and cold start

Work autonomously toward finishing the whole quest book. Keep one player. When taking over, first read AGENTS.md, then resume.md and its first-read notes in order. Inspect processes before input. Stop an inherited actor before proceeding. Start Astra only after reading, confirm recording and the run settings, and compare the live world with the clean-stop time and at least one concrete claim. Correct any discrepancy and replace the stop heading with the new takeover time. Create a whole-run chat goal when the new session has a goal tool. Keep resume.md accurate during play in case the session ends unexpectedly. Publish every changed note. Keep private information out.

Use the factory's processing time to work on independent lines. Compare all JEI routes, stock, by-products, future needs and quest rewards before spending scarce parts. Prefer recurring native ME jobs and real machine lines when player scripts still have to shuttle individual stacks. Batch intermediates, increase voltage or split lines when justified, and leave room for growth. Check a delivered item or machine-state change before counting an order as progress. Every two played hours, examine time spent, throughput, CPU occupancy, power, alternative recipes and circuit substitutions, modded replacements for manual work, dedicated reserves, side quests and the layout. The latest written review was at 145h06m. The next is due at 147h06m. The timestamp in run/last-strategy-review still points to the prior 143h review, so its automatic reminder may appear early. At the next real review, use the activity and CPU logs from 145h06m onward, publish the review, then run the review recorder.

All commands below run from the project root. Start by checking processes. The greg MCP server itself is expected to remain available.

```sh
ps -Ao pid,ppid,pgid,command | rg '[P]ython.*(scripts/|harness/cli)'
python3 harness/cli.py state
python3 scripts/launch.py --world Astra --wait
python3 harness/cli.py recording
python3 harness/cli.py state
PYTHONPATH=harness python3 scripts/book_standing.py
PYTHONPATH=harness python3 scripts/crystal_stage_status.py
```

Use the launch command only when the game is down. If the recorder is off, restore it with `python3 harness/cli.py recording action=start` and verify it before input. The stock and queue readings in crystal_stage_status are safe alongside an actor. Use `workshop_me.installed_stock(read_only=True)`, `crafting_status.jobs()`, inventory and machine readouts for further observation. A normal terminal survey, picklist, stock cleanup or non-read-only stock fallback can move and click. Run those through the sole actor or while it is stopped.

After checks and takeover notes, the first manual operation, with the campaign stopped, can be the existing binder routine. This invocation sees the saved output and shift-clicks the vial and product into the pack. Inspect before invoking it again.

```sh
PYTHONPATH=harness:scripts python3 - <<'PY'
from core import bridge
from medium_ore_mission import counts
from soul_binder_stock import bind
from workshop_me import installed_stock
stock = counts(installed_stock(read_only=True) + bridge.call("inventory")["items"])
bind(stock, zombies=True)
PY
```

## Start a single assembly campaign

Use the following cold-start form once, after the process check, from the factory dimension with screens closed. It gives the actor its own process group, its CPU sampler in that same group, and a persistent log. The assembly worker recognizes its own PID in run/iv-campaign.pgid with run/array-workshop-stop present. This bypasses the obsolete progression through earlier campaign launchers. The worker clears the previous finish marker on entry. The old saved PID is historical; a PID file by itself never establishes that a process is alive.

```sh
python3 - <<'PY'
import os, subprocess
from pathlib import Path
root = Path.cwd()
env = dict(os.environ, PYTHONPATH=str(root / "harness"))
command = """
echo $$ > run/iv-campaign.pgid
touch run/array-workshop-stop
python3 -u scripts/cpu_watch.py "$$" &
exec python3 -u scripts/tower_shift.py --assembly
"""
with open("run/iv-campaign.log", "a") as log:
    p = subprocess.Popen(["/bin/sh", "-ec", command], env=env,
                         stdin=subprocess.DEVNULL, stdout=log, stderr=subprocess.STDOUT,
                         start_new_session=True)
print(p.pid)
PY
ps -Ao pid,ppid,pgid,command | rg '[P]ython.*(scripts/|harness/cli)'
tail -30 run/iv-campaign.log
```

The group wrapper above is a reconstructed cold-start command checked offline against the worker's startup guard. The prior actor itself ran and reloaded successfully in a dedicated group. Do not launch it a second time to test whether the first launch worked. Check its PID, log and physical activity. A separate old-style sampler exits when its watched actor disappears. Check it explicitly. Persistent stage files are in run/. The new process can begin at the first outer workshop job; the wetware rotation has a disk cursor. The former PTY, stack frames and outer-loop cursor are gone. No temporary directory, external file or in-memory state is required for resumption.

At each job boundary the campaign checks power and progresses the production branches. The CPU sampler samples every ten seconds while the factory is loaded. Watch run/factory-activity.tsv for actual player loads, run/crafting-cpu-samples.tsv for concurrency, run/ae-order-shortfalls.json for rejected bills, and run/assembly-slow-stations.log for long visits. Inspect power and polymer after restart and each campaign round. There is no scheduled real-time task. The review commands are:

```sh
PYTHONPATH=harness python3 scripts/strategy_review.py --evidence
PYTHONPATH=harness python3 scripts/strategy_review.py --reviewed
python3 harness/cli.py note_send
```

Use the second command only after writing a review. Use `touch run/refresh-assembly-shift` to reload changed worker code in the same actor between stations. It can take a long station visit to reach the boundary. A delayed reload is not evidence that another player is needed.

## Stop and hand off

A full stop ends all player processes. The finish-tower-shift marker alone hands control back to an older workshop in the worker's finally block. At a clean boundary with no cursor stack, inspect the saved PID, command, process group and children, then terminate the verified campaign group. Do not signal any group solely on the strength of a saved PID.

```sh
pg=$(cat run/iv-campaign.pgid)
ps -p "$pg" -o pid,ppid,pgid,command
ps -Ao pid,ppid,pgid,command | rg '[P]ython.*(scripts/|harness/cli)'
# After verifying the group above belongs to the sole workshop actor:
kill -TERM -- -"$pg"
python3 harness/cli.py stop
ps -Ao pid,ppid,pgid,command | rg '[P]ython.*(scripts/|harness/cli)'
python3 harness/cli.py screen
python3 harness/cli.py state
```

If a separately grouped sampler survives, terminate its verified PID. Reconcile an interrupted action, clear the cursor, close the screen and stand on solid floor. Capture the live inventory, orders, actual machine contents, player state and recording status. Do not start another job or wait for machines to finish. Run `scripts/stop.sh`, check its elapsed/forced result, the game log's save messages and the filed final MP4 and timeline. Leave recordings alone. Rewrite resume.md from top to bottom, publish affected notes and leave the game shut. Pause the chat goal last when explicitly requested. A new chat takes over separately.

## Tools and limits discovered this session

- The wetware campaign uses first_wetware_assembly.py, wetware_splicer.py and zombie_controllers.py. The splicer's installed tile reports getCurrentTask(); the binder reports isWorking(). The live run proved splicer installation, tools, four controllers and the first binding. The second binding and ten-bus run are pending. The latter checks two banks independently using board_reactor_charge.can_supply_packets and reads the actual controller overclock.
- wetware_pumps.py uses the native tin smelt, HV rotor assembler, MV screw lathe and shared MV extruder. Two rotors, screws and pipes were witnessed. Pump return and sheet casting still need a real batch. wetware_sheets.py also advances the silicone refill when the wrapper lacks a transferable bucket. The uncraftable cable and mold uncovered just before shutdown are documented in resume.md. No edit was in progress for them.
- wetware_board_interface.py configures the reactor before mounting the interface, gathers both cables together and tries the top of the conduit as a cable support. The full interface and both cables were verified, but wrench targeting lost its visible east face on a return walk. The later approach starts on the transformer at (25,86,-20); that retry and the board pattern remain unproved. Picking a stand below the top face, travelling back to the terminal for each cable, and using a rounded block coordinate for a fine sight line all cost time. Look for a visible top corner from above; verify the interface's actual targets afterward.
- travel.py tries walking and the west travel anchor before requesting a same-dimension factory home. An earlier helper slept through a multi-minute home cooldown while only a few blocks away. luv_line_converter.roof now tries the local route when already near its target. Keep the recorder lock and body-level reach checks in every fallback. If a crafting screen is unexpectedly open, inspect the cursor and active jobs before retrying an order.
- wetware_medium.py banks finished raw medium before calling the heater even when the working reserve is already met. The heater import bus was installed; the first fresh automatic transfer needs a storage delta. The distillery, silicone reactor and cable wrapper are shared. Read the program, fluids and partially used portable tanks before switching them.
- first_wetware_assembly.py now advances Sterling Silver, Lumium Blend, binder work and funded pump parts while the LuV banks charge. Earlier, silver dust went through a smelt and mill round trip before the native sterling order could reserve it. naquadah_alloy_wire.hardware accepts the freezer's separate hatch/cable bill and stage_superconductor_wire can use nine star nuggets. The freezer retrofit is planned work; its casings were still intact. Logs and JEI plans alone do not prove returned output.
- No game or recorder rebuild is pending. Python changes were saved. Imports, syntax and the saved-cell power calculation were checked offline; no final live end-to-end test was run for the pending paths. The 67h operator note and earlier reviews still explain specific hardware and recovery, but their current-state claims, campaign commands and deadlines are historical.
