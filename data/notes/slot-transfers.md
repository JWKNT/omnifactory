# Moving an exact stack to a machine

A 64-item stack often has to supply 16 or 48 items for an order. scripts/slot_transfer.py now finds the shortest sequence of ordinary left and right inventory clicks using the source and one empty backpack slot. Both examples take six clicks. It touches the destination only once so a running machine can immediately consume the delivered items. The remainder returns to the original stack. With a full backpack it uses just the source.

The same helper serves the furnaces, blast bus, Inscriber, LV machines and partial chest withdrawals. A simulation checked all 4,160 combinations of stack size, requested count and spare-slot availability for stacks up to 64. Every transfer delivered the exact amount and restored the remainder with an empty cursor.

The terminal missed two manganese dust on a four-item withdrawal for the stainless mix. The survey still listed both and reopening the terminal delivered them. The picklist now reopens it once for a missing item that the survey actually saw in ME. Item lookups by registry ID also filter before limiting the list, so metal dusts near the bottom of a large network remain reachable. A separate JEI transfer left one tin cable position empty immediately after crafting the pump. The crafting helper now reports the occupied grid slots and retries once from a cleared ME grid.
