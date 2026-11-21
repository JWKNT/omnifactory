# The third independent crafting CPU

The third 1k Crafting Storage is installed at (9,83,−3), on the west side of the north Fluix cable. ME reports three independent CPUs, each with 1,024 bytes. The advanced inscriber printed one logic and two calculation processors from gold, Certus and silicon plates plus three of the sixteen Refined Circuits. The storage component consumed four red alloy plates. Two Nether Quartz seeds matured in the growth chamber; one crystal became two Quartz Fiber, and the MV alloy smelter returned two Fluix cables while the ME compressor pressed aluminium for the crafting unit.

The first observed overlap had all three CPUs busy: bronze ingots, steel ingots and fine tin alloy wire. Both metal orders use the same alloy smelter, so the third CPU let the wiremill process an independent job while the two metal recipes shared their machine. Compare the alloy queue with wiremill throughput before adding a fourth CPU.

The cable supplier now checks committed fiber and dust before purchasing ore. This batch bought 32 Nether Quartz Ore for two nickels while two seeds were already growing and a Fluix dust was on hand. The spare ore remains available for future cable.

scripts/crafting_status.py reads each live CPU's item lists from the same data as the crafting monitor. At 51h49m one CPU held one aluminium foil, waited for four thin PVC and had sixteen capacitors scheduled. The cluster mill was idle with an empty input and ME held 37 ordinary PVC sheets. A physical batch of eight sheets can return 32 thin sheets via its existing interface and release the job. A fourth CPU would still need that same missing material.

Eight PVC sheets went through the mill. The CPU monitor changed from waiting for thin PVC to waiting for the sixteen finished capacitors, then cleared the job. ME stock rose from 97 to 125 capacitors, including other production during the check.
