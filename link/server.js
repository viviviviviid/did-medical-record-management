const express = require("express");
const cors = require("cors");
const https = require('https');
const fs = require('fs');
const app = express();
const setupRoutes = require("./routes/index.js");
const port = 5003;

const httpsOptions = {
  key: fs.readFileSync('/etc/letsencrypt/live/api.dmrs.space/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/api.dmrs.space/fullchain.pem')
};

app.use(
  cors({ origin: true, credentials: true }),
  express.json(),
);

app.get('/', (req, res) => {
	res.send('LINK API, "/"');
});

// app.listen(port, () => {
//     console.log("서버가 정상적으로 실행되었습니다.");
//   });

https.createServer(httpsOptions, app).listen(port, () => {
  console.log(`HTTPS 서버가 ${port} 포트에서 정상적으로 실행되었습니다.`);
});

setupRoutes(app);
