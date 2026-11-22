# Oxygen for machine hulls

At 55h01m the MV assembler held the full item inputs for two MV hulls and one HV hull, but only 44 mB of polyethylene. Each hull takes 288 mB. The polymer reactor had 36,016 mB ethylene and zero oxygen. Its piped oxygen drum was empty. The ME fluid network held 140,300 mB oxygen.

A portable tank delivered 16,000 mB from ME. The first reaction consumed 144 mB ethylene and 1,000 mB oxygen. The assembler's tank rose from 44 to 260 mB after one cycle. This established that the existing reactor-to-assembler pipe still works. The permanent supply uses an oxygen-filtered ME Fluid Export Bus against the east face at (6,81,-6). Three glass cables connect it to the powered trunk at (8,83,-6). scripts/polyethylene_oxygen.py builds and configures it. Check the filter, active state and next hull delivery before crediting the permanent line.

The permanent ME Fluid Export Bus is fitted. From (8,80,-5) the player can see the reactor's east face past the Fluix cable. The bus was active with the oxygen filter selected. Between two reads, ME oxygen fell from 114,300 to 98,300 mB, the reactor oxygen rose from 7,000 to 22,000 mB and ethylene fell by 144 mB. The 1,000 mB difference went into another polyethylene reaction while the bus transferred the 16,000 mB. No player container moved oxygen between those readings.
