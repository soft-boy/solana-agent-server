import express from 'express';
import { useAgent } from '../middlewares/useAgent.js';
const router = express.Router();

/**
 * @swagger
 * /nft/create-3land-nft:
 *   post:
 *     summary: Create a 3Land NFT
 *     description: Creates a new 3Land NFT under the specified collection. The transaction can occur on Devnet or Mainnet and optionally include a pool for listings.
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
 *                 description: Specifies whether the transaction occurs on Devnet (true) or Mainnet (false). Default is Mainnet.
 *               withPool:
 *                 type: boolean
 *                 description: Whether to create a pool for the NFT.
 *               collectionAccount:
 *                 type: string
 *                 description: The account of the collection to which the NFT belongs.
 *               itemName:
 *                 type: string
 *                 description: The name of the NFT item.
 *                 example: "Epic Sword"
 *               sellerFee:
 *                 type: number
 *                 description: The seller fee in basis points (e.g., 500 = 5%).
 *               itemAmount:
 *                 type: integer
 *                 description: The total number of items to be created.
 *               itemSymbol:
 *                 type: string
 *                 description: The symbol for the NFT item.
 *                 example: "ESWD"
 *               itemDescription:
 *                 type: string
 *                 description: A brief description of the NFT item.
 *                 example: "An epic sword forged in the fires of destiny."
 *               traits:
 *                 type: object
 *                 additionalProperties:
 *                   type: string
 *                 description: The traits of the NFT in key-value format.
 *                 example: { "rarity": "legendary", "damage": "500" }
 *               price:
 *                 type: number
 *                 description: The price of the NFT in lamports (1 SOL = 1,000,000,000 lamports).
 *               splHash:
 *                 type: string
 *                 description: The SPL token hash for listing, required if `withPool` is true. If not provided, the sale will be in SOL.
 *               poolName:
 *                 type: string
 *                 description: The name of the pool, required if `withPool` is true.
 *               mainImageUrl:
 *                 type: string
 *                 description: The URL of the main image for the NFT.
 *                 example: "https://example.com/nft-image.jpg"
 *               rpc_url:
 *                 type: string
 *                 description: The Solana RPC URL
 *               solana_private_key:
 *                 type: string
 *                 description: The Solana private key
 *     responses:
 *       200:
 *         description: NFT created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: object
 *                   description: Details of the created NFT.
 *       500:
 *         description: Server error - Failed to create NFT
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
    withPool,
    collectionAccount,
    itemName,
    sellerFee,
    itemAmount,
    itemSymbol,
    itemDescription,
    traits,
    price,
    splHash, //present if listing is on a specific SPL token, if not present sale will be on $SOL, must be present if "withPool" is true
    poolName, // Only present if "withPool" is true
    mainImageUrl
  } = req.body;

  try {
    const createItemOptions = {
      itemName,
      sellerFee, // 500 -> 5%
      itemAmount, //total items to be created
      itemSymbol,
      itemDescription,
      traits,
      price, //100000000 == 0.1 sol, can be set to 0 for a free mint
      splHash, //present if listing is on a specific SPL token, if not present sale will be on $SOL, must be present if "withPool" is true
      poolName, // Only present if "withPool" is true
      mainImageUrl,
    };

    const result = await req.agent.create3LandNft(
      collectionAccount,
      createItemOptions,
      isDevnet, // (Optional) if not present TX takes place in Mainnet
      withPool
    );

    res.json({ result });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed' });
  }
});

export default router