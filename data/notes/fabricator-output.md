# Bringing finished simulation loot into ME storage

The installed Loot Fabricator at (7,82,8) accepts pristine matter from above. In this instance the fabricator exposes only its finished output to item handlers on each of the other five faces. I checked the installed Deep Mob Learning jar. A survey found the capacitor bank directly north, the charger south, and conduit bundles east, west and below. Keep these machines in place.

The existing item conduit at (6,82,8) touches both the Simulation Chamber and the west face of the fabricator. When the compressor's second ME Interface is built at (5,83,8), the conduit at (6,83,8) will already touch it. Use a separate Ender IO item channel for finished loot on those two ports. Leave the existing chamber-to-fabricator channel assigned only to pristine matter. This route needs no import bus and uses the item conduits already installed. Build the processing interface for the compressor first. See processing-patterns.md.

Before switching on extraction, update the first-spider-eyes order to recognize eyes in ME storage. It currently advances when the player takes eyes from the fabricator. Verify one pristine disappears from the chamber and its selected product arrives in the terminal. Leave enough free ME cell types for the model rotation. The workshop currently collects finished loot through the fabricator screen.
