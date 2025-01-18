import express from 'express';
import { useAgent } from './middlewares/useAgent.js';
const router = express.Router();

/**
 * @swagger
 * /get-sol-price:
 *   post:
 *     summary: Get the current price of SOL.
 *     description: Fetches the Pyth price feed ID for "SOL" and retrieves its current price.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               openai_api_key:
 *                 type: string
 *                 description: The OpenAI API key
 *               rpc_url:
 *                 type: string
 *                 description: The Solana RPC URL
 *               solana_private_key:
 *                 type: string
 *                 description: The Solana private key
 *             required:
 *               - openai_api_key
 *               - rpc_url
 *               - solana_private_key
 *     responses:
 *       200:
 *         description: Successfully retrieved the price of SOL.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 price:
 *                   type: number
 *                   description: The current price of SOL.
 *                   example: 32.54
 *       500:
 *         description: Server error while fetching the price.
 */
router.use(useAgent)
router.post('/', async (req, res) => {
  const priceFeedID = await req.agent.getPythPriceFeedID("SOL");
  const price = await req.agent.getPythPrice(priceFeedID);
  res.json({ price });
});

export default router