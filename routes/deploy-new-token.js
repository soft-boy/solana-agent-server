import express from 'express';
import { useAgent } from './middlewares/useAgent.js';
const router = express.Router();

/**
 * @swagger
 * /deploy-new-token:
 *   post:
 *     summary: Deploy a New Token
 *     description: Creates and deploys a new token with the specified parameters, including name, symbol, decimals, and initial supply.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the new token.
 *                 example: "My AI Token"
 *               uri:
 *                 type: string
 *                 description: The metadata URI for the token.
 *                 example: "https://example.com/token-metadata.json"
 *               symbol:
 *                 type: string
 *                 description: The symbol for the token.
 *                 example: "AIT"
 *               decimals:
 *                 type: integer
 *                 description: The number of decimals for the token.
 *                 example: 9
 *               initialSupply:
 *                 type: number
 *                 description: The initial supply of the token.
 *                 example: 1000000
 *               rpc_url:
 *                 type: string
 *                 description: The Solana RPC URL.
 *               solana_private_key:
 *                 type: string
 *                 description: The Solana private key.
 *     responses:
 *       200:
 *         description: Token deployed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tokenMintAddress:
 *                   type: string
 *                   description: The public key of the newly minted token.
 *                   example: "SoLnAToKeNAddReSS123456789"
 *       500:
 *         description: Server error - Failed to deploy token.
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
  const { name, uri, symbol, decimals, initialSupply } = req.body;

  try {
    const result = await req.agent.deployToken(
      name, // "my ai token"
      uri, // "uri"
      symbol, // "token"
      decimals, // 9
      initialSupply // 1000000
    );

    res.json({ tokenMintAddress: result.mint.toString() });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed' });
  }
});

export default router