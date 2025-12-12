import { eq } from "drizzle-orm";
import express from "express";
import { db } from "../db.js";
import { TokenInformation } from "../schema.js";
const route = express.Router();
route.post("/", async (req, res) => {
    try {
        console.log("inside update supply api");
        const { mintAddress, amount, isMinting } = req.body;
        if (!mintAddress) {
            return res.status(400).json({ message: "mintAddress is required" });
        }
        if (!amount) {
            return res.status(400).json({ message: "mintAmount is required" });
        }
        const dataToUpdate = await db.select().from(TokenInformation).where(eq(TokenInformation.mintAddress, mintAddress));
        if (dataToUpdate.length === 0) {
            return res.status(404).json({ message: "Token not found for this mintAddress" });
        }
        if (dataToUpdate[0].currentTotalSupply < amount && isMinting == false) {
            return res.status(400).json({ success: false, message: "Not enough tokens to burn" });
        }
        const currentSupply = Number(dataToUpdate[0]?.currentTotalSupply) || 0;
        let newSupply = 0;
        let dbresposnenew;
        if (isMinting == true) {
            console.log("user is minting more tokens");
            newSupply = currentSupply + Number(amount);
            dbresposnenew = await db
                .update(TokenInformation)
                .set({ currentTotalSupply: newSupply, mintAuthorityUsed: true })
                .where(eq(TokenInformation.mintAddress, mintAddress));
        }
        else if (isMinting == false) {
            console.log("user is burning more tokens");
            newSupply = currentSupply - Number(amount);
            dbresposnenew = await db
                .update(TokenInformation)
                .set({ currentTotalSupply: newSupply, freezeAuthorityUsed: true })
                .where(eq(TokenInformation.mintAddress, mintAddress));
        }
        return res.status(200).json({ success: true, newData: dbresposnenew });
    }
    catch (error) {
        console.error("Error in updating token supply in database ", error);
        return res.status(500).json({ message: "Error in updating supply of token in database" });
    }
});
export const updateSupply = route;
//# sourceMappingURL=updateSupply.js.map