# Titanium for EV circuits

The first new charge since moving epoxy off HV made one bucket of titanium tetrachloride and two buckets of carbon monoxide at (10,82,1). The north blast hatch took the tetrachloride and its input bus took two magnesium dust. The furnace returned six magnesium chloride dust. The automatic hot-ingot route delivered a finished titanium ingot to the freezer output at (-5,80,8). A second bauxite charge ran alongside this job. Thirteen bauxite ore smelt to the 39 dust needed for one separator charge.

scripts/ev_titanium_stock.py handles the charge, cooling, plates and rods. scripts/titanium_recovery.py returns the blast salt to the separator, where it gives back both magnesium and chlorine. Clear previous item outputs before feeding more salt. The first new array needs one additional plate. After that, stock five plates before turning some ingots into rods for titanium frames.

The freezer transfer is automatic. The chemical reactor still needs physical fluid transport to the blast hatch and the separator. Count those trips in the next review. Consider adding permanent transfers once the exact fluids reaching each destination can be filtered and tested without filling the blast hatch with the wrong gas.
