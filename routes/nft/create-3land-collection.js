import express from 'express';
import { useAgent } from '../middlewares/useAgent.js';
const router = express.Router();

/**
 * @swagger
 * /nft/create-3land-collection:
 *   post:
 *     summary: Create a 3Land NFT Collection
 *     description: Creates a new 3Land NFT collection with the provided metadata. The transaction takes place on Devnet or Mainnet based on the provided input.
 *     tags:
 *       - NFTs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isDevnet:
 *                 type: boolean
 *                 description: Specifies whether the transaction takes place on Devnet (true) or Mainnet (false). Default is Mainnet.
 *               collectionName:
 *                 type: string
 *                 description: The name of the NFT collection.
 *                 example: "My NFT Collection"
 *               collectionSymbol:
 *                 type: string
 *                 description: The symbol for the NFT collection.
 *                 example: "MNC"
 *               collectionDescription:
 *                 type: string
 *                 description: A brief description of the NFT collection.
 *                 example: "This is a collection of unique digital art."
 *               mainImageUrl:
 *                 type: string
 *                 description: URL of the main image representing the NFT collection.
 *                 example: "https://example.com/image.jpg"
 *               openai_api_key:
 *                 type: string
 *                 description: The OpenAI API key
 *               rpc_url:
 *                 type: string
 *                 description: The Solana RPC URL
 *               solana_private_key:
 *                 type: string
 *                 description: The Solana private key
 *     responses:
 *       200:
 *         description: Collection created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: object
 *                   description: Details of the created collection.
 *       500:
 *         description: Server error - Failed to create collection
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
    isDevnet,
    collectionName,
    collectionSymbol,
    collectionDescription,
    mainImageUrl
  } = req.body;

  try {
    const result = await req.agent.create3LandCollection(
      {
        collectionName,
        collectionSymbol,
        collectionDescription,
        mainImageUrl
      },
      isDevnet, // (Optional) if not present TX takes place in Mainnet
    );

    res.json({ result });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed' });
  }
});

export default router