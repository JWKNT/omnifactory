# Start here · Astra in progress

This session is playing Astra. At **119h29m**, 411 of 644 chapter quests are complete (413 of 822 database entries). The recorder is on. The single acting campaign is recorded in `run/iv-campaign.pgid`. This is an active handoff. The most recent strategic review was at 119h08m and the next is due at **121h09m**.

At the start of a new session, read these in order:

1. [Operating the void workshop](operator-67h46m.md) explains which tools move the player, how to take over from a campaign and how to stop cleanly.
2. [The 119h08m review](review-119h08m.md) gives the production and CPU measurements behind the current build order.
3. [Sixteen Naquadah coils](naquadah-coil-set.md), [the sixth furnace deck](sixth-furnace-deck.md) and [the east metal freezer](east-metal-freezer.md) cover the next two multiblocks. The latest design uses two HV hatches in each, and four-amp cable on each shared leg.
4. [The first ZPM hull](first-zpm-hull.md) and [the SoC engraver](soc-engraver.md) cover the two electronics jobs that can proceed before the new furnace forms.
5. [The Tier Six miner](tier-six-enderium.md) and [the breeder coproducts](breeder-coproducts.md) give the next ship bill and its two-stage fuel plan.

Check for an acting process before touching the game, then check the world and recording state. The CPU sampler only reads the crafting network. The campaign entry is `python3 -u scripts/tower_shift.py --assembly`. During an active session, touching `run/refresh-assembly-shift` lets that same actor reload changes at a job boundary. A second terminal or inventory survey can move the player. For observation use `workshop_me.installed_stock(read_only=True)`, the player inventory and `crafting_status.jobs()`. The [previous handoffs](handoff-history-through-119h23m.md) retain coordinates, receipts and links for older machines.

## What is running

- The first Tier Five miner returned 256 Naquadah Dust. The fifth furnace's two EV hatches, 12.56-million-EU capacitor bank and west freezer now fulfill ME orders for cold ingots. The first boule paid on page 796 and the lubricant saw returned all 64 doped wafers. Fourteen coils are in storage. Order the last two through the complete winding pattern, show all sixteen on page 324, then install them.
- The new northern deck has all 63 floor blocks. Invar plates and rods are in production for its heat-proof casings. The east freezer has its floor, output bus, item input and several wall and roof casings. The HV fuel mixer supplied twelve buckets of Nitro-Diesel and page 179 paid an OmniDollar. The Blizz rods have been milled. Eight Cryotheum Dust can supply 2,000 mB for the first cold Draconium. Use the [heat and coolant plan](draconium-furnace-and-freezer.md).
- The terminal holds the ZPM casing and two insulated Naquadah leads. The MV electrolyzer produced four buckets of fluorine. The basic centrifuge produced eight buckets each of methane and LPG. The next evidence is hydrofluoric acid and chloroform reaching the HV polymer bay, followed by 288 mB PTFE in the hull assembler.
- The board line had run out of naphtha because the heavy drum was full. A new import bus emptied the drum and the tower resumed. The desulfurizer was accumulating a 12-bucket charge and a fresh oilsands batch was processing below the tower. Follow the [refinery return](refinery-desulfurization.md) and check the waiting blank-pattern CPU. Page 108 detected the ordinary ME Interface Terminal. Complete its claim and configuration upgrade before mounting it in the EV aisle.
- The eight-cell breeder is off after nine runs. All 32 Stabilized Plutonium from those runs went into the Naquadah mission. The 64 Stabilized Uranium are in stock and page 661 paid. Connect the [breeder power outlet](breeder-power-outlet.md) and verify discharge before starting the next eight-plus-one run. The [aluminium drawer](aluminium-stock-drawer.md) and [simulation matter storage bus](simulation-iron.md) are the next native resource reserves.

The older Assembly Line and miner references remain in [the Assembly Line bill](assembly-line-materials.md), [the repeat tungsten route](tungsten-from-cargo.md) and [the earlier handoff archive](handoff-history-through-80h48m.md). The Medium Microverse Projector, north Assembly Line, LuV assembler, LuV press and dedicated IV crystal engraver are established. Preserve the starting materials for a bounded first heat or order, then verify the product in storage before scaling it.
