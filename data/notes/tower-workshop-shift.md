# One player for the tower and circuit workshop

The normal player runs `scripts/quantum_array_workshop.py`. Read its PID from `run/iv-campaign.pgid` and check the live process before taking control. The same round checks cryogenic power, gas storage, silicon, circuit supplies and the other factory lines. `scripts/first_argon_run.py` switches the tower once stored noble gases reach 53 buckets. It checks the inlet between portable-tank trips and leaves during machine processing.

Use `PYTHONPATH=harness:scripts python3 -u scripts/tower_shift.py` when the tower needs several consecutive visits while its materials are arriving. It requests the broad workshop to finish its current player action, waits for that process to exit, then uses the same PID file for the focused visits. It resumes the broad workshop in the same process afterward. A running shift or a stop request already in progress means the player is occupied. Read-only checks of machine tanks, item stocks and quests can run alongside the player.

The south walkway at y80, z16 is now continuous from x3 to x−11. It connects the main platform to the tower's south service aisle. On the east wall the energy hatch sits behind the CEF, and the five gas outlets sit behind the Ender Fluid Conduits. The west liquid-air hatch is at (−17,80,13).

Pass `--argon` during the first changeover to alternate a tower visit with laser construction and Hellish model work. The actor returns to the broad workshop after the first argon receipt or ten rounds. See [the noble-gas feed plan](noble-gas-feed.md) for the permanent second inlet surveyed on the east wall.

After page 175, use `--power-ic` to alternate the east furnace, the laser, the IV assembler, the second tower inlet and the LuV hull. This shift hands control back after page 269 pays or after ten passes. On the first changeover all 18.2 buckets left in the inlet returned to the tank, the extra bucket of noble gases returned to ME, and both source connectors reopened.
