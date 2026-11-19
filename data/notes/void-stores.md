# Void factory stock and furnace bank

Three double chests are installed and verified. Parts begins at (9,80,4), bulk stock at (12,80,4), and metals/ores at (12,80,7). Each extends one block east. Four ordinary furnaces at z1, y80 run from x10 through x13, named east, west, north and ore. Serve everything from the south. The camp retains all its own chests and furnaces.

scripts/camp.py, scripts/tend.py, scripts/stores.py and scripts/picklist.py now pick the local stations by dimension. scripts/stock_void.py sorts a carried delivery into the three factory chests. It keeps tools and fuel carried. scripts/void_stores.py contains the verified placements. Use scripts/stores.py to list actual holdings, since the two workshops now have different stock.

scripts/lv_order.py gregtech:machine@60 gregtech:machine@350 computes the shared component order from live JEI sizes and known early routes. Optional --carried and repeated --stock paths account for inventory and fresh stores.py listings from each dimension. Ignore a stale stock listing after a delivery. Without stock the pair needs 68 ordinary iron including 56 to resmelt into wrought iron; 44 wrought plates, 12 wrought rods and 12 iron rods. Existing product and gear stock reduces those totals.
