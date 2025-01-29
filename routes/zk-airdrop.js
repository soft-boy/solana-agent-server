import { PublicKey } from "@solana/web3.js";
import express from 'express';
import { useAgent } from './middlewares/useAgent.js';
const router = express.Router();

/**
 * @swagger
 * /zk-airdrop:
 *   post:
 *     summary: Compressed Airdrop
 *     description: Sends a compressed airdrop to a list of recipients with the specified mint and amount per recipient.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mint:
 *                 type: string
 *                 description: The public key of the token mint.
 *                 example: "SoLnAmINTAddReSS123456789"
 *               amountPerRecipient:
 *                 type: number
 *                 description: The amount of tokens to send to each recipient.
 *                 example: 42
 *               recipients:
 *                 type: array
 *                 description: A list of recipient public keys.
 *                 items:
 *                   type: string
 *                   example: "SoLnAwALLetAddReSS987654321"
 *               priorityFee:
 *                 type: number
 *                 description: The priority fee in lamports for the airdrop transaction.
 *                 example: 10000
 *               rpc_url:
 *                 type: string
 *                 description: The Solana RPC URL.
 *               solana_private_key:
 *                 type: string
 *                 description: The Solana private key.
 *     responses:
 *       200:
 *         description: Airdrop sent successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 amount:
 *                   type: number
 *                   description: The total amount airdropped to recipients.
 *       500:
 *         description: Server error - Failed to send airdrop.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed"
 */
router.use(useAgent)
router.post('/', async (req, res) => {
  const { mint, amountPerRecipient, recipients, priorityFee } = req.body;

  try {
    const recipientKeys = recipients.map(r => new PublicKey(r))
    const signature = await req.agent.sendCompressedAirdrop(
      new PublicKey(mint), // mint
      amountPerRecipient, // 42
      recipientKeys,
      priorityFee // priority fee in lamports
    );

    res.json({ signature });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed' });
  }
});

export default router