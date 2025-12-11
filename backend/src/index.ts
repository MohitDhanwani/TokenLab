import express from "express";
import cors from "cors";
import { PORT, FRONTEND_URL } from "./config/index.js";
import { mintTokensRoute } from "./routes/mintToken.js";
import { getAllTokens } from "./routes/getAllTokens.js";
import { getToken } from "./routes/getToken.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: FRONTEND_URL,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.get("/get-api", (req, res) => {
  res.end("Server is working");
});

app.use("/v1/mintTokens", mintTokensRoute);
app.use("/v1/getAllTokens", getAllTokens);
app.use("/v1/getToken", getToken);

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
