import { PublicKey } from "@solana/web3.js";
import express from 'express';
import { useAgent } from '../middlewares/useAgent.js';
const router = express.Router();

/**
 * @swagger
 * /perp/close-trade:
 *   post:
 *     summary: Close a Perpetual Trade
 *     description: Closes an open perpetual trade with the provided price and trade mint.
 *     tags:
 *       - PERP
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               price:
 *                 type: number
 *                 description: The price at which to close the perpetual trade.
 *                 example: 200
 *               tradeMint:
 *                 type: string
 *                 description: The public key of the trade mint (e.g., jitoSOL).
 *                 example: "SoLnAmINTAddReSS123456789"
 *               openai_api_key:
 *                 type: string
 *                 description: The OpenAI API key.
 *               rpc_url:
 *                 type: string
 *                 description: The Solana RPC URL.
 *               solana_private_key:
 *                 type: string
 *                 description: The Solana private key.
 *     responses:
 *       200:
 *         description: Trade closed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 signature:
 *                   type: string
 *                   description: The transaction signature of the closed trade.
 *       500:
 *         description: Server error - Failed to close trade.
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
  const { price, tradeMint: _tradeMint } = req.body;

  try {
    const signature = await req.agent.closePerpTradeLong({
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