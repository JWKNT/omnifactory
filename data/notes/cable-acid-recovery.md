# Reclaim the acid that holds up EV cable

The MV cable wrapper had 12 mB of silicone rubber. One aluminium wire needs 48 mB. Its reactor already held 64,000 mB methanol, but ME held only 1,000 mB hydrochloric acid. Adding methanol or another wiremill would leave the same shortage. ME also held 36,000 mB diluted hydrochloric acid from other chemistry, with another 4,000 in the silicone reactor's outlet.

JEI gives two distillation options. The idle Basic Distillery at (6,81,-5) takes 2,000 mB dilute acid and returns 1,000 mB acid on circuit 1 in 1,200 ticks at 16 EU/t. The tower can do the same with a water by-product in 600 ticks at 64 EU/t. Keep the tower on refinery work for now. One 16-bucket tank of dilute acid will fund eight buckets of acid. The silicone reactor needs six for a nine-dust batch.

scripts/cable_acid_recovery.py checks the still, loads the selector and recovers acid into ME. Check run/cable-acid-recovered for a measured stock increase. The silicone reactor already receives methanol through its south bus. Adding acid to that bus is the next step once the reserve returns reliably.

The first collection raised ME hydrochloric acid from 1,000 to 5,000 mB. The silicone reactor consumed the recovered acid. Nine polymer dust and one sulfur supplied 1,296 mB rubber. The cable wrapper now holds 1,308 mB, enough insulation for 27 single aluminium wires at 48 mB each.

The wrapper finished all twelve bare aluminium wires and retained 732 mB rubber. All four energetic conduits, both quad wires, the chest and the Nano Processor Assembly for the east converter are on hand. The EV hull is the last ingredient. The MV assembler has 44,540 mB polyethylene and the EV hull pattern is visible in ME.
