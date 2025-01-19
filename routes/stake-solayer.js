import express from 'express';
import { useAgent } from './middlewares/useAgent.js';
const router = express.Router();

/**
 * @swagger
 * /stake-solayer:
 *   post:
 *     summary: Stake SOL on Solayer
 *     description: Allows a user to stake SOL by providing the required parameters.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 description: The amount of SOL to stake
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
 *               - amount
 *               - openai_api_key
 *               - rpc_url
 *               - solana_private_key
 *     responses:
 *       200:
 *         description: Successfully staked SOL
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 signature:
 *                   type: string
 *                   description: The transaction signature
 *                   example: "5KJsgBwYeZvdk8fxfKJ9mcAj8NSQXKk8nktmWxgDg2yMAQniSwmD7Aj9EH9L7"
 *       400:
 *         description: Missing or invalid parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Missing required parameters
 */
router.use(useAgent)
router.post('/', async (req, res) => {
  const { amount } = req.body;

  if (typeof amount !== 'number') {
    return res.status(400).json({ error: 'Invalid or missing amount parameter' });
  }

  try {
    // Use the agent to perform staking (example method call)
    const signature = await req.agent.restake(amount);
    res.json({ signature });
  } catch (error) {
    console.error('Error performing staking:', error);
    res.status(500).json({ error: 'Failed to stake SOL' });
  }
});

export default router