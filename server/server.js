const express = require("express");
const https = require('https');
const fs = require('fs');
const cors = require("cors");
const app = express();
const port = 5001;

// const httpsOptions = {
//     key: fs.readFileSync('/etc/letsencrypt/live/api.dmrs.space/privkey.pem'),
//     cert: fs.readFileSync('/etc/letsencrypt/live/api.dmrs.space/fullchain.pem')
// };

app.use(
  cors({ origin: true, credentials: true }),
  express.json(),
);

app.get('/', (req, res) => {
    res.send('SERVER API, "/"');
});

app.listen(port, () => {
    console.log("서버가 정상적으로 실행되었습니다.");
  });


// https.createServer(httpsOptions, app).listen(port, () => {
//     console.log(`HTTPS 서버가 ${port} 포트에서 정상적으로 실행되었습니다.`);
// });

require("./routes/index.js")(app);
