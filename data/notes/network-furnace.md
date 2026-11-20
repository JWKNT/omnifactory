# ME furnace for glass, wrought iron and simulation dust

The north deck has an LV cable at (9,82,-5), a free furnace socket immediately east at (10,82,-5), and a cobblestone aisle along x11. Give a second Basic Electric Furnace its own ME Interface above it. Extend the HV assembler branch from (8,83,3) north to z-5. One final cable at (9,83,-5) connects to the furnace interface. An upward output with input permitted on that face lets the furnace receive ingredients and return finished stacks through one interface. Quest 404 describes this layout. The original furnace can keep handling ore and occasional recipes.

Use three of the eight blanks from the dry electronics build, after its two patterns. The live smelting recipes are sand to glass, iron ingot to wrought iron ingot, and Resonant Clathrate to Pulsating Dust. The last recipe competes with Uraninite Dust in JEI, so encode the clathrate version. The EV electrolyzer route costs 200,000 EU for one dust. The MV clathrate route already works from quartz and renewable Ender Pearls.

scripts/furnace_interface.py is queued after dry electronics. Its commissioning orders require four of each product to return through the terminal. Each blank, interface and machine still has to be paid for from survival stock. The site is surveyed and the build is pending.
