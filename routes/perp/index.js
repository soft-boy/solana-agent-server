import express from 'express';
import closeTrade from './close-trade.js';
import openTrade from './open-trade.js';

const router = express.Router()

router.use('/close-trade', closeTrade);
router.use('/open-trade', openTrade);

export default router;