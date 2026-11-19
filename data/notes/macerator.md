# First ore-doubling line

The Basic Macerator is installed on the east of the fourth cable at (6,81,5), facing east. The macerator quest (270) and its chemistry follow-up (756) are both claimed. Their two nickels bought 32 iron ore, all loaded through the machine GUI. Each recipe takes 400 ticks at 12 EU/t and gives two crushed iron. One crushed ore and a reusable hammer on the bench make one impure iron dust; a furnace then makes one iron ingot. With 32 ore, the complete order should give 64 iron. Keep doing other work during the roughly eleven-minute maceration run.

Use scripts/finish_iron.py to collect however much has finished, hammer it in the void bench and load the east and north void furnaces. It needs the GregTech hammer and ordinary coal carried. scripts/wiremill.py --machine macerator also supports arbitrary measured inputs and collection. Keep 6 iron rods or their raw material for the next LV machine, the lathe. In this instance ordinary magnetite is good for direct iron smelting, while vanadium magnetite smelts to vanadium magnetite dust; store that for later.

The first two ore yielded four crushed ore. scripts/finish_iron.py crafted four impure dust and sent two each to east and north. Both furnaces finished and the four iron ingots were collected. This verifies the doubling route all the way to usable metal.

All 32 ore have now passed through the macerator and all 64 crushed ore were hammered to impure iron dust. The final 44 dust went into the east void furnace. Its first 16 ingots were collected while commissioning the lathe.
