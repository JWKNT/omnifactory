# Keeping the four workshop furnaces burning

The first 32 uraninite ore finished firing, but the second firing stopped with 32 Uraninite Dust and no coal, charcoal or cane available. Coal is also an ingredient in steel and model mesh. When it runs out, scripts/coal_reserve.py can use five pennies for 32 coal ore and turn two grove logs into eight planks. In the recovery batch the workshop used its three existing planks as well. Sixteen coal ore went into the east furnace with wood. The first coal out started the uraninite's second firing in the west and north furnaces.

scripts/smelt_stock.py can collect its own input from another furnace and split a batch across two free furnaces. It handles coal, charcoal, reeds and jungle planks. The factory order runner collects coal during the firing if the next order needs fuel. It can buy more ore when the reserve runs low. scripts/ore_purchase.py now breaks a quarter into five nickels, or a nickel into five pennies, as required by the actual ore recipe.

The iron route in scripts/lv_order.py checks stored ore and crushed stock. One normal ore makes two crushed ore in the macerator. Hammer each into impure dust, then fire it into an iron ingot. Use this for iron shortages while a bigger order is running.
