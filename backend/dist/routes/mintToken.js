import express from "express";
import { SystemProgram, Connection, Keypair, PublicKey, Transaction } from "@solana/web3.js";
import { MINT_SIZE, TOKEN_2022_PROGRAM_ID, createAssociatedTokenAccountInstruction, createInitializeMint2Instruction, createMintToInstruction, getAssociatedTokenAddress, getMinimumBalanceForRentExemptMint, } from "@solana/spl-token";
const router = express.Router();
router.post("/", async (req, res) => {
    try {
        console.log("Request came to backend");
        console.log(req.body);
        const { TokenName, Symbol, Decimals, Description, TotalSupply, connectedWalletPublicKey } = req.body;
        const convertedDecimals = Number(Decimals);
        const convertedTotalSupply = Number(TotalSupply);
        //connect to solana rpc
        const connection = new Connection("https://api.devnet.solana.com", "confirmed");
        //mint address pair
        const mintAddress = Keypair.generate();
        const owner = new PublicKey(connectedWalletPublicKey);
        //create an empty storage
        const rentExemption = await getMinimumBalanceForRentExemptMint(connection);
        const mintInstruction = SystemProgram.createAccount({
            fromPubkey: owner, // User pays for the account creation
            newAccountPubkey: mintAddress.publicKey,
            space: MINT_SIZE,
            lamports: rentExemption,
            programId: TOKEN_2022_PROGRAM_ID,
        });
        //instruction to initialize mint account
        const mintAccountInstruction = createInitializeMint2Instruction(mintAddress.publicKey, convertedDecimals, owner, owner, TOKEN_2022_PROGRAM_ID);
        const mintTransaction = new Transaction().add(mintInstruction, mintAccountInstruction);
        // CRITICAL FIX: User's wallet is the fee payer, not the mint address
        mintTransaction.feePayer = owner;
        mintTransaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
        // Mint address only signs because it's the new account being created
        mintTransaction.partialSign(mintAddress);
        //get the associated token account
        const ATA = await getAssociatedTokenAddress(mintAddress.publicKey, owner, false, TOKEN_2022_PROGRAM_ID);
        //token account instruction
        const tokenAccount = createAssociatedTokenAccountInstruction(owner, // payer
        ATA, owner, // owner
        mintAddress.publicKey, TOKEN_2022_PROGRAM_ID);
        //mint tokens to owner
        const mintToOwnerInstruction = createMintToInstruction(mintAddress.publicKey, ATA, owner, convertedTotalSupply, [], TOKEN_2022_PROGRAM_ID);
        //send Transaction
        const mintingAndTokenAccountTransaction = new Transaction().add(tokenAccount, mintToOwnerInstruction);
        // CRITICAL FIX: User's wallet is the fee payer, not the mint address
        mintingAndTokenAccountTransaction.feePayer = owner;
        mintingAndTokenAccountTransaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
        // No partial sign needed here - user will sign the entire transaction
        // mintingAndTokenAccountTransaction.partialSign(mintAddress); // REMOVED
        //create the serialized transaction and send to frontend to let user wallet sign them
        const serializedMintTx = mintTransaction.serialize({ requireAllSignatures: false }).toString("base64");
        const serializedMintingTx = mintingAndTokenAccountTransaction.serialize({ requireAllSignatures: false }).toString("base64");
        return res.status(200).json({
            success: true,
            mintAddress: mintAddress.publicKey.toBase58(),
            mintTx: serializedMintTx,
            mintAndSupplyTx: serializedMintingTx
        });
    }
    catch (error) {
        console.error("Error in creating and minting tokens", error);
        return res.status(500).json({ success: false, error: "Failed to create token" });
    }
});
export const mintTokensRoute = router;
//# sourceMappingURL=mintToken.js.map