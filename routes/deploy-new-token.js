import express from 'express';
import { useAgent } from './middlewares/useAgent.js';
const router = express.Router();

router.use(useAgent)
router.post('/', async (req, res) => {
  const { name, uri, symbol, decimals, initialSupply } = req.body;

  try {
    const result = await agent.deployToken(
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