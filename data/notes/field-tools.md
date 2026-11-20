# Field tools

Run `python3 scripts/routes.py minecraft:furnace --station minecraft.crafting` to see all JEI recipe categories and the ingredient lists at a station. Supply several item names or repeat the station option to compare them.

With a suitable tool equipped, `python3 scripts/harvest_near.py 'iron ore' 12` takes up to twelve swings at matching exposed blocks. It scans again after each successful dig, since mining hammers uncover more of the vein. Use a small radius in a mine with multiple disconnected galleries.

For a close, known mining target obscured by dirt, `python3 scripts/excavate.py X Y Z` aims at the target and digs the block the crosshair actually hits. If the next face is beyond reach, reposition first. Clear overhead dirt when making a staircase so the player can step down.

`python3 scripts/toolrecipes.py Wrought Iron` lists JEI crafting indices and inputs for the seven starter tools in that material. Use it when a GregTech tool has many material variants under one item ID.

An open crafting grid accepts a sequence with `python3 scripts/bench_batch.py minecraft:furnace:3 minecraft:chest`. Specify metadata with @ and a JEI recipe index with #. The batch stops on an incomplete craft.

`python3 scripts/quest_page.py 743 786` visits the specified pages through the quest-book key, checks each unlocked task there and claims fixed rewards. Read each task and reward before passing its ID. Choice rewards are left for a deliberate selection on their page.

For item-by-item quest counts use `python3 harness/cli.py lib quest_items itemProgress id=66`. The count can remain credited after using the material in the next recipe. Check the book before committing the whole batch.

`python3 scripts/drift.py south 12` cuts a level gallery with the equipped diamond mining hammer and walks into each opening. It checks the floor before walking. It stops when the inventory has fewer than two free slots, at a drop or when it meets a block outside its mining list.

Use scripts/grid_job.py with the same targets as bench_batch.py to walk to the camp bench, craft, and close the screen. Split batches immediately before consuming a quest intermediate and use scripts/quest_page.py on that quest to detect the carried stack.

Use `python3 scripts/stores.py` to walk to both camp double chests and list their contents. Add quoted display names or registry patterns to narrow the list. With `--take` it retrieves all matching stacks and prints how many actually moved from each slot. For example, `python3 scripts/stores.py --take 'Vacuum Tube' 'Coated Circuit Board' 'Resistor'` gathers the stored circuit components and closes the last chest.

scripts/picklist.py ID@META=COUNT [...] retrieves enough for each target from the player's carried stock and the three camp stores plus both machine output chests. Counts are total quantities to carry. It verifies the result and lists shortages. scripts/enable_lv.py alloy_smelter|compressor|wiremill on|off uses the carried soft hammer only if a state change is needed. It is handy when two machines compete for the first dynamo's power.

The workshop can now bank the wooden sword, stone hoe and flint and steel in parts storage between uses. scripts/picklist.py --any-damage minecraft:flint_and_steel=1 accepts the worn lighter. Use the flag only for tools; ordinary item requests still use exact metadata. The second bedrock trip used the same lighter as the first.

A long batch at the ME Crafting Terminal filled the player's inventory. The iron saw came out of the grid onto the floor by the terminal. Moving intermediate parts into ME freed room to pick it up at (10,80,8). The saw is back in inventory. The workshop now passes --store-intermediates to bench_batch.py for long terminal orders. When fewer than four slots are free it moves ordinary materials into ME, where the next recipe can still use them.
