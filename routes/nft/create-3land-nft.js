import express from 'express';
import { useAgent } from '../middlewares/useAgent.js';
const router = express.Router();

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

    const result = await agent.create3LandNft(
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