const fetch = require('node-fetch'); // actually Node 18+ has fetch built-in, we can just use fetch

async function run() {
  const url = 'https://api.dataforseo.com/v3/dataforseo_labs/google/keyword_ideas/live';
  
  const payload = [{
    keywords: [
      "commercial truck insurance",
      "box truck insurance",
      "uber black insurance",
      "freight broker bond",
      "hot shot insurance"
    ],
    location_code: 2840, // US
    language_code: "en",
    limit: 100,
    include_serp_info: false
  }];

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': 'Basic dGV2YXRyb3N5YW4xMy4xN0BnbWFpbC5jb206ZGE4ODAwYzE1MzU5M2Q5Zg==',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json();
  if (data.tasks && data.tasks[0] && data.tasks[0].result) {
    const items = data.tasks[0].result[0].items;
    
    // Sort by search volume descending
    items.sort((a,b) => (b.keyword_info?.search_volume || 0) - (a.keyword_info?.search_volume || 0));
    
    console.log('Top 30 Keywords by Volume:');
    items.slice(0, 30).forEach(i => {
      const vol = i.keyword_info?.search_volume || 0;
      const cpc = i.keyword_info?.cpc || 0;
      const comp = i.keyword_info?.competition_level || 'N/A';
      console.log(\- "\" | Vol: \ | CPC: $\ | Comp: \\);
    });
  } else {
    console.log('Error or no data:', JSON.stringify(data, null, 2));
  }
}

run().catch(console.error);
