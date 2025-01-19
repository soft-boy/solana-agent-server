import { PublicKey } from "@solana/web3.js";
import express from 'express';
import { useAgent } from './middlewares/useAgent.js';
const router = express.Router();

router.use(useAgent)
router.post('/', async (req, res) => {
  const { mint, amountPerRecipient, recipients, priorityFee } = req.body;

  try {
    const recipientKeys = recipients.map(r => new PublicKey(r))
    const signature = await agent.sendCompressedAirdrop(
      new PublicKey(mint), // mint
      amountPerRecipient, // 42
      recipientKeys,
      priorityFee // priority fee in lamports
    );

    res.json({ amount });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed' });
  }
});

export default router