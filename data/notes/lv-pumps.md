# Two pumps and one reactor

The order uses three tin rotors. Two go into pumps for the autoclave and the Pyrolyse Oven. The third goes into the chemical reactor with a motor, glass, two basic circuits and an LV hull. The reactor recipe takes no pump, but its quest needs the pump quest. Check quest 146 with a pump in hand before installing the machines.

A flint knife and an iron saw were crafted at the void bench. Two gravel in the mortar made one flint for the knife. The saw blade took two compressed iron plates, a hammer and a file. The knife cuts paper rings and the saw cuts the lathed tin rods into bolts. Run scripts/bench_order.py gregtech:meta_item_1@16071=6 once three tin rods are available, then let the lathe make the screws. Keep the remaining tin rods for rings. The order planner can now dispatch resistor jobs to the assembler with scripts/factory_round.py.

The macerator received 26 tin ore. Collect crushed tin and hammer it into smeltable dust. The west furnace received eight iron ingots for wrought. The workshop can continue metalworking during a grove and lakeside paper trip. The first bill showed shortages of ten rubber, eight paper and two glass panes beyond the tin already being processed. Bring enough for the next circuit batch too.

The first twelve crushed tin and the last twelve crushed iron from the preceding order were hammered and loaded into east and north respectively. scripts/hammer_crushed.py finds carried crushed ores and matches the hammer recipe for each against JEI, so mixed batches can be done together at the bench.

The supply trip brought back 28 rubber, 16 paper and seven sand. The sand is enough for one six-glass pane recipe, with glass for the reactor already in bulk storage. The underwater approach at the western lake cost health when attempts to reach the next block continued after the player ran low on air. The player surfaced and returned to the factory alive. The shore option in scripts/harvest_near.py now checks air between attempts and swims toward the bank before exiting; that change still needs a field test. Prefer exposed shore sand or the mortar for a small shortfall.

Both pumps are built and quest 146 is claimed. Three lathed tin rods yielded six bolts at the saw; the lathe turned five into screws. The bronze recipe made eight ingots; six compressed plates yielded both pipes. The other pump components were four paper rings, two tin rotors, two motors and the tin cables. The supply trip covered the material shortages and the glass bench batch made sixteen panes. The reactor and its first new cable segment are next.

The separate reactor order is complete. Its own motor and tin rotor let both pumps remain in storage. Quest 27 paid a quarter. The reactor at (6,81,4) is connected to the north end of the LV cable and reads 1,024 EU. It has not processed a chemical batch yet.
