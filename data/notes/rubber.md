# Rubber at camp

The tree plot is (-165, 64, 211), south of the furnaces. The iron lumberaxe felled the whole first tree here and returned eleven usable rubber and seven logs. The starter fertilizer grew the sapling. The leaves can take a few seconds to decay and drop another sapling.

With a rubber sapling, fertilizer and iron lumberaxe in inventory, run `python3 scripts/rubber_tree.py 1`. It steps away from the planting position, plants, fertilizes and cuts. Additional trees depend on picking up replacement saplings. Use two rubber and the hard hammer for each sheet.

A successful run of scripts/rubber_tree.py now replants a sapling at the plot before leaving if one was collected. This lets the next tree grow while the player is away. If a fertilized sapling stays small, leave it planted and try again after the old canopy decays. The larger tree in the second session gave 29 rubber and 23 logs.
