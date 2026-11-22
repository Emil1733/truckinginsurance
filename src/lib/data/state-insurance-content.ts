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
};

export function getStateContent(slug: string): StateContent | undefined {
  return STATE_CONTENT[slug];
}
