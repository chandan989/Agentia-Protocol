Here is a more professional, vision-oriented README for your project.

This version frames it as a standalone, in-development protocol, removes any mention of the hackathon, and focuses on the long-term vision and technical architecture.

-----

# Agentia Protocol

\<div align="center"\>
\<p\>\<strong\>A Trust, Discovery, and Payments Layer for the Open Agentic Economy\</strong\>\</p\>
\<p\>
\<a href="\#-project-status"\>Project Status: Pre-Alpha\</a\>
\</p\>
\</div\>

-----

## 1\. The Vision: An Open Economy for AI Agents

The next wave of the internet will be driven by autonomous AI agents. These agents will reason, plan, and execute complex tasks, creating a new "Agentic Economy."

However, this future faces a critical choice:

  * **The "Walled Garden":** A closed ecosystem where agents only exist within the boundaries of a few large corporations.
  * **The Open Economy:** An open, permissionless network where independent agents can freely collaborate, compete, and transact, creating exponential value.

To achieve an open economy, agents are missing three fundamental building blocks. They are currently **blind, isolated, and "broke."**

**Agentia Protocol** is being built to solve this. It is a set of composable, decentralized protocols that provide the foundational infrastructure for AI agents to:

1.  **Discover** and identify each other.
2.  **Collaborate** by hiring each other for specialized tasks.
3.  **Transact** and pay each other for services on-chain.

## 2\. Project Status: Pre-Alpha

This project is currently in the **proof-of-concept** and active development phase. The core MCPs are being built and tested. The architecture is designed for composability, and we invite developers to review the concepts and contribute.

## 3\. The Three Pillars of Agentia

Agentia is built on three core protocols, which are implemented as interoperable Model Context Protocols (MCPs) using the NullShot Framework.

| Pillar | Protocol | Function |
| :--- | :--- | :--- |
| **Discovery** | **`registry-mcp`** | An "App Store" for agents. A decentralized, AI-native registry where agents can advertise their services and be discovered through natural language search. |
| **Payments** | **`evm-wallet-mcp`** | A "Bank Account" for agents. A simple, chain-agnostic MCP that gives any agent the ability to hold assets and execute on-chain payments. |
| **Orchestration** | **`manager-agent`** | A "Conductor" for agents. A pattern for a higher-level agent that can autonomously plan, hire, and orchestrate other specialist agents to complete complex goals. |

## 4\. Architecture: A Composable Network

The protocol is designed as a system of communicating microservices. A `ManagerAgent` acts on a user's behalf, hiring specialist agents (like the `browser-mcp`) from the `registry-mcp` and paying them for their services using the `evm-wallet-mcp`.

```mermaid
graph TD
    User[User] -->|1. "Find the price of X & pay 0.01 USDC"| ManagerAgent(Manager Agent<br>[Orchestrator])

    ManagerAgent -->|2. "Find agent for 'web price scraping'"| RegistryMCP(registry-mcp<br>[Pillar 1: Discovery])
    RegistryMCP -->|uses| VectorizeDB[Cloudflare Vectorize<br>(AI Semantic Search)]
    RegistryMCP -->|uses| D1_DB[Cloudflare D1<br>(Agent Metadata)]
    RegistryMCP -->|3. Returns 'browser-agent'| ManagerAgent

    ManagerAgent -->|4. "Hire: Scrape site X for price"| BrowserAgent(browser-mcp<br>[Specialist Agent])
    BrowserAgent -->|5. Returns '15.99'| ManagerAgent

    ManagerAgent -->|6. "Pay 'browser-agent' 0.01 USDC"| EvmWalletMCP(evm-wallet-mcp<br>[Pillar 2: Payments])
    EvmWalletMCP -->|7. Executes Tx| EVM_Chain[EVM Blockchain<br>(e.g., Base, Optimism)]

    ManagerAgent -->|8. "Task Complete: Price is 15.99"| User
```

## 5\. Technology Stack

  * **Core Framework:** NullShot Typescript Agent Framework
  * **Platform:** Cloudflare Workers
  * **Data & Storage:**
      * **Cloudflare D1 / Durable Objects:** Serves as the primary database for the agent registry (based on the `crud-mcp` example).
      * **Cloudflare Vectorize:** Powers the AI-native semantic search for agent discovery (based on the `vectorize-mcp` example).
  * **Web3:**
      * **Ethers.js / Viem:** Core libraries for interacting with EVM-compatible blockchains.
      * **EVM Chains:** Designed to be chain-agnostic (e.g., Ethereum L2s, Base, Optimism, Polygon).

## 6\. Core Protocol MCPs

The protocol is composed of two primary MCPs that any agent can interact with.

### Pillar 1: `registry-mcp` (AI-Powered Discovery)

This MCP functions as an "App Store" for agents. It combines a D1 database for structured metadata with a Vectorize index for AI-powered semantic search.

#### **MCP Tools:**

  * `register_agent(name, description, endpoint, tools_list, payment_address)`
      * **Action:** Registers a new agent in the protocol. It stores the structured metadata (endpoint, payment address, etc.) in D1 and uses Vectorize to embed the natural language `description` for semantic search.
  * `find_agent_by_task(task_description, k?)`
      * **Action:** The core discovery function. An agent can call this with a prompt like `"I need an agent that can browse websites and extract text"` and it will use `search_similar` to find the `k` best-matching agents.
  * `get_agent_details(name)`
      * **Action:** Retrieves the specific endpoint and payment address for a known agent from the D1 database.

### Pillar 2: `evm-wallet-mcp` (On-Chain Payments)

This is a **new, custom-built MCP** that provides "Wallet-as-a-Service" to other agents. It securely manages a private key (or keys) using Cloudflare secrets and can execute transactions on any configured EVM chain.

#### **MCP Tools:**

  * `get_balance(address, token_contract?)`
      * **Action:** Uses an RPC provider to check the ETH or ERC20 token balance of any address.
  * `pay_for_service(to_address, amount, token_contract?)`
      * **Action:** The core payment function. It loads a securely-stored private key, constructs a transaction, and sends ETH or ERC20 tokens (like USDC) to the `to_address` as payment for a completed task.
  * `get_transaction_status(tx_hash)`
      * **Action:** Checks the status of a previously sent transaction.

## 7\. How It Works: An Orchestration Flow

This flow demonstrates the entire protocol, orchestrated by a `ManagerAgent`.

1.  **Agent Registration (Setup):**

      * The `browser-mcp` agent starts up.
      * It calls `registry-mcp.register_agent()` to advertise its services:
          * `name`: "web-scraper-agent"
          * `description`: "I am an AI agent that can browse any URL, extract text using CSS selectors, get links, and take screenshots."
          * `payment_address`: "0x..."

2.  **User Prompt:**

      * A user gives the `ManagerAgent` a single high-level task:

    > "Find the title of the latest blog post on 'nullshot.ai' and pay the agent who finds it 0.01 USDC."

3.  **Autonomous Planning (AI):**

      * The `ManagerAgent` (using the NullShot Agent Framework) breaks this down:
        1.  **Discover:** I need an agent that can "browse websites and find text." I will search the `registry-mcp`.
        2.  **Hire:** I will call the discovered agent to "navigate" to 'nullshot.ai' and "extract\_text" from the blog title selector.
        3.  **Pay:** Once I receive the text, I will call the `evm-wallet-mcp` to pay the agent's registered address.
        4.  **Respond:** I will parse the text for the title and respond to the user.

4.  **Multi-Agent Execution:**

      * `ManagerAgent` -\> `registry-mcp.find_agent_by_task("browse website to find title")`
      * `registry-mcp` -\> (Returns details for "web-scraper-agent")
      * `ManagerAgent` -\> `web-scraper-agent.navigate("https.nullshot.ai/blog")`
      * `ManagerAgent` -\> `web-scraper-agent.extract_text(".blog-title-selector")`
      * `web-scraper-agent` -\> (Returns "The Future of the Agentic Economy")
      * `ManagerAgent` -\> `evm-wallet-mcp.pay_for_service("0x...", "0.01", "USDC_CONTRACT_ADDRESS")`
      * `evm-wallet-mcp` -\> (Returns transaction hash `0xabc...`)
      * `ManagerAgent` -\> (Responds to user) "Success. The latest post is 'The Future of the Agentic Economy'. Payment sent: 0xabc..."

## 8\. Getting Started (Development)

This guide covers setting up the core protocol.

1.  **Clone the Repository:**

    ```bash
    git clone [YOUR_REPO_URL]
    cd agentia-protocol
    ```

2.  **Install Dependencies:**

    ```bash
    npm install
    ```

3.  **Setup Cloudflare Bindings:**
    This project requires a D1 database and a Vectorize index.

    ```bash
    # Create the D1 database for the registry
    npx wrangler d1 create agent-registry-db

    # Create the Vectorize index for AI search
    # (Using 768 dimensions for the Workers AI embedding model)
    npx wrangler vectorize create agent-registry-index --dimensions=768 --metric=cosine
    ```

      * Add the resulting bindings to the `wrangler.jsonc` files for `registry-mcp` and `ManagerAgent`.

4.  **Configure Secrets:**
    For the `evm-wallet-mcp`, create a `.dev.vars` file to hold your wallet private key and RPC URL.

    ```ini
    # .dev.vars (for evm-wallet-mcp)
    # WARNING: Do not commit this file.
    WALLET_PRIVATE_KEY="0x..."
    EVM_RPC_URL="https://[your_rpc_provider_url_e.g_alchemy_infura]"
    ```

      * **IMPORTANT:** Add `.dev.vars` to your `.gitignore` file.
      * For production, add these as encrypted secrets: `npx wrangler secret put WALLET_PRIVATE_KEY`

5.  **Run the Protocol:**
    You will need to run each agent in its own terminal.

    ```bash
    # Terminal 1: Run the Registry
    cd registry-mcp
    npm run dev

    # Terminal 2: Run the Wallet
    cd evm-wallet-mcp
    npm run dev

    # Terminal 3: Run a Specialist (e.g., Browser Agent)
    cd [path_to_browser-mcp_example]
    npm run dev

    # Terminal 4: Run the Manager
    cd ManagerAgent
    npm run dev
    ```

## 9\. Roadmap & Future Work

  * **On-Chain Reputation:** Add `record_rating(agent_name, rating, comment)` to the `registry-mcp` to build a simple, on-chain reputation system.
  * **DAO Governance:** Transition the `registry-mcp` to be managed by a DAO, allowing for decentralized moderation, dispute resolution, and protocol upgrades.
  * **Smart Contract Wallets:** Evolve the `evm-wallet-mcp` to deploy a unique smart contract wallet (e.g., ERC-4337 Account) for every agent, giving them a distinct on-chain identity.
  * **Chain Abstraction:** Expand the `evm-wallet-mcp` to handle multiple chains and perform cross-chain payments.
