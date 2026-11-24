# Palladium for carbon fibers

The existing blast furnace can already make palladium. The installed GregTech recipe calls for 1,700 K, 120 EU/t and 600 ticks per ingot. Page 169 asks for one ingot, pays one quarter, and opens Carbon Fibers. Raw carbon fiber in the autoclave uses one carbon dust and just 1 mB of molten palladium per attempt. Budget sixteen fibers and one engraved CPU wafer for the first Nano CPU Wafer after the HV reactor is available.

Two quarters buy 32 palladium ore. The survey found 21 quarters and no palladium or Sheldonite. Six Sheldonite dust would give a palladium dust and three platinum in the MV electrolyzer, but the shop has no Sheldonite ore recipe. Choose the direct ore for the longer 64-ingot element quest. Process just one ore now: macerate to two crushed, hammer and wash, then blast the two dust after the aluminium order. Keep 31 ore for later. Show one finished ingot before melting it. The order is in scripts/first_palladium.py.

To check an EBF temperature against the actual installed recipe, use python3 harness/cli.py lib blast recipes id=gregtech:meta_item_1 meta=10049. It reads the recipe's temperature together with its power and duration.

The first palladium ore produced two crushed ore, both hammered and washed. Two clean palladium dust came out of the void cauldron during the first HV reactor cycle. The furnace order picks these up during the reconstruction work. Confirm the two ingots at the output and claim page 169 before melting one.

The EBF produced both Palladium Ingots. Page 169 paid its quarter and opened Carbon Fibers. One ingot in the fluid extractor gives 144 mB. The running JEI recipe uses one carbon dust and 1 mB per attempt for two fibers, 45 ticks at 40 EU/t before overclocking. The installed LV autoclave cannot supply that voltage. An MV autoclave needs four aluminium plates, glass, one MV hull, a pump and two MV circuits. The HV version substitutes stainless plates, an HV hull, an HV pump and two HV circuits. Leave both ingots available while building the freezer.

At 88h28m the HV fiber autoclave had 4 mB of palladium left and storage held 31 original ore. Two more wafers would need 32 fibers. Start a replacement before the last 32 mB are used. Four ore at a time can go through the HV ore mill, then the impure dust can be washed in the workshop cauldron. The fourth EBF has free pattern slots and a filtered return for cold ingots. Its planned order converts the dust into metal for the extractor beneath the autoclave. One ingot's 144 mB will cover 18 more Nano CPU wafers when carbon and glowstone are available.

At 88h47m four palladium ore had supplied eight clean dust through the ore mill, hammer and cauldron. The palladium ingot pattern is fitted at the fourth furnace. The other missing input was carbon. The free HV centrifuge took 28 coal dust, bringing the carbon stock to 29 while the LV electrolyzer handled phosphorus and quartz. Verify the ingot return and the extractor's liquid before relying on another 18 wafers.

At 88h55m the furnace had delivered four palladium ingots. Three remained in storage and the fiber autoclave held 140 mB after the extractor melted the fourth. The wafer line returned a Nano CPU Wafer.

At 114h30m an ME order for two Nano CPU Wafers was waiting for 24 Raw Carbon Fibers. The HV autoclave had twelve carbon dust in its input and no palladium. One ingot in the MV fluid extractor underneath supplied 144 mB. The autoclave used twelve, leaving 132 mB. The wafer order completed and storage held four wafers. The workshop shift now checks this fluid when it finds carbon waiting in the autoclave.
