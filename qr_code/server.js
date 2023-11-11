const express = require("express");
const cors = require("cors");
const app = express();
const setupRoutes = require("./routes/index.js");
const port = 5003;

app.use(
  cors({ origin: true, credentials: true }),
  express.json(),
);

app.get('/', (req, res) => {
	res.send('QR API, "/"');
});


app.listen(port, () => {
  console.log("5003 QR서버가 정상적으로 실행되었습니다.");
});

setupRoutes(app);
