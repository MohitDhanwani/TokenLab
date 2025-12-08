import express from "express";
import { PORT } from "./config/index.js"

const app = express();

app.get("/get-api", (req, res) => {
    res.end("Server is working");
})

app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
})