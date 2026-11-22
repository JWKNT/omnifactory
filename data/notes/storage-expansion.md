# From the parts annex to networked bulk storage

A full 54-slot parts chest forced the first expansion while making the MV power feed. A pair of ordinary chests was quick to build from the void grove and immediately accepted the overflow. The annex can carry this order through commissioning. To reduce repeated visits to several chests, reserve space on the east deck for a connected drawer bank and one controller.

Quest 495 already accepts the Storage Drawer Controller and pays a nickel. Its bench recipe uses five iron plates, two Basic Circuits, a drawer and a block of diamonds or emeralds. The parts chest holds a Framed Drawer and the Shulker now supplies diamonds. Complete the reactor and feeder's circuits first.

This instance raises the cost of the ME Storage Bus: it takes an MV Electric Piston and an ME Interface. The interface requires an MV Robot Arm, a third MV hull, five extra aluminium plates, an Annihilation Core and a Formation Core. Taking an interface part off its cable and crafting it back into a block just changes its shape. Budget the third hull and the two cores after the first two MV machines are powered. One bus on the controller can serve the connected drawer bank.

The original metal double chest reached 54 stacks during the 64-lithium bounty. A second double chest now spans (14,80,8) and (15,80,8) and opens from the south. Its station name is metals. The first survey found twenty Lithium Ingots, three Calcium Dust and two Phosphate Dust in it. stock_void.py, stores.py and picklist.py include the extension. New ore and metal types go directly there when the primary chest has no free slot.

A full storage survey now works from (12,80,6). The player stood in that aisle and opened stock, chest, parts, annex and metals through all five chest screens. The recorded position stayed on the same block for every read. scripts/stock_void.py uses that position for a full count and can still walk to an individual chest if a new block obscures its face. The ME terminal and the two bulk drawers are checked separately.

The parts chest migration started using the existing ME cells. The first transfer moved 33 items out of the main chest. The annex stays available until its inventory has been emptied and checked. Measure the improvement by the number of physical chest visits per full stock survey.

At 32h27m the migration finished. The existing ME cells received 42 items from the main parts chest and five from the annex. The remaining 167 annex items fit in the main parts chest. Both empty annex blocks were recovered. I checked both former positions and the next full central-aisle survey recorded only stock, chest and parts. This removes one chest opening from every full survey.

A sixth 1k item cell now occupies slot ten. The first drive is full with six item cells and four fluid cells. The new disk provides 63 item types ahead of the first ore cargo. The next disk needs a second drive.
