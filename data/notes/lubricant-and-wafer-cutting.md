# Lubricant for wafers and LuV motors

The MV saw takes 1,200 ticks and 90 mB water per QBit wafer. Distilled water takes 780 ticks and 67 mB. Lubricant takes 300 ticks and 22 mB. All three recipes give five CPUs and draw 48 EU/t before overclocking. An HV or EV saw can overclock the same recipe. The existing MV saw has 40 buckets of water and several refinery processes already send it their water by-product.

The refinery input hatch held 32,000 mB crude oil at 88h11m and the workshop LV mixer was empty. One redstone and 750 mB oil give 750 mB lubricant in 128 ticks at 4 EU/t. Talc and soapstone can replace redstone. Distilling fish oil, seed oil or creosote gives half as much lubricant per unit of feed. The first stock order uses the LV mixer and keeps at least eight buckets of oil in the refinery. Six buckets of lubricant cover the ten LuV motors' 2,500 mB and more than 150 wafer cuts.

The proposed EV cutter site is (18,83,−9), just west of the new fourfold aluminium rise. Its west interface at (17,83,−9) can touch the radon cell's existing ME interface below. Both sockets were empty and the conduit on the south carries no Ender IO fluid line. The EV saw takes an EV hull, an EV conveyor, one EV motor, two extreme circuits, two aluminium cables, a diamond sawblade and glass. The HV machine takes cheaper circuits but would need a separate 512 V supply here. Make the blade from one diamond dust and one cobalt brass gear. The extruder yields the gear from four ingots. Keep the MV saw cutting while building. Check the lubricant delivery, actual cutting time and return to ME before ordering wafers through the new machine.

The original crude hatch is enclosed inside the tower. The electrolyzer directly beneath it had another 9,000 mB in its output, accessible from the north aisle. All nine buckets reached the LV mixer. Twelve redstone went in, and at 88h31m the mixer already held 7,500 mB of finished lubricant while processing the rest. The refinery kept its full 32,000 mB. Check the ME tank before filling the new cutter. The EV cutter has been surveyed and its tender is in scripts/ev_wafer_cutter.py, but the machine has not yet been installed.

All 9,000 mB of lubricant reached ME at 88h39m. The mixer is empty again. A full bucket can now commission the EV cutter while leaving eight buckets for the LuV line.

The MV saw has two competing cuts. The Nano CPU Wafer gives seven ordinary Nano CPUs, or it can first go into the EV reactor and become a QBit wafer yielding five QBits. At 89h12m the store held eight QBits and only one Nano CPU. With at least four QBits in stock and fewer than two Nano CPUs, reserve one wafer for the ordinary cut. Both products have exactly the same three fluid costs in live JEI. The new EV cutter can therefore take either order with the same lubricant.

At 89h27m the circuit reserve had seven ordinary Nano CPUs and seven QBits. The first manual brass blend returned four brass dust. Its grid takes three copper and one zinc. Count four dust per craft when requesting a batch and nine for the cobalt brass blend. The gear still needs four smelted cobalt brass ingots.

At 90h08m the multi-smelter had returned twelve cobalt brass ingots. Four went into the MV extruder with the gear die for the EV sawblade. The existing water saw finished the three-wafer QBit run in two loads, returning ten and then five QBits.

The HV assembler turned the finished gear and one diamond dust into a Diamond Sawblade. One EV motor is also ready. The cutter still needs the EV hull, conveyor and aluminium cables. If the hull is waiting on titanium, use the established titanium reactor, north furnace and freezer route.

The EV saw at (18,83,−9) accepted its first bucket of lubricant and returned seven Nano CPUs from one Nano CPU Wafer. It has 978 mB remaining after that cut. The west face is set for output and accepts input. Verify automatic item output, both encoded cuts, and the five-QBit EV cycle independently.
