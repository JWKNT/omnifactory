# Rubber for the two ZPM conveyors

The north Assembly Line’s south fluid hatch holds 1,008 mB of styrene-butadiene rubber from the LuV conveyors. Each ZPM conveyor needs 2,880 mB. Four vulcanization batches give 5,184 mB and bring the hatch above the 5,760 mB bill. They need 36 raw rubber dust and four sulfur dust.

At 128h27m the rubber reactor had 676 mB styrene, 28 mB butadiene and 14,000 mB oxygen. The oxygen recipe gives three raw dust for 108 mB butadiene and 36 mB styrene. The air recipe gives one. Twelve oxygen runs require 1,296 mB butadiene, 432 mB styrene and 24,000 mB oxygen. The existing styrene charge and stored oxygen cover those inputs. There was no loose rubber, chip, bar or sheet to remelt.

All three steam-cracked petroleum feeds give 50 mB butadiene per bucket. At the survey ME held 464 buckets of heavy fuel, 22.7 buckets of light fuel and 12 buckets of naphtha. Use heavy fuel. Steam-cracking takes two buckets of steam per bucket of fuel. Program 5 on the spare propene distillery extracts the butadiene. The distillation tower also yields that fraction and other products, but the working towers supply crude fractions and cryogenic gases. The small still was idle with empty tanks.

The new tender in scripts/zpm_conveyor_rubber.py uses the workshop steam outlet and MV reactor, delivers butadiene to the existing HV rubber reactor and sends finished rubber to the south hatch. The old LuV completion receipt remains valid. The reactor initially held seven buckets of lava for recovery. Verify the heavy-fuel reaction, distillery program and hatch balance as the new campaign runs.
