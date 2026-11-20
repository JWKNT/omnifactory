# An independent supply for the blast furnace

The fourth aluminium charge exposed the limit of the workshop circuit. The furnace draws 120 EU/t through two LV hatches. A full four-amp LV converter can deliver 128 EU/t, so other workshop machines can slow the blast even when that converter has stored energy.

The surveyed route starts at the Energetic Alloy RF conduit at (8,82,7). Place a Basic Capacitor Bank on its west face at (7,82,7), then run four Conductive Iron Energy Conduits west to (3,82,7). These RF conduit tiers do not connect directly in this instance. The bank joins the two networks and handles 1,000 RF/t. The cheaper conduit handles 512 RF/t, sufficient for four LV amps. A direct energetic conduit extension would also work but costs more energetic alloy. The bank earns quest 33 and puts the four spare Basic RF Capacitors to work.

Use a new four-amp LV CEF at (3,81,7), facing down into the existing lossless fourfold cable to both hatches. The existing workshop trunk stays on its original converter. Build the CEF, bank and conduit first. The order uses eight low-tier conduits including the four inside the CEF. The assembler yields four per operation, compared with three at the bench.

The feeder was surveyed and queued while the 40-ingot batch was running. scripts/ebf_feeder.py checks the controller and input bus before it removes the old upper cable. It verifies the replacement converter faces down before adding its RF connection. Commissioning requires charge at the new converter and a subsequent blast under workshop load.
