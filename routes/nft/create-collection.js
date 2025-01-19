import express from 'express';
import { useAgent } from '../middlewares/useAgent.js';
const router = express.Router();

router.use(useAgent)
router.post('/', async (req, res) => {
  const {
    name,
    uri,
    royaltyBasisPoints,
    creators,
  } = req.body;

  try {
    const collection = await agent.deployCollection({
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