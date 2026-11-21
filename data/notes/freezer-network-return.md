# Bringing cold metal and blast salt back to ME

The red conduit overhead already carries hot ingots from the north furnace to the freezer. There is a separate unoccupied channel on the same conduit. The north network furnace's ME interface is just two new conduit pieces from the overhead line. The west face of the freezer output bus is another seven, across the freezer roof at y83 and down its west side. I chose brown for the return. The freezer bus can return any cooled metal this way. Its source is at (-6,80,8), facing east. The network sink is at (10,84,-5), facing down.

The next return is the north furnace's magnesium chloride. Its upper face already has an ingotHot* extraction filter. JEI identifies the salt as dustMagnesiumChloride. Fit a second ore-dictionary cover on the south face of the bus, check its extraction rule, then connect that face to brown. Eighteen zinc foil were in stock and one cover needs eight plus an emerald plate. scripts/freezer_network_return.py and scripts/magnesium_return.py handle installation. Verify cold titanium and salt separately in storage after the next blast.

All nine conduit pieces are installed. The east-facing source at the cold bus is configured to extract continuously and the downward port at the north furnace interface receives on brown. The electrolyzer received a final 36-dust manual batch of magnesium chloride. Two emerald ore were smelted and the compressor began the plates for the salt filter.

The first titanium ingot appeared in the west output bus while ME held zero. The bus then emptied and ME held one. Both endpoints reported the same conduit network and brown channel. No player collection took place. The furnace-to-freezer-to-storage route now works end to end.

The south face was originally the front of the north output bus, where GregTech rejects covers. A wrench turned its front east toward a casing, leaving the hot-ingot filter above intact. A screwdriver check confirmed the new south filter is an ore dictionary extraction whitelist for dustMagnesiumChloride. The first of its two linking conduits is installed. The LV assembler made the next eight conduits from six binder and three pulsating wires.
