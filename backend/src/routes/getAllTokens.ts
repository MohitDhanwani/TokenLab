import express from "express";
import { db } from "../db.js";
import { TokenInformation } from "../schema.js";
import { eq } from "drizzle-orm";
const route = express.Router();

route.get("/", async (req, res) => {
  try {
    console.log("entering backedning for tokens");
    console.log(req.query);

    const { walletAddress: connectedWallet } = req.query;

    if (!connectedWallet || typeof connectedWallet !== "string") {
      return res.status(400).json({ message: "walletAddress query parameter is required" });
    }

    const allTokensData = await db.select().from(TokenInformation).where(eq(TokenInformation.ownerWallet, connectedWallet));
    console.log("all tokens from connected wallet", allTokensData);

    return res.status(200).json({ success: true, allWalletTokens: allTokensData });
  } catch (error) {
    console.error("Error in getting tokens for connected wallet", error);
    return res.status(500).json({ message: "Error in getting tokens" });
  }
});

export const getAllTokens: express.Router = route;
