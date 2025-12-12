import express from "express";
import { db } from "../db.js";
import { TokenInformation } from "../schema.js";
import { eq } from "drizzle-orm";
const route = express.Router();
route.get("/", async (req, res) => {
    try {
        console.log("finding token from reqeust");
        const { tokenToFind: tokenMintAddress } = req.query;
        const tokenInfo = await db
            .select()
            .from(TokenInformation)
            .where(eq(TokenInformation.mintAddress, tokenMintAddress));
        return res.status(200).json({ success: true, data: tokenInfo });
    }
    catch (error) {
        console.error("Error in fetching token", error);
        return res.status(500).json({ message: "Error in fetching token from mint address" });
    }
});
export const getToken = route;
//# sourceMappingURL=getToken.js.map