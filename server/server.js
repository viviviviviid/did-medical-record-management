const express = require("express");
const https = require('https');
const fs = require('fs');
const cors = require("cors");
const app = express();
const port = 5001;

const httpsOptions = {
    key: fs.readFileSync('/usr/local/etc/certs/api.dmrs.space-key.pem'),
    cert: fs.readFileSync('/usr/local/etc/certs/api.dmrs.space.pem')
};

app.use(cors());

app.get('/', (req, res) => {
    res.send('SERVER API, "/"');
});

// HTTPS 서버 시작
const server = https.createServer(httpsOptions, app).listen(port, () => {
    console.log(`HTTPS 서버가 ${port} 포트에서 정상적으로 실행되었습니다.`);
});

require("./routes/index.js")(app);
