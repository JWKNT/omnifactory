# Field tools

Run `python3 scripts/routes.py minecraft:furnace --station minecraft.crafting` to see all JEI recipe categories and the ingredient lists at a station. Supply several item names or repeat the station option to compare them.

With a suitable tool equipped, `python3 scripts/harvest_near.py 'iron ore' 12` takes up to twelve swings at matching exposed blocks. It scans again after each successful dig, since mining hammers uncover more of the vein. Use a small radius in a mine with multiple disconnected galleries.

For a close, known mining target obscured by dirt, `python3 scripts/excavate.py X Y Z` aims at the target and digs the block the crosshair actually hits. If the next face is beyond reach, reposition first. Clear overhead dirt when making a staircase so the player can step down.
