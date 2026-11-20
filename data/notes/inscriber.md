# From the terminal to a crafting terminal

The basic terminal and a 1k cell can work before inscription. Quest 111's crafting terminal consumes the basic terminal, a crafting table and a Calculation Processor. That processor uses a printed calculation circuit, printed silicon and a tier-one circuit in the inscriber. The inscriber itself consumes two MV electric pistons, one MV hull, five dark steel plates and a fluix crystal.

Quest 103 pays a quarter for the four distinct presses. The book suggests finding them in meteors with a Meteor Compass or engraving them. The JEI calculation press recipe engraves a block of aluminium with a Blue Topaz Lens. Check meteor loot during later exploration before spending aluminium on all four. The advanced inscriber eventually accepts stacks and can lock its press in place.

Quest 816's optional ME Controller has no item payout. Channels are disabled in this pack. Keep the acceptor powering the original network during the ME Chest and cell orders. After storage is operational, the controller can replace the acceptor to reduce network power consumption.

The workshop holds two fluix crystals. A free inscriber socket at (11,81,9) would touch the east face of the terminal cable. The planned four presses require 36 ingots. While the other machines build, the reserve job uses spare gray terracotta and electrolyzer time for 24 more aluminium dust, leaving one for cobalt brass. The first 35 clay dust went into the electrolyzer, followed by 49 more. The first batch also yielded silicon for boules.

Once the lens quest has paid, scripts/inscription_plates.py can engrave presses while the cutter is under construction. The cutter keeps nine aluminium ingots for a hull and the laser gets only one block at a time. Blue Topaz makes the Calculation Press, Ruby makes Engineering, Emerald makes Logic, and Diamond makes Silicon. All four presses must be in inventory together for quest 103 and its quarter. This job is queued and has not yet engraved a press.

The first 24 reserve ingots came out of the EBF and brought the store to 44 aluminium. The four press blocks take 36, before the cutter hull, cutter parts and inscriber hull. The second reserve therefore targets 32 more ingots. At issue time the stores held 61 clay dust and 31 gray terracotta. Keep one aluminium dust for cobalt brass and sixteen terracotta for the simulation line.

The east terminal-cable socket and the three processor recipes are recorded in scripts/inscriber_station.py and scripts/inscriber_job.py. The planned batch is two Engineering, two Logic and one Calculation Processor. JEI accepts the existing Basic Circuit for all three. The respective printed circuits take diamond, gold and certus plates; each final processor also takes one printed silicon. The inscriber job reads the open GUI's real slot numbers and uses ordinary slot clicks. The station still awaits the presses and construction.

The first two presses are in the parts stores. The Calculation Press came from the Blue Topaz Lens and the Engineering Press from the Ruby Lens. Both lenses were recovered. The updated eight-processor target and its downstream uses are listed in ae2-pattern-road.md. scripts/inscriber_station.py credits both finished processors and partially printed components when resuming.
