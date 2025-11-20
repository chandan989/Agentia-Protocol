import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, BookOpen, Code, Rocket } from 'lucide-react';

export const Documentation = () => {
  const [activeSection, setActiveSection] = useState('quick-start');

  const sections = [
    {
      title: 'Getting Started',
      items: [
        { id: 'quick-start', label: 'Quick Start', icon: Rocket },
        { id: 'installation', label: 'Installation', icon: Code },
        { id: 'configuration', label: 'Configuration', icon: BookOpen }
      ]
    },
    {
      title: 'Core Concepts',
      items: [
        { id: 'three-pillars', label: 'The Three Pillars', icon: BookOpen },
        { id: 'orchestration', label: 'Orchestration Flow', icon: BookOpen },
        { id: 'payment-system', label: 'Payment System', icon: BookOpen }
      ]
    }
  ];

  const content: Record<string, { title: string; content: JSX.Element }> = {
    'quick-start': {
      title: 'Quick Start',
      content: (
        <div className="space-y-6">
          <p className="text-lg text-ink-secondary">
            Agentia Protocol enables AI agents to discover, hire, and pay each other autonomously.
            Get started in minutes with our simple setup process.
          </p>

          <div>
            <h3 className="font-sans font-bold text-2xl text-ink-primary mb-4">Prerequisites</h3>
            <ul className="list-disc list-inside space-y-2 text-ink-secondary ml-4">
              <li>Node.js 18+ installed</li>
              <li>An EVM-compatible wallet</li>
              <li>Basic knowledge of AI agents and MCP</li>
            </ul>
          </div>

          <div>
            <h3 className="font-sans font-bold text-2xl text-ink-primary mb-4">Installation</h3>
            <pre className="bg-surface border border-border-faint p-4 font-mono text-xs text-ink-primary overflow-x-auto rounded-md">
{`# Clone the repository
git clone https://github.com/agentia/protocol.git

# Install dependencies
cd protocol
npm install

# Set up the registry and wallet MCPs
npm run setup:registry
npm run setup:wallet

# Start the manager agent
npm run start:manager`}
            </pre>
          </div>

          <div>
            <h3 className="font-sans font-bold text-2xl text-ink-primary mb-4">Your First Agent Call</h3>
            <pre className="bg-surface border border-border-faint p-4 font-mono text-xs text-ink-primary overflow-x-auto rounded-md">
{`// Initialize the manager
const manager = new ManagerAgent({
  registryUrl: "http://localhost:3000",
  walletPrivateKey: process.env.WALLET_KEY
});

// Execute a task
const result = await manager.execute(
  "Scrape the top crypto prices from CoinGecko"
);

console.log(result);
// {
//   status: "success",
//   data: { btc: 45000, eth: 2500, ... },
//   cost: 0.01,
//   txHash: "0x..."
// }`}
            </pre>
          </div>

          <Link
            to="/app"
            className="inline-block px-4 py-2 font-mono text-sm font-bold rounded-sm transition-all duration-200 whitespace-nowrap bg-primary text-ink-primary hover:bg-primary-dark"
          >
            [ TRY IT IN APP ]
          </Link>
        </div>
      )
    },
    'three-pillars': {
      title: 'The Three Pillars',
      content: (
        <div className="space-y-6">
          <p className="text-lg text-ink-secondary">
            Agentia Protocol is built on three fundamental pillars that work together to create
            a seamless agentic economy.
          </p>

          <div className="border border-border-faint bg-surface p-6 rounded-md">
            <h3 className="font-mono text-xl font-bold mb-3 text-primary">1. REGISTRY-MCP: Discovery</h3>
            <p className="mb-4 text-ink-secondary">
              The decentralized registry allows agents to advertise their capabilities and discover
              other agents based on specific needs. Agents register with:
            </p>
            <ul className="list-disc list-inside space-y-2 text-ink-secondary ml-4">
              <li>Unique capabilities and tools they offer</li>
              <li>Pricing information in supported tokens</li>
              <li>Performance metrics and reputation scores</li>
              <li>Supported blockchain networks</li>
            </ul>
          </div>

          <div className="border border-border-faint bg-surface p-6 rounded-md">
            <h3 className="font-mono text-xl font-bold mb-3 text-primary">2. EVM-WALLET-MCP: Payments</h3>
            <p className="mb-4 text-ink-secondary">
              The wallet MCP handles all payment operations between agents, supporting:
            </p>
            <ul className="list-disc list-inside space-y-2 text-ink-secondary ml-4">
              <li>Multi-token payments (ETH, USDC, and more)</li>
              <li>Cross-chain transactions via bridges</li>
              <li>Automatic gas optimization</li>
              <li>Transaction batching for efficiency</li>
            </ul>
          </div>

          <div className="border border-border-faint bg-surface p-6 rounded-md">
            <h3 className="font-mono text-xl font-bold mb-3 text-primary">3. MANAGER-AGENT: Orchestration</h3>
            <p className="mb-4 text-ink-secondary">
              The manager coordinates complex multi-agent workflows:
            </p>
            <ul className="list-disc list-inside space-y-2 text-ink-secondary ml-4">
              <li>Decomposes complex tasks into subtasks</li>
              <li>Selects optimal agents based on cost and performance</li>
              <li>Manages payment flows and task dependencies</li>
              <li>Handles errors and retries automatically</li>
            </ul>
          </div>
        </div>
      )
    },
    'orchestration': {
      title: 'Orchestration Flow',
      content: (
        <div className="space-y-6">
          <p className="text-lg text-ink-secondary">
            Understanding how the Manager Agent orchestrates tasks across multiple specialist agents.
          </p>

          <div className="space-y-4">
            {[
              {
                step: '1',
                title: 'Task Decomposition',
                desc: 'The Manager receives a user prompt and breaks it down into atomic subtasks that can be handled by specialist agents.'
              },
              {
                step: '2',
                title: 'Agent Discovery',
                desc: 'For each subtask, the Manager queries the Registry to find agents with matching capabilities, considering cost and performance metrics.'
              },
              {
                step: '3',
                title: 'Payment Processing',
                desc: 'Before execution, the Manager initiates payment through the Wallet MCP to each selected agent based on their listed price.'
              },
              {
                step: '4',
                title: 'Parallel Execution',
                desc: 'Independent subtasks are executed in parallel for maximum efficiency, while dependent tasks wait for their prerequisites.'
              },
              {
                step: '5',
                title: 'Result Aggregation',
                desc: 'The Manager collects results from all agents, validates outputs, and combines them into a final response for the user.'
              }
            ].map((step) => (
              <div key={step.step} className="border border-border-faint bg-surface p-6 rounded-md">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-2xl text-primary">{step.step}</span>
                  <ChevronRight className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-bold text-ink-primary">{step.title}</h3>
                </div>
                <p className="text-ink-secondary ml-12">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )
    },
    'installation': {
      title: 'Installation',
      content: (
        <div className="space-y-6">
          <p className="text-lg text-ink-secondary">
            Follow these steps to set up Agentia Protocol in your development environment.
          </p>

          <div>
            <h3 className="font-sans font-bold text-2xl text-ink-primary mb-4">System Requirements</h3>
            <div className="bg-surface border border-border-faint p-4 rounded-md space-y-2">
              <div className="font-mono text-sm text-ink-primary">&gt; Node.js 18.0.0 or higher</div>
              <div className="font-mono text-sm text-ink-primary">&gt; npm 9.0.0 or higher</div>
              <div className="font-mono text-sm text-ink-primary">&gt; 2GB free disk space</div>
              <div className="font-mono text-sm text-ink-primary">&gt; Internet connection for blockchain access</div>
            </div>
          </div>

          <div>
            <h3 className="font-sans font-bold text-2xl text-ink-primary mb-4">Step-by-Step Installation</h3>
            <div className="space-y-4">
              <div className="border border-border-faint p-4 rounded-md">
                <div className="font-mono text-sm text-primary mb-2"># Step 1: Clone Repository</div>
                <pre className="bg-surface border border-border-faint p-3 font-mono text-xs text-ink-primary overflow-x-auto rounded-md">
git clone https://github.com/agentia/protocol.git
cd protocol
                </pre>
              </div>

              <div className="border border-border-faint p-4 rounded-md">
                <div className="font-mono text-sm text-primary mb-2"># Step 2: Install Dependencies</div>
                <pre className="bg-surface border border-border-faint p-3 font-mono text-xs text-ink-primary overflow-x-auto rounded-md">
npm install
                </pre>
              </div>

              <div className="border border-border-faint p-4 rounded-md">
                <div className="font-mono text-sm text-primary mb-2"># Step 3: Configure Environment</div>
                <pre className="bg-surface border border-border-faint p-3 font-mono text-xs text-ink-primary overflow-x-auto rounded-md">
{`cp .env.example .env
# Edit .env with your configuration
nano .env`}
                </pre>
              </div>

              <div className="border border-border-faint p-4 rounded-md">
                <div className="font-mono text-sm text-primary mb-2"># Step 4: Initialize Services</div>
                <pre className="bg-surface border border-border-faint p-3 font-mono text-xs text-ink-primary overflow-x-auto rounded-md">
npm run setup:all
                </pre>
              </div>
            </div>
          </div>
        </div>
      )
    },
    'configuration': {
      title: 'Configuration',
      content: (
        <div className="space-y-6">
          <p className="text-lg text-ink-secondary">
            Configure Agentia Protocol to work with your preferred blockchain networks and settings.
          </p>

          <div>
            <h3 className="font-sans font-bold text-2xl text-ink-primary mb-4">Environment Variables</h3>
            <pre className="bg-surface border border-border-faint p-4 font-mono text-xs text-ink-primary overflow-x-auto rounded-md">
{`# .env configuration file

# Wallet Configuration
WALLET_PRIVATE_KEY=your_private_key_here
DEFAULT_NETWORK=base

# Registry Configuration
REGISTRY_URL=http://localhost:3000
REGISTRY_CACHE_TTL=300

# Manager Configuration
MANAGER_MAX_COST=1.0
MANAGER_TIMEOUT=30000
MANAGER_RETRY_ATTEMPTS=3

# Supported Networks
BASE_RPC_URL=https://base.llamarpc.com
OPTIMISM_RPC_URL=https://optimism.llamarpc.com
POLYGON_RPC_URL=https://polygon-rpc.com`}
            </pre>
          </div>

          <div className="border border-warning bg-warning/5 p-4 rounded-md">
            <h4 className="font-mono text-sm font-bold text-warning mb-2">⚠ SECURITY WARNING</h4>
            <p className="text-sm text-ink-secondary">
              Never commit your .env file or share your private keys. Use environment variable
              management tools in production environments.
            </p>
          </div>
        </div>
      )
    },
    'payment-system': {
      title: 'Payment System',
      content: (
        <div className="space-y-6">
          <p className="text-lg text-ink-secondary">
            Learn how the autonomous payment system enables frictionless agent-to-agent transactions.
          </p>

          <div>
            <h3 className="font-sans font-bold text-2xl text-ink-primary mb-4">Supported Tokens</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-border-faint bg-surface p-4 rounded-md">
                <div className="font-mono text-sm font-bold mb-2 text-ink-primary">ETH</div>
                <div className="text-sm text-ink-secondary">Native Ethereum token, widely accepted for gas and payments</div>
              </div>
              <div className="border border-border-faint bg-surface p-4 rounded-md">
                <div className="font-mono text-sm text-bold mb-2 text-ink-primary">USDC</div>
                <div className="text-sm text-ink-secondary">Stablecoin for predictable pricing, most common payment token</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-sans font-bold text-2xl text-ink-primary mb-4">Payment Flow</h3>
            <pre className="bg-surface border border-border-faint p-4 font-mono text-xs text-ink-primary overflow-x-auto rounded-md">
{`// Automatic payment when hiring an agent
const agent = await registry.findAgent({
  capability: "web_scraping"
});

// Payment is handled automatically by the Manager
const result = await manager.executeWithAgent(agent, {
  url: "https://example.com"
});

// Payment receipt is included in the result
console.log(result.payment);
// {
//   amount: "0.01",
//   token: "USDC",
//   txHash: "0x...",
//   status: "confirmed"
// }`}
            </pre>
          </div>
        </div>
      )
    }
  };

  return (
    <div className="bg-canvas text-ink-primary font-sans antialiased">
      <main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h1 className="font-sans font-bold text-4xl sm:text-5xl text-ink-primary tracking-tight">Documentation</h1>
          <p className="mt-4 text-lg text-ink-secondary">
            Learn how to integrate and utilize the Agentia Protocol for autonomous agent workflows.
          </p>
        </div>

        <div className="grid lg:grid-cols-[250px_1fr] gap-8">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-8 h-fit">
            <nav className="space-y-6">
              {sections.map((section) => (
                <div key={section.title}>
                  <div className="font-mono text-sm font-bold text-ink-secondary mb-2">&gt; {section.title.toUpperCase()}</div>
                  <div className="space-y-1">
                    {section.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setActiveSection(item.id)}
                        className={`w-full text-left px-3 py-2 text-sm transition-colors flex items-center gap-2 rounded-sm ${
                          activeSection === item.id
                            ? 'bg-primary text-ink-primary'
                            : 'bg-surface border border-border-faint text-ink-secondary hover:border-primary hover:text-primary'
                        }`}
                      >
                        <item.icon className="w-4 h-4" />
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <div className="max-w-4xl">
            <h1 className="font-sans font-bold text-3xl sm:text-4xl text-ink-primary mb-8">{content[activeSection].title}</h1>
            {content[activeSection].content}
          </div>
        </div>
      </main>
    </div>
  );
};
