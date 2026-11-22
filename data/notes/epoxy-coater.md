# Epoxy sheets feed straight into the board reactor

The dedicated epoxy caster at (5,81,-4) shares its north face with the coater at (5,81,-5). I turned the caster's front west and its item output north, then enabled automatic item output. The plate mold stays in the caster. The coater receives sulfuric acid from the recovery still to its east and started this order with forty copper foil in slot zero.

Fourteen epoxy sheets from before the change went into slot one. After the caster ran again, the coater showed 37 foil and 17 sheets, with a board in the output. That accounts for six additional sheets arriving directly from the caster. The coater can now keep working while I am at the refinery.

scripts/epoxy_coater_feed.py handles the initial foil load. scripts/epoxy_board_return.py stages a drawer below the coater and extends the existing cyan item return through the bundle at (6,80,-5). Until that outlet passes its own test, finished boards can still be collected and stored through the terminal. The first eight boards of this order can fund another array while the remainder are coating. scripts/ev_component_stock.py requests a single array once its boards are present and can order its four Processor Assemblies separately.

The output return passed its live test. The coater pushes boards down into a jungle drawer at (5,80,-5). One new item conduit inside the bundle east of the drawer extracts west on cyan. The existing cluster-mill interface accepts that channel. ME stock climbed from five boards to nineteen while the player was installing refinery cables. The coater still had copper foil, the caster retained its mold, and the array assembler had already spent boards on the four Processor Assemblies. The next array order in AE reported a single missing titanium plate.

When foil is already in the first input and sulfuric acid is available, the feeder can add PVC to the second input. Eight stocked PVC sheets yielded sixteen Plastic Circuit Boards in ME. For this charge the available alternatives were polyethylene at one board per sheet or PTFE at four, with no PTFE in stock.

The ME interface at (4,81,−5) supplies copper foil to the coater’s west robot arm. After removing one foil, I watched its replacement enter the machine. The arm holds one foil. The workshop can add Reinforced Epoxy Resin Sheet to the interface and arm when a sheet is available. Check one physical replacement before relying on automatic sheet delivery.

I configured the arm’s second filter sample from the cable roof. A jetpack crossing from the refinery reached the roof. A final short walk to (5,83,−5) gave a clear hit on the west strip of the top face. From that perch I opened the arm with the screwdriver, copied one reinforced sheet into its second sample, then configured the ME interface’s second stock slot. I verified one copper foil and one reinforced sheet in the coater while it was actively making a Fiber-Reinforced Circuit Board at 10 EU/t for 500 ticks. Both ingredients replenished while the first board was still running.

Four Fiber-Reinforced Circuit Boards subsequently reached ME from the coater without a player carrying them. The same drawer and cyan return used for ordinary epoxy boards handled this grade.
