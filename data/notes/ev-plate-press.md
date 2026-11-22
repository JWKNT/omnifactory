# Second network plate press

Two Refined Processors, two MV pistons, two copper cables and an MV hull became a powered Advanced Compressor at (11,84,4), on top of the fourfold copper riser. The goal is to let two pressing jobs run at once and to stop visiting the LV compressor for individual titanium ingots. All nine pattern slots at the first network press are occupied.

scripts/ev_plate_press.py builds the west interface at (10,84,4), configures item output and shared-face insertion, and installs the titanium plate pattern. The press is installed. The interface and first network plate delivery still need verification. scripts/ev_titanium_stock.py uses the new order path after the pattern is available. A native transfer from the freezer would remove the preceding collection trip too.

The first press job used six ordinary steel plates and returned three Steel Heavy Plating. Quest 210 paid an OmniNickel. It opens the Suit Workstation, Launch Pad and Rocket Assembly Machine, and rocket parts quests. This is a real MV-only recipe at 100 EU/t. The titanium plate pattern still needs the interface west of the press.

The west ME Interface is now installed at (10,84,4), with a titanium plate processing pattern. The press faces its output west, allows items in through that face and exports finished parts. The EV workshop requests plates there when it has a free titanium ingot after funding the current rod order.

The MV press interface at (10,84,4) now holds native processing patterns for Red Alloy Plate and Iron Plate. The stock routine targets twelve red alloy and eight iron plates, keeping 24 iron ingots for other work.
