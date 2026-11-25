# Recovering diamond generation without powered ME storage

At 129h35m both diamond queues had emptied. The workshop interface returned no stored items. Both Shulker chambers still held two million RF and their loot fabricators were charged, but their polymer slots were empty. The Enderman chamber held 37 unused Pulsating Polymer Clay and had stopped on low power. The material required to restart generation was already on the factory floor.

The player moved 24 clay from the Enderman chamber, placing twelve in each Shulker chamber. Both started running. Their pristine matter reached the fabricators and the diamonds reached both dynamos. By 129h41m the workshop could again see 520 ME item entries. A later reading showed eleven queued diamonds west and fourteen east, both units producing above 8,000 RF/t. Two charcoal furnaces also started a 32-ore diamond lot during recovery.

The restart routine in scripts/lapidary_restart_stock.py checks the actual generator queues and chamber slots. It can balance fuel without the ME terminal. An empty inventory slot is enough for the transfer. At low queues the uraninite tender can run the spare electric furnace while an ME pattern is being commissioned. A 32-dust lot gives 32 Pulsating Dust, enough to make 128 simulation fuel with 32 clay blocks. Two running chambers need a sustained supply after a restart.

The electric furnace returned 32 Pulsating Dust. The regular polymer kiln subsequently took clay and dust, and the second Shulker chamber refilled to eleven fuel. The next coal-fired diamond lot also reached the dynamo queues. At the next reading the west held seventeen diamonds and the east sixteen. Monitor the repeating dust supply across several lots.
