import { PublicKey } from "@solana/web3.js";
import express from 'express';
import { useAgent } from '../middlewares/useAgent.js';
const router = express.Router();

router.use(useAgent)
router.post('/', async (req, res) => {
  const { amount } = req.body;

  try {
    const signature = await agent.openPerpTradeLong({
      price: 300, // $300 SOL Max price
      collateralAmount: 10, // 10 jitoSOL in
      collateralMint: new PublicKey("J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn"), // jitoSOL
      leverage: 50000, // x5
      tradeMint: new PublicKey("J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn"), // jitoSOL
      slippage: 0.3, // 0.3%
    });

    res.json({ amount });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed' });
  }
});

export default router