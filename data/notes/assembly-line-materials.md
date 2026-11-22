# Materials to reserve for the first Assembly Line

The Quantum Processor Array alone will not unlock the first tier-seven circuit. Page 531 also requires the crafted Nether Star on page 391 and the Assembly Line on page 286. Page 286 requires a LuV hull. The IV hull and the old tier-five circuit prerequisite are already checked. The LuV hull and the Assembly Line each pay one OmniDollar.

Give the steel line another 31 solid steel casings of capacity after the 84 for the air tower. The first Assembly Line quest also asks for 12 Assembly Line Casings, 24 Reinforced Glass, 11 Assembler Machine Casings, 24 Grate Machine Casings, four LV fluid input hatches, 11 ULV input buses, one LV output bus, one LuV energy input hatch and the controller. Keep room for a second line for recipes with a different circuit setting.

There are 12 Vanadium Magnetite Dust and three Gallium Ingots on hand. The LV electrolyzer can separate two magnetite dust into one vanadium dust and one ordinary magnetite dust at 30 EU/t. The Nichrome furnace and existing freezer can make the first six cold vanadium ingots while the fourth furnace runs Signalum. After that, three vanadium and one gallium make four hot alloy ingots in the fourth furnace at 4,000 K. Cool them on its existing return, then hold one for page 285. Ordinary smelting of alloy dust is in JEI but does not turn our separate metals into alloy. The LuV hull uses two insulated alloy cables, an eight-Lumium-plate casing and 288 mB polyethylene in the assembler. The grid recipe costs another Lumium plate.

Keep the first Signalum mana charge for its eight ingots. The Nether Star core can reuse the dedicated Luminessence reactor. Craft the four tips while that reactor makes its block. The first star advances two branches and gives the molecular assembler a recipe that later stars can reuse. Scripts for these orders are first_vanadium_gallium.py and nether_star_parts.py under scripts/.


The LV electrolyzer order used the twelve stored vanadium magnetite dust. The recipe’s first listed output is magnetite, so the native order requests six magnetite. I verified all six vanadium dust in storage once the CPU finished. The next step is the east blast furnace and freezer before the 3:1 alloy charge.


The east Nichrome furnace smelted six vanadium dust at 1,920 EU/t, taking 284 ticks per ingot. The freezer returned cold vanadium. Three ingots and one gallium went into the fourth furnace, which produced four hot alloy ingots in 1,276 ticks at 1,920 EU/t. All four reached ME cold. Page 285 paid one OmniNickel. The first southern Nether Star tip is also crafted. For page 138, the wiremill makes two single wires from just one alloy ingot. Coat each in 72 mB silicone rubber. Eight Lumium plates make the casing, and the assembler combines it with the cables and 288 mB polyethylene.

One Vanadium-Gallium ingot passed through the LV wiremill for two single wires. The MV cable assembler then insulated both wires at 128 EU/t; both LuV cables reached ME. The outstanding hull ingredient is the casing made from eight Lumium plates.

The 12-slice JEI preview (layout 7) matches the quest's eleven item inputs, four fluid inputs and 24 reinforced glass. Its twelve example energy hatches occupy eleven places that can instead take solid steel casings. The quest calls for one LuV hatch and 31 solid steel casings. Allow at least 3 × 4 × 12 blocks for the structure and additional length outside both ends for terminal cabling and maintenance.

There are two efficient early orders while the circuit furnace runs. Reuse the cryogenic tower's steel-frame and plate patterns for the 31 casings. Six advanced alloy plates and eighteen glass make the 24 reinforced glass in an alloy smelter. The compressor turns a mixed metal ingot into an advanced alloy plate. Use the crafting recipe with one iron, one bronze and one tin plate per mixed ingot. The nine-plate recipe yields only two. The workshop stages both orders through scripts/assembly_line_shell.py.
