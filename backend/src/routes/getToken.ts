import express from "express";
import { db } from "../db.js";
import { TokenInformation } from "../schema.js";
import { eq } from "drizzle-orm";
const route = express.Router();

route.get("/", async (req, res) => {
  try {
    console.log("entering mint token get route");
    const { tokenToFind: tokenMintAddress } = req.query;
    console.log(req.query);
    console.log("tokenMintADdress", tokenMintAddress);


    console.log("before db call");

    const tokenInfo = await db
      .select()
      .from(TokenInformation)
      .where(eq(TokenInformation.mintAddress, tokenMintAddress as string));

    console.log("After db call", tokenInfo);

    return res.status(200).json({ success: true, data: tokenInfo });
  } catch (error) {
    console.error("Error in fetching token", error);
    return res.status(500).json({ message: "Error in fetching token from mint address" });
  }
});

export const getToken: express.Router = route;
