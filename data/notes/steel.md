# First steel and the next alloys

LV Alloy Smelter (19) and Steel (21) are claimed. The alloy smelter is at (-170, 66, 199), west of the compressor. Three wrought iron ingots and three coal dust were loaded. The machine ran at 16 EU/t for 200 ticks per steel ingot. A batch of rubber logs in the ore furnace makes charcoal for the next batch of steel. This preserves ordinary coal for circuits and generator fuel.

Use scripts/wiremill.py --machine alloy_smelter followed by the first ID@meta and count, then --second followed by the other ID@meta and count. With no materials it takes the output. For steel use gregtech:meta_item_1@10197 and gregtech:meta_item_1@2101 for wrought iron and charcoal dust. Store extra inputs so another alloy can use both slots.

Two nickels bought 32 nickel ore. Copper... Nickel... Cupronickel? (59) asks for nickel, invar and cupronickel. Keep two normal iron per nickel for invar, and copper for cupronickel. Its successor Blast Furnace Fun (60) calls for 16 cupronickel coils, 11 heatproof casings, four buses/hatches for inputs and outputs, two LV energy hatches and the controller. Plan the boiler and turbines before running the blast furnace. Six steel plates and two fluid buckets are a cheaper nearer milestone for the cobblestone generator.

A new library opening at (-166, 65, 249) goes through the terracotta floor to the level at y=60. Four shelves there gave twelve books for circuit paper. A spider Broken Spawner and spawner shards from the trip are in parts. Sand can be made at the bench by grinding cobblestone to gravel and then to sand with a mortar. The rubber tree script now replants after a successful batch.

Quest 59 is now claimed. The smelter made six invar and four cupronickel in the first batches. Its automatic output now goes west to the chest at (-171, 66, 199), named alloyout in scripts/camp.py. Before changing recipe, scripts/wiremill.py --machine alloy_smelter --unload-inputs can recover leftover input from both slots. The second batch of steel used charcoal dust successfully. West re-smelts ordinary iron for more wrought iron.

Lava for the cobblestone generator came from the pool at (-192, 62, 238). Stand at (-192, 64, 236). A small opening through the north bank gives the bucket a direct line to the source layer.
