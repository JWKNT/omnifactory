# Construction tools in the basic satchel

The Basic Satchel side quest (488) paid one OmniNickel. Three leather, two tin and four string bought nine slots. The saw, soft hammer, file, crowbar, mortar and knife share the bag, freeing five net inventory slots. Keep the bag on the player.

harness/tool_satchel.py opens the bag and retrieves tools through its inventory screen. equip, picklist and the workshop stock count now recognise the bag's tools. I tested a wrought iron crowbar by equipping it from the bag and stowing it again. This avoids duplicate tools and trips to the terminal when the base needs a cover moved.
