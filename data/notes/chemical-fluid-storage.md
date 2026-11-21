# Chemical fluid storage at the void workshop

The water-fed LV chemical reactor at (6,81,4) accumulated 59 buckets of hydrogen while supplying sulfuric acid. Its tank holds 64. Carrying away one bucket at a time would make every future acid batch depend on a visit.

The planned ME Fluid Terminal uses a regular terminal, lapis plate and Logic Processor. A 1k Fluid Storage Component needs another Logic Processor, four certus quartz and four lapis. The empty housing uses four electrical steel plates and four fine red alloy wires. The drive at (10,80,9) has room. Check the chemistry-fluid-terminal ticket and the actual drive before ordering parts. The commissioning test in scripts/fluid_terminal.py is to deposit sixteen buckets of hydrogen and verify the change on the terminal. This establishes storage. A fluid import bus on the reactor would remove the next repeated trip once configured and tested.
