import express from 'express';
import create3LandCollection from './create-3land-collection.js';
import create3LandNFT from './create-3land-nft.js';
import createCollection from './create-collection.js';

const router = express.Router()

router.use('/create-3land-collection', create3LandCollection);
router.use('/create-3land-nft', create3LandNFT);
router.use('/create-collection', createCollection);

export default router;