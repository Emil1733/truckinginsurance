export interface StateInsuranceContext {
  focus: string;
  filingLabel: string;
  filingHref: string;
  filingNote: string;
}

const DEFAULT_CONTEXT: StateInsuranceContext = {
  focus: 'Confirm whether your operation is intrastate or interstate, then review the equipment, cargo, authority, and filing requirements that apply to your routes.',
  filingLabel: 'Federal BMC-91X filing guide',
  filingHref: '/filing/bmc91x-federal-filing-fmsca',
  filingNote: 'Use the federal filing guide as a starting point and confirm final requirements with a licensed professional.'
};

export const STATE_INSURANCE_CONTEXT: Record<string, StateInsuranceContext> = {
  california: {
    focus: 'California operators may need to distinguish intrastate work under the California Motor Carrier Permit from interstate operations. Review the MCP-65 resource alongside your insurance and operating-authority details.',
    filingLabel: 'California MCP-65 filing guide',
    filingHref: '/filing/mcp65-california-dmv-filing',
    filingNote: 'The MCP-65 page covers a California DMV filing topic; confirm whether it applies to your operation.'
  },
  texas: {
    focus: 'Texas operators should identify whether they are operating under state or federal authority and whether their routes cross state lines. Review the Texas Form E resource with your commercial auto details.',
    filingLabel: 'Texas Form E filing guide',
    filingHref: '/filing/form-e-texas-dmv-filing',
    filingNote: 'The Form E page covers a Texas financial-responsibility filing topic; confirm the correct filing for your operation.'
  },
  florida: {
    focus: 'Florida operators should document their operating radius, cargo, vehicle configuration, and authority status before requesting coverage. State and federal filing needs can differ by operation.',
    filingLabel: 'Federal BMC-91X filing guide',
    filingHref: '/filing/bmc91x-federal-filing-fmsca',
    filingNote: 'Review the federal filing path if your hot shot operation is interstate, then confirm Florida-specific requirements.'
  }
};

export function getStateInsuranceContext(slug: string): StateInsuranceContext {
  return STATE_INSURANCE_CONTEXT[slug] || DEFAULT_CONTEXT;
}
