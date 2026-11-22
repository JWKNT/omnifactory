# Supply the miner projector from the RF trunk

The first cargo recipe takes 500 EU/t for 500 ticks. A dedicated four-amp HV CEF beside the east-facing energy hatch keeps the EV assembler's transformer available during a mission and leaves capacity for the next HV machines. The alternative four-amp MV converter and step-up transformer needs two MV hulls and provides one HV amp. Both draw on the same dynamo and RF bank.

The converter site (21,80,-13) has a cobblestone foundation and faces west toward the hatch. Thirteen surveyed air blocks connect it to the live vibrant conduit at (16,83,-7). Run the branch east along z=-8 at y=83, north at x=21, then down to y=81. It clears the projector and the third furnace site. The route and converter are staged by scripts/projector_power.py after the launch fuel is funded. Verify charge in the formed projector's own hatch before loading the miner.

The four-amp CEF takes an HV hull, two quadruple vibrant wires, four vibrant conduits, a chest and one advanced circuit. Use a Nanoprocessor when stocked. The sixteen-amp version takes two sixteen-wire bundles. The north furnace can alloy vibrant metal while the west makes Microversium.

The first two vibrant sections are installed and connected, at (16,83,-8) and (17,83,-8). Eleven sections remain in the surveyed run.

All thirteen vibrant conduit sections now connect the EV deck to the projector. The converter used a Nanoprocessor, the HV hull, two quadruple vibrant wires, four conduits and a chest. It faces west from (21,80,-13). The east projector hatch measured 7,168 EU at commissioning and later reached its full 8,192 EU. The converter itself held 16,384 EU.

For the second miner's ore mission, the live energy hatch at (20,80,-13) reads 512 V and two input amps. This instance's GregTech EnergyContainerList sums voltage multiplied by input amperage for multiblock recipe selection. The existing hatch therefore qualifies for the 1,000 EU/t mission. The four-amp converter can supply it. The south output bus has 16 slots for the mission's 15 stacks. Check sustained power and actual cargo delivery on launch. The third ship's 2,000 EU/t ore mission will require a power upgrade; the small projector pattern permits up to two energy hatches.
