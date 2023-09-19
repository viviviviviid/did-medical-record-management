const https = require('https');
const fs = require('fs');
const express = require("express");
const cors = require("cors");

const app = express();

const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/api.dmrs.space/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/api.dmrs.space/fullchain.pem')
};

app.use(
  cors({ origin: true, credentials: true }),
  express.json(),
);

// 기존 라우트 추가
require("./routes/index.js")(app);

https.createServer(options, app).listen(5001, () => {
  console.log('HTTPS Server Running at 5001');
});
