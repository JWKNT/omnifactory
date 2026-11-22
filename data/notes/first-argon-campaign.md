# Use one tower for the first argon

Build one cryogenic tower for the first glowstone-doped boule. The initial plan allowed space for a second tower. The pack’s actual cycle times make it worth switching feeds on the first tower before funding another set of 84 steel casings and 52 frost-proof casings.

One liquid-air run takes 125 ticks at 500 EU/t and yields one bucket of noble gases. Fifty-three runs take 331 seconds of tower time and consume 2,809 buckets of liquid air. The noble-gas run takes another 50 seconds at 750 EU/t and makes 35 buckets of argon. At the west freezer’s measured 143 ticks per four buckets, the freezer needs about 84 minutes for that charge. The first tower has time for both jobs.

Claim page 171 with its required HV energy hatch. For the noble-gas run, fit an EV energy input hatch and power it from an EV source. The ordinary hatch recipe uses an EV hull and an aluminium cable. The structure definition accepts fluid hatches and energy hatches in frost-proof casing positions. Keep the liquid-air drum isolated while charging the noble gases, or fit a second input. Drain the first stage’s output hatches before switching gases.

The first campaign also produces 2,120 buckets of nitrogen, 583 of oxygen and 53 of carbon dioxide. An iron drum holds 256 buckets. Give surplus nitrogen and oxygen a genuine overflow path so the first few runs do not stop the plant. A filtered low-priority fluid conduit to a fluid trash can beyond the useful gas reservoir is one option. Keep the noble gas on a dedicated path. The output storage, EV feed and tower remain to be built.

The cycle definitions are in `instance/scripts/Multiblocks.zs`. Check the formed controller, gas routing and actual output volumes at commissioning. Revisit a second tower when the freezer fleet can keep the first busy.
