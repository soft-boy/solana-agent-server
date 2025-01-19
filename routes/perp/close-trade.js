import { PublicKey } from "@solana/web3.js";
import express from 'express';
import { useAgent } from '../middlewares/useAgent.js';
const router = express.Router();

router.use(useAgent)
router.post('/', async (req, res) => {
  const { price, tradeMint: _tradeMint } = req.body;

  try {
    const signature = await agent.closePerpTradeLong({
      price, // 200 -> $200 SOL price
      tradeMint: new PublicKey(_tradeMint), // jitoSOL
    });

    res.json({ signature });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed' });
  }
});

export default router