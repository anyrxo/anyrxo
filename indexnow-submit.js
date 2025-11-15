#!/usr/bin/env node

/**
 * IndexNow URL Submission Script
 * Submit URLs to IndexNow for instant indexing across Bing, Yandex, and other search engines
 *
 * Usage:
 *   node indexnow-submit.js https://anyrxo.com
 *   node indexnow-submit.js https://anyrxo.com https://anyrxo.com/about
 */

const https = require('https');

const INDEXNOW_API_KEY = '43da5bf4d2624045afa865940f6eafd4';
const HOST = 'anyrxo.com';
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_API_KEY}.txt`;

// Get URLs from command line arguments or use default
const urls = process.argv.slice(2).length > 0
  ? process.argv.slice(2)
  : [`https://${HOST}`];

// Prepare the payload
const payload = JSON.stringify({
  host: HOST,
  key: INDEXNOW_API_KEY,
  keyLocation: KEY_LOCATION,
  urlList: urls
});

const options = {
  hostname: 'api.indexnow.org',
  path: '/indexnow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(payload)
  }
};

console.log('🚀 Submitting URLs to IndexNow...');
console.log('URLs:', urls);

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('\n📊 Response Status:', res.statusCode);

    switch(res.statusCode) {
      case 200:
        console.log('✅ SUCCESS! URLs submitted successfully to IndexNow');
        console.log('   Your URLs will be indexed across multiple search engines within hours!');
        break;
      case 400:
        console.log('❌ ERROR: Bad request - Invalid format');
        break;
      case 403:
        console.log('❌ ERROR: Forbidden - API key not valid');
        console.log('   Make sure', KEY_LOCATION, 'exists and contains the key');
        break;
      case 422:
        console.log('❌ ERROR: Unprocessable Entity - URLs don\'t belong to host or key mismatch');
        break;
      case 429:
        console.log('❌ ERROR: Too Many Requests - Please wait before submitting again');
        break;
      default:
        console.log('⚠️  Unexpected response:', res.statusCode);
        if (data) console.log('Response:', data);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Request failed:', error.message);
});

req.write(payload);
req.end();
