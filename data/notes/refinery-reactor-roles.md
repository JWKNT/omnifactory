# Three refinery jobs

The MV reactor at (12,81,-11) has permanent raw naphtha and hydrogen feeds. The refinery-grid note covers the two fluid buses. A second powered MV reactor at (11,81,-11) has turned twelve buckets of sulfuric light fuel into twelve buckets of light fuel and one bucket of hydrogen sulfide. Its next job is steam cracking for the propene still. The extra hydrogen is recoverable.

The third MV site is (11,81,-13). It shares the fourfold copper cable at (11,81,-12) and is reserved for epoxy resin. Its parts are still being assembled. Count inventory again after building either reactor since both consume the same hull, rotor, cables and motor. scripts/resin_bay.py now does this. The old HV resin reactor is clear and has received the first two buckets of chlorine for titanium.

The epoxy sheet caster and board coater can work during titanium production. scripts/ev_board_campaign.py routes the remaining seed, naphtha and nitrogen dioxide to the third MV site once powered. It can prepare the nitrogen dioxide before then. A permanent resin outlet to the caster is the next fluid delivery to evaluate once the first MV resin charge succeeds.
