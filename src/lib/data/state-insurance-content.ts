// Hand-written, source-checked content for the commercial-truck state pages.
//
// Only states in this file get the full template. Anything not listed falls back to the generic
// layout and is noindexed in the [state] route, so an unwritten state can never outrank a written one.
//
// Sources were checked 2026-11-22 against the regulator's own pages or the statute. Amounts and
// forms change; every page tells the reader to confirm the current figure before relying on it.

export interface StateLimitRow {
  operation: string;
  limit: string;
  note?: string;
}

export interface StateContent {
  seoTitle: string;
  seoDescription: string;
  /** Opening paragraphs. Written to be read, not skimmed as bullets. */
  intro: string[];
  regulator: {
    name: string;
    authority: string;
    plain: string;
  };
  filing: {
    form: string;
    filedBy: string;
    when: string;
  };
  limits: StateLimitRow[];
  limitsNote: string;
  whoNeeds: string[];
  local: { heading: string; body: string }[];
  faqs: [string, string][];
  sources: { label: string; href: string }[];
}

export const STATE_CONTENT: Record<string, StateContent> = {
  florida: {
    seoTitle: 'Commercial Truck Insurance in Florida: Limits, Filings, What to Prepare',
    seoDescription:
      'Florida commercial truck insurance requirements by weight, why most Florida property carriers have no state authority to file, and what a carrier should have ready before quoting.',
    intro: [
      'Florida is the state that trips up carriers who moved here from somewhere else. In Texas you apply for a TxDMV number, in California you chase a motor carrier permit, and both come with a filing your insurer has to submit before the authority activates. Florida does not work that way for property carriers.',
      'What Florida has instead is a weight-banded insurance statute, an enforcement agency that runs compliance reviews against it, and a registration system that quietly assumes you already know the difference between hauling for hire across town and hauling for hire across the Georgia line.',
      'This page covers what the statute actually says, which operations it does and does not reach, and the parts of Florida freight that change how a policy gets priced once you leave the generic quote.',
    ],
    regulator: {
      name: 'Florida Department of Highway Safety and Motor Vehicles (FLHSMV)',
      authority: 'No separate intrastate operating-authority certificate for property carriers',
      plain:
        'Florida does not administer a state version of the Texas TxDMV number or the California motor carrier permit for trucks hauling property. There is no state application to file and no state authority certificate to hang on the wall. The insurance obligation is still real, but it attaches to your registration and is enforced through FLHSMV compliance reviews rather than through an authority application. Household goods movers are the exception: they register with the Department of Agriculture and Consumer Services under Chapter 507, and that registration does require a certificate of insurance.',
    },
    filing: {
      form: 'None for intrastate property work',
      filedBy: 'Not applicable intrastate; BMC-91X by your insurer if you hold interstate authority',
      when:
        'If you operate under an MC number, FMCSA will not activate it until your insurer has filed proof of liability. That filing is separate from anything Florida asks for, and it does not satisfy a state requirement that does not exist.',
    },
    limits: [
      { operation: 'Commercial vehicle, 26,000 to under 35,000 lbs GVW', limit: '$50,000 combined' },
      { operation: 'Commercial vehicle, 35,000 to under 44,000 lbs GVW', limit: '$100,000 combined' },
      { operation: 'Commercial vehicle, 44,000 lbs GVW and above', limit: '$300,000 combined' },
      {
        operation: 'Any vehicle subject to federal financial responsibility (49 CFR Part 387)',
        limit: 'The federal amount instead',
        note: '$750,000 general freight, $1,000,000 oil and listed hazmat, $5,000,000 certain high-hazard loads',
      },
      {
        operation: 'Every Florida-registered vehicle',
        limit: '$10,000 PIP and $10,000 property damage liability',
        note: 'Sits underneath the commercial bands, not instead of them',
      },
    ],
    limitsNote:
      'The weight bands in section 627.7415 only bind a carrier the federal rule does not reach, which in practice means genuinely intrastate, non-hazardous work. Nobody running a loaded tractor-trailer under interstate authority is operating on $300,000, and an adjuster will not treat that as a defence after a crash.',
    whoNeeds: [
      'For-hire carriers running point-to-point inside Florida with equipment over 26,000 lbs, where the state bands are the binding minimum.',
      'Private fleets hauling their own goods, which Florida reaches through the same commercial vehicle definition. The statute does not care whose freight it is.',
      'Drayage and container operators working the ports at Miami, Everglades, Jacksonville and Tampa, where the truck may never leave the state but the container often does.',
      'Household goods movers of any size, who are the one group that does need a state registration and a certificate of insurance filed with FDACS.',
    ],
    local: [
      {
        heading: 'Hurricane season is an underwriting fact, not a weather story',
        body:
          'Between June and November a Florida policy is priced for wind and flood exposure on equipment that may be parked in a yard for days. Carriers who keep trailers loaded and staged near the coast get asked about that staging, and hurricane deductibles on physical damage are a separate number from the everyday deductible. If your operation shuts down for a week after a storm, the business interruption question lands on the same file.',
      },
      {
        heading: 'Port drayage has its own loss pattern',
        body:
          'Chassis, container and short-radius work around the ports produces a specific mix: low speed, tight yards, high claim frequency, and cargo that belongs to somebody else with a bill of lading attached. Underwriters treat it differently from over-the-road freight, and a carrier who describes it as general hauling will get a rate that does not match the exposure — then a surprise at renewal.',
      },
      {
        heading: 'Seasonal produce moves the whole state',
        body:
          'Florida produce runs from the winter vegetables in the south through the spring season further north, and reefer work appears and disappears with it. A carrier who adds reefer units for four months needs the cargo limits and the reefer breakdown coverage to match the season, not the annual average, because the claims happen in the weeks the equipment is actually loaded.',
      },
    ],
    faqs: [
      [
        'Do I need Florida intrastate authority to haul for hire inside the state?',
        'For property carriers, no. Florida does not issue a separate intrastate operating-authority certificate the way Texas and California do, so there is no state application and no state filing to wait on. What you do need is a registered commercial vehicle that meets the insurance bands in section 627.7415, or the federal amount if the federal rule reaches you. Household goods movers are the exception and do have to register with FDACS.',
      ],
      [
        'Is $300,000 enough for a Florida truck?',
        'It is the statutory figure at 44,000 lbs and above for intrastate, non-hazardous work, and it is routinely not enough in practice. Brokers and shippers set their own contractual minimums, commonly $1,000,000 in auto liability, and a serious injury claim will exceed $300,000 long before it reaches a courtroom. Ask the customers you intend to haul for what they require before you choose a limit.',
      ],
      [
        'What happens if my coverage lapses on a Florida-registered truck?',
        'FLHSMV can suspend the registration, and the lapse follows the operation into the next quote. More practically, a lapse creates a gap in the loss history that underwriters read as a risk signal even after coverage is restored. If the truck is financed, the lender will also have something to say about it.',
      ],
      [
        'Does a Florida-only carrier need a BMC-91X?',
        'Not for intrastate work. The BMC-91X is the federal proof of liability your insurer files with FMCSA to activate an MC number. If you never cross a state line and never hold interstate authority, there is nothing for FMCSA to activate. If the same truck does both, you need both sets of rules to be satisfied at once.',
      ],
    ],
    sources: [
      {
        label: 'Florida Statutes 627.7415, commercial vehicle liability minimums',
        href: 'https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0600-0699/0627/Sections/0627.7415.html',
      },
      {
        label: 'FDACS, intrastate moving registration (Chapter 507)',
        href: 'https://fdacs.gov/Business-Services/Moving-Companies-FAQ',
      },
      {
        label: '49 CFR 387.9, federal minimum levels of financial responsibility',
        href: 'https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-387/subpart-A/section-387.9',
      },
    ],
  },

  indiana: {
    seoTitle: 'Commercial Truck Insurance in Indiana: Form E, Limits, What to Prepare',
    seoDescription:
      'Indiana intrastate carriers file Form IOA-1 and keep a Form E on file with the Department of Revenue. Limits by weight, who actually needs operating authority, and what to prepare.',
    intro: [
      'Indiana has one of the least intuitive authority structures in the country, and it catches out carriers who assume every state works like the last one. The Department of Revenue runs motor carrier services, the intrastate filing is Form IOA-1, and the insurance proof is a Form E your insurer submits, not you.',
      'The part that surprises people is the certificate. Indiana issues a Certificate of Public Convenience and Necessity for household goods and passenger carriers — not for ordinary freight. A for-hire trucking company hauling pallets between Indianapolis and Fort Wayne does not need that certificate. It does need the Form E on file, and it does need to know which side of the 10,000 lb line its equipment sits on.',
      'That weight line is the other thing worth understanding before you quote, because one heavier truck moves the whole operation from the light-vehicle tier to the standard one.',
    ],
    regulator: {
      name: 'Indiana Department of Revenue, Motor Carrier Services',
      authority: 'Form IOA-1 for intrastate operation; Certificate of Public Convenience and Necessity only for household goods and passengers',
      plain:
        'Intrastate for-hire carriers and private carriers hauling hazardous materials file Form IOA-1 and keep a Form E on file. Private carriers moving their own non-hazardous goods file the form and do not renew it. Vehicles at 10,000 lbs GVWR or less that are for hire get an Indiana ID number rather than a USDOT number, and anything at 10,001 lbs or above needs a USDOT number registered as intrastate. Household goods and passenger carriers go through the certificate process instead, which takes 30 to 60 days and requires a tariff on file.',
    },
    filing: {
      form: 'Form E Indiana (liability), filed with DOR Motor Carrier Services',
      filedBy: 'Your insurance company, not you',
      when:
        'Before or alongside the Form IOA-1. The Form E has to stay active for as long as the operation runs, and it renews with the authority every year by November 30. A cancelled policy with no replacement filing puts the authority at risk even if the truck is parked.',
    },
    limits: [
      { operation: 'For-hire, non-hazardous, vehicles of 10,000 lbs GVWR or less', limit: '$300,000' },
      { operation: 'For-hire, non-hazardous, vehicles of 10,001 lbs GVWR or more', limit: '$750,000' },
      { operation: 'Hazardous materials, private or for-hire', limit: '$1,000,000 to $5,000,000', note: 'Depends on the material and packaging' },
      { operation: 'Tow and recovery vehicles over 16,000 lbs GVWR', limit: '$750,000', note: 'Separate statute from the freight tiers' },
      { operation: 'Any business vehicle on Indiana roads, baseline', limit: '25/50/25' },
    ],
    limitsNote:
      'The $300,000 tier only applies if every vehicle in the operation is 10,000 lbs GVWR or less. One heavier unit moves the entire filing to $750,000, so a carrier planning around the lower figure with a mixed fleet is planning around a number that will not apply. Brokers and shippers commonly require $1,000,000 in liability and $100,000 in cargo on top of any of these.',
    whoNeeds: [
      'For-hire carriers hauling property inside Indiana, whether or not they ever intend to cross a state line.',
      'Private carriers hauling hazardous materials, which Indiana reaches even though they haul nothing for anyone else.',
      'Carriers whose only Indiana work is short shuttle runs out of a warehouse, where the radius is small but the filing obligation is identical.',
      'Tow and recovery operators, who sit under a separate statutory minimum and often get quoted as if they were general freight.',
    ],
    local: [
      {
        heading: 'One state line explains most Indiana freight',
        body:
          'The warehouses around Hammond, Gary and Lake County exist because Chicago is forty minutes away. A truck can spend a week doing twenty-mile shuttles inside Indiana and still be handling freight that is part of an interstate movement, which decides whether the federal rules apply. It is the single most common authority question in the northern part of the state, and getting it wrong shows up at a roadside inspection rather than at the quote stage.',
      },
      {
        heading: 'Just-in-time auto parts punish service failures',
        body:
          'Indiana builds vehicles and parts for a living — the assembly and supplier plants across the central and southern counties run on tight windows. That produces detention exposure, cargo claims with a production line behind them, and contracts that specify insurance limits the statute never mentions. A policy written for general freight and a policy written for a Tier 1 supplier contract are not the same policy.',
      },
      {
        heading: 'Winter is a physical damage conversation',
        body:
          'Lake-effect snow in the northern counties and ice on the toll road change the physical damage loss record for the whole year. Underwriters read winter claims as a pattern rather than bad luck, so a carrier who runs the northern corridors through January should expect the deductible and the stated value of the equipment to matter more at renewal than the liability limit did at inception.',
      },
    ],
    faqs: [
      [
        'Do I need a Certificate of Public Convenience to haul freight in Indiana?',
        'Not for ordinary property. The certificate is for household goods and passenger carriers operating for hire inside Indiana. A for-hire freight carrier files Form IOA-1 and keeps a Form E on file instead. If you move household goods even occasionally, the certificate applies, and the application takes 30 to 60 days during which you are not authorised to operate.',
      ],
      [
        'Who files the Form E, me or my agent?',
        'Your insurance company files it. Indiana DOR is explicit about this, and it is the same pattern as the federal BMC-91X: the operator cannot submit the proof of financial responsibility themselves. That means the timeline is not in your hands, so ask for confirmation the filing is active before you schedule the first load.',
      ],
      [
        'My trucks are under 10,000 lbs. Do I still need a filing?',
        'If you are hauling for hire, yes, at $300,000, and you use an Indiana ID number rather than a USDOT number. The lighter tier is cheaper, not optional. The moment a vehicle in the fleet goes over 10,000 lbs GVWR the requirement moves to $750,000 for the operation.',
      ],
      [
        'What counts as intrastate work if the load is going to Chicago?',
        'The question is not where the truck is registered but whether the movement is part of interstate commerce. A run from an Indiana warehouse to a Chicago receiver is interstate, even if the truck only crosses the line once. A pure Indiana-to-Indiana movement on the same account may not be. Carriers doing both should assume they need the federal registration as well, and confirm the specific movement before relying on the intrastate filing.',
      ],
    ],
    sources: [
      {
        label: 'Indiana DOR Motor Carrier Services, Commercial Motor Vehicle Guide',
        href: 'https://www.in.gov/dor/motor-carrier-services/files/cmv-guidebook.pdf',
      },
      {
        label: 'Indiana DOR, intrastate operating authority for passengers and household goods',
        href: 'https://www.in.gov/dor/motor-carrier-services/usdot-and-ucr/indiana-intrastate-passenger-and-household-good-authority',
      },
      {
        label: 'State Form IOA-1, Intrastate Operating Authority',
        href: 'https://forms.in.gov/Download.aspx?id=2582',
      },
    ],
  },

  texas: {
    seoTitle: 'Commercial Truck Insurance in Texas: TxDMV, Form E, Minimum Limits',
    seoDescription:
      'Texas intrastate carriers need a TxDMV number and an insurer-filed Form E, with $500,000 as the general freight floor. Who registers, what it costs to get wrong, and what to prepare.',
    intro: [
      'Texas is one of the few states where the intrastate credential is genuinely mandatory and genuinely enforced. If your truck or combination is over 26,000 lbs and you never leave the state, you still need a TxDMV number, and TxDMV will not issue it until your insurer has filed proof of coverage on a Form E.',
      'The old name for this document is the TxDOT number, which is why half the industry still calls it that. The registration moved to TxDMV years ago, and the application system changed again in August 2026 when TxMCCS replaced the old portal — anyone with a saved login found out the hard way.',
      'Two things make Texas unusual. The registration reaches private carriers, so a construction company hauling its own equipment over 26,000 lbs files exactly like a for-hire trucking company. And the intrastate minimum is $500,000, which is lower than the federal $750,000 but applies to operations that never touch interstate authority.',
    ],
    regulator: {
      name: 'Texas Department of Motor Vehicles, Motor Carrier Division',
      authority: 'TxDMV number (formerly the TxDOT number), issued through TxMCCS',
      plain:
        'Registration is triggered by weight and activity rather than by whether you charge for the haul: a vehicle or combination over 26,000 lbs, placarded hazardous materials, a farm vehicle at 48,000 lbs or more, a vehicle designed for more than 15 passengers, a commercial school bus, or household goods moved for compensation at any weight. A USDOT number registered as intrastate comes first. The TxDMV number is the authority; the USDOT number is only the identifier.',
    },
    filing: {
      form: 'Form E (liability); Forms H and I for household goods cargo; Form K on cancellation',
      filedBy: 'Your insurance company, electronically, into TxMCCS',
      when:
        'Before the TxDMV number issues. The filing has to stay active every day you hold the certificate — TxDMV can revoke the registration when the insurer removes it. They email a warning before a cancellation takes effect, which is only useful if the address on the application is one somebody actually reads.',
    },
    limits: [
      { operation: 'Over 26,000 lbs, private or for-hire, non-hazardous', limit: '$500,000' },
      { operation: 'Oil, listed hazardous materials, petroleum lubricants and fuels', limit: '$1,000,000' },
      { operation: 'Bulk or high-hazard materials, certain cargo tanks and divisions', limit: '$5,000,000' },
      { operation: 'Household goods carriers, vehicles under 26,000 lbs', limit: '$300,000', note: 'Plus $5,000 per vehicle and $10,000 aggregate cargo' },
      { operation: 'Buses for 16 to 26 passengers, and for-hire school buses', limit: '$500,000' },
    ],
    limitsNote:
      'The $500,000 figure is a combined single limit for bodily injury and property damage, excluding cargo. It is the floor, not the market rate: shippers, brokers and general contractors routinely require $1,000,000 before they will tender a load, and a single serious crash in a state with no cap on noneconomic damages can exceed either number.',
    whoNeeds: [
      'For-hire carriers running wholly inside Texas above 26,000 lbs, who need the TxDMV number even though their trucks never see another state.',
      'Private carriers in the same weight class hauling their own equipment — construction, oilfield service, utility and aggregate operations. This is not a for-hire-only rule.',
      'Anyone hauling placarded hazardous materials at any weight, which is the trigger that catches smaller vehicles.',
      'Household goods movers of any size, who are the one group that needs cargo filings on top of the liability filing.',
    ],
    local: [
      {
        heading: 'The oilfield is intrastate and still expensive',
        body:
          'Sand, water and pipe moving between Odessa, Midland and the surrounding counties is Texas-only work, and it is also some of the hardest equipment to place. The trucks are often new, the drivers are often new, the radius is short but the hours are not, and the loss history on that class is worse than the mileage suggests. A carrier with a $500,000 filing and a frac sand operation should expect the underwriting conversation to be about drivers and hours rather than about the legal minimum.',
      },
      {
        heading: 'Houston and the border decide whether you are interstate',
        body:
          'A container moving from the Port of Houston to a Laredo warehouse may be intrastate. The same container continuing across the bridge is not, and the freight was interstate from the moment it entered the country. Border work at Laredo and El Paso, chemical and resin loads around the ship channel, and produce out of the Rio Grande Valley all sit on that line. Carriers who assume the truck is the deciding factor, rather than the movement, get the authority question wrong.',
      },
      {
        heading: 'Distance is the rating factor people forget',
        body:
          'Texas is large enough that two carriers running the same equipment can have completely different exposure: a 40-mile aggregate haul and a 600-mile run to Amarillo are not the same risk even though the truck, the limit and the filing are identical. Radius drives price more than any other single input, and it is the first thing an underwriter asks about after the commodity.',
      },
    ],
    faqs: [
      [
        'Do I need a TxDMV number if I never leave Texas?',
        'If your vehicle or combination is over 26,000 lbs and you operate commercially on Texas roads, yes — that is exactly the case the TxDMV number exists for. It applies to private carriers too, so a company hauling its own equipment over that weight registers the same way a for-hire carrier does. Below 26,000 lbs the trigger is usually hazmat or household goods rather than weight.',
      ],
      [
        'Is $500,000 really enough in Texas?',
        'It is the statutory minimum for general freight over 26,000 lbs, and it is rarely enough in practice. Texas has no cap on noneconomic damages in injury cases, brokers and shippers commonly require $1,000,000, and a single catastrophic claim will exceed the floor quickly. Most carriers who intend to stay in business carry more than the minimum and treat the statute as the entry ticket.',
      ],
      [
        'What happens if the Form E lapses?',
        'TxDMV can revoke the registration, and the truck is then operating without authority even though the plates and the USDOT number still look valid. The fix is to have the new filing in place before the old policy expires — bind the renewal early and get written confirmation from your agent that the new Form E was submitted, rather than assuming a renewal notice is the same thing.',
      ],
      [
        'Do I need both a TxDMV number and an MC number?',
        'Only if you do both kinds of work. The TxDMV number covers intrastate authority, the MC number covers interstate, and one does not substitute for the other. Carriers who run inside Texas all week and take an out-of-state load on Friday need both, plus the federal BMC-91X filing on top of the state Form E.',
      ],
    ],
    sources: [
      {
        label: 'TxDMV, TxDMV Number requirements and insurance minimums',
        href: 'https://www.txdmv.gov/motor-carriers/txdmv-number?tab=requirements',
      },
      {
        label: 'TxDMV, becoming a Texas motor carrier (intrastate)',
        href: 'https://www.txdmv.gov/motor-carriers/how-to-be-a-motor-carrier',
      },
      {
        label: '43 Texas Administrative Code 218.16, minimum insurance amounts',
        href: 'https://texreg.sos.state.tx.us/public/readtac$ext.TacPage?sl=R&app=9&p_dir=&p_rloc=&p_tloc=&p_ploc=&pg=1&p_tac=&ti=43&pt=10&ch=218&rl=16',
      },
    ],
  },
  california: {
    seoTitle: 'Commercial Truck Insurance in California: MCP, CA Number, Limits',
    seoDescription:
      'California needs a CA number from the CHP, a Motor Carrier Permit from the DMV and an MC 65 M insurance filing, plus proof of workers compensation. Limits and order of steps.',
    intro: [
      'California is the only state where the permit application asks for two filings that have nothing to do with each other: your liability certificate and proof that you carry workers compensation. Miss the second one and the first one does not matter.',
      'The credential itself is not one document but three, issued in a fixed order. The CHP issues the CA number, the DMV issues the Motor Carrier Permit, and the permit does not print until your insurer has filed the MC 65 M and your workers comp is on record. Carriers who apply out of order lose weeks to a sequence that has no shortcuts.',
      'California also reaches further than most states into private carriage. If you run your own goods in a truck over 10,000 lbs, you need the same permit a for-hire carrier does, at a lower fee. That is the line most new carriers miss.',
    ],
    regulator: {
      name: 'California DMV (Motor Carrier Permit) with the California Highway Patrol (CA number)',
      authority: 'Motor Carrier Permit under Vehicle Code 34601; CA number issued only by the CHP',
      plain:
        'The DMV issues the permit, but it will not accept the application without a CA number, and only the CHP issues those. You file a CHP 362 Motor Carrier Profile with your nearest CHP Motor Carrier Safety Unit, then apply to the DMV on form MC 706 M. The permit is issued to for-hire and private carriers alike; the fee differs. Household goods carriers and passenger carriers sit under the CPUC instead, and a carrier hauling only interstate or foreign freight does not need an MCP at all.',
    },
    filing: {
      form: 'MC 65 M certificate of insurance (the filing usually searched as "MCP-65" or "DMV 65")',
      filedBy: 'Your insurer, directly with the DMV; workers compensation proof or a signed exemption comes with it',
      when:
        'Before the permit issues. The certificate cannot be cancelled on less than 30 days written notice to the DMV, and if the coverage lapses the permit is suspended — which means the truck is not legal even though the plates are still on it.',
    },
    limits: [
      { operation: 'Property, non-hazardous, vehicles of 10,001 lbs GVWR or more', limit: '$750,000 combined single limit' },
      { operation: 'Property, non-hazardous, only vehicles of 10,000 lbs GVWR or less', limit: '$300,000', note: 'No bulk petroleum or hazardous materials in the fleet' },
      { operation: 'Placarded hazardous materials, listed oil, California hazardous waste', limit: '$1,000,000' },
      { operation: 'Petroleum products in bulk, including waste petroleum', limit: '$1,200,000' },
      { operation: 'Cargo tanks over 3,500 gallons, certain explosives, poison gas, radioactive', limit: '$5,000,000' },
    ],
    limitsNote:
      'The $300,000 tier is the one that gets misapplied. It only holds if every vehicle in the operation is 10,000 lbs GVWR or less and nothing hazardous or bulk petroleum moves. Add one heavier truck and the whole filing moves to $750,000. Cargo is not part of these numbers at all — the MCP is a liability permit, and cargo coverage is a separate decision.',
    whoNeeds: [
      'Any carrier paid to move property in California, whatever the vehicle size. The DMV is explicit that even a courier on a motorcycle needs a permit.',
      'Private carriers running trucks of two or more axles over 10,000 lbs GVWR, which is the part out-of-state carriers rarely expect.',
      'Anyone hauling hazardous materials in any vehicle, or running a combination over 40 feet.',
      'Carriers whose trucks require a CDL to operate, which captures a lot of equipment that does not feel like a "motor carrier" operation.',
    ],
    local: [
      {
        heading: 'The ports are their own insurance market',
        body:
          'Drayage around Los Angeles and Long Beach is short-radius, high-frequency work with containers that belong to somebody else and equipment that is often older than the tractor pulling it. Add the clean-truck and emissions rules and you get a class where the underwriting question is less about the driver and more about the age of the fleet and who owns the chassis. A carrier describing port work as general hauling will get a rate that does not survive the first claim.',
      },
      {
        heading: 'Workers compensation is part of the permit, not an HR detail',
        body:
          'California is unusual in tying the operating permit to workers comp compliance. The DMV wants a certificate from your comp carrier or a signed statement that you have no employees subject to the law, and the exemption is narrower than most owners assume — one part-time employee is enough to require coverage. If the comp policy lapses, the permit is suspended the same day, regardless of whether the auto policy is fine.',
      },
      {
        heading: 'Agricultural freight runs on a calendar',
        body:
          'The Central Valley produces reefer work in bursts, and a carrier who adds trailers for a season inherits a different cargo exposure for those weeks. Wildfire season sits on top of it: route closures, evacuation of yards, and equipment parked where the air quality is the least of the problems. Underwriters in this state ask about contingency planning more often than carriers expect.',
      },
    ],
    faqs: [
      [
        'Do I need a California MCP if I only haul interstate freight?',
        'Not for the interstate movement itself — the DMV and CHP both treat carriers hauling only interstate or foreign freight as outside the MCP requirement. The moment you take a load that starts and ends inside California, you need the permit, the CA number and the MC 65 M filing. Carriers who do both usually end up with both sets of credentials because the intrastate load appears sooner or later.',
      ],
      [
        'What is the difference between the CA number and the MCP?',
        'The CA number is the carrier identification number, issued only by the CHP, and it becomes your permit number. The MCP is the permit the DMV issues using that number. You cannot apply for the MCP without the CA number first, and the CHP generally will not issue the CA number without a USDOT number, so the practical order runs USDOT, then CA number, then MCP.',
      ],
      [
        'My trucks are under 10,000 lbs. Is the limit $300,000?',
        'Only if the whole fleet stays at or under 10,000 lbs GVWR and you haul no hazardous materials or bulk petroleum. One heavier truck moves the operation to $750,000. That is a fleet-level test, not a per-truck test, so a mixed fleet plans on the higher number.',
      ],
      [
        'What happens if my insurance is cancelled?',
        'Your insurer has to give the DMV 30 days written notice, and if no replacement certificate arrives the permit is suspended. A suspended MCP is not a paperwork problem — it means the vehicle is operating without the permit California requires, which is the kind of thing that gets discovered at a scale house rather than in an office.',
      ],
    ],
    sources: [
      {
        label: 'California DMV, Motor Carrier Permits',
        href: 'https://www.dmv.ca.gov/portal/vehicle-industry-services/motor-carrier-services-mcs/motor-carrier-permits',
      },
      {
        label: 'California DMV, MCP FAQs (CA number, workers compensation)',
        href: 'https://www.dmv.ca.gov/portal/vehicle-industry-services/motor-carrier-services-mcs/motor-carrier-permits/motor-carrier-permits-mcp-faqs/',
      },
      {
        label: 'California Vehicle Code 34631.5, minimum liability limits',
        href: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=VEH&sectionNum=34631.5',
      },
    ],
  },

  'new-york': {
    seoTitle: 'Commercial Truck Insurance in New York: NYSDOT Authority, Form E, Limits',
    seoDescription:
      'New York intrastate carriers need NYSDOT authority and an insurer-filed Form E, and NYSDOT rejects ACORD certificates. The state minimum is lower than the federal one — here is why.',
    intro: [
      'New York has the lowest intrastate filing minimum of any state on this list and the highest practical cost of being wrong about it. The state filing is $100,000 per person and $300,000 per accident, which is less than the federal $750,000 an interstate carrier needs — and that gap is where carriers get hurt, because a policy built to the state number will not get you a load.',
      'The filing mechanics are unusually strict. NYSDOT wants the Form E transmitted by an insurer authorised in New York, in the exact name on your authority, and it says plainly that it does not accept ACORD certificates as evidence of insurance. Brokers send ACORDs all day; the state will not take one.',
      'There is also a no-fault layer sitting underneath everything, and a change to New York injury claims that took effect in May 2026 and alters how a crash is litigated. Both matter to an underwriter more than the filing minimum does.',
    ],
    regulator: {
      name: 'New York State Department of Transportation, Office of Modal Safety and Security',
      authority: 'Certificate (common carrier) or permit (contract carrier) under Transportation Law 172',
      plain:
        'For-hire carriage wholly inside New York needs NYSDOT authority. Applications are filed through NYSDOT carrier certification, published in the department bulletin, and the authority only exists while the insurance filings stay active. Certain operations are exempt under Transportation Law 171 — dump trucks unloading by dumping and tow-away work among them — but the exemptions are narrower than they read, and the department, not the carrier, decides whether they apply.',
    },
    filing: {
      form: 'Form E for liability, Form H for cargo',
      filedBy: 'Your insurer, which must be authorised to write the coverage in New York',
      when:
        'Before the authority is granted, and continuously after. NYSDOT requires 30 days notice of cancellation, the form has to name the authority holder exactly, and it must come from the insurance company rather than from an agent or a certificate service.',
    },
    limits: [
      { operation: 'Bodily injury or death, one person', limit: '$100,000' },
      { operation: 'Bodily injury or death, all persons in one accident', limit: '$300,000' },
      { operation: 'Property damage, excluding cargo', limit: '$50,000' },
      { operation: 'Cargo, common carriers of property', limit: '$5,000 per vehicle / $10,000 aggregate', note: 'Contract carriers and certain bulk loads are outside the cargo rule' },
      { operation: 'No-fault basic economic loss, every registered vehicle', limit: '$50,000 per person' },
    ],
    limitsNote:
      'These are intrastate figures and they are lower than the federal minimum, which is the opposite of what most carriers assume. An interstate for-hire carrier running general freight still needs $750,000, and brokers and shippers commonly require $1,000,000 in liability and $100,000 in cargo before they will tender a load. The state number gets you legal; the market number gets you freight.',
    whoNeeds: [
      'For-hire carriers moving property between two New York points, including hot shot and expedited operations where the pickup and trailer are light but they are still being paid.',
      'Contract carriers, who need a permit rather than a certificate and are outside parts of the cargo rule.',
      'Carriers who hold federal authority and assume it covers New York intrastate work. It does not — the two authorities are separate and neither substitutes for the other.',
      'Household goods movers, who face a probationary certificate, a New York place of business and a filed tariff on top of the standard filings.',
    ],
    local: [
      {
        heading: 'The five boroughs are a cost centre before they are a market',
        body:
          'Congestion pricing, bridge and tunnel tolls, and delivery windows that punish a missed slot all show up in the operating cost of a metro truck. They also show up in claims: tight streets, low bridges, and a theft exposure that is different from anywhere else on the corridor. A carrier running into Manhattan should expect the physical damage and cargo terms to be read more closely than the liability limit.',
      },
      {
        heading: 'The no-fault system changes what a claim looks like',
        body:
          'New York pays the first $50,000 of basic economic loss on every registered vehicle regardless of fault, which means injury claims arrive through a different channel than in a tort state. The serious-injury threshold that decides whether someone can sue was amended for claims filed from late May 2026, and the state insurance regulator issued guidance on it. Whether that makes New York better or worse for a trucking defendant is an argument for lawyers; for underwriting, it means the loss history reads differently than the same crash in Ohio.',
      },
      {
        heading: 'Upstate roads are a different risk from the metro',
        body:
          'A carrier running Buffalo to Albany in January is buying a winter physical damage exposure; a carrier running Brooklyn to Newark is buying congestion, theft and pedestrian exposure. Same state, same filing, different policy. New York is large enough that radius and route should be described specifically on the application rather than summarised as "regional".',
      },
    ],
    faqs: [
      [
        'Why is the New York state minimum lower than the federal one?',
        'Because they are two different rulebooks. The NYSDOT filing minimum under 17 NYCRR 855.1 is $100,000 per person and $300,000 per accident with $50,000 property damage for intrastate authority. Federal financial responsibility under 49 CFR 387 does not apply to a purely intrastate movement, so the state figure is the legal floor. The moment the load is part of interstate commerce the federal minimum applies instead, and that is $750,000 for general freight.',
      ],
      [
        'Will NYSDOT accept an ACORD certificate?',
        'No. NYSDOT states that it does not accept ACORD forms as evidence of insurance, and the Form E has to be filed by an insurance company authorised in New York and match the name on the authority exactly. This is the most common reason a New York filing bounces, and it is worth confirming with your agent before the authority application goes in rather than after.',
      ],
      [
        'Do I need cargo insurance for New York intrastate authority?',
        'Common carriers of property need a Form H at $5,000 per vehicle and $10,000 aggregate. Contract carriers, and carriers hauling only bulk commodities such as stone, sand or logs, sit outside that rule. In practice the cargo requirement that matters is the one in the shipper contract, which is usually far above $5,000.',
      ],
      [
        'What is the New York vehicle identification receipt?',
        'An intrastate carrier registers each vehicle and pays a small annual fee for a New York vehicle identification receipt rather than the federal UCR, which applies to interstate operations. It is easy to overlook because it is not an insurance product, but a missing receipt is a registration problem that surfaces at a roadside inspection.',
      ],
    ],
    sources: [
      {
        label: 'NYSDOT, truck registration and licensing (Form E and Form H requirements)',
        href: 'https://www.dot.ny.gov/divisions/operating/osss/truck/registration-licensing',
      },
      {
        label: '17 NYCRR 855.1, minimum liability insurance for motor carriers',
        href: 'https://www.law.cornell.edu/regulations/new-york/17-NYCRR-855.1',
      },
      {
        label: 'New York Insurance Law 5102, no-fault basic economic loss',
        href: 'https://www.nysenate.gov/legislation/laws/ISC/5102',
      },
    ],
  },

  'new-jersey': {
    seoTitle: 'Commercial Truck Insurance in New Jersey: $1.5M Minimum, Who It Reaches',
    seoDescription:
      'New Jersey requires $1,500,000 for heavy trucks registered or garaged in the state — double the federal floor — and it applies to interstate trucks plated there too. Limits by weight.',
    intro: [
      'New Jersey doubled the liability requirement for its heavy trucks in 2024, and the number is still catching people out at renewal. A commercial vehicle of 26,001 lbs or more, registered or principally garaged in New Jersey, needs $1,500,000 in combined single limit coverage. The federal floor for the same truck running interstate is $750,000.',
      'The part that surprises carriers is the scope. The statute attaches the limit to the vehicle rather than to the trip, so a New Jersey-plated tractor running to California and back is still a New Jersey $1.5 million truck. The Motor Vehicle Commission asks for a certificate showing that limit before an apportioned truck goes on the road.',
      'There is no state Form E for general freight the way New York and Pennsylvania have one. The requirement is enforced through registration, which means it can be missed entirely until someone checks the policy against the plate.',
    ],
    regulator: {
      name: 'New Jersey Motor Vehicle Commission, with minimums set by statute (N.J.S.A. 39:6B-1)',
      authority: 'No general-freight state filing; the limit is enforced at registration and through the IRP process',
      plain:
        'New Jersey does not run a state insurance filing desk for ordinary property carriers. The minimum attaches to any commercial motor vehicle registered or principally garaged in the state, and the MVC checks it when a truck is registered or apportioned. Household goods movers are the exception: they are licensed by the Division of Consumer Affairs and file certificates of insurance with cargo coverage at $1.00 per pound per article. A truck registered in another state, or base-plated elsewhere for IRP purposes, is outside the New Jersey tiers and answers to its home state plus the federal rules.',
    },
    filing: {
      form: 'No Form E for general freight; a certificate of insurance showing $1,500,000 is required for apportioned plates',
      filedBy: 'You, through registration and the IRP process; the insurer supplies the certificate',
      when:
        'At registration and at every renewal. Because there is no filing that lapses visibly, a policy written below the tier is easy to miss until a registration or an audit surfaces it.',
    },
    limits: [
      { operation: 'Commercial motor vehicle, 26,001 lbs GVWR or more, and autocabs', limit: '$1,500,000 combined single limit' },
      { operation: 'Commercially registered vehicle, 10,001 to 26,000 lbs GVWR', limit: '$300,000 combined single limit' },
      { operation: 'Vehicles under 10,001 lbs, policies from 1 January 2026', limit: '$35,000 / $70,000 bodily injury, $25,000 property damage' },
      { operation: 'Bulk hazardous substances and the listed high-hazard classes', limit: '$5,000,000' },
      { operation: 'Licensed public movers, cargo', limit: '$25,000 per vehicle / $50,000 aggregate' },
    ],
    limitsNote:
      'The $1,500,000 does not have to sit in a single primary policy. The statute allows a commercial auto policy, a fleet policy, an umbrella or excess policy, or a combination to reach the limit, which is usually cheaper than buying a $1.5 million primary layer. The tiers took effect for policies issued or renewed from 1 July 2024, so any policy written before that date needs checking rather than assuming.',
    whoNeeds: [
      'Any carrier with a heavy truck registered or principally garaged in New Jersey, whether or not it ever hauls intrastate. The statute has no intrastate carve-out.',
      'Carriers moving up to the 26,001 lb line, who sit in the $300,000 tier and often assume the $1.5 million figure applies to them. It does not — but one heavier unit changes that.',
      'Port drayage operators at Newark and Elizabeth, who also need trailer interchange coverage under the UIIA before the terminals will release equipment.',
      'Household goods movers, who need the consumer affairs licence and the cargo certificates on top of the vehicle limits.',
    ],
    local: [
      {
        heading: 'Port Newark is a documentation market before it is a driving one',
        body:
          'Container work at Newark and Elizabeth runs on the UIIA — the uniform interchange agreement that decides whether a terminal hands you a chassis. Without trailer interchange coverage and the right certificate on file, the equipment does not move, regardless of how good the auto policy is. It is the one place in the state where the insurance requirement that stops you is not the statutory minimum.',
      },
      {
        heading: 'The Turnpike corridor is a warehouse economy',
        body:
          'New Jersey is where a large share of the northeast\'s freight gets stored before it goes anywhere else. That produces short runs between warehouses, high frequency, tight appointment windows and a lot of backing accidents in yards. It is a different loss pattern from over-the-road work and it is priced differently, which is why the radius and the operation description matter as much as the vehicle count.',
      },
      {
        heading: 'The river crossings set the schedule',
        body:
          'A New Jersey carrier serving New York is exposed to bridge and tunnel tolls, congestion pricing on the Manhattan side, and unpredictable crossing times that turn a two-hour delivery into a five-hour one. That does not change the statutory limit, but it changes hours-of-service exposure, driver fatigue and the on-time penalties in customer contracts — all of which show up in the underwriting conversation.',
      },
    ],
    faqs: [
      [
        'Does the $1.5 million requirement apply to my interstate trucks?',
        'If they are registered or principally garaged in New Jersey, yes. The statute attaches the limit to the vehicle, not to the trip, and the MVC asks for a $1.5 million certificate before an apportioned truck is plated. The Department of Banking and Insurance and the MVC have both confirmed the rule does not reach vehicles registered elsewhere or base-plated in another IRP jurisdiction — so a Pennsylvania carrier running through New Jersey is not caught, but a New Jersey carrier running through Pennsylvania is.',
      ],
      [
        'Can I meet the limit with an umbrella policy?',
        'Yes. The statute allows the required limit to be met with a commercial auto policy, a fleet policy, an umbrella or excess policy, or any combination. For many fleets a $1 million primary plus a $500,000 umbrella is cheaper than a single $1.5 million primary policy, and the certificate can be written to show the combined limit.',
      ],
      [
        'Do I need a state insurance filing in New Jersey?',
        'Not for general freight. Unlike New York, Pennsylvania, Illinois and Texas, New Jersey enforces the minimum through registration rather than a state filing. That makes it easier to operate and easier to get wrong, because there is no filing notice to tell you the policy does not meet the tier.',
      ],
      [
        'What changed on 1 January 2026?',
        'The standard auto minimums for vehicles under 10,001 lbs rose to $35,000 per person and $70,000 per accident for bodily injury with $25,000 property damage. Those are the ordinary auto figures, below the commercial tiers. They matter mostly to light vehicles in a mixed fleet, and to anyone who last reviewed a policy before the change.',
      ],
    ],
    sources: [
      {
        label: 'N.J.S.A. 39:6B-1, maintenance of motor vehicle liability insurance coverage',
        href: 'https://law.justia.com/codes/new-jersey/title-39/section-39-6b-1/',
      },
      {
        label: 'New Jersey DOBI Bulletin 24-07 (P.L. 2023, c.276 minimum limits)',
        href: 'https://nj.gov/dobi/bulletins/blt24_07Statement.pdf',
      },
      {
        label: 'NJ MVC, International Registration Plan guidance',
        href: 'https://www.nj.gov/mvc/business/irp.htm',
      },
    ],
  },

  pennsylvania: {
    seoTitle: 'Commercial Truck Insurance in Pennsylvania: PUC Authority, Form E, Limits',
    seoDescription:
      'Pennsylvania intrastate authority comes from the PUC, not PennDOT, and a USDOT or MC number does not cover it. Form E and Form H limits, the 17,001 lb rule, and what to prepare.',
    intro: [
      'Pennsylvania splits its truck regulation between two agencies in a way that catches carriers out: PennDOT handles registration and safety, but the right to haul for hire inside the state comes from the Public Utility Commission. A USDOT number and an MC number do not authorise intrastate work here, and the PUC says so directly.',
      'The test is whether you are paid and whether both ends of the trip are in Pennsylvania. If they are, you need a certificate of public convenience and a PUC number, and your insurer has to file proof of coverage before the authority is worth anything. There is a 60-day window after approval to get the filing in, and a lapsed filing cancels the authority rather than just suspending a privilege.',
      'Pennsylvania also has two numbers that do not match the federal ones, and both are worth knowing before you buy plates or hire a driver.',
    ],
    regulator: {
      name: 'Pennsylvania Public Utility Commission, Motor Carrier Division',
      authority: 'Certificate of public convenience and a PUC number for intrastate for-hire property carriage',
      plain:
        'The PUC regulates roughly seven and a half thousand motor carriers of property, passengers and household goods. A property carrier applies for a certificate, pays a one-time fee and receives a PUC number. PennDOT issues registration and permits but not the right to haul intrastate for compensation. Interstate carriers are outside PUC jurisdiction entirely, which is exactly why a carrier can hold federal authority and still be operating illegally between two Pennsylvania points.',
    },
    filing: {
      form: 'Form E for liability, Form H for cargo',
      filedBy: 'Your insurer, electronically, through the commission\'s filing system',
      when:
        'Within 60 days of the authority being approved, and continuously after that. The PUC accepts only binding Form E and Form H certificates transmitted by the insurance company — a certificate of insurance from an agent is not binding and is not accepted. If the filing lapses, the authority is cancelled and reinstating it takes a written petition.',
    },
    limits: [
      { operation: 'Property or household goods carrier, vehicle rated 10,000 lbs GVWR/GCWR or less', limit: '$300,000 per accident' },
      { operation: 'Property or household goods carrier, vehicle rated over 10,000 lbs', limit: '$750,000 per accident' },
      { operation: 'Cargo, common carriers of property', limit: '$5,000', note: 'Waivable by affidavit for dump trucks, bulk construction materials, farm products or loads under $500' },
      { operation: 'Bulk hazardous substances and the listed classes', limit: '$5,000,000' },
      { operation: 'Every Pennsylvania-registered vehicle', limit: '$15,000 / $30,000 / $5,000 plus $5,000 first-party medical' },
    ],
    limitsNote:
      'The liability figures are per vehicle and exclude cargo. Cargo is a separate $5,000 filing that federal general-freight rules do not require at all, which makes Pennsylvania one of the states where an intrastate carrier ends up with a certificate the interstate carrier next door does not have. The cargo waiver exists but is narrow: dump trucks, bulk construction materials, farm products, or no load worth more than $500.',
    whoNeeds: [
      'For-hire carriers moving property between two Pennsylvania points, including short local work where the truck never touches an interstate.',
      'Carriers who already hold an MC number and assume it covers their intrastate loads. It does not, and the PUC treats that as operating without authority.',
      'Dump and construction-material haulers, who can waive the cargo filing but still need the liability certificate.',
      'Household goods carriers, who need the PUC certificate with the consumer-protection obligations attached.',
    ],
    local: [
      {
        heading: 'The 17,001 lb line is a Pennsylvania peculiarity',
        body:
          'PennDOT and the State Police both apply the federal safety rules to intrastate trucks from 17,001 lbs GVWR rather than the federal 10,001, and a truck at or above that weight has to display a USDOT number. Pennsylvania also lets 18-year-old CDL holders drive intrastate with a K restriction, which the federal rules do not allow. Both facts are useful if you are hiring, and both are easy to get wrong if you assume the federal thresholds apply everywhere.',
      },
      {
        heading: 'The Lehigh Valley is a warehouse market with its own loss pattern',
        body:
          'Allentown, Bethlehem and the I-78 and I-81 corridors have become one of the densest logistics clusters on the east coast. That means short runs, yard manoeuvring, tight appointments and a claims profile closer to local delivery than to long haul. Carriers who describe this work as regional trucking often get a rate built for highway miles, which is the wrong exposure.',
      },
      {
        heading: 'Winter and the turnpike decide the physical damage year',
        body:
          'Pennsylvania gets lake-effect snow in the northwest and ice on the turnpike through the middle of the state, and both produce a claim pattern that underwriters read across the whole year. If most of your miles are on the turnpike in January, the stated value of the equipment and the deductible matter more than the liability limit does.',
      },
    ],
    faqs: [
      [
        'Do I need PUC authority if I already have a USDOT and MC number?',
        'Yes, for intrastate work. The PUC states that a federal DOT or MC number does not authorise intrastate hauling in Pennsylvania, and the two systems are separate. If you haul both interstate and between two Pennsylvania points, you need both, with the federal BMC-91X or BMC-91 filing at FMCSA and the Form E at the PUC.',
      ],
      [
        'Who files the Form E?',
        'Your insurance company, directly and electronically. The PUC is explicit that certificates of insurance from an agent are not binding and are not accepted, and that mailed forms are no longer taken. The name and address on the Form E have to match the application exactly, which is the most common reason a Pennsylvania filing is rejected.',
      ],
      [
        'Is $750,000 enough in Pennsylvania?',
        'It is the PUC minimum for a vehicle over 10,000 lbs, and it is rarely what a shipper wants. Brokers and shippers commonly require $1,000,000 in liability and $100,000 in cargo before tendering freight, and the PUC figure excludes cargo entirely. The minimum buys the certificate; the contract buys the load.',
      ],
      [
        'What happens if the insurance filing lapses?',
        'The authority is cancelled, not merely suspended, and reinstating it requires a written petition within 20 days. That is a harsher consequence than most states impose, and it means the renewal date of the policy is effectively the renewal date of the operating authority.',
      ],
    ],
    sources: [
      {
        label: 'PA PUC, motor carrier insurance filings (Form E, Form H)',
        href: 'https://www.puc.pa.gov/motor-carrier/insurance',
      },
      {
        label: '52 Pa. Code 32.12, minimum liability for property carriers',
        href: 'https://www.pacodeandbulletin.gov/Display/pacode?file=/secure/pacode/data/052/chapter32/s32.12.html',
      },
      {
        label: 'PA PUC, intrastate authority FAQs',
        href: 'https://www.puc.pa.gov/media/3066/motor_carrier_faq062524.pdf',
      },
    ],
  },

  illinois: {
    seoTitle: 'Commercial Truck Insurance in Illinois: Public Carrier Certificate, Limits',
    seoDescription:
      'Illinois for-hire carriers need an ICC Public Carrier Certificate, and a federal MC number does not replace it. Form E and Form H limits, the cab card rule, and what to prepare.',
    intro: [
      'Illinois is one of the states where the intrastate credential is a genuine second authority rather than a formality. The Illinois Commerce Commission issues a Public Carrier Certificate for for-hire property carriage inside the state, and the commission answers the obvious question directly: yes, you need one even if you already hold federal authority from FMCSA.',
      'The certificate has no weight threshold. The trigger is being paid to haul property between two Illinois points, not the size of the truck, which means a cargo van doing local for-hire work is in scope alongside a tractor-trailer.',
      'What changes with weight is the insurance. Illinois splits its liability minimum at 10,000 lbs GVWR, and it also requires a cargo filing that federal general-freight rules do not ask for — with a waiver for carriers who genuinely never haul anything valuable.',
    ],
    regulator: {
      name: 'Illinois Commerce Commission, Transportation Division',
      authority: 'Public Carrier Certificate (PCC) and an ILCC number; cab card per vehicle',
      plain:
        'The PCC covers for-hire transportation of property other than household goods over Illinois public roads in intrastate commerce. It costs $50 to apply, and every vehicle used in for-hire service carries an ICC cab card at $5 per vehicle per year, bought before 1 January — carriers that also run interstate and pay UCR are exempt from the cab card. The certificate stays valid indefinitely while you comply, and insurance on file is part of that compliance. Private carriage sits outside the requirement under the exemption for transportation incidental to a primary business that is not transportation.',
    },
    filing: {
      form: 'Form E for liability, Form H for cargo, or a cargo waiver affidavit',
      filedBy: 'Your insurer, which must be authorised to write the coverage in Illinois',
      when:
        'Before the certificate issues, and continuously after. A lapse can suspend the certificate and you may not operate while it is suspended; filing proof of coverage lifts the suspension at no charge. The Form H is $5,000 per vehicle and $10,000 per occurrence, with a lower single figure for dump, farm and livestock loads.',
    },
    limits: [
      { operation: 'Property, non-hazardous, vehicles over 10,000 lbs GVWR', limit: '$750,000' },
      { operation: 'Property, non-hazardous, only vehicles at or under 10,000 lbs GVWR', limit: '$300,000' },
      { operation: 'Oil, hazardous waste and listed hazardous materials', limit: '$1,000,000' },
      { operation: 'Bulk hazmat, explosives, poison gas, highway-route-controlled radioactive', limit: '$5,000,000', note: 'At any vehicle weight' },
      { operation: 'Cargo, common carriers', limit: '$5,000 per vehicle / $10,000 per occurrence' },
    ],
    limitsNote:
      'The $300,000 row only works if every freight vehicle in the operation is at or under 10,000 lbs GVWR. One heavier truck moves the filing to $750,000. The cargo requirement is the other thing federal rules do not impose on general freight: a carrier that will never haul cargo worth more than $5,000, and will not do a for-hire drive-away of a vehicle worth more than that, can file a waiver affidavit instead of coverage — but must tell each shipper in writing, before the job, that it carries no cargo insurance.',
    whoNeeds: [
      'For-hire carriers moving property between Illinois points, at any vehicle weight, including local courier and van work.',
      'Carriers holding federal authority who assume it covers their Chicago-area intrastate hauling. The ICC requires the PCC separately.',
      'Carriers running under another company\'s intrastate authority, which requires an equipment lease filed with the commission.',
      'Household goods movers, who need a separate household goods certificate rather than the PCC, with a higher fee and a tariff on file.',
    ],
    local: [
      {
        heading: 'Chicago is a rail town, and that shapes drayage',
        body:
          'A large share of the freight arriving in the Chicago area comes off intermodal ramps rather than over the road, and the yards around Joliet, Elwood and the south side run on short container moves with tight turn times. It is a drayage exposure with a rail schedule attached: high frequency, low average speed, a lot of yard work, and chassis that belong to someone else. Pricing it as general freight is the mistake.',
      },
      {
        heading: 'The warehouse belt extends past the state line',
        body:
          'The distribution corridor runs from the south suburbs up through the Wisconsin border and east toward Indiana, so a carrier can spend a week inside Illinois and still be handling freight that started or will end somewhere else. That decides whether a load is interstate, and the ICC is explicit that interstate and intrastate authority are separate. Carriers who work the belt usually need both.',
      },
      {
        heading: 'Winter and tolls are both line items',
        body:
          'Chicago winters produce a physical damage pattern that underwriters weigh across the year, and the tollway system means most metro miles are on roads where a missed transponder becomes an administrative cost. Neither changes the statutory minimum. Both change what the operation actually costs to insure and to run.',
      },
    ],
    faqs: [
      [
        'Does my federal MC number cover intrastate hauling in Illinois?',
        'No. The ICC states that federal authority from FMCSA does not replace the Public Carrier Certificate, and that a carrier must hold the PCC to move property for hire between Illinois points. Carriers doing both kinds of work hold both credentials and keep two sets of filings active.',
      ],
      [
        'Is there a weight threshold for the Illinois certificate?',
        'No. The trigger is the activity — for-hire transportation of property in intrastate commerce — not the size of the vehicle. Weight decides which insurance limit applies, not whether the certificate is required, which is different from most states on this list.',
      ],
      [
        'Do I always need cargo insurance in Illinois?',
        'Common carriers of property need a Form H at $5,000 per vehicle and $10,000 per occurrence. There is a waiver route for carriers that never haul cargo worth more than $5,000 in any vehicle and never do a for-hire drive-away of a vehicle worth more than that, but the waiver comes with an obligation to tell every shipper in writing that no cargo coverage is carried. For most carriers the filing is simpler than the disclosure.',
      ],
      [
        'What is the cab card?',
        'A per-vehicle credential at $5 per vehicle per year, bought before 1 January and carried in the truck. Carriers that also operate interstate and pay UCR are exempt from buying ICC cab cards. The intrastate-only carrier also displays its name and ILCC number on both sides of the power unit.',
      ],
    ],
    sources: [
      {
        label: 'Illinois Commerce Commission, Public Carrier Certificate',
        href: 'https://icc.illinois.gov/authority/public-carrier-certificate',
      },
      {
        label: 'ICC, motor carriers of property FAQ',
        href: 'https://icc.illinois.gov/Authority/Motor-Carrier-Property-FAQ',
      },
      {
        label: 'ICC, insurance requirements for the Public Carrier Certificate',
        href: 'https://icc.illinois.gov/Forms/Insurance-Public-Carrier',
      },
    ],
  },
};

export function getStateContent(slug: string): StateContent | undefined {
  return STATE_CONTENT[slug];
}
