const https = require('https');
const fs = require('fs');
const express = require("express");
const app = express();

const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/api.dmrs.space/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/api.dmrs.space/fullchain.pem')
};

app.get('/', (req, res) => {
  res.send('Hello HTTPS!');
});

https.createServer(options, app).listen(443, () => {
  console.log('HTTPS Server Running at 443');
});
