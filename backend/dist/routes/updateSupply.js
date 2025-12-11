import express from "express";
import { db } from "../db.js";
import { TokenInformation } from "../schema.js";
import { eq } from "drizzle-orm";
const route = express.Router();
route.post("/", async (req, res) => {
    try {
        const { mintAddress, mintAmount } = req.body;
        if (!mintAddress) {
            return res.status(400).json({ message: "mintAddress is required" });
        }
        if (!mintAmount) {
            return res.status(400).json({ message: "mintAmount is required" });
        }
        const dataToUpdate = await db.select().from(TokenInformation).where(eq(TokenInformation.mintAddress, mintAddress));
        console.log("data to update", dataToUpdate);
        if (dataToUpdate.length === 0) {
            return res.status(404).json({ message: "Token not found for this mintAddress" });
        }
        const currentSupply = Number(dataToUpdate[0]?.currentTotalSupply) || 0;
        const newSupply = currentSupply + Number(mintAmount);
        const dbresposnenew = await db
            .update(TokenInformation)
            .set({ currentTotalSupply: newSupply, mintAuthorityUsed: true })
            .where(eq(TokenInformation.mintAddress, mintAddress));
        console.log("data after udpate", dbresposnenew);
        return res.status(200).json({ success: true, newData: dbresposnenew });
    }
    catch (error) {
        console.error("Error in updating token supply in database ", error);
        return res.status(500).json({ message: "Error in updating supply of token in database" });
    }
});
export const updateSupply = route;
//# sourceMappingURL=updateSupply.js.map