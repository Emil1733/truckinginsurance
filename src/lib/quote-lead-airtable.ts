import 'server-only';

export async function syncQuoteLead(fields: Record<string, string>) {
  const { AIRTABLE_PAT, AIRTABLE_BASE_ID, AIRTABLE_TABLE_ID } = process.env;
  if (!AIRTABLE_PAT || !AIRTABLE_BASE_ID || !AIRTABLE_TABLE_ID) {
    console.warn('Quote CRM sync skipped: Airtable configuration is missing.');
    return;
  }

  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}`;
  const headers = { Authorization: `Bearer ${AIRTABLE_PAT}`, 'Content-Type': 'application/json' };
  const normalizedEmail = fields.Email.trim().toLowerCase();
  const email = normalizedEmail.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  const query = new URLSearchParams({ maxRecords: '1', filterByFormula: `LOWER({Email})="${email}"` });

  // Recheck the contact before retrying because a failed response can follow a successful write.
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const lookup = await fetch(`${url}?${query}`, { headers, signal: AbortSignal.timeout(3000) });
      if (!lookup.ok && lookup.status !== 403) {
        console.error('Quote CRM lookup failed:', lookup.status);
        if (lookup.status < 500) return;
        continue;
      }
      // A write-only token can still upsert by email when lookup is forbidden.
      const records = lookup.ok
        ? ((await lookup.json()) as { records: { id: string; fields?: { Phone?: string } }[] }).records
        : [];
      const existing = records[0];
      const landingPage = fields['Landing Page'];
      const upsertFields = {
        ...fields,
        Email: normalizedEmail,
        ...(landingPage?.startsWith('/') && !landingPage.startsWith('//')
          ? { 'Landing Page': new URL(landingPage, 'https://www.truckcoverageexperts.com').href }
          : {}),
      };
      const updatedContact = { Status: fields.Status, Notes: fields.Notes };
      const response = await fetch(url, {
        method: 'PATCH',
        headers,
        signal: AbortSignal.timeout(3000),
        body: JSON.stringify(existing ? {
          records: [{
            id: existing.id,
            fields: {
              ...updatedContact,
              ...(!existing.fields?.Phone && fields.Phone ? { Phone: fields.Phone } : {}),
            },
          }],
        } : {
          performUpsert: { fieldsToMergeOn: ['Email'] },
          records: [{ fields: upsertFields }],
        }),
      });
      if (response.ok) return;
      console.error('Quote CRM write failed:', response.status);
      if (response.status < 500) return;
    } catch {
      console.error('Quote CRM request failed.');
    }
  }
}
