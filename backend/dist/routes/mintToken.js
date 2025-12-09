import express from "express";
const router = express.Router();
router.post("/", async (req, res) => {
    console.log("data received from frontend ", req.body);
    const { Symbol } = req.body;
    return res.send({ Symbol });
});
export const mintTokensRoute = router;
//# sourceMappingURL=mintToken.js.map