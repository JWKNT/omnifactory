# Methanol from titanium's carbon monoxide

ME held 22,000 mB carbon monoxide from titanium chemistry and 621,000 mB hydrogen at 55h25m. The MV reactor recipe with selector zero uses 1,000 mB monoxide and 4,000 mB hydrogen for 1,000 mB methanol, in 120 ticks at 96 EU/t. The current carbon-dust route needs the same hydrogen plus oxygen and takes 320 ticks. The previous titanium run demonstrated splitting monoxide back into carbon and oxygen in the electrolyzer. Diverting part of the gas to methanol skips both that split and the subsequent carbon-dust load.

JEI also shows hydrogen with carbon dioxide, sodium hydroxide with methyl acetate and water, and distillation from wood vinegar or fermented biomass. None of the four alternate feedstocks were in ME at the survey. Wood vinegar would be valuable in a second tower because it also yields acetic acid and acetone. The live refinery tower is already separating oil.

The reactor site is (15,82,2), directly east of the fourfold MV tap already powering the crystal extractor. It leaves a two-block walking aisle beneath it, and the next five blocks south are clear at y83 for a network branch. A location right under the existing chemical ME Fluid Interface would block two standing positions used to service that row. scripts/methanol_bay.py stages the reactor using two Microcircuits and a bronze rotor. Reserve one MV hull for the miner pattern interface. Commission selector zero and the gas feeds, measure methanol in storage, then switch the silicone and fuel consumers. The new reactor is still in procurement.

The HV assembler made the bronze rotor from four plates and one ring. The bench combined that rotor, one MV hull, two Microcircuits, two copper cables, one MV motor and two glass into the dedicated MV reactor. The east network branch will use the five overhead bundles at y84 above the fluid terminal and washer. Two filtered exports are for the gases and a top import is for the product. Commissioning still needs a measured rise in ME methanol.

The MV reactor is installed at (15,82,2) and has power from the west. It still needs selector zero and both gas feeds before it can produce methanol.

Five ME conduits now share the existing ethanol bundles from (10,84,2) through (14,84,2). The west two middle connectors were reachable from (12,84,3); the east connectors were reachable from the existing staircase at (16,80,3), (15,81,3) and (15,82,4). The selector-zero MV reactor has power. The Fluix cable branch and its three fluid buses still need installation. Verify a methanol increase at the network after setting both gas filters.

The overhead branch is in place. The return bus above the reactor reads active, and the north face now has an active fluid export bus. The shelf at (17,82,2) provided access to the top face. Set the north bus to carbon monoxide, fit and filter the south hydrogen export, and verify a rise in stored methanol.

The north export now supplies carbon monoxide and the south export supplies hydrogen. The top import returned 21,000 mB methanol to ME from a zero baseline. The next consumer is the silicone reactor at (13,83,4). A branch around its east neighbor can put a filtered export on its south face. scripts/silicone_methanol_inlet.py builds that connection and measures the receiving tank. Check the rocket-fuel reserve in both ME and the silicone reactor while they share the supply.

The east export branch reaches the silicone reactor. Its south-face fluid export bus is active and filtered to methanol. The consumer rose from zero to 20,000 mB after setting the filter. This is the methanol reactor's first verified delivery all the way to the cable-insulation consumer. Other stages still need hydrochloric acid, silicon and sulfur.
