import { PublicKey } from "@solana/web3.js";
import express from 'express';
import { useAgent } from '../middlewares/useAgent.js';
const router = express.Router();

/**
 * @swagger
 * /perp/open-trade:
 *   post:
 *     summary: Open a Perpetual Trade
 *     description: Opens a new perpetual trade with the specified parameters, including price, collateral, leverage, and trade mint.
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
 *                 description: The maximum price for the trade (e.g., $300 for SOL).
 *                 example: 300
 *               collateralAmount:
 *                 type: number
 *                 description: The amount of collateral in the specified mint.
 *                 example: 10
 *               collateralMint:
 *                 type: string
 *                 description: The public key of the collateral mint.
 *                 example: "J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn"
 *               leverage:
 *                 type: number
 *                 description: The leverage for the trade (e.g., 50000 for x5).
 *                 example: 50000
 *               tradeMint:
 *                 type: string
 *                 description: The public key of the trade mint.
 *                 example: "J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn"
 *               slippage:
 *                 type: number
 *                 description: The acceptable slippage percentage (e.g., 0.3 for 0.3%).
 *                 example: 0.3
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
 *         description: Trade opened successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 signature:
 *                   type: string
 *                   description: The transaction signature for the opened trade.
 *       500:
 *         description: Server error - Failed to open trade.
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
  const { price, collateralAmount, collateralMint: _collateralMint, leverage, tradeMint, slippage } = req.body;

  try {
    const signature = await agent.openPerpTradeLong({
      price, // $300 SOL Max price
      collateralAmount, // 10 jitoSOL in
      collateralMint: new PublicKey(_collateralMint), // jitoSOL
      leverage, // 50000 -> x5
      tradeMint: new PublicKey(tradeMint), // jitoSOL
      slippage, // 0.3 -> 0.3%
    });

    res.json({ signature });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed' });
  }
});

export default router