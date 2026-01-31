-- SEED CONTENT DEPTH: The "Thickening" Script
-- This script injects rich, expert-written Markdown content into the programmatic pages.
-- Run this AFTER seed_violations.sql, seed_filings.sql, etc. have established the base rows.

-- =========================================================================
-- 1. VIOLATIONS (The "Kill Codes")
-- =========================================================================

-- 1.1: 395.8(e) False Logs
UPDATE violations 
SET content_markdown = E'
## The "Death Sentence" of Trucking
A **395.8(e)** violation is not a speeding ticket. In the eyes of an insurance underwriter, it is **proof of fraud**. Standard carriers like Progressive, Northland, and Great West essentially have a "kill switch" in their algorithms for this specific code. If they see it on your SMS scores, the quote is often auto-declined before a human even looks at it.

### Why It Happens
Most 395.8(e) violations today are not malicious attempts to cheat. In the age of ELDs, they are often:
1.  **ELD Disconnects:** Driving while unassigned driving time accumulates on the device.
2.  **Personal Conveyance (PC) Misuse:** Using PC to advance a load (even moving 1 mile to a safer parking spot can trigger this).
3.  **Clerical Errors:** Forgetting to change duty status from "On Duty" to "Driving" manually if the ELD lags.

### How We Fix It
We do not use standard markets for this. We go to the **Surplus Lines** market (Lloyds of London, Warren, Prime, etc.) who are willing to manually underwrite files.
1.  **The Narrative:** We write a cover letter explaining *exactly* why the error happened. "It was a malfunctioning unit" is a valid defense if backed by mechanic receipts.
2.  **The Quill:** We show proof of a new ELD system or a "Safety Director" service hire to prove the root cause is gone.
3.  **The Bind:** We secure a 6-month policy to keep your MC active while the violation ages off your 24-month rolling window.
'
WHERE code = '395.8(e)';

-- 1.2: 382.215 Controlled Substances (Drug Test)
UPDATE violations 
SET content_markdown = E'
## The "Nuclear Option" Code
A **382.215** violation means a driver was caught operating a CMV with knowledge of a positive drug test. This is functionally a career-ender in the standard market. Most brokers (Amazon, CH Robinson) will auto-reject your MC number if this code appears on a recent inspection, even if you fired the driver.

### The Problem: "Vicarious Liability"
Insurers are terrified of "Nuclear Verdict" lawsuits. If your company has a record of letting positive-testing drivers behind the wheel, a jury could award $10M+ in a negligence lawsuit. This makes you "Uninsurable" to 99% of agents.

### The Recovery Path
You cannot "fix" this with a generic safety plan. You need **radical separation**.
1.  **Termination Proof:** You must provide the official termination letter and SAP (Substance Abuse Professional) referral for the driver.
2.  **Zero-Tolerance Update:** We rewrite your company handbook to include mandatory hair-follicle testing (stricter than DOT urine tests) to prove to underwriters you are cleaner than the law requires.
3.  **The "Rehab" Policy:** We place you in a high-deductible Surplus Lines policy. It will be expensive, but it buys you the 12 months needed to dilute the SMS score impact.
'
WHERE code = '382.215';

-- 1.3: 395.8(a) No Record of Duty Status (No Logs)
UPDATE violations 
SET content_markdown = E'
## The "Ghost Driver" Violation
Driving with **No Record of Duty Status (395.8a)** is often treated worse than a form and manner error. It implies you are running completely off the grid. In the ELD era, this usually happens when:
*   The ELD is unplugged.
*   The driver logs in as a "Mechanic" or "Unidentified Driver" to hide hours.
*   Paper logs are not current during an ELD malfunction.

### Underwriter Perspectives
Insurers view this as **willful negligence**. If you have no logs, you have no proof you were not fatigued. If you have an accident with this violation active, the insurance claim might be denied under "Breach of Warranty" clauses in cheaper policies.

### Corrective Action Plan (CAP)
To get insured, we must submit a CAP that includes:
1.  **Administrative Lockout:** Proof that you have locked editing permissions for drivers on your ELD portal.
2.  **Auditing Software:** Enrollment in a 3rd party log auditing service (like KeepTruckin/Motive''s Pro tier) that flags "Ghost Driving" instantly.
'
WHERE code = '395.8(a)';

-- 1.4: 392.2S Speeding (15+ MPH)
UPDATE violations 
SET content_markdown = E'
## The "Reckless" Designation
There is speeding (5-10 over), and then there is **392.2S (15+ over)**. This is a "Serious Traffic Violation" in the FMCSRs.
*   **2 Serious Violations in 3 Years:** Your CDL is disqualified for 60 days.
*   **3 Serious Violations:** Disqualified for 120 days.

### Insurance Impact
A 15+ over ticket indicates "conscious disregard" for safety. It triggers strict scrutiny on your **CAB Report** (Central Analysis Bureau). Many insurers have a hard rule: "No drivers with a 15-over citation in the last 3 years."

### Strategy
If the driver is the owner (Owner-Operator), we have to fight the ticket or find a "Non-Standard" insurer.
1.  **DataQ Challenge:** If the speed limit sign was missing or obscured, we challenge it.
2.  **Speed Limiter:** We provide ECM downloads showing the truck is now governed at 65 MPH. This physical restriction often convinces underwriters to overlook the past human error.
'
WHERE code = '392.2S';


-- =========================================================================
-- 2. STATE FILINGS (The "Permit" Pages)
-- =========================================================================

-- 2.1: BMC-91X (Federal Liability)
UPDATE state_filings 
SET content_markdown = E'
## The Key to Active Authority
The **BMC-91X** is the specific form insurers assume to prove you have Public Liability insurance (usually $750k or $1M).
*   **Crucially:** You (the trucker) CANNOT file this. Only an insurance company with a "Filer Code" can submit it to the FMCSA.

### The "Grey Period" Trap
New authorities often get stuck in a catch-22:
1.  You need insurance to get active.
2.  You need an active MC to get loads to pay for insurance.
3.  **Our Fix:** We file the BMC-91X *digitally* the moment you bind. It updates the FMCSA SAFER system usually within 24 hours (vs 14 days for mail), minimizing your "burn rate" of paying for insurance without hauling loads.
'
WHERE form_id = 'BMC-91X';

-- 2.2: MCP-65 (California)
UPDATE state_filings 
SET content_markdown = E'
## California''s "Double Jeopardy"
If you operate in California, your federal MC number is not enough. You need state-specific authority (CA Number) and the **MCP-65** filing.
*   **The Trap:** California DMV is separate from federal FMCSA. Many carriers lose their plates because they have federal insurance but forgot the separate CA filing.
*   **The Cost:** Operating without a valid MCP (Motor Carrier Permit) leads to immediate impoundment of the truck in CA.
*   **Our Service:** We issue the MCP-65 same-day. We know the specific "Sacramento Shuffle" required to align your policy effective dates with DMV requirements.
'
WHERE form_id = 'MCP-65';


-- =========================================================================
-- 3. TRAILER PROFILES (The "Niche" Pages)
-- =========================================================================

-- 3.1: Hazmat Tanker
UPDATE trailer_risk_profiles 
SET content_markdown = E'
## The Billion Dollar Policy
Hauling Hazmat (Fuel, Chemicals, Crude) puts you in the highest bracket of liability.
*   **MCS-90 Endorsement:** Absolutely mandatory. It guarantees environmental restitution.
*   **Accident Scenarios:** A standard dry van spill is a broom cleanup. A tanker spill is an EPA Superfund site costing $200k+ per hour of remediation.

### Why Quotes Fail
Most agents try to quote this on standard forms. It fails because of "Pollution Exclusions".
We write this on **Commercial General Liability (CGL)** forms specifically designed for environmental impact, ensuring you are protected if a valve leaks in a client''s lot (Loading/Unloading coverage).
'
WHERE slug = 'hazmat-tanker-insurance';

-- 3.2: Hot Shot / Flatbed
UPDATE trailer_risk_profiles 
SET content_markdown = E'
## Speed vs Stability
Hot Shot trucking (3/4 ton pickups + Goosenecks) is the most scrutinized niche in 2026.
*   **The Problem:** High center of gravity + Heavy loads = Rollover Risk.
*   **Underwriter Hate:** Many insurers have exited the Hot Shot market due to inexperienced entrants during the "Gold Rush."

### Ensuring the Uninsurable
We specialize in "New Venture" Hot Shots. We know the 3 carriers left who still write 3500/4500/5500 RAM/Ford setups.
**Key Requirement:** We need your CDL (if over 26k GCWR) or a clear explanation of your Non-CDL status to avoid the "Unauthorized Operator" rejection.
'
WHERE slug = 'hot-shot-insurance'; -- Note: verify slug matches DB seeding if applicable, usually mapped to 'lowboy' or similar if not specific, but assume user might have added it.

