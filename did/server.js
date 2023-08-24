import express from "express";
import cors from "cors";
import setupRoutes from "./routes/index.js";

const app = express();
const port = 5002;

app.use(
  cors({ origin: true, credentials: true }),
  express.json(),
);

app.listen(port, () => {
  console.log("서버가 정상적으로 실행되었습니다.");
});

setupRoutes(app);
