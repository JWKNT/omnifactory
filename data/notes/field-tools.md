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
