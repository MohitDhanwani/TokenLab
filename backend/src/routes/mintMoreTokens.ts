import express from "express";
import { db } from "../db.js";
import { TokenInformation } from "../schema.js";
import { eq } from "drizzle-orm";
import { createMintToInstruction, getAssociatedTokenAddress, TOKEN_2022_PROGRAM_ID } from "@solana/spl-token";
import { Connection, PublicKey, Transaction } from "@solana/web3.js";
const route = express.Router();

route.post("/", async (req, res) => {
  try {
    const { mintAddress, ownerWallet, amount, decimals } = req.body.payload;
    const convertedMintAmount = Number(amount) * 10 ** Number(decimals);
    const connection = new Connection("https://api.devnet.solana.com", "confirmed");

    const mintPubkey = new PublicKey(mintAddress);
    const ownerPubkey = new PublicKey(ownerWallet);

    const getAccountToMintInstruction = await getAssociatedTokenAddress(mintPubkey, ownerPubkey, false, TOKEN_2022_PROGRAM_ID);
    const mintMoreTokensInstruction = createMintToInstruction(
      mintPubkey,
      getAccountToMintInstruction,
      ownerPubkey,
      convertedMintAmount,
      [],
      TOKEN_2022_PROGRAM_ID
    );

    const mintingMoreTokensTransaction = await new Transaction().add(mintMoreTokensInstruction);
    mintingMoreTokensTransaction.feePayer = ownerPubkey;
    mintingMoreTokensTransaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

    const serializedTx = mintingMoreTokensTransaction
      .serialize({
        requireAllSignatures: false,
      })
      .toString("base64");

    return res.status(200).json({ success: true, transaction: serializedTx });
  } catch (error) {
    console.error("Error in minting more tokens", error);
    return res.status(500).json({ message: "Error in minting more tokens" });
  }
});

export const mintMoreTokens: express.Router = route;
