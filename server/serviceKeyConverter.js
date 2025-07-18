const fs = require('fs');

const jsonData = fs.readFileSync('./serviceAccountKey.json', 'utf-8');
const base64String = Buffer.from(jsonData).toString('base64');

console.log('✅ Base64 string generated:\n', base64String);
