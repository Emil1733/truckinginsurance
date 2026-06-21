import fs from 'fs';

async function testApi() {
  const FormData = (await import('formdata-node')).FormData;
  const { fileFromPathSync } = await import('formdata-node/file-from-path');

  try {
    const fd = new FormData();
    fd.append('file', fileFromPathSync('C:\\Users\\tevat\\truckinsurancesite\\web\\dummy.pdf'));
    fd.append('brokerName', 'Test Broker');
    fd.append('brokerAddress', '123 Main St');
    fd.append('dotNumber', '12345');
    fd.append('email', 'test@test.com');
    fd.append('companyName', 'Test Company');

    const res = await fetch('http://localhost:3000/api/generate-coi', {
      method: 'POST',
      body: fd
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('API Error:', text);
    } else {
      console.log('API Success!');
    }
  } catch (err) {
    console.error('Fetch Error:', err);
  }
}
testApi();
