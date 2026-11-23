# An assembler for machine casings

The foil mill now has its own active ME interface, but the next interfaces and pattern expansion cards keep bringing the player back to craft MV casings. The last interface proposal specifically lacked a casing and Printed Silicon. The HV ore mill and MV wiremill each have one expansion card. The furnace interface still has none. Each spare interface can become another nine pattern slots.

The planned casing assembler at (5,83,6) has an existing conductive iron power cable directly below it and an ME cable beside the proposed top interface. The aluminum, stainless, titanium and tungstensteel casings all use eight plates and a retained program 8 at 16 EU/t. An LV assembler is enough for all four. The LuV casing also uses 16 EU/t, with eight Lumium plates and no selector in its recipe. Encode that as a plate-only processing card and verify it on a later order. Keep the first eight Lumium plates for the new LuV hull. A higher-tier assembler would compete for motion parts without expanding the recipe set here.

The operating script is scripts/casing_assembler.py. It prepares the machine, selector, item return and processing cards. The site was still empty at 97h46m. Keep it in the robot-arm production round while the fourth furnace and the IV circuit assembler run.
