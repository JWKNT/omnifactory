# Gallium from the lakeside cauldron

The blast furnace unlocked the electrolyzer route. Quest 727 explains that a centrifuge can recover gallium during the cleaning step; the cauldron can clean the same dust immediately. Three omninickels bought 32 sphalerite ore. The void LV macerator gave twelve crushed ore from the first three, and the crafting hammer turned those into twelve impure dust. After the first order, 29 ore remained for the assembler and later zinc demand.

The first cauldron wash was at (-207,64,197), immediately south of the lakeside workbench. scripts/lake_wash.py 3182 washed the full twelve-dust stack for one water level and recovered all twelve clean dust. Stand centered on the cauldron, look down, and give the server twelve ticks to receive the new aim before dropping. An immediate drop after turning landed outside the cauldron. The bucket can be filled from the lake whenever needed.

Three clean sphalerite dust in the LV electrolyzer take 200 ticks at 30 EU/t and yield one zinc dust, two small zinc piles, one sulfur dust and a small gallium pile. Four small gallium piles make one full dust, which can be split into nine tiny piles for quest 78 and diodes. The hand-crafted primitive processor requires four basic circuits, a diode, two red alloy cables and two wrought plates. The first assembler requires two such processors, two LV robot arms, two conveyors, one hull and two tin cables. scripts/lv_order.py now expands this order and --stage fetches actual ingredients from a fresh stores.py listing and carried inventory.

All twelve cleaned sphalerite dust ran through the electrolyzer. Its four small gallium piles were combined to full dust, then split into nine tiny piles, completing quest 78. Empty all four previous clay products before expecting a sphalerite batch to start; the six output slots cannot accommodate both product sets together.

Six more sphalerite ore gave 24 crushed ore and then 24 impure dust. All 24 washed together at the lake. The cauldron has since moved to (13,81,12) beside the void workshop pool. scripts/lake_wash.py selects the wash site by dimension. Eight electrolyzer batches from this trip can yield eighteen tiny gallium piles for diodes.

The electrolyzer finished all eight batches. Two collections delivered four small gallium piles apiece to workshop storage. It is free for glass-to-quartz again.

For the three mainframe transistor plates, use the centrifuge now that the workshop has one. JEI gives three tiny gallium piles and one clean sphalerite dust per impure dust, in 192 ticks at 24 EU/t. Three stored ore give twelve crushed ore. Hammer nine, centrifuge the nine impure dust and combine the 27 tiny piles into three full gallium dust. Keep the nine clean sphalerite for a later zinc and sulfur order. scripts/mainframe_gallium.py handles the order during other machine work.
