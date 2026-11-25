# Start here · Astra in progress

This session is playing Astra. At **141h32m**, 439 of 644 chapter quests are complete, including all 51 Genesis quests. The database count is 441 of 822. One workshop campaign is acting, and recording is on. The last strategic review was at 141h08m. The next is due at **143h08m**.

## Taking over

Read these in order.

1. [Operating the void workshop](operator-67h46m.md) covers takeover, game controls and the clean stop. Check the process group in `run/iv-campaign.pgid` and the actual process list before touching the game. Follow the user's takeover procedure if a previous session left an actor.
2. [The 141h08m strategic review](review-141h08m.md) explains the new priorities after finishing the ZPM assembler.
3. [The roof power plan](zpm-assembler-power.md) gives positions, voltage, bill and converter orientations for the assembler and egg reactor.
4. [Wetware board capacity](wetware-board-capacity.md), [the ASoC lens](draconium-lens-autoclave.md) and [Naquadah Alloy wire](wetware-naquadah-alloy.md) cover the three branches for the first wetware processors.
5. [The physical restart bench](lapidary-offline-bench.md) and [the shared diamond feed](shared-lapidary-fuel.md) explain how to recover power if the simulators or ME go dark.

The acting campaign is `scripts/tower_shift.py --assembly`. The CPU sampler only observes. `PYTHONPATH=harness python3 scripts/crystal_stage_status.py` reads roof hardware, exact missing parts, clean medium and CPU orders without moving the player. Use `scripts/book_standing.py` with the same environment for the two quest totals. A terminal survey can move the player. For independent observation use `workshop_me.installed_stock(read_only=True)`, the inventory and `crafting_status.jobs()`. During an active session, `run/refresh-assembly-shift` requests a reload by the same actor between stations.

## Current work

The ZPM assembler is in storage. The second arm finished at 141h01m. Both arms, both conveyors, both Crystal Processor Mainframes, the ZPM hull and two Naquadah cables went into the machine. Page 533 paid an OmniNickel. Keep the north Assembly Line's existing LuV and IV supplies available for its later recipes. The [motion notes](zpm-motion-power.md) and [bastnasite circuit](bastnasite-magnets.md) record the repeatable routes.

The next three LuV hulls are for a separate four-amp CEF, its ZPM step-up transformer and the stem-cell reactor. Together these builds need 24 Lumium Plates and ten single Vanadium-Gallium Cables. The converter also needs two quadruple Signalum Wires. The reactor still needs its Chrome Rotor, LuV motor and second Energy Flow Circuit. Four Chrome Plates are in stock, and four Chrome Rings finished in the MV extruder. The first new Lumium Plate and six wrapped Vanadium-Gallium Cables have arrived. The [roof Lumium supply](roof-lumium-supply.md) records the up-front alloy bill and the shared glowstone reactor. The separately charged reactor bank needs 150 million EU before the egg goes in. Verify the transformer ratio and the ZPM assembler's stored EU after placement.

All 32 Dragon Eggs reached storage from the [Tier Six flight](dragon-egg-flight.md). Sixteen buckets of sterilized growth medium reached ME, page 537 paid, and the shared mixer returned its last distilled water. At 141h32m fifteen buckets were in ME and one filled bucket was in the player inventory. The first egg needs ten buckets. The first board needs four. The Basic Fluid Heater at (4,82,-6) uses program one. Stand on the west step at (3,81,-6). The [pasture](wetware-camp-supplies.md) has a working wheat feeder and retains its two breeding adults. The grove path now approaches the adjacent tree from the north.

For the lens, synthesize Dragon's Breath from Pyrotheum, Nitro-Diesel and bottles, make Draconium Dust, then run the sixth furnace and east freezer. Use nine cold ingots for the lens block. The shared LV extractor returned its last 3,750 mB of molten Cryotheum to ME. The [power and argon work at the sixth furnace](wetware-naquadah-alloy.md) is still an upgrade plan. The controller currently has two HV inputs. The heat budget now reads the installed controller's overclock for each recipe.

In parallel, the small projector is provisioning a [Tier One gemstone flight](large-projector-diamond-budget.md) for 64 exquisite diamonds. The Gemstone Sensor is ready. The 4k fluid component paid on page 122, its cell is installed in the third drive, and two 1k components have been observed toward the [16k component](chemical-fluid-storage.md). The [silicone feed](silicone-silicon-inlet.md) returned PDMS dust and supplied the final arm wrap. The [new solder outlet](solder-network-source.md) is being provisioned. Verify a melt reaches the roof before relying on it.

Earlier machine positions and receipts are in the [historical handoff](handoff-history-through-141h08m.md). The [sixth furnace deck](sixth-furnace-deck.md), [east metal freezer](east-metal-freezer.md), [SoC engraver](soc-engraver.md), [tungsten cargo](tungsten-from-cargo.md) and [breeder coproducts](breeder-coproducts.md) have individual notes.
