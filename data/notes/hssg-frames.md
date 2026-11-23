# Four HSS-G frames for the tier-seven mainframe

Page 312 pays one nickel for the first cold HSS-G ingot. Page 531 needs four frames. The grid and assembler produce four frames per three plates and five rods. One alloy batch makes nine HSS-G dust from five tungstensteel dust, one chrome, two molybdenum and one vanadium. The grid and mixer use the same quantities. Use the grid for this first batch. The factory already had eleven tungstensteel ingots, three vanadium ingots and two chrome dust.

For molybdenum the five-penny Powellite order gives 32 ores. Smelting twelve to dust and electrolyzing those yields two molybdenum. Five nickels instead buy 32 molybdenite. Each ore smelts straight into a molybdenum ingot that the macerator can grind. On the bulk route each ore mills to six crushed molybdenite, with a chance of extra molybdenum. This run can afford the nickel order and will need more metal for later HSS-G, HSS-E and HSS-S. Use two ores directly and keep the other thirty.

The running blast recipe requires 4,500 K, 120 EU/t and 8,820 base ticks per hot ingot. Use the fourth furnace and its hot-ingot return. Give the four remaining Lumium Blend priority there until the LuV hull quest is paid. scripts/hssg_frames.py stages the powders, checks for an actual hot HSS-G recipe before recording the furnace charge, and checks the first cold ingot on page 312 before allocating any to plates or rods.

At 78h37m the five-nickel grid returned 32 molybdenite ores. The ingots and HSS-G charge are still ahead.

The fourth furnace took the full nine-dust charge after the LuV hatch was finished. I verified the recipe running at 1,920 EU/t for 1,125 ticks per hot ingot. The ore-dictionary cover on the upper output passed Hot HSS-G Ingots into the west freezer input at (−3,80,8). The freezer competes with continuous air liquefaction. Its air hatch holds four charges at 4,000 mB each, so pausing its export lets it finish the air in the hatch before taking the hot metal. The existing HV press now has an HSS-G plate pattern. After inspecting the first cold ingot, the workshop can encode a furnace pattern with dust as its input and cold HSS-G as the expected return.

At 79h28m the freezer had returned at least five cold HSS-G ingots to ME. It ran the metal at 120 EU/t for 281 ticks per ingot after the air hatch drained. I collected a cold ingot and claimed the OmniNickel on page 312. The MV rod lathe has one pattern slot available. JEI gives two rods per ingot at 16 EU/t. Three ingots cover the five rods and three more cover the three plates for the four frames.

Both new ME patterns are installed. The fourth furnace interface describes the dust-to-cold-ingot route through the shared freezer. The MV lathe has the ingot-to-two-rods recipe. ME returned three plates and six rods. The grid consumed all three plates and five rods, yielding four HSS-G frames. They are in storage for the first tier-seven circuit.
