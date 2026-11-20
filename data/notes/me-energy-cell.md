# A buffer for the ME Drive

Quest 230 describes a risk when the Drive serves a large item request: an instantaneous draw can exceed the network's own small buffer. Its Energy Cell pays one nickel. No quest supplies the cell itself. JEI has one bench recipe, four Certus crystals, four Fluix Dust and one Quartz Glass. Charged or pure Certus also count. The macerator makes the dust from spare Fluix Crystals. The shelf held seven normal Fluix and five normal Certus when this order was added.

The surveyed socket at (8,82,9) is directly above the Energy Acceptor, beside the RF conduit and west of the future crafting CPU. It preserves access beneath the acceptor for charging quartz. The order is queued. scripts/me_energy_cell.py claims the quest while holding the cell, places it, and checks the tile's actual stored AE before clearing the request.
