# Tending a furnace

Open the furnace in game and run `python3 scripts/furnace.py` to collect the finished output. Add `--feed ITEM --meta N --count N` to load a measured batch. Fuel has its own `--fuel ITEM --fuel-meta N --fuel-count N` options. The script clicks inventory slots and recognizes both the vanilla and More Furnaces screens. It also collects the output before loading more stock. The scripts were adapted from the archived harness test and use the currently open furnace.
