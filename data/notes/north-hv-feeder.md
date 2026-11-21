# Restoring the north furnace's four-amp supply

The north Kanthal furnace had a valid titanium recipe stuck at tick 1 of 800. Its HV hatch held 368 EU. The main RF bank was full at one million RF, the four-amp HV CEF had 2,516,384 EU available, and the dynamo had 64 diamonds queued. All six single gold cables between the chemistry trunk and the north hatch were gone. I did not see them disappear.

The existing two double gold segments from the CEF through (11,82,2) were intact. The stock of three singles, one double and the seven singles just made with silicone paid for six double cables. They now run through (11,82,1), (11,83,1), (11,84,1), (11,84,0), (11,84,-1) and (11,84,-2). The last one supplies the upward-facing hatch at (11,83,-2). Each new segment supports four amps at 512 V.

The hatch recovered from 368 EU to over 7,000 EU. With both 480 EU/t recipes active, the north furnace advanced from tick 407 to 580 and the HV chemistry reactor from 75 to 248. The hatch held between 7,296 and 7,680 EU in those samples. scripts/north_feeder_repair.py checks the live line at the start of a workshop round. Recheck the cable and loaded hatch before adding the planned HV grinder. Its originally reserved double gold cable is now installed in this shared feeder.
