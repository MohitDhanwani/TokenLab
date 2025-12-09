import express from "express";
import { SystemProgram, Connection, Keypair, PublicKey, Transaction } from "@solana/web3.js";
import { TOKEN_2022_PROGRAM_ID, createAssociatedTokenAccountInstruction, createMintToInstruction, getAssociatedTokenAddress, ExtensionType, getMintLen, createInitializeMetadataPointerInstruction, createInitializeMintInstruction, TYPE_SIZE, LENGTH_SIZE, } from "@solana/spl-token";
import { createInitializeInstruction, pack } from "@solana/spl-token-metadata";
const router = express.Router();
router.post("/", async (req, res) => {
    try {
        const { TokenName, Symbol, Decimals, Description, TotalSupply, connectedWalletPublicKey } = req.body;
        const convertedDecimals = Number(Decimals);
        const convertedTotalSupply = Number(TotalSupply);
        //connect to solana rpc
        const connection = new Connection("https://api.devnet.solana.com", "confirmed");
        //mint address pair
        const mintAddress = Keypair.generate();
        const owner = new PublicKey(connectedWalletPublicKey);
        const metadata = {
            mint: mintAddress.publicKey,
            name: TokenName,
            symbol: Symbol,
            uri: "",
            additionalMetadata: [],
        };
        // Calculate space needed for mint with metadata extension
        const metadataExtension = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length;
        const mintLen = getMintLen([ExtensionType.MetadataPointer]);
        const lamports = await connection.getMinimumBalanceForRentExemption(mintLen + metadataExtension);
        //create an empty storage with metadata extension space
        const mintInstruction = SystemProgram.createAccount({
            fromPubkey: owner,
            newAccountPubkey: mintAddress.publicKey,
            space: mintLen,
            lamports,
            programId: TOKEN_2022_PROGRAM_ID,
        });
        // Initialize metadata pointer (points to the mint itself)
        const initializeMetadataPointerInstruction = createInitializeMetadataPointerInstruction(mintAddress.publicKey, owner, // authority
        mintAddress.publicKey, // metadata address (same as mint)
        TOKEN_2022_PROGRAM_ID);
        //instruction to initialize mint account
        const mintAccountInstruction = createInitializeMintInstruction(mintAddress.publicKey, convertedDecimals, owner, owner, TOKEN_2022_PROGRAM_ID);
        // Initialize the metadata inside the mint
        const initializeMetadataInstruction = createInitializeInstruction({
            programId: TOKEN_2022_PROGRAM_ID,
            metadata: mintAddress.publicKey, //metadata is stored here in mint account only
            updateAuthority: owner,
            mint: mintAddress.publicKey,
            mintAuthority: owner,
            name: metadata.name,
            symbol: metadata.symbol,
            uri: metadata.uri,
        });
        const mintTransaction = new Transaction().add(mintInstruction, initializeMetadataPointerInstruction, mintAccountInstruction, initializeMetadataInstruction);
        mintTransaction.feePayer = owner;
        mintTransaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
        // Mint address signs because it's the new account being created
        mintTransaction.partialSign(mintAddress);
        //get the associated token account
        const ATA = await getAssociatedTokenAddress(mintAddress.publicKey, owner, false, TOKEN_2022_PROGRAM_ID);
        //token account instruction
        const tokenAccount = createAssociatedTokenAccountInstruction(owner, // payer
        ATA, owner, // owner
        mintAddress.publicKey, TOKEN_2022_PROGRAM_ID);
        //mint tokens to owner
        const mintToOwnerInstruction = createMintToInstruction(mintAddress.publicKey, ATA, owner, convertedTotalSupply * 10 ** convertedDecimals, [], TOKEN_2022_PROGRAM_ID);
        //send Transaction
        const mintingAndTokenAccountTransaction = new Transaction().add(tokenAccount, mintToOwnerInstruction);
        mintingAndTokenAccountTransaction.feePayer = owner;
        mintingAndTokenAccountTransaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
        //create the serialized transaction and send to frontend to let user wallet sign them
        const serializedMintTx = mintTransaction.serialize({ requireAllSignatures: false }).toString("base64");
        const serializedMintingTx = mintingAndTokenAccountTransaction.serialize({ requireAllSignatures: false }).toString("base64");
        return res.status(200).json({
            success: true,
            mintAddress: mintAddress.publicKey.toBase58(),
            mintTx: serializedMintTx,
            mintAndSupplyTx: serializedMintingTx,
            metadata: {
                name: TokenName,
                symbol: Symbol,
                description: Description,
            },
        });
    }
    catch (error) {
        console.error("Error in creating and minting tokens", error);
        return res.status(500).json({ success: false, error: "Failed to create token" });
    }
});
export const mintTokensRoute = router;
//# sourceMappingURL=mintToken.js.map