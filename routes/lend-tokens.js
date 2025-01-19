import express from 'express';
import { useAgent } from './middlewares/useAgent.js';
const router = express.Router();

router.use(useAgent)
router.post('/', async (req, res) => {
  const { amount } = req.body;

  try {
    const signature = await agent.lendAssets(amount);

    res.json({ signature });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed' });
  }
});

export default router