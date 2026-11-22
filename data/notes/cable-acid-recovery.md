# Reclaim the acid that holds up EV cable

The MV cable wrapper had 12 mB of silicone rubber. One aluminium wire needs 48 mB. Its reactor already held 64,000 mB methanol, but ME held only 1,000 mB hydrochloric acid. Adding methanol or another wiremill would leave the same shortage. ME also held 36,000 mB diluted hydrochloric acid from other chemistry, with another 4,000 in the silicone reactor's outlet.

JEI gives two distillation options. The idle Basic Distillery at (6,81,-5) takes 2,000 mB dilute acid and returns 1,000 mB acid on circuit 1 in 1,200 ticks at 16 EU/t. The tower can do the same with a water by-product in 600 ticks at 64 EU/t. Keep the tower on refinery work for now. One 16-bucket tank of dilute acid will fund eight buckets of acid. The silicone reactor needs six for a nine-dust batch.

scripts/cable_acid_recovery.py checks the still, loads the selector and recovers acid into ME. Check run/cable-acid-recovered for a measured stock increase. The silicone reactor already receives methanol through its south bus. Adding acid to that bus is the next step once the reserve returns reliably.
