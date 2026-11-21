# Epoxy sheets feed straight into the board reactor

The dedicated epoxy caster at (5,81,-4) shares its north face with the coater at (5,81,-5). I turned the caster's front west and its item output north, then enabled automatic item output. The plate mold stays in the caster. The coater receives sulfuric acid from the recovery still to its east and started this order with forty copper foil in slot zero.

Fourteen epoxy sheets from before the change went into slot one. After the caster ran again, the coater showed 37 foil and 17 sheets, with a board in the output. That accounts for six additional sheets arriving directly from the caster. The coater can now keep working while I am at the refinery.

scripts/epoxy_coater_feed.py handles the initial foil load. scripts/epoxy_board_return.py stages a drawer below the coater and extends the existing cyan item return through the bundle at (6,80,-5). Until that outlet passes its own test, finished boards can still be collected and stored through the terminal. The first eight boards of this order can fund another array while the remainder are coating. scripts/ev_component_stock.py requests a single array once its boards are present and can order its four Processor Assemblies separately.
