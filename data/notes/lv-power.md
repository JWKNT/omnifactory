# First live LV supply

The infinite water source at (-173, 65, 198) pushes into the steam dynamo immediately east at (-172, 65, 198). The dynamo points upward into the 4A LV CEF at (-172, 66, 198). The CEF faces east. Four insulated 4x conductive iron cables run to (-168, 66, 198). The cable readout reports 32 V, four amps and zero loss per block.

Four coal went into the dynamo. Its screen showed three coal remaining, fuel actively burning, and 2460 mB of water after the first fuel began to burn. The CEF's on-screen energy display rose to 1.9 kRF. The machine tool's client-side stored-EU value stayed zero during the check. The on-screen energy display is the better test here. Putting It All Together is claimed and LV Wiremill is open.

Use `python3 scripts/power_fuel.py 4` for another measured coal load. The dynamo's inventory is container slot 38 in this layout. The script locates its fuel slot from the open screen. Base view: screenshots/shot-20261119-123956.jpg.
