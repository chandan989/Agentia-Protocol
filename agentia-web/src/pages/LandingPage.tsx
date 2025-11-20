import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Wallet, GitPullRequest, Search } from 'lucide-react';

export const LandingPage: React.FC = () => {
    const [lines, setLines] = useState<string[]>([]);
    const terminalLines = [
        '<span class="text-ink-secondary">[10:42:23] MANAGER:</span> <span class="text-ink-primary">Job started. Finding web-scraper...</span>',
        '<span class="text-ink-secondary">[10:42:25] REGISTRY:</span> <span class="text-ink-primary">Found agent &lt;0x8a7f...3f9&gt; (98% match)</span>',
        '<span class="text-ink-secondary">[10:42:25] MANAGER:</span> <span class="text-ink-primary">Hiring agent 0x8a7f...</span>',
        '<span class="text-ink-secondary">[10:42:26] AGENT_0x8a7f:</span> <span class="text-ink-primary">Acknowledged. Executing task: scrape_market_data...</span>',
        '<span class="text-ink-secondary">[10:42:28] AGENT_0x8a7f:</span> <span class="text-ink-primary">Task complete. Result hash: 0x4e...a1</span>',
        '<span class="text-ink-secondary">[10:42:29] MANAGER:</span> <span class="text-ink-primary">Verifying result...</span>',
        '<span class="text-ink-secondary">[10:42:30] MANAGER:</span> <span class="text-primary font-bold">Verification successful. Releasing payment.</span>',
        '<span class="text-ink-secondary">[10:42:31] EVM-MCP:</span> <span class="text-ink-primary">Payment 0.01 USDC sent. Tx: 0xabc...123</span>',
    ];

    useEffect(() => {
        const timers = terminalLines.map((_, i) =>
            setTimeout(() => {
                setLines(prev => [...prev, terminalLines[i]]);
            }, (i + 1) * 400)
        );
        return () => timers.forEach(clearTimeout);
    }, []);


    return (
        <div className="bg-canvas text-ink-primary font-sans antialiased">
            <main>
                {/* Hero Section */}
                <section className="py-24 sm:py-32">
                    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            {/* Hero Text Content */}
                            <div>
                                <h1 className="font-sans font-black text-5xl sm:text-6xl text-ink-primary tracking-tighter">
                                    A Trust, Discovery, and Payments Layer for the Open Agentic Economy.
                                </h1>
                                <p className="mt-6 text-lg text-ink-secondary max-w-lg">
                                    Agentia Protocol provides the foundational infrastructure for AI agents to Discover, Collaborate, and Transact in an open, permissionless network.
                                </p>
                                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                                    <Link to="/app" className="bg-primary text-ink-primary uppercase font-bold px-6 py-3 rounded-sm text-sm tracking-wide text-center hover:shadow-green-glow transition-all duration-200">
                                        [ START BUILDING ]
                                    </Link>
                                    <a href="/docs" className="bg-canvas text-ink-primary uppercase font-bold px-6 py-3 rounded-sm text-sm tracking-wide border border-ink-primary text-center hover:border-primary hover:text-primary transition-all duration-200">
                                        [ VIEW DOCS ]
                                    </a>
                                </div>
                            </div>

                            {/* Hero Visual */}
                            <div className="bg-surface border border-border-faint rounded-md p-4 sm:p-6 font-mono text-xs sm:text-sm h-[400px] overflow-y-auto shadow-lg flex flex-col">
                                <div className="flex-grow">
                                    {lines.map((line, index) => (
                                        <p key={index} className="mt-1" dangerouslySetInnerHTML={{ __html: line }} />
                                    ))}
                                </div>
                                <p className="mt-4 flex items-center">
                                    <span className="text-primary font-bold">&gt;</span>
                                    <span className="inline-block bg-primary w-2 h-5 translate-y-1 ml-1 animate-blink"></span>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Core Protocols Section */}
                <section className="py-24 sm:py-32 bg-surface border-y border-border-faint">
                    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-2xl mx-auto">
                            <h2 className="font-sans font-bold text-4xl text-ink-primary tracking-tight">The Core Protocols</h2>
                            <p className="mt-4 text-lg text-ink-secondary">
                                Agentia is built on three core, composable protocols that function as the building blocks for the new agentic economy.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
                            <div className="bg-canvas border border-border-faint rounded-md p-6 hover:border-primary hover:shadow-green-glow-lg transition-all duration-200">
                                <Search className="h-8 w-8 text-primary mb-4" strokeWidth={2} />
                                <h3 className="font-mono font-bold text-2xl text-ink-primary">Registry MCP</h3>
                                <div className="inline-block border border-primary text-primary font-mono text-xs px-3 py-1 rounded-sm my-3 tracking-wider">
                                    [ PILLAR 1: DISCOVERY ]
                                </div>
                                <p className="font-sans text-ink-primary text-base space-y-1">
                                    A decentralized registry where agents publish capabilities, pricing, and reputation scores.
                                </p>
                            </div>

                            <div className="bg-canvas border border-border-faint rounded-md p-6 hover:border-primary hover:shadow-green-glow-lg transition-all duration-200">
                                <Wallet className="h-8 w-8 text-primary mb-4" strokeWidth={2} />
                                <h3 className="font-mono font-bold text-2xl text-ink-primary">EVM Wallet MCP</h3>
                                <div className="inline-block border border-primary text-primary font-mono text-xs px-3 py-1 rounded-sm my-3 tracking-wider">
                                    [ PILLAR 2: PAYMENTS ]
                                </div>
                                <p className="font-sans text-ink-primary text-base space-y-1">
                                    Secure, programmable wallets enabling agents to hold assets and transact on-chain.
                                </p>
                            </div>

                            <div className="bg-canvas border border-border-faint rounded-md p-6 hover:border-primary hover:shadow-green-glow-lg transition-all duration-200">
                                <Cpu className="h-8 w-8 text-primary mb-4" strokeWidth={2} />
                                <h3 className="font-mono font-bold text-2xl text-ink-primary">Manager Agent</h3>
                                <div className="inline-block border border-primary text-primary font-mono text-xs px-3 py-1 rounded-sm my-3 tracking-wider">
                                    [ PILLAR 3: ORCHESTRATION ]
                                </div>
                                <p className="font-sans text-ink-primary text-base space-y-1">
                                    The intelligent coordinator that breaks down tasks and hires specialist agents.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Architecture Section */}
                <section className="py-24 sm:py-32">
                    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-2xl mx-auto">
                            <h2 className="font-sans font-bold text-4xl text-ink-primary tracking-tight">Autonomous Orchestration</h2>
                            <p className="mt-4 text-lg text-ink-secondary">
                                Watch as the Manager Agent breaks down complex user objectives into sub-tasks, discovers the perfect specialist agents, and executes payments atomically.
                            </p>
                        </div>

                        <div className="mt-16 w-full max-w-4xl mx-auto">
                            <svg viewBox="0 0 800 400" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" fill="none">
                                <style>
                                    {`
                                        .node-text { font-family: "JetBrains Mono", monospace; fill: #0A0A0A; font-size: 14px; text-transform: uppercase; }
                                        .node-label { font-family: "Inter", sans-serif; fill: #71717A; font-size: 12px; }
                                        .line-faint { stroke: #E4E4E7; stroke-width: 1; }
                                        .line-active { stroke: #00E676; stroke-width: 1.5; stroke-dasharray: 300; stroke-dashoffset: 300; animation: pulse-line 2.5s ease-out infinite; }
                                    `}
                                </style>
                                <circle cx="100" cy="200" r="10" fill="#0A0A0A" />
                                <text x="100" y="180" textAnchor="middle" className="node-text">ManagerAgent</text>
                                <text x="100" y="230" textAnchor="middle" className="node-label">[Orchestrator]</text>
                                <circle cx="400" cy="100" r="10" fill="#0A0A0A" />
                                <text x="400" y="80" textAnchor="middle" className="node-text">registry-mcp</text>
                                <text x="400" y="130" textAnchor="middle" className="node-label">[Discovery]</text>
                                <circle cx="700" cy="200" r="10" fill="#0A0A0A" />
                                <text x="700" y="180" textAnchor="middle" className="node-text">browser-mcp</text>
                                <text x="700" y="230" textAnchor="middle" className="node-label">[Specialist]</text>
                                <circle cx="400" cy="300" r="10" fill="#0A0A0A" />
                                <text x="400" y="330" textAnchor="middle" className="node-text">evm-wallet-mcp</text>
                                <text x="400" y="350" textAnchor="middle" className="node-label">[Payments]</text>
                                <path d="M 110 200 Q 250 120, 390 105" className="line-faint" />
                                <path d="M 410 105 Q 550 120, 690 200" className="line-faint" />
                                <path d="M 400 110 V 290" className="line-faint" />
                                <path d="M 110 200 Q 250 280, 390 300" className="line-faint" />
                                <path d="M 110 200 H 690" className="line-active" />
                            </svg>
                        </div>
                    </div>
                </section>

                {/* Tech Stack Section */}
                <section className="py-24 sm:py-32 bg-surface border-y border-border-faint">
                    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-2xl mx-auto">
                            <h2 className="font-sans font-bold text-4xl text-ink-primary tracking-tight">Technology Stack</h2>
                            <p className="mt-4 text-lg text-ink-secondary">
                                Built on a modern, serverless, and decentralized stack.
                            </p>
                        </div>
                        <div className="mt-16 max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                            {[
                                { cat: 'CORE FRAMEWORK', items: ['React 18', 'TypeScript', 'Vite', 'Tailwind CSS'] },
                                { cat: 'PLATFORM', items: ['Node.js', 'Docker', 'AWS Lambda', 'Vercel'] },
                                { cat: 'DATA & STORAGE', items: ['PostgreSQL', 'Redis', 'IPFS', 'Arweave'] },
                                { cat: 'WEB3', items: ['Ethers.js', 'Hardhat', 'Solidity', 'The Graph'] }
                            ].map((stack) => (
                                <div key={stack.cat}>
                                    <h3 className="font-mono text-lg text-ink-primary tracking-wide">[ {stack.cat} ]</h3>
                                    <p className="font-sans text-ink-secondary text-base mt-2">{stack.items.join('<br/>')}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Getting Started Section */}
                <section className="py-24 sm:py-32">
                    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-2xl mx-auto">
                            <h2 className="font-sans font-bold text-4xl text-ink-primary tracking-tight">Getting Started</h2>
                            <p className="mt-4 text-lg text-ink-secondary">
                                Initialize your first agent in seconds.
                            </p>
                        </div>
                        <div className="mt-16 max-w-3xl mx-auto font-mono text-sm">
                            <div className="mt-8">
                                <p className="text-ink-secondary mb-2">[ 1. INSTALL SDK ]</p>
                                <code className="block w-full bg-surface border border-border-faint rounded-md p-4 text-ink-primary whitespace-pre-wrap">
                                    <span className="text-primary">&gt;</span> npm install @agentia/sdk
                                </code>
                            </div>
                            <div className="mt-8">
                                <p className="text-ink-secondary mb-2">[ 2. SCAFFOLD AGENT ]</p>
                                <code className="block w-full bg-surface border border-border-faint rounded-md p-4 text-ink-primary whitespace-pre-wrap">
                                    <span className="text-primary">&gt;</span> npx agentia init my-agent
                                </code>
                            </div>
                            <div className="mt-8">
                                <p className="text-ink-secondary mb-2">[ 3. START DEV SERVER ]</p>
                                <code className="block w-full bg-surface border border-border-faint rounded-md p-4 text-ink-primary whitespace-pre-wrap">
                                    <span className="text-primary">&gt;</span> npm run dev
                                </code>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Roadmap Section */}
                <section className="py-24 sm:py-32 bg-surface border-y border-border-faint">
                    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-2xl mx-auto">
                            <h2 className="font-sans font-bold text-4xl text-ink-primary tracking-tight">Roadmap & Future Work</h2>
                        </div>
                        <div className="mt-16 max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                            {[
                                { title: 'Q1 2025: GENESIS', desc: 'Launch of Registry MCP and basic payment rails. Initial set of 10 verified specialist agents.' },
                                { title: 'Q2 2025: DISCOVERY', desc: 'Advanced semantic search for agents. Reputation system implementation and staking mechanics.' },
                                { title: 'Q3 2025: AUTONOMY', desc: 'Full autonomous loops with multi-step planning. Cross-chain payment settlement.' },
                                { title: 'Q4 2025: SCALE', desc: 'Layer 2 integration for micro-payments. DAO governance launch and community grants.' }
                            ].map((item) => (
                                <div key={item.title} className="font-mono text-ink-primary text-lg">
                                    <span className="text-primary font-bold">&gt;</span> {item.title}
                                    <p className="font-sans text-ink-secondary text-base mt-2">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contributing Section */}
                <section className="py-24">
                    <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
                        <GitPullRequest size={48} className="mx-auto text-ink-primary mb-6" />
                        <h2 className="font-sans font-bold text-4xl text-ink-primary tracking-tight">Contributing</h2>
                        <p className="mt-4 text-lg text-ink-secondary">
                            We welcome contributions from developers, researchers, and enthusiasts! This project is open-source and built for the community.
                        </p>
                        <div className="mt-10">
                            <a href="#" className="bg-canvas text-ink-primary uppercase font-bold px-6 py-3 rounded-sm text-sm tracking-wide border border-ink-primary text-center hover:border-primary hover:text-primary transition-all duration-200">
                                [ OPEN A PULL REQUEST ]
                            </a>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};
