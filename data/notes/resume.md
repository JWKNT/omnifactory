# Resume at the void workshop

Run `python3 scripts/workshop_status.py` to see the live campaign, recorder and machines. One wafer_campaign.py process controls the player. If it has stopped, inspect the first error and affected block before resuming with `python3 scripts/wafer_campaign.py`. The recovered hot Kanthal is safe in the chest at (4,81,2); see kanthal-coils.md before moving it. The last counted standing was 231 of 644 chapter quests.

## Current work at 32h38m

- The Vacuum Freezer is the tier objective. At (7,81,-4) the new PVC caster has been placed. Check its mold and the freezer-vinyl-cast receipt before counting sheets. The MV reactor has produced its first bucket of vinyl chloride. The separate HV chemical reactor at (10,82,1) now holds 1,000 mB sulfuric acid for the first sixteen boards. The LV reactor produced another 2,000 mB for ethanol conversion. There are 25 copper foil in ME. See pvc-boards.md.
- The terminal delivered four Refined Circuits from the soldered pattern. Refined Processor and Refined Processor Array are also encoded in the HV assembler at (10,82,3). ME had 96 SMD resistors and eighteen capacitors before the trial. The HV assembler now holds 3,600 mB solder. The first trial used four of each passive. See freezer-mainframes.md for the whole controller bill.
- Follow ruby-washer.md for the updated chrome order. The first 24 raw ruby are already through the two LV grinding passes. The centrifuge took their 48 impure dust. The second mill has accepted eighteen raw ore for the planned MV ore washer, which will use a spare 128 V transformer outlet beside the extruder. The two former 24-ore tickets were retired. Check the live washing ticket before purchasing ore. Keep the available chrome and matching aluminium for Kanthal. See kanthal-coils.md and vacuum-freezer.md for the alloy bill and wall layout.
- The Advanced Inscriber printed two silicon plates together, and quest 140 is claimed. The second electric furnace passed all three terminal trials. The HV assembler also delivers tubes and resistors. See advanced-inscriber.md, network-furnace.md and dry-electronics.md.

## Factory logistics

The central survey now visits three chests from (12,80,6). Both the metal and parts overflow double chests were emptied and reclaimed. The ME Drive is at (10,80,9). Its crafting terminal faces north and pattern terminal south one block up. Ore remains in the chest at (12,80,7). Bulk model matter is in the drawers on the east deck. The 256-bucket oxygen drum above the MV electrolyzer at (6,83,1) receives ruby oxygen automatically.

The dedicated sand mills and generator are north of the workshop, and the upper clay mill sends dust blocks into the water-fed reactor below. The wiremill and compressor have working AE2 processing interfaces. The polymer smelter at (6,83,6) sends its output directly to ME. Its two inputs still cost trips. The Shulker line feeds diamonds to the hardened dynamo. See polymer-inlet.md and shulker-polymer-feed.md. The north chemistry line has separate polyethylene, epoxy and PVC casters. The sugar cane Auto-Breaker is queued, with the Snad already planted.

## Next strategic review

The two-hour review is due about 33h50m played. Run `python3 scripts/strategy_review.py --evidence`, read review-questions.md and review-31h49m.md, publish the decisions, then use `--reviewed`. Compare other circuits and recipe yields, dedicated parallel machines and higher voltage, routes that recover useful by-products, and trips saved by replacing vanilla storage or crafting. Check for completed deliveries under real load.
