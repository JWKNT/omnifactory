# Changing the Assembly Line workshop shift

The PID in `run/iv-campaign.pgid` owns the recorded player. The separate `cpu_watch.py --workshop` process observes ME crafting CPUs and sends no player input. At takeover, identify the active player process and its children before taking control.

During a running session, when the broad `quantum_array_workshop.py` is playing, `PYTHONPATH=harness:scripts python3 -u scripts/tower_shift.py --assembly` asks it to yield after the current job. The focused worker waits for it to exit before touching the game. The focused shift covers furnace and freezer output, ports, shell, deck, machine parts, circuits and fuel. After its passes it resumes the broad workshop in the same process.

For a running focused worker with the refresh logic, `touch run/refresh-assembly-shift` loads updated Python modules after its current job. It retains the same PID and recorder. `touch run/finish-tower-shift` returns a focused worker to the broad workshop at the same boundary. Check the process command and the marker before and after the change. The checks are separate from a new session takeover, which follows the original stop and verification instructions.
