# Lathe materials in flight

Three diamonds were mined; diamonds.md describes the actual ore pocket and safe landing. The two motors for the lathe and its piston are in the void parts store. The macerator's 32-ore batch is still producing iron while the player gathers glass and circuit supplies. The first 4 impure dust have turned into actual ingots; 16 more dust were split across the void east and north furnaces, and 6 iron ingots went into the void west furnace for wrought iron. Check live outputs before starting another batch.

For the lathe alone budget 20 wrought plates (11 hull, 3 piston, 4 gear, 2 circuits) and 6 wrought rods (4 gear, 2 piston), plus 7 tin cables after the motors are made. One diamond is for the cutting tip. The south-facing camp departure is via the new cake at (-176,64,204). The /spawn command returns to the camp bench from the deep mine. Keep the remaining diamonds for the pulsating dust branch.

The completed Basic Lathe stands at (4,81,5), facing west, with the macerator across the power cable. Quest 774 was claimed. Its first four iron ingots produced rods at two per ingot, taking 112 ticks at 16 EU/t per ingot. Use scripts/wiremill.py --machine lathe to collect or to load a measured batch.

The second lathe is installed on the east MV feeder at (14,82,0). Its readout showed 3,990 EU stored and automatic item output south. There is room for an interface at (14,82,1) beside the live fluix cable. Until that interface arrives, scripts/network_lathe.py can run batches of aluminium, stainless and steel rods in this machine while the original lathe handles other materials. The first reserve target is 24 aluminium rods for interface motors, pistons and arms, with eight ingots left for plates and hulls. The arm bench can now release each finished arm as soon as its parts are ready.

The native MV order for four aluminium rods was verified with 26 rods in ME before the order and 30 after. The lathe remains on the east MV feeder. An electrum rod pattern is queued for miner engine frames, alongside the steel and stainless rod recipes.
