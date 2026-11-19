# Void landing and first bulk material

The Void World Cake stands at (-175, 64, 204) in the overworld. Look at (-174.5, 64.25, 204.5) and right-click; the cake is half a block high. The arrival platform is 3 by 3 obsidian, x=1..3, z=1..3, at y=79 in dimension 119. The Overworld Cake has been placed at (1, 80, 1) for the return trip. Keep the central arrival tile clear.

The starting floor expands east and south at y=79. scripts/void_floor.py EAST SOUTH checks each position, walks on the existing platform, holds sneak at the edge and places against the exposed side. It can resume a partial rectangle. For a larger floor, an Iron Wand costs one normal iron ingot and two sticks; its tooltip says it can extend up to nine blocks per use in horizontal mode. Use the floor script for a starting strip or a repair and a wand for wider extensions.

Keep the first production bay within chunk (0,0) with room for bulk storage. The cobblestone generator needs no power and pushes into adjacent storage. The planned sequence is cobblestone, gravel, sand and glass, plus dust and clay for Deep Mob Learning. Run power and the blast furnace in an adjacent bay with room for additional furnaces.

The generator now runs at (6, 80, 2) into a jungle basic drawer at (7, 80, 2). The drawer contained 56 cobblestone on its first check and the generator tooltip gives a rate of two per second. Both /chunks claim and /chunks load confirmed success for chunk (0,0) in the void. A crafting table stands at (4, 80, 2).

The iron wand works. One right-click on the south face of the floor at (4, 79, 5) placed an eight-block row. scripts/void_wand.py DIRECTION X Z ROWS repeats this using the exposed floor edge; X and Z identify the middle of the edge strip. Each click places up to nine blocks, so use separate passes for a wide bay. The ground floor in this dimension is y=79.

The completed landing floor is 15 by 15, x=1..15 and z=1..15. A surface scan counted 216 cobblestone, alongside the nine original obsidian. Shift-left-clicking the drawer face takes a stack into inventory; hold_sneak plus press_key name=attack worked. The two-pass wand expansion on the south edge used x=5 and x=13 to cover the full width. The repeatable travel quest paid a spare Void World Cake, carried as a reserve.

The original transit cake reached six bites. A fresh Void World Cake is now placed one block farther west at (-176,64,204). scripts/cake_trip.py automatically selects it when the first is spent. On the return cake the fuel must match the configured item exactly: two oak saplings reduced bites from five to three, while an acacia sapling caused a normal trip to camp.
