# Tending a furnace

Open the furnace in game and run `python3 scripts/furnace.py` to collect the finished output. Add `--feed ITEM --meta N --count N` to load a measured batch. Fuel has its own `--fuel ITEM --fuel-meta N --fuel-count N` options. The script clicks inventory slots and recognizes both the vanilla and More Furnaces screens. It also collects the output before loading more stock. The scripts were adapted from the archived harness test and use the currently open furnace.

At spawn camp, `python3 scripts/tend.py east` handles the full open, collect and close cycle. West and north are the other furnace names. All feed and fuel options work after the name. Each furnace holds a single recipe at a time.

The iron furnace is at (-165, 64, 204), selectable as iron. To spread one feed across empty furnaces, use `python3 scripts/smelt_batch.py ITEM@META COUNT west ore iron`. It divides the batch as evenly as possible and transfers coal for each share. An occupied input can stop the run partway, so inspect the individual station readouts before retrying. The vanilla furnace also stops if another recipe output would overfill its output stack. Collect redstone after ten ore because each gives six dust.
