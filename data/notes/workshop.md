# Spawn workshop

The workbench and six furnaces occupy the strip around (-170, 64, 204). Their names and standing positions are in `scripts/camp.py`. Use `scripts/tend.py` to load or collect. The camp chunk is claimed and force-loaded. The north furnace cooks coal ore into fuel. East and ore smelt iron ore and magnetite, west re-smelts iron ingots to wrought iron, gold handles precious ore and stone cooks cobblestone for the mortar. These names are for convenience and the furnaces can change jobs.

The chest at (-172, 64, 203) holds both cakes, Snad, cane, surplus rock and vanadium magnetite. Use `python3 scripts/camp.py chest` then `python3 scripts/stash.py 'gregtech:ore_vanadium*'` to store matching stacks. Close the screen afterwards.

The original chest is now a double chest. A second chest named parts stands at (-173, 64, 206) for circuits, wires and metal stock. With either chest open, scripts/stash.py --take ITEM retrieves a stack or stacks. Add --stacks 1 to limit it. Its output gives the quantity actually transferred; zero means inventory space prevented the move.
