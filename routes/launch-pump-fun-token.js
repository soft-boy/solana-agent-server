import express from 'express';
import { useAgent } from './middlewares/useAgent.js';
const router = express.Router();

/**
 * @swagger
 * /launch-pump-fun-token:
 *   post:
 *     summary: Launch Token on Pump.fun
 *     description: Create and launch tokens on Pump.fun with customizable metadata, social links, and initial liquidity pool settings.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tokenName
 *               - ticker
 *               - description
 *               - imgUrl
 *               - openai_api_key
 *               - rpc_url
 *               - solana_private_key
 *             properties:
 *               tokenName:
 *                 type: string
 *                 description: The name of the token. Example "Sample Token".
 *               ticker:
 *                 type: string
 *                 description: The ticker symbol of the token. Example  "SMPL".
 *               description:
 *                 type: string
 *                 description: A brief description of the token. Example "A sample token".
 *               imgUrl:
 *                 type: string
 *                 description: The URL of the token's image. Example "https://example.com/img".
 *               twitter:
 *                 type: string
 *                 description: The Twitter profile URL for the token (optional).
 *               telegram:
 *                 type: string
 *                 description: The Telegram channel URL for the token (optional).
 *               website:
 *                 type: string
 *                 description: The official website URL for the token (optional).
 *               initialLiquiditySOL:
 *                 type: number
 *                 description: Initial liquidity in SOL (minimum 0.0001). Default 0.0001.
 *               slippageBps:
 *                 type: number
 *                 description: Slippage tolerance in basis points (BPS). Default 5.
 *               priorityFee:
 *                 type: number
 *                 description: Priority fee in SOL. Default 0.00005.
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
 *         description: Token launched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: object
 *                   description: The result of the token launch operation.
 *       500:
 *         description: Failed to launch the token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 */
router.use(useAgent)
router.post('/', async (req, res) => {
  const {
    tokenName,
    ticker,
    description,
    imgUrl,
    twitter,
    telegram,
    website,
    initialLiquiditySOL,
    slippageBps,
    priorityFee  
  } = req.body;

  try {
    const result = await req.agent.launchPumpFunToken(
      tokenName,             // "Sample Token"
      ticker,                // "SMPL"
      description,           // "A sample token"
      imgUrl,                // "https://example.com/img"
      {
        twitter,
        telegram,
        website,
        initialLiquiditySOL, // Initial liquidity (min 0.0001)
        slippageBps,         // Slippage tolerance (default: 5)
        priorityFee          // Priority fee (default: 0.00005)
      }
    );

    res.json({ result });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed' });
  }
});

export default router