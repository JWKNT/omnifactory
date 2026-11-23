# Power and fuel for the gemstone flight

The tier-three gemstone recipe needs 2,000 EU/t for 700 ticks, as well as 20,000 mB of rocket fuel. At 100h43m the small projector had an HV energy hatch accepting two 512 V packets per tick. That served the earlier 1,000 EU/t ore flight. The existing MV fluid hatch holds 32,000 mB, enough for the gem flight.

Finish the repeat lunar flight first. Then keep the existing four-amp HV CEF, move it one block east to (22,80,−13), and extend its RF conduit one block overhead. An EV transformer at its old position can combine four 512 V packets into one 2,048 V packet. Its input faces east. Fit an EV energy hatch in the old HV socket at (20,80,−13) before turning the transformer up. Keep the recovered HV hatch for another machine. The two new fittings cost an HV hull and an EV hull plus two small coils, four gold cables and two aluminium cables. A replacement EV CEF alone needs an EV hull, End Steel conduits and a circuit.

Both new sockets were clear above the existing floor. The present converter held no capacitors. scripts/gemstone_projector_power.py stages both fittings before the swap, verifies the actual transformed voltage and the reformed projector, then releases the flight. The gemstone mission draws 1.4 million EU in total. Verify dynamo reserves and observe the first actual flight under load.

The EV assembler's HV converter already demonstrates the needed buffer. One Basic Flux Capacitor gives it 2,516,384 EU of capacity including the converter itself. Fit the same capacitor to the moved projector converter and require 1,450,000 EU on hand before launch. The entire 700-tick mission then has a local power budget.
