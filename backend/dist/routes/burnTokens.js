import express from "express";
import { db } from "../db.js";
import { TokenInformation } from "../schema.js";
import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import { getAssociatedTokenAddress, createBurnInstruction, TOKEN_2022_PROGRAM_ID } from "@solana/spl-token";
const route = express.Router();
route.post("/", async (req, res) => {
    try {
        console.log("entering burn token api");
        const { mintAddress, ownerWallet, decimals, amount } = req.body.payload;
        console.log("burn data", mintAddress, ownerWallet, decimals, amount);
        const convertedBurnAmount = Number(amount) * 10 ** Number(decimals);
        const connection = new Connection("https://api.devnet.solana.com", "confirmed");
        const mintPubkey = new PublicKey(mintAddress);
        const ownerPubkey = new PublicKey(ownerWallet);
        // Get the user's associated token account (same logic as mint)
        const ownerTokenAccount = await getAssociatedTokenAddress(mintPubkey, ownerPubkey, false, TOKEN_2022_PROGRAM_ID);
        // Create burn instruction
        const burnInstruction = createBurnInstruction(ownerTokenAccount, // user’s token account
        mintPubkey, ownerPubkey, convertedBurnAmount, [], TOKEN_2022_PROGRAM_ID);
        // Create transaction
        const burnTransaction = new Transaction().add(burnInstruction);
        burnTransaction.feePayer = ownerPubkey;
        burnTransaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
        // Serialize for wallet signing
        const serializedTx = burnTransaction
            .serialize({
            requireAllSignatures: false,
        })
            .toString("base64");
        return res.status(200).json({
            success: true,
            transaction: serializedTx,
        });
    }
    catch (error) {
        console.error("Error in burning tokens", error);
        return res.status(500).json({ success: false, message: "Error in burning tokens" });
    }
});
export const burnTokens = route;
//# sourceMappingURL=burnTokens.js.map