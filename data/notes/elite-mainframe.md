# Making room for Elite mainframes

The HV solder assembler at (10,83,3) had all nine pattern slots occupied. The dry carbon resistor recipe draws 6 EU/t and uses four fine copper wires and coal for twelve resistors. Its existing pattern now lives on the MV assembler interface at (8,82,1). This freed an HV slot without losing resistor autocrafting.

The HV interface now holds the verified Microprocessor Mainframe pattern. One craft uses two Microprocessor Arrays, four titanium frames, eight End Steel wires, twenty SMD resistors, sixteen capacitors, twelve transistors, eight diodes, eight RAM and 72 mB of soldering alloy. Two mainframes are needed. scripts/elite_mainframes.py checks the frame stock and places the order once the arrays are available. Encoding is complete. Production is waiting on titanium and the remaining arrays.
