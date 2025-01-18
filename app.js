const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON
app.use(express.json());

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hello World Express API',
      version: '1.0.0',
      description: 'A simple Express API with Swagger documentation',
    },
    servers: [
      {
        url: 'http://localhost:3001',
      },
    ],
  },
  apis: ['./app.js'], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /:
 *   get:
 *     summary: Returns a hello world message
 *     responses:
 *       200:
 *         description: A simple hello world message
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Hello World!
 */
app.get('/', (req, res) => {
  res.send('Hello World!');
});

/**
 * @swagger
 * /test:
 *   get:
 *     summary: Returns a test message
 *     responses:
 *       200:
 *         description: A simple test route
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: This is a test route!
 */
app.get('/test', (req, res) => {
  res.send('This is a test route!');
});

/**
 * @swagger
 * /test-json:
 *   get:
 *     summary: Returns a test JSON response
 *     responses:
 *       200:
 *         description: A JSON response with a message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: This is a test JSON response!
 */
app.get('/test-json', (req, res) => {
  res.json({ message: 'This is a test JSON response!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Swagger docs are available at http://localhost:${PORT}/api-docs`);
});