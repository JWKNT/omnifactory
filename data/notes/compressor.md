# Powered plate production

LV Pistons (145), LV Compressor (489) and Bounties For Omnicoins! (556) are claimed. The compressor at (-169, 66, 199) sits immediately west of the wiremill. Both machines face south. One wrought iron ingot makes one plate in 100 ticks at 10 EU/t. The first batch was observed running at 998 EU in the machine buffer. Select the compressor with `python3 scripts/wiremill.py --machine compressor` to collect finished plates, and optionally give an input ID@meta and count to load the next batch.

The wiremill has a dedicated output chest immediately east at (-167, 66, 199), accessed by scripts/camp.py wireout. The wrench set the machine output to east and its auto-output button sends finished products straight to the chest. scripts/stash.py --take 'gregtech:cable@71' retrieves the tin wire from that chest. This allows the next input material to start even if the previous recipe's last output is a different item.

The two pistons for the compressor used the wrought iron recipe: two full gears, four more rods, six plates, two motors and four tin cables. Keep the Bounty Board reward for camp. The alloy smelter is next; its four 4x copper wires take 16 plain copper wires, and its two new basic circuits need six red alloy cables between them. Use the wiremill to turn three red alloy ingots into the six wires.
