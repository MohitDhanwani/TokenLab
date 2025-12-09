import express from "express";
const router = express.Router();

router.post("/", async (req, res) => {
  const { Symbol } = req.body;
  return res.send({ Symbol });
});

export const mintTokensRoute: express.Router = router;
