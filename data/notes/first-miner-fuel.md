# First Micro Miner fuel order

The basic ore mission takes one tier-one ship, one Quantum Flux, one chest and 8,000 mB Rocket Fuel in the Small Microverse Projector. It runs at 500 EU/t for 500 ticks. Among its guaranteed outputs are two stacks of rutile, two stacks of galena, one stack of dense iron ore and one stack of nickel ore. Clear enough output slots before starting it. Page 217 pays one OmniDollar for the ship. Pages 216, 220 and 395 lead to it.

JEI gives 6,000 mB Rocket Fuel per mixer batch using dinitrogen tetroxide. Two of these batches fund the whole mission with 4,000 mB left. The oxygen alternative yields 3,000 mB and would cost a third batch of the more involved intermediate. The refinery has already banked ammonia and produces nitrogen dioxide locally. Pages 222 and 223 each pay a nickel for a bucket of their intermediate, then 221 pays a nickel and 220 pays two quarters. Collect the quest samples before feeding them onward.

The old MV reactor at (8,81,1) finished its Luminessence campaign and can now supply the first fuel intermediates. scripts/projector_fuel.py begins page 222 there. The first 1,000 mB methanol is in its input. Leave 2,000 mB at the silicone reactor for cable making. For regular miner missions budget separate continuously stocked reactors and a mixer. The first ore mission needs 4,000 mB methanol, 4,000 mB ammonia and 2,000 mB hypochlorous acid for the two fuel-intermediate batches. The dinitrogen tetroxide can use another 4,000 mB of the refinery's nitrogen dioxide.

Page 219 also consumes a Pulsating Crystal per Travel Anchor in crafting. Two anchors plus the first mining mission justify at least three crystals from the alloy autoclave. See quantum-flux.md.

The first bucket of Dimethylamine is made and page 222 paid its nickel. This left 2,000 mB water at the old MV reactor. scripts/miner_fuel_chloramine.py uses that by-product for the next two charges of the quest-book acid recipe, and returns the resulting hydrochloric acid to the silicone reactor. The Dimethylamine bucket is reserved for page 221's next recipe. A new fourth 1k ME fluid cell is installed in the workshop drive.

Page 223 paid for the first Chloramine bucket. The reactor recycled its water and the silicone line accepted the acid coproduct. Reserve the quest buckets for 221. The workshop mixer has two fluid inputs and is compatible with the six-bucket fuel recipe. The refinery mixer already contains diesel feedstocks. The first fuel batch can use the workshop mixer while we lay out a separate fuel line for repeat missions.

Page 221 paid. The by-product water went into the cutting saw, and ME received the spare intermediate before the two quest samples went into the reactor. The first fuel intermediate for the mixer is now in a bucket. For page 220 use program two on the retired MV reactor with the stored nitrogen dioxide, then deliver the result to the workshop mixer.

Page 220 paid its two quarters. The first mixer batch yielded exactly 6,000 mB and all 6,000 reached ME, including the quest sample. The second batch has started using the spare intermediate previously returned to storage. scripts/miner_launch_reserve.py tops up the launch reserve, leaving at least two buckets of methanol for cable insulation.
