const fs = require('fs');
const https = require('https');
const express = require("express");
const app = express();

const options = {
  key: fs.readFileSync('/etc/letsencrypt/archive/api.dmrs.space/privkey1.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/archive/api.dmrs.space/fullchain1.pem')
};

app.get('/', (req, res) => {
  res.send('Hello HTTPS!');
});

const server = https.createServer(options, app);

server.listen(443, () => {
  console.log('HTTPS Server Running at 443');
});

// 추가: Node.js 애플리케이션 실행 사용자에게 읽기 권한을 주는 부분
fs.chmod('/etc/letsencrypt/archive/api.dmrs.space/privkey1.pem', '644', (err) => {
  if (err) {
    console.error('Failed to change file permissions:', err);
  } else {
    console.log('File permissions changed successfully.');
  }
});
