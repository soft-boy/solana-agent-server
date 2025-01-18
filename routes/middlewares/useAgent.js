import { SolanaAgentKit } from 'solana-agent-kit';

/**
 * Middleware to initialize SolanaAgentKit with parameters from the request body.
 * Adds the initialized agent to `req.agent` for use in subsequent routes.
 */
export function useAgent(req, res, next) {
  const { solana_private_key, rpc_url, openai_api_key } = req.body;

  // Validate required parameters
  if (!solana_private_key || !rpc_url || !openai_api_key) {
    return res.status(400).json({
      error: 'Missing required parameters: solana_private_key, rpc_url, openai_api_key',
    });
  }

  try {
    // Initialize SolanaAgentKit
    const agent = new SolanaAgentKit(solana_private_key, rpc_url, { OPENAI_API_KEY: openai_api_key });

    // Attach agent to the request object
    req.agent = agent;

    // Proceed to the next middleware or route
    next();
  } catch (error) {
    console.error('Error initializing SolanaAgentKit:', error);
    return res.status(500).json({ error: 'Failed to initialize SolanaAgentKit' });
  }
}
