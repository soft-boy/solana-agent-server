import { SolanaAgentKit } from 'solana-agent-kit';

/**
 * Middleware to initialize SolanaAgentKit with parameters from the request body.
 * Adds the initialized agent to `req.agent` for use in subsequent routes.
 */
export function useAgent(req, res, next) {
  const { solana_private_key, rpc_url } = req.body;

  // Validate required parameters
  if (!solana_private_key || !rpc_url) {
    return res.status(400).json({
      error: 'Missing required parameters: solana_private_key, rpc_url',
    });
  }

  try {
    // Initialize SolanaAgentKit
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY
    const agent = new SolanaAgentKit(solana_private_key, rpc_url, { OPENAI_API_KEY });

    // Attach agent to the request object
    req.agent = agent;

    // Proceed to the next middleware or route
    next();
  } catch (error) {
    console.error('Error initializing SolanaAgentKit:', error);
    return res.status(500).json({ error: 'Failed to initialize SolanaAgentKit' });
  }
}
