# Palladium for carbon fibers

The existing blast furnace can already make palladium. The installed GregTech recipe calls for 1,700 K, 120 EU/t and 600 ticks per ingot. Page 169 asks for one ingot, pays one quarter, and opens Carbon Fibers. Raw carbon fiber in the autoclave uses one carbon dust and just 1 mB of molten palladium per attempt. Budget sixteen fibers and one engraved CPU wafer for the first Nano CPU Wafer after the HV reactor is available.

Two quarters buy 32 palladium ore. The survey found 21 quarters and no palladium or Sheldonite. Six Sheldonite dust would give a palladium dust and three platinum in the MV electrolyzer, but the shop has no Sheldonite ore recipe. Choose the direct ore for the longer 64-ingot element quest. Process just one ore now: macerate to two crushed, hammer and wash, then blast the two dust after the aluminium order. Keep 31 ore for later. Show one finished ingot before melting it. The order is in scripts/first_palladium.py.

To check an EBF temperature against the actual installed recipe, use python3 harness/cli.py lib blast recipes id=gregtech:meta_item_1 meta=10049. It reads the recipe's temperature together with its power and duration.

The first palladium ore produced two crushed ore, both hammered and washed. Two clean palladium dust came out of the void cauldron during the first HV reactor cycle. The furnace order picks these up during the reconstruction work. Confirm the two ingots at the output and claim page 169 before melting one.
