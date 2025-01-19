import express from 'express';
import cors from 'cors';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import deployNewToken from './routes/deploy-new-token.js'
import launchPumpFunToken from './routes/launch-pump-fun-token.js'
import nftRoutes from './routes/nft/index.js';
import swapTokens from './routes/swap-tokens.js'
import lendTokens from './routes/lend-tokens.js'
import stake from './routes/stake.js';
import stakeSolayer from './routes/stake-solayer.js';
import zkAirdrop from './routes/zk-airdrop.js';
import getSolPrice from './routes/get-sol-price.js';
import perpRoutes from './routes/perp/index.js';
import closeEmptyAccounts from './routes/close-empty-accounts.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON
app.use(cors());
app.use(express.json());

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SolFlow SAK API',
      version: '1.0.0',
      description: 'API for Solana Agent Kit Actions',
    },
    servers: [
      {
        url: process.env.BASE_URL || 'http://localhost:3001',
      },
    ],
  },
  apis: [
    './routes/*.js',
    './routes/nft/*.js',
    './routes/perp/*.js'
  ], // Update path to include routes directory
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Routes
app.use('/deploy-new-token', deployNewToken);
app.use('/launch-pump-fun-token', launchPumpFunToken);
app.use('/nft', nftRoutes);
app.use('/swap-tokens', swapTokens);
app.use('/lend-tokens', lendTokens);
app.use('/stake', stake);
app.use('/stake-solayer', stakeSolayer);
app.use('/zk-airdrop', zkAirdrop);
app.use('/get-sol-price', getSolPrice);
app.use('/perp', perpRoutes);
app.use('/close-empty-accounts', closeEmptyAccounts);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Swagger docs are available at http://localhost:${PORT}/api-docs`);
});