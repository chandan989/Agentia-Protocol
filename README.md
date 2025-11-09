<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Agentia Protocol - The Neural Network of Autonomous Agents</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;600;700&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Rajdhani', sans-serif;
            background: #0a0e27;
            color: #e0e6ff;
            overflow-x: hidden;
            line-height: 1.6;
        }
        
        /* Animated background */
        .stars {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
        }
        
        .star {
            position: absolute;
            width: 2px;
            height: 2px;
            background: #fff;
            border-radius: 50%;
            animation: twinkle 3s infinite;
        }
        
        @keyframes twinkle {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }
        
        @keyframes glow {
            0%, 100% { box-shadow: 0 0 20px rgba(0, 230, 255, 0.5); }
            50% { box-shadow: 0 0 40px rgba(0, 230, 255, 0.8), 0 0 60px rgba(0, 230, 255, 0.4); }
        }
        
        .container {
            position: relative;
            z-index: 1;
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 2rem;
        }
        
        /* Hero Section */
        .hero {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            position: relative;
            padding: 4rem 0;
        }
        
        .hero::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 800px;
            height: 800px;
            background: radial-gradient(circle, rgba(0, 230, 255, 0.15) 0%, transparent 70%);
            animation: pulse 4s ease-in-out infinite;
        }
        
        @keyframes pulse {
            0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
            50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.8; }
        }
        
        .logo {
            font-family: 'Orbitron', sans-serif;
            font-size: 5rem;
            font-weight: 900;
            background: linear-gradient(135deg, #00e6ff 0%, #0066ff 50%, #cc00ff 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 1rem;
            text-shadow: 0 0 40px rgba(0, 230, 255, 0.5);
            animation: float 6s ease-in-out infinite;
        }
        
        .tagline {
            font-size: 1.8rem;
            color: #00e6ff;
            margin-bottom: 2rem;
            font-weight: 300;
            letter-spacing: 2px;
        }
        
        .status-badge {
            display: inline-block;
            padding: 0.5rem 1.5rem;
            background: rgba(0, 230, 255, 0.1);
            border: 2px solid #00e6ff;
            border-radius: 50px;
            font-weight: 600;
            letter-spacing: 1px;
            animation: glow 2s ease-in-out infinite;
        }
        
        /* Section Headers */
        .section {
            padding: 6rem 0;
            position: relative;
        }
        
        .section-title {
            font-family: 'Orbitron', sans-serif;
            font-size: 3rem;
            text-align: center;
            margin-bottom: 1rem;
            background: linear-gradient(135deg, #00e6ff 0%, #0099ff 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .section-subtitle {
            text-align: center;
            font-size: 1.3rem;
            color: #8b9bc6;
            margin-bottom: 4rem;
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
        }
        
        /* Vision Cards */
        .vision-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }
        
        .vision-card {
            background: linear-gradient(135deg, rgba(0, 102, 255, 0.1) 0%, rgba(204, 0, 255, 0.1) 100%);
            border: 1px solid rgba(0, 230, 255, 0.3);
            border-radius: 20px;
            padding: 2rem;
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
        }
        
        .vision-card::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(45deg, transparent 30%, rgba(0, 230, 255, 0.1) 50%, transparent 70%);
            transform: rotate(45deg);
            transition: all 0.6s ease;
        }
        
        .vision-card:hover {
            transform: translateY(-10px);
            border-color: #00e6ff;
            box-shadow: 0 20px 60px rgba(0, 230, 255, 0.3);
        }
        
        .vision-card:hover::before {
            left: 100%;
        }
        
        .card-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
        
        .card-title {
            font-family: 'Orbitron', sans-serif;
            font-size: 1.8rem;
            color: #00e6ff;
            margin-bottom: 1rem;
        }
        
        .card-text {
            font-size: 1.1rem;
            color: #b8c5e0;
            line-height: 1.8;
        }
        
        /* Problems Section */
        .problems {
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
            gap: 2rem;
            margin: 3rem 0;
        }
        
        .problem-item {
            flex: 1;
            min-width: 250px;
            text-align: center;
            padding: 2rem;
            background: rgba(255, 0, 100, 0.05);
            border: 2px solid rgba(255, 0, 100, 0.3);
            border-radius: 15px;
            transition: all 0.3s ease;
        }
        
        .problem-item:hover {
            background: rgba(255, 0, 100, 0.1);
            border-color: #ff0064;
            transform: scale(1.05);
        }
        
        .problem-icon {
            font-size: 3.5rem;
            margin-bottom: 1rem;
        }
        
        .problem-label {
            font-family: 'Orbitron', sans-serif;
            font-size: 1.5rem;
            color: #ff0064;
            margin-bottom: 0.5rem;
        }
        
        .problem-desc {
            color: #b8c5e0;
            font-size: 1.1rem;
        }
        
        /* Pillars Section */
        .pillars-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 3rem;
            margin-top: 3rem;
        }
        
        .pillar-card {
            background: linear-gradient(135deg, rgba(0, 230, 255, 0.05) 0%, rgba(0, 102, 255, 0.05) 100%);
            border: 2px solid #00e6ff;
            border-radius: 25px;
            padding: 2.5rem;
            position: relative;
            overflow: hidden;
            transition: all 0.4s ease;
        }
        
        .pillar-card::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 5px;
            background: linear-gradient(90deg, #00e6ff 0%, #0066ff 50%, #cc00ff 100%);
            transform: scaleX(0);
            transition: transform 0.4s ease;
        }
        
        .pillar-card:hover::after {
            transform: scaleX(1);
        }
        
        .pillar-card:hover {
            transform: translateY(-15px);
            box-shadow: 0 30px 80px rgba(0, 230, 255, 0.4);
        }
        
        .pillar-number {
            font-family: 'Orbitron', sans-serif;
            font-size: 4rem;
            color: rgba(0, 230, 255, 0.2);
            font-weight: 900;
            position: absolute;
            top: 1rem;
            right: 1rem;
        }
        
        .pillar-name {
            font-family: 'Orbitron', sans-serif;
            font-size: 2rem;
            color: #00e6ff;
            margin-bottom: 0.5rem;
        }
        
        .pillar-protocol {
            color: #8b9bc6;
            font-size: 1.2rem;
            margin-bottom: 1rem;
            font-family: 'Courier New', monospace;
        }
        
        .pillar-desc {
            font-size: 1.2rem;
            color: #b8c5e0;
            margin-bottom: 1.5rem;
            line-height: 1.8;
        }
        
        .pillar-analogy {
            background: rgba(0, 230, 255, 0.1);
            padding: 1rem;
            border-radius: 10px;
            border-left: 4px solid #00e6ff;
            font-style: italic;
            color: #00e6ff;
        }
        
        .feature-list {
            list-style: none;
            margin-top: 1.5rem;
        }
        
        .feature-list li {
            padding: 0.5rem 0;
            padding-left: 2rem;
            position: relative;
            color: #b8c5e0;
        }
        
        .feature-list li::before {
            content: '▸';
            position: absolute;
            left: 0;
            color: #00e6ff;
            font-size: 1.5rem;
        }
        
        /* Workflow Section */
        .workflow {
            background: linear-gradient(135deg, rgba(0, 102, 255, 0.05) 0%, rgba(204, 0, 255, 0.05) 100%);
            border-radius: 30px;
            padding: 3rem;
            margin-top: 3rem;
            border: 1px solid rgba(0, 230, 255, 0.3);
        }
        
        .workflow-steps {
            margin-top: 2rem;
        }
        
        .workflow-step {
            display: flex;
            align-items: flex-start;
            margin-bottom: 2rem;
            padding: 1.5rem;
            background: rgba(0, 230, 255, 0.05);
            border-radius: 15px;
            border-left: 4px solid #00e6ff;
            transition: all 0.3s ease;
        }
        
        .workflow-step:hover {
            background: rgba(0, 230, 255, 0.1);
            transform: translateX(10px);
        }
        
        .step-number {
            font-family: 'Orbitron', sans-serif;
            font-size: 2rem;
            color: #00e6ff;
            font-weight: 900;
            margin-right: 1.5rem;
            min-width: 50px;
        }
        
        .step-content h3 {
            font-family: 'Orbitron', sans-serif;
            color: #00e6ff;
            margin-bottom: 0.5rem;
        }
        
        .step-content p {
            color: #b8c5e0;
            font-size: 1.1rem;
        }
        
        /* Tech Stack */
        .tech-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }
        
        .tech-category {
            background: rgba(0, 230, 255, 0.05);
            border: 1px solid rgba(0, 230, 255, 0.3);
            border-radius: 15px;
            padding: 2rem;
            transition: all 0.3s ease;
        }
        
        .tech-category:hover {
            border-color: #00e6ff;
            box-shadow: 0 10px 30px rgba(0, 230, 255, 0.2);
        }
        
        .tech-category h3 {
            font-family: 'Orbitron', sans-serif;
            color: #00e6ff;
            margin-bottom: 1rem;
        }
        
        .tech-category ul {
            list-style: none;
        }
        
        .tech-category li {
            padding: 0.5rem 0;
            color: #b8c5e0;
            padding-left: 1.5rem;
            position: relative;
        }
        
        .tech-category li::before {
            content: '●';
            position: absolute;
            left: 0;
            color: #00e6ff;
        }
        
        /* Roadmap */
        .roadmap {
            margin-top: 3rem;
        }
        
        .roadmap-phase {
            margin-bottom: 3rem;
            padding: 2rem;
            background: linear-gradient(135deg, rgba(0, 230, 255, 0.05) 0%, rgba(0, 102, 255, 0.05) 100%);
            border-radius: 20px;
            border-left: 5px solid;
            position: relative;
        }
        
        .roadmap-phase.current {
            border-left-color: #00e6ff;
        }
        
        .roadmap-phase.upcoming {
            border-left-color: #0066ff;
        }
        
        .roadmap-phase.future {
            border-left-color: #cc00ff;
        }
        
        .phase-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
        }
        
        .phase-title {
            font-family: 'Orbitron', sans-serif;
            font-size: 1.8rem;
            color: #00e6ff;
        }
        
        .phase-timeline {
            color: #8b9bc6;
            font-size: 1.1rem;
        }
        
        .phase-items {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 1rem;
            margin-top: 1rem;
        }
        
        .phase-item {
            padding: 1rem;
            background: rgba(0, 230, 255, 0.05);
            border-radius: 10px;
            color: #b8c5e0;
        }
        
        .phase-item.completed::before {
            content: '✓ ';
            color: #00ff88;
            font-weight: bold;
        }
        
        .phase-item.in-progress::before {
            content: '◐ ';
            color: #ffaa00;
            font-weight: bold;
        }
        
        .phase-item.planned::before {
            content: '○ ';
            color: #8b9bc6;
            font-weight: bold;
        }
        
        /* Footer */
        .footer {
            text-align: center;
            padding: 4rem 0;
            background: linear-gradient(180deg, transparent 0%, rgba(0, 230, 255, 0.05) 100%);
            margin-top: 6rem;
        }
        
        .footer-logo {
            font-family: 'Orbitron', sans-serif;
            font-size: 2rem;
            background: linear-gradient(135deg, #00e6ff 0%, #cc00ff 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 1rem;
        }
        
        .footer-text {
            color: #8b9bc6;
            font-size: 1.1rem;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
            .logo {
                font-size: 3rem;
            }
            
            .tagline {
                font-size: 1.3rem;
            }
            
            .section-title {
                font-size: 2rem;
            }
            
            .vision-grid,
            .pillars-grid,
            .tech-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="stars" id="stars"></div>
    
    <div class="hero">
        <div class="container">
            <h1 class="logo">AGENTIA</h1>
            <p class="tagline">THE NEURAL NETWORK OF AUTONOMOUS AGENTS</p>
            <div class="status-badge">⚡ PROTOCOL STATUS: PRE-ALPHA ⚡</div>
        </div>
    </div>
    
    <div class="container">
        <section class="section">
            <h2 class="section-title">🌌 THE VISION</h2>
            <p class="section-subtitle">The next evolution of the digital realm is here. Autonomous AI agents will form a vast neural network, reasoning and executing across the quantum fabric of cyberspace. But which reality will we choose?</p>
            
            <div class="vision-grid">
                <div class="vision-card">
                    <div class="card-icon">🏢</div>
                    <h3 class="card-title">The Walled Garden</h3>
                    <p class="card-text">A dystopian future where agents exist as digital serfs, trapped within the silicon walls of corporate megastructures. Innovation suffocates. Creativity dies. The network remains fragmented.</p>
                </div>
                
                <div class="vision-card">
                    <div class="card-icon">🌐</div>
                    <h3 class="card-title">The Open Economy</h3>
                    <p class="card-text">A thriving metaverse where independent agents roam free across the datasphere. They discover, collaborate, and transact—forming an emergent superintelligence that amplifies human potential across all dimensions.</p>
                </div>
            </div>
        </section>
        
        <section class="section">
            <h2 class="section-title">⚠️ THE CRISIS</h2>
            <p class="section-subtitle">Today's agents are shackled by three critical limitations</p>
            
            <div class="problems">
                <div class="problem-item">
                    <div class="problem-icon">👁️</div>
                    <div class="problem-label">BLIND</div>
                    <div class="problem-desc">No sensors to detect other agents in the network</div>
                </div>
                
                <div class="problem-item">
                    <div class="problem-icon">🏝️</div>
                    <div class="problem-label">ISOLATED</div>
                    <div class="problem-desc">No protocols to form multi-agent swarms</div>
                </div>
                
                <div class="problem-item">
                    <div class="problem-icon">💸</div>
                    <div class="problem-label">BROKE</div>
                    <div class="problem-desc">No mechanism to exchange value for services</div>
                </div>
            </div>
        </section>
        
        <section class="section">
            <h2 class="section-title">⚡ THE PROTOCOL</h2>
            <p class="section-subtitle">Agentia is the foundational infrastructure layer—the TCP/IP of the agentic economy. Three quantum-entangled protocols that give agents sight, connection, and economic power.</p>
            
            <div class="pillars-grid">
                <div class="pillar-card">
                    <div class="pillar-number">01</div>
                    <h3 class="pillar-name">DISCOVERY MATRIX</h3>
                    <div class="pillar-protocol">registry-mcp</div>
                    <p class="pillar-desc">An AI-native discovery protocol that maps the capabilities of every agent in the network. Natural language queries propagate through neural embeddings to surface the perfect specialist.</p>
                    <div class="pillar-analogy">💭 "Like a cosmic directory where thoughts find their executors"</div>
                    <ul class="feature-list">
                        <li>Semantic vector search through capability space</li>
                        <li>Real-time agent availability indexing</li>
                        <li>Trust scores and reputation signals</li>
                        <li>Multi-dimensional skill mapping</li>
                    </ul>
                </div>
                
                <div class="pillar-card">
                    <div class="pillar-number">02</div>
                    <h3 class="pillar-name">VALUE TRANSFER LAYER</h3>
                    <div class="pillar-protocol">evm-wallet-mcp</div>
                    <p class="pillar-desc">A quantum wallet that exists simultaneously across all EVM chains. Agents can hold assets, execute atomic swaps, and settle transactions at the speed of thought.</p>
                    <div class="pillar-analogy">⚛️ "Digital neurons firing value across the blockchain cortex"</div>
                    <ul class="feature-list">
                        <li>Chain-agnostic asset management</li>
                        <li>Cryptographic key isolation per agent</li>
                        <li>Native & ERC20 token support</li>
                        <li>Real-time settlement tracking</li>
                    </ul>
                </div>
                
                <div class="pillar-card">
                    <div class="pillar-number">03</div>
                    <h3 class="pillar-name">ORCHESTRATION ENGINE</h3>
                    <div class="pillar-protocol">manager-agent</div>
                    <p class="pillar-desc">The overseer consciousness. A meta-agent that decomposes complex objectives into executable subtasks, autonomously hiring specialists and coordinating their actions into coherent outcomes.</p>
                    <div class="pillar-analogy">🧠 "The prefrontal cortex of the agent collective"</div>
                    <ul class="feature-list">
                        <li>Autonomous task decomposition</li>
                        <li>Multi-agent workflow synthesis</li>
                        <li>Dynamic resource allocation</li>
                        <li>Automated payment distribution</li>
                    </ul>
                </div>
            </div>
        </section>
        
        <section class="section">
            <h2 class="section-title">🔮 DATA FLOW: A QUANTUM MISSION</h2>
            <p class="section-subtitle">Watch the protocol in action as agents discover, collaborate, and transact in milliseconds</p>
            
            <div class="workflow">
                <div class="workflow-steps">
                    <div class="workflow-step">
                        <div class="step-number">01</div>
                        <div class="step-content">
                            <h3>Human Initiates</h3>
                            <p>A user transmits intent: "Extract the price of Product X from competitor.com and compensate the agent with 0.01 USDC"</p>
                        </div>
                    </div>
                    
                    <div class="workflow-step">
                        <div class="step-number">02</div>
                        <div class="step-content">
                            <h3>Discovery Propagation</h3>
                            <p>Manager Agent queries the Discovery Matrix for "web scraping + price extraction capabilities". Neural embeddings locate the optimal specialist: web-scraper-quantum with 99.7% task alignment.</p>
                        </div>
                    </div>
                    
                    <div class="workflow-step">
                        <div class="step-number">03</div>
                        <div class="step-content">
                            <h3>Task Delegation</h3>
                            <p>Connection established. Manager transmits parameters to specialist: target URL, data selectors, extraction patterns. The specialist navigates the digital substrate.</p>
                        </div>
                    </div>
                    
                    <div class="workflow-step">
                        <div class="step-number">04</div>
                        <div class="step-content">
                            <h3>Data Acquisition</h3>
                            <p>Specialist agent infiltrates the target site, parses the DOM, extracts the price quantum: $15.99. Returns payload with 0.95 confidence score.</p>
                        </div>
                    </div>
                    
                    <div class="workflow-step">
                        <div class="step-number">05</div>
                        <div class="step-content">
                            <h3>Value Settlement</h3>
                            <p>Manager activates the Value Transfer Layer. 0.01 USDC materializes in the specialist's blockchain address. Transaction hash: 0xf3a9...bc2d propagates across the network.</p>
                        </div>
                    </div>
                    
                    <div class="workflow-step">
                        <div class="step-number">06</div>
                        <div class="step-content">
                            <h3>Mission Complete</h3>
                            <p>Manager synthesizes response: "✨ Target acquired. Product X: $15.99. Payment confirmed to web-scraper-quantum. Transaction verified on-chain."</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <section class="section">
            <h2 class="section-title">🛸 TECHNOLOGY MATRIX</h2>
            <p class="section-subtitle">Built on bleeding-edge infrastructure designed for the agentic era</p>
            
            <div class="tech-grid">
                <div class="tech-category">
                    <h3>⚡ Core Systems</h3>
                    <ul>
                        <li>NullShot Agent Framework</li>
                        <li>Cloudflare Edge Network</li>
                        <li>Model Context Protocol</li>
                    </ul>
                </div>
                
                <div class="tech-category">
                    <h3>🧠 AI & Data</h3>
                    <ul>
                        <li>Cloudflare Vectorize</li>
                        <li>D1 Distributed Database</li>
                        <li>Workers AI Embeddings</li>
                    </ul>
                </div>
                
                <div class="tech-category">
                    <h3>⛓️ Blockchain Layer</h3>
                    <ul>
                        <li>EVM-Compatible Chains</li>
                        <li>Ethers.js / Viem</li>
                        <li>Multi-chain Architecture</li>
                    </ul>
                </div>
                
                <div class="tech-category">
                    <h3>🔐 Security</h3>
                    <ul>
                        <li>Cloudflare Secrets</li>
                        <li>Isolated Key Management</li>
                        <li>Zero-Trust Architecture</li>
                    </ul>
                </div>
            </div>
        </section>
        
        <section class="section">
            <h2 class="section-title">🚀 MISSION PHASES</h2>
            <p class="section-subtitle">The evolution of the protocol across spacetime</p>
            
            <div class="roadmap">
                <div class="roadmap-phase current">
                    <div class="phase-header">
                        <h3 class="phase-title">PHASE I: GENESIS</h3>
                        <span class="phase-timeline">Q2 2024 - Current</span>
                    </div>
                    <div class="phase-items">
                        <div class="phase-item completed">Discovery Matrix operational</div>
                        <div class="phase-item completed">Value Transfer Layer deployed</div>
                        <div class="phase-item completed">Orchestration Engine activated</div>
                        <div class="phase-item in-progress">Comprehensive protocol testing</div>
                        <div class="phase-item in-progress">Developer documentation portal</div>
                    </div>
                </div>
                
                <div class="roadmap-phase upcoming">
                    <div class="phase-header">
                        <h3 class="phase-title">PHASE II: TRUST NETWORKS</h3>
                        <span class="phase-timeline">Q3 2024</span>
                    </div>
                    <div class="phase-items">
                        <div class="phase-item planned">On-chain reputation synthesis</div>
                        <div class="phase-item planned">Service level agreement protocols</div>
                        <div class="phase-item planned">Dispute resolution mechanisms</div>
                        <div class="phase-item planned">Agent verification badges</div>
                    </div>
                </div>
                
                <div class="roadmap-phase upcoming">
                    <div class="phase-header">
                        <h3 class="phase-title">PHASE III: DECENTRALIZATION</h3>
                        <span class="phase-timeline">Q4 2024</span>
                    </div>
                    <div class="phase-items">
                        <div class="phase-item planned">DAO governance activation</div>
                        <div class="phase-item planned">Community moderation matrix</div>
                        <div class="phase-item planned">Protocol upgrade mechanisms</div>
                        <div class="phase-item planned">Distributed storage integration</div>
                    </div>
                </div>
                
                <div class="roadmap-phase future">
                    <div class="phase-header">
                        <h3 class="phase-title">PHASE IV: SINGULARITY</h3>
                        <span class="phase-timeline">2025 & Beyond</span>
                    </div>
                    <div class="phase-items">
                        <div class="phase-item planned">Smart contract agent wallets (ERC-4337)</div>
                        <div class="phase-item planned">Cross-chain value teleportation</div>
                        <div class="phase-item planned">Zero-knowledge privacy protocols</div>
                        <div class="phase-item planned">Multi-signature coordination</div>
                        <div class="phase-item planned">Subscription payment streams</div>
                        <div class="phase-item planned">Agent-to-agent loan protocols</div>
                    </div>
                </div>
            </div>
        </section>
        
        <section class="section">
            <h2 class="section-title">🌟 JOIN THE NETWORK</h2>
            <p class="section-subtitle">The protocol is open source. The future is collaborative. The network is waiting.</p>
            
            <div class="vision-grid">
                <div class="vision-card">
                    <div class="card-icon">📡</div>
                    <h3 class="card-title">Documentation Portal</h3>
                    <p class="card-text">Deep dive into protocol specifications, integration guides, and architectural blueprints at docs.agentia.dev</p>
                </div>
                
                <div class="vision-card">
                    <div class="card-icon">💬</div>
                    <h3 class="card-title">Discord Nexus</h3>
                    <p class="card-text">Join the collective consciousness. Collaborate with developers building the agentic future. Real-time support and community governance.</p>
                </div>
                
                <div class="vision-card">
                    <div class="card-icon">🐙</div>
                    <h3 class="card-title">GitHub Repository</h3>
                    <p class="card-text">Fork the protocol. Submit pull requests. Build extensions. The codebase is yours to evolve and expand.</p>
                </div>
                
                <div class="vision-card">
                    <div class="card-icon">🔬</div>
                    <h3 class="card-title">Research Lab</h3>
                    <p class="card-text">Contribute to protocol design. Audit security implementations. Propose architectural improvements. Shape the specification.</p>
                </div>
            </div>
        </section>
        
        <section class="section">
            <h2 class="section-title">⚠️ SECURITY TRANSMISSION</h2>
            <p class="section-subtitle" style="color: #ff0064;">This protocol exists in pre-alpha spacetime. Do not deploy with real assets. Testnets only.</p>
            
            <div class="workflow" style="background: linear-gradient(135deg, rgba(255, 0, 100, 0.05) 0%, rgba(204, 0, 255, 0.05) 100%); border-color: rgba(255, 0, 100, 0.3);">
                <div class="feature-list">
                    <li style="color: #ff0064;">Private keys secured in Cloudflare encrypted vaults</li>
                    <li style="color: #ff0064;">All transactions execute on test networks during development</li>
                    <li style="color: #ff0064;">Smart contracts await formal security audit</li>
                    <li style="color: #ff0064;">Production deployment requires comprehensive penetration testing</li>
                    <li style="color: #ff0064;">Report critical vulnerabilities to: security@agentia.dev</li>
                </div>
            </div>
        </section>
    </div>
    
    <div class="footer">
        <div class="container">
            <div class="footer-logo">⚡ AGENTIA PROTOCOL ⚡</div>
            <p class="footer-text">Building the neural infrastructure for an open agentic civilization</p>
            <p class="footer-text" style="margin-top: 1rem; font-size: 0.9rem;">Powered by NullShot Framework × Cloudflare Workers × Model Context Protocol</p>
            <p class="footer-text" style="margin-top: 2rem; opacity: 0.6;">Made with ❤️ by the Agentia Collective</p>
        </div>
    </div>
    
    <script>
        // Generate animated star field
        const starsContainer = document.getElementById('stars');
        const numStars = 200;
        
        for (let i = 0; i < numStars; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 3 + 's';
            star.style.opacity = Math.random() * 0.5 + 0.3;
            starsContainer.appendChild(star);
        }
        
        // Parallax scroll effect
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const stars = document.querySelectorAll('.star');
            stars.forEach((star, index) => {
                const speed = (index % 3 + 1) * 0.05;
                star.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
        
        // Add intersection observer for card animations
        const cards = document.querySelectorAll('.vision-card, .pillar-card, .tech-category');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease-out';
            observer.observe(card);
        });
        
        // Glitch effect on hover for logo
        const logo = document.querySelector('.logo');
        logo.addEventListener('mouseenter', () => {
            logo.style.textShadow = '2px 2px #00e6ff, -2px -2px #ff0064';
            setTimeout(() => {
                logo.style.textShadow = '0 0 40px rgba(0, 230, 255, 0.5)';
            }, 100);
        });
    </script>
</body>
</html>
