# Feed the west blast furnace from ME

The west LV input bus at (0,80,6) has four slots, and the west face is the established manual access. Its northern neighbor at (0,80,5) is ordinary cobblestone. A full ME Interface can replace that block and preserve the footprint of the stair above it. The remaining neighbors are a fluid hatch, controller, coil and the deck. Keep the west face open for commissioning and any later program changes.

The nearest verified fluix cable is at (3,82,5). Place one glass cable immediately west at (2,82,5). Add ME conduits to the existing fluid bundles at (1,82,5), (1,81,5) and (1,80,5). All three bundle inspections found no ME conduit yet. The last bundle would directly power the interface at (0,80,5). Face it south into the bus. Preserve the oxygen pipe in all three bundles and test oxygen still reaches the hatch after adding the ME connection.

Commission the [automatic cold return](west-annealing-return.md) first. For annealing, leave program 1 in one slot of the input bus. The pattern consumes one copper ingot and returns one annealed copper ingot. The oxygen hatch supplies 1,000 mB per craft. One motor needs 32 copper, and the controller, shells and arms together need 47 motors. The neodymium dust recipe uses no circuit or oxygen, so it can share the furnace. Update the old batch routine that recovers its circuit on idle, and test a native order while another crafting CPU makes a winding from its result.

At 81h15m the fluix cable was in place and all three vertical bundle positions reported installed ME conduits. The cold-metal return is working. The north stair support is still cobblestone. Stock the full interface before removing that support. The freezer has returned the four titanium for plates, bringing plate stock to five for the converter.

At 82h55m the new full ME interface occupied (0,80,5), reported network power and faced south into the furnace. It holds a copper-only pattern with a one-ingot output. The input bus still holds program 1. AE2 accepted an order for four annealed copper and stored stock rose from 71 to 76, including the pattern sample returned to storage. The observed west-furnace recipe takes 26 ticks at 1,920 EU/t. The western floor route goes from (9,80,11) across to (−3,80,11), then (−2,80,7) and (−2,80,4) to the exposed north face.

At 95h32m the 4,500 K furnace's input bus held seventeen aluminium dust and four stainless dust alongside the last HSS-G charge. Live recipes require only 1,500 K for aluminium and 1,700 K for stainless. Move their existing processing patterns to the 1,800 K west furnace during a gap in ME orders for those metals. The existing west return already carries cooled ingots to storage. HSS-G takes 1,125 ticks per ingot on the fourth furnace, which also handles the Lumium hull and the Signalum circuit wires.

At 95h49m both original cards had moved from the fourth furnace to the west interface. During an ME order for seventeen aluminium plates, the west controller was making aluminium and the fourth controller was making hot HSS-G at the same time. The stainless card is installed. Its first delivery on this route still needs observation.

The west controller subsequently ran stainless. Five ingots supplied five stainless plates. Both transferred patterns have now produced metal.

A later manual furnace batch removed program one. A native wire order left sixteen copper ingots beside sixteen buckets of oxygen in an idle furnace. The winding tender now restores the missing circuit even with the copper already in the bus. The next observed cycle took 26 ticks at 1,920 EU/t and the resulting wire fed motor six.
