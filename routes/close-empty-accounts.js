import express from 'express';
import { useAgent } from './middlewares/useAgent.js';
const router = express.Router();

router.use(useAgent)
router.post('/', async (req, res) => {
  try {
    const { signature } = await agent.closeEmptyTokenAccounts();
    
    res.json({ signature });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed' });
  }
});

export default router