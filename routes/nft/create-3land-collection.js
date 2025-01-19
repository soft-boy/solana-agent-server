import express from 'express';
import { useAgent } from '../middlewares/useAgent.js';
const router = express.Router();

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
    const result = await agent.create3LandCollection(
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