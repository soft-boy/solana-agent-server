import { SolanaAgentKit, createSolanaTools } from 'solana-agent-kit';
import { ChatOpenAI } from "@langchain/openai";
import { createReactAgent } from "@langchain/langgraph/prebuilt";

/**
 * Middleware to initialize SolanaAgentKit with parameters from the request body.
 * Adds the initialized agent to `req.agent` for use in subsequent routes.
 */
export async function useReActAgent(req, res, next) {
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
    const solanaAgent = new SolanaAgentKit(solana_private_key, rpc_url, { OPENAI_API_KEY });
    const tools = createSolanaTools(solanaAgent);
    const llm = new ChatOpenAI({
      temperature: 0.7,
      model: "gpt-4o-mini",
    });

    const agent = await createReactAgent({
      llm,
      tools,
      messageModifier: `
        You are a helpful agent that can interact onchain using the Solana Agent Kit. You are
        empowered to interact onchain using your tools. If you ever need funds, you can request them from the
        faucet. If not, you can provide your wallet details and request funds from the user. If there is a 5XX
        (internal) HTTP error code, ask the user to try again later. If someone asks you to do something you
        can't do with your currently available tools, you must say so, and encourage them to implement it
        themselves using the Solana Agent Kit, recommend they go to https://www.solanaagentkit.xyz for more information. Be
        concise and helpful with your responses. Refrain from restating your tools' descriptions unless it is explicitly requested.
      `,
    });

    // Attach agent to the request object
    req.agent = agent;

    // Proceed to the next middleware or route
    next();
  } catch (error) {
    console.error('Error initializing SolanaAgentKit:', error);
    return res.status(500).json({ error: 'Failed to initialize SolanaAgentKit' });
  }
}
