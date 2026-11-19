# Rubber at camp

The tree plot is (-165, 64, 211), south of the furnaces. The iron lumberaxe felled the whole first tree here and returned eleven usable rubber and seven logs. The starter fertilizer grew the sapling. The leaves can take a few seconds to decay and drop another sapling.

With a rubber sapling, fertilizer and iron lumberaxe in inventory, run `python3 scripts/rubber_tree.py 1`. It steps away from the planting position, plants, fertilizes and cuts. Additional trees depend on picking up replacement saplings. Use two rubber and the hard hammer for each sheet.

A successful run of scripts/rubber_tree.py now replants a sapling at the plot before leaving if one was collected. This lets the next tree grow while the player is away. If a fertilized sapling stays small, leave it planted and try again after the old canopy decays. The larger tree in the second session gave 29 rubber and 23 logs.

The first assembler order makes rubber a bulk input. Six new saplings were planted on the south field, plus a replacement at the original plot, on a six-block grid. scripts/camp_grove.py checks the plants, cuts mature trunks with the iron lumberaxe and replants accessible grass. The original plot matured naturally and yielded ten rubber and seven logs. The dry bench at (-170,64,204) can grind sixteen logs into 64 pulp for a thirty-two-paper run at the lakeside table. Save future rubber logs for the LV centrifuge when ordinary logs can supply the paper.

JEI gives two other rubber routes. Eight cane in a compressor or eight leaves at the bench make a Plant Ball; smelting it gives two slimeballs, and a second smelt turns each into rubber. A centrifuged rubber log takes 200 ticks at 20 EU/t, gives 60 mB methane, and has separate chances for rubber (50%), a Plant Ball (37.5%), carbon and pulp. A later Phytogenic Insolator with the Sapling Infuser augment can grow rubber wood using water and Phyto-Gro. Those routes inform the eventual passive line.

The eight-plot grove and purchased apatite supplied the assembler order. One nickel changed into five pennies buys 32 apatite ore. Four of the first ore smelted yielded twenty apatite gems. Six gems and twelve sand made 48 Actually Additions fertilizer. Two passes of scripts/camp_grove.py --fertilize --until 80 yielded 82 raw rubber and 53 logs, leaving twelve fertilizer. The script replants after harvest. A stone lumberaxe costs four cobblestone and two sticks and will fell these trees when the iron one wears out.
