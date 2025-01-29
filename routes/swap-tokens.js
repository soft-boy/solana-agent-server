import { PublicKey } from "@solana/web3.js";
import express from 'express';
import { useAgent } from './middlewares/useAgent.js';
const router = express.Router();

/**
 * @swagger
 * /swap-tokens:
 *   post:
 *     summary: Swap Tokens
 *     description: Executes a token swap with the specified target token, amount, source token, and slippage.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               targetTokenMint:
 *                 type: string
 *                 description: The public key of the target token mint to receive.
 *                 example: "SoLnAmINTAddReSS123456789"
 *               amount:
 *                 type: number
 *                 description: The amount of the source token to swap.
 *                 example: 100
 *               sourceTokenMin:
 *                 type: string
 *                 description: The public key of the source token mint to swap from.
 *                 example: "SoLnAmINTAddReSS987654321"
 *               slippage:
 *                 type: number
 *                 description: The maximum allowable slippage in basis points (e.g., 300 for 3%).
 *                 example: 300
 *               rpc_url:
 *                 type: string
 *                 description: The Solana RPC URL.
 *               solana_private_key:
 *                 type: string
 *                 description: The Solana private key.
 *     responses:
 *       200:
 *         description: Token swap executed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 signature:
 *                   type: string
 *                   description: The transaction signature for the token swap.
 *       500:
 *         description: Server error - Failed to execute token swap.
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
  const {
    targetTokenMint,
    amount,
    sourceTokenMin,
    slippage,
  } = req.body;

  try {
    const signature = await req.agent.trade(
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