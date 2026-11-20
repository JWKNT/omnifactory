# Resume at the void workshop

Run `python3 scripts/workshop_status.py` first. It prints recorder status, the live campaign PID and log, machine outputs, and the last full storage survey. A running wafer_campaign.py already controls the player. Follow its log. If it has exited, inspect the first error and the live machines, then run `python3 scripts/wafer_campaign.py` from the void workshop. Existing items, installed machines, claimed quests and request files in run/ determine where it resumes.

## Current order

The workshop is building the Advanced Electrolyzer for quest 71. Its MV Machine Hull is finished, five silver wires are available, and the two Primitive Processors are in production. Two ordinary furnaces took sixteen sand apiece. The MV cutter made nine wrought iron plates, the compressor made 28 rubber sheets and the crafting CPU delivered the first Basic Circuit for this order. Five nickels bought 32 bastnasite ore. Check the live stock before sending another batch through a furnace. The last chapter count was 171/644, including the full-stack tin bounty on page 650.

The first electrolyzer charge supplies fluorine for the Cryotheum line. Twelve snowballs and six ruby dust are ready. The chrome charge follows Cryotheum, then the first stainless steel can run in the independently powered blast furnace. Three fluorine charges can supply all the carbon for 72 SMD resistors. See thermal-elemental.md, first-stainless.md and smd-feed.md. One cobaltite ore can then supply the arsenic page; see cobaltite.md.

The MV assembler is at (7,82,1). The first three Electronic Processor Arrays paid for that machine and eight blank patterns. The ME network received 32 SMD diodes and 32 SMD transistors. The assembler holds 504 mB polyethylene, the solidifier has its plate mold back, and the pyrolyse oven holds two buckets of phenol. The eight CPU chips are ready for refined electronics. Follow processing-patterns.md for the separate compressor interface, pvc-boards.md for the coated plastic boards, and refined-circuits.md for the first array.

Both DML matter drawers receive automatic deliveries. The blast furnace has completed one aluminium ingot on its new feeder. The dedicated converter has 1,024 EU of internal storage. A Basic Flux Capacitor is on order, and eight galena ore went to a furnace for its lead. Read blast-feeder.md before changing the wiring. Keep the first stored deuterium bucket for Microversium.

## Where to look next

- **Plastics and patterns.** The north deck reaches z−11. The formed oven, brewery and distillery supplied phenol and ethanol. Follow first-plastic.md and plastics-bay.md for the acid, ethylene and solidifier orders. Read ae2-pattern-road.md for the crafting CPU and five patterns. Processing-patterns.md covers the separate compressor interface.
- **Power.** The blast furnace has two LV hatches. Its dedicated four-amp LV converter is installed, faces down and has delivered an aluminium ingot under workshop load. Read blast-feeder.md for the overhead route and refueling threshold. The MV cutter and engraver use the 128 V CEF at (7,81,2). See mv-wafers.md and annealed-copper.md.
- **Storage and travel.** The Drive at (10,80,9) has three 1k cells and a Crafting Terminal on the north face of the cable above. The bulk Extraterrestrial Matter drawer is at (15,80,10), facing south. See drawer-network.md. The parts overflow starts at (14,80,5), metal overflow at (14,80,8), and the bounty board is at (16,80,6). See workshop.md, storage-expansion.md, ae2-storage-costs.md and void-factory.md.
- **Simulation supplies.** Shulkers supply diamonds and Endermen supply pearls. The polymer smelter is installed at (5,80,7). The chamber automatically sends pristine matter to the fabricator. Spider eyes for the Ghast model are on the bulk shelf. See shulker-power.md, clay-mill.md, metal-models.md, hellish-models.md and pristine-transfer.md.
