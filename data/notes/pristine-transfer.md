# Moving pristine matter to the fabricator

Both installed Deep Mob Learning machines expose inputs on the top face and outputs on their other faces. The Simulation Chamber combines ordinary and pristine matter on its output faces. The Loot Fabricator only accepts pristine matter on top. Its Diamond selection persists between Shulker batches.

Three of the four stored Ender IO Item Conduits could join the north face of the chamber at (6,82,9) to the top of the fabricator at (7,82,8). The three empty positions surveyed were (6,82,8), (6,83,8), and (7,83,8). Configure the lower conduit to extract only from the chamber to its south. Disable the connection below it to the alloy smelter and the side connection to the fabricator's output. At the top of the fabricator enable insertion only. Test one pristine, six diamonds, and ordinary matter still in the chamber. No conduit has been placed for this route yet.

The diamond return needs a separate destination and a stock reserve. Until then scripts/shulker_round.py takes the finished diamonds and fuels the dynamo. When switching to Enderman, select the intended pearl output before enabling its pristine transfer.
