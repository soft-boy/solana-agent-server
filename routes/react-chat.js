import express from 'express';
import { useReActAgent } from './middlewares/useReActAgent.js';
const router = express.Router();

/**
 * @swagger
 * /react-chat:
 *   post:
 *     summary: Chat with SAK ReAct Agent.
 *     description: ReAct Chat.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               input:
 *                 type: string
 *                 description: user input
 *               rpc_url:
 *                 type: string
 *                 description: The Solana RPC URL
 *               solana_private_key:
 *                 type: string
 *                 description: The Solana private key
 *             required:
 *               - input
 *               - rpc_url
 *               - solana_private_key
 *     responses:
 *       200:
 *         description: Text response.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: text
 *                   description: text response
 *       500:
 *         description: Server error while fetching the price.
 */
router.use(useReActAgent)
router.post('/', async (req, res) => {
  const { input } = req.body;
  const response = await req.agent.invoke({ messages: [input] });
  res.json({ response });
});

export default router