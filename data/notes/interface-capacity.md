# Space for parallel AE2 recipes

The MV polyethylene assembler's interface filled its nine visible pattern slots. The terminal still contained the EV hull pattern as a stored item. I moved the eight-output ME conduit pattern to the EV assembler on the miner deck, where its fluid-free recipe can run with solder still in the tank. I retrieved the encoded hull recipe, installed it on the polyethylene assembler, and checked that both products appeared as craftable. The expensive metal saved on each EV hull is one titanium plate.

The EV interface then had six free slots. JEI also lists the Pattern Expansion Card (AE2 material 58), made from one Advanced Card and one ME Interface. The tooltip lists up to three per interface. Both the network alloy smelter and wiremill already use all nine ordinary slots. Consider a card on a machine with room in its production queue, and a second machine when orders actually compete. The extra interface ingredient matters while multiple new bays are awaiting interfaces.

Regular item conduit has the same eight-versus-four assembler yield as ME conduit in this instance. Six binder and three single pulsating iron wires yield eight. scripts/item_conduit_stock.py targets 32 below a low mark of 24. Check run/ev-item-conduit-delivery for the first native delivery. The wiremill and pulsating alloy still need input batches.

The EV assembler now advertises both conduit types. Four pulsating iron ingots went into the wiremill and all eight wire were visible in its output. The remaining check is an actual item conduit order from the EV interface.

The EV assembler completed an AE order of 24 item conduits. The order started with zero in ME, and all 24 appeared in storage. The three batches used nine wire and eighteen binder. Construction helpers now draw on this shared stock and request the EV recipe when it runs low.
