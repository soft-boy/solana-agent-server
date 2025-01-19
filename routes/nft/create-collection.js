import express from 'express';
import { useAgent } from '../middlewares/useAgent.js';
const router = express.Router();

/**
 * @swagger
 * /nft/create-collection:
 *   post:
 *     summary: Create a new NFT collection
 *     description: Deploys a new NFT collection with the provided metadata and configuration.
 *     tags:
 *       - NFTs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the NFT collection.
 *                 example: "My NFT Collection"
 *               uri:
 *                 type: string
 *                 description: The URI pointing to the collection metadata (e.g., on Arweave or IPFS).
 *                 example: "https://arweave.net/metadata.json"
 *               royaltyBasisPoints:
 *                 type: integer
 *                 description: The royalty fee for the collection in basis points (e.g., 500 = 5%).
 *                 example: 500
 *               creators:
 *                 type: array
 *                 description: A list of creators for the collection, with their shares.
 *                 items:
 *                   type: object
 *                   properties:
 *                     address:
 *                       type: string
 *                       description: The creator's Solana wallet address.
 *                       example: "SoLnA1wALleTAddResS123"
 *                     share:
 *                       type: integer
 *                       description: The percentage share for this creator (0-100).
 *                       example: 50
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
 *         description: Collection created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 collection:
 *                   type: object
 *                   description: Details of the deployed collection.
 *       500:
 *         description: Server error - Failed to create collection.
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
    name,
    uri,
    royaltyBasisPoints,
    creators,
  } = req.body;

  try {
    const collection = await req.agent.deployCollection({
      name, // "My NFT Collection"
      uri, // "https://arweave.net/metadata.json"
      royaltyBasisPoints, // 500 -> 5%
      creators,
    });

    res.json({ collection });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed' });
  }
});

export default router