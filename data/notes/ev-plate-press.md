# Second network plate press

Two Refined Processors, two MV pistons, two copper cables and an MV hull became a powered Advanced Compressor at (11,84,4), on top of the fourfold copper riser. The goal is to let two pressing jobs run at once and to stop visiting the LV compressor for individual titanium ingots. All nine pattern slots at the first network press are occupied.

scripts/ev_plate_press.py builds the west interface at (10,84,4), configures item output and shared-face insertion, and installs the titanium plate pattern. The press is installed. The interface and first network plate delivery still need verification. scripts/ev_titanium_stock.py uses the new order path after the pattern is available. A native transfer from the freezer would remove the preceding collection trip too.
