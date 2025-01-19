import { PublicKey } from "@solana/web3.js";
import express from 'express';
import { useAgent } from './middlewares/useAgent.js';
const router = express.Router();

router.use(useAgent)
router.post('/', async (req, res) => {
  const {
    targetTokenMint,
    amount,
    sourceTokenMin,
    slippage,
  } = req.body;

  try {
    const signature = await agent.trade(
      new PublicKey(targetTokenMint),
      amount, // 100
      new PublicKey(sourceTokenMin),
      slippage // 300 -> 3% slippage
    );

    res.json({ signature });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed' });
  }
});

export default router