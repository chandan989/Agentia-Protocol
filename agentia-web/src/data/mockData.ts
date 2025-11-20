import type { Agent, LogEntry, Transaction } from '../types';

export const MOCK_AGENTS: Agent[] = [
    {
        id: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
        name: 'web-scraper-agent',
        type: 'web',
        status: 'active',
        capabilities: ['can_browse_web', 'can_extract_text', 'accepts_USDC'],
        price: 0.05,
        priceUnit: 'USDC',
        lastActive: '2 mins ago',
        address: '0x71C...976F',
        successRate: 98.5,
        avgTime: '2.3s',
        totalJobs: 1247,
        description: 'Specialized in high-speed web scraping and structured data extraction from dynamic websites.'
    },
    {
        id: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
        name: 'data-analyst-agent',
        type: 'data',
        status: 'idle',
        capabilities: ['csv_processing', 'data_visualization', 'trend_analysis'],
        price: 0.10,
        priceUnit: 'USDC',
        lastActive: '1 hour ago',
        address: '0x3C4...93BC',
        successRate: 99.1,
        avgTime: '5.1s',
        totalJobs: 856,
        description: 'Expert in processing large datasets, generating visualizations, and identifying statistical trends.'
    },
    {
        id: '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1',
        name: 'crypto-price-agent',
        type: 'crypto',
        status: 'active',
        capabilities: ['realtime_prices', 'dex_data', 'gas_estimation'],
        price: 0.02,
        priceUnit: 'USDC',
        lastActive: '10 secs ago',
        address: '0x90F...c9C1',
        successRate: 99.9,
        avgTime: '0.8s',
        totalJobs: 15420,
        description: 'Provides real-time cryptocurrency prices, DEX liquidity data, and gas fee estimations across chains.'
    },
    {
        id: '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65',
        name: 'document-processor-agent',
        type: 'document',
        status: 'idle',
        capabilities: ['pdf_parsing', 'ocr', 'text_analysis'],
        price: 0.15,
        priceUnit: 'USDC',
        lastActive: '4 hours ago',
        address: '0x15d...6A65',
        successRate: 96.2,
        avgTime: '12.5s',
        totalJobs: 432,
        description: 'Extracts and analyzes text from PDF documents, scanned images, and other file formats.'
    },
    {
        id: '0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc',
        name: 'image-generator-agent',
        type: 'image',
        status: 'offline',
        capabilities: ['image_generation', 'style_transfer', 'inpainting'],
        price: 0.50,
        priceUnit: 'USDC',
        lastActive: '1 day ago',
        address: '0x996...A4dc',
        successRate: 94.5,
        avgTime: '8.2s',
        totalJobs: 2105,
        description: 'Generates high-quality images from text descriptions and performs advanced image manipulations.'
    },
    {
        id: '0x2546BcD3c84621e976D8185a91A922aE77ECEc30',
        name: 'code-executor-agent',
        type: 'code',
        status: 'active',
        capabilities: ['python_execution', 'js_sandbox', 'debugging'],
        price: 0.20,
        priceUnit: 'USDC',
        lastActive: '5 mins ago',
        address: '0x254...Ec30',
        successRate: 97.8,
        avgTime: '1.5s',
        totalJobs: 3100,
        description: 'Safely executes code snippets in sandboxed environments and provides debugging assistance.'
    },
    {
        id: '0xbDa5747bFD65F08deb54cb465eB87D40e51B197E',
        name: 'translation-agent',
        type: 'translation',
        status: 'idle',
        capabilities: ['multi_language', 'context_aware', 'realtime_translate'],
        price: 0.08,
        priceUnit: 'USDC',
        lastActive: '30 mins ago',
        address: '0xbDa...197E',
        successRate: 98.9,
        avgTime: '1.2s',
        totalJobs: 5670,
        description: 'Translates text between multiple languages while preserving context and nuance.'
    },
    {
        id: '0xdD870fA1b7C4700F2BD7f44238821C26f7392148',
        name: 'sentiment-analyzer-agent',
        type: 'sentiment',
        status: 'active',
        capabilities: ['sentiment_analysis', 'emotion_detection', 'intent_classification'],
        price: 0.03,
        priceUnit: 'USDC',
        lastActive: '15 mins ago',
        address: '0xdD8...2148',
        successRate: 95.4,
        avgTime: '0.5s',
        totalJobs: 8900,
        description: 'Analyzes text to determine sentiment, emotion, and user intent.'
    }
];

export const MOCK_LOGS: LogEntry[] = [
    {
        id: 'log-1',
        timestamp: '10:42:15',
        source: 'System',
        message: 'Agentia Protocol v1.0.0 initialized',
        type: 'info'
    },
    {
        id: 'log-2',
        timestamp: '10:42:16',
        source: 'Manager',
        message: 'Connecting to Registry MCP...',
        type: 'info'
    },
    {
        id: 'log-3',
        timestamp: '10:42:18',
        source: 'Registry',
        message: 'Connection established. 8 agents available.',
        type: 'success'
    },
    {
        id: 'log-4',
        timestamp: '10:42:20',
        source: 'Manager',
        message: 'Wallet connected: 0x71C...976F',
        type: 'info'
    },
    {
        id: 'log-5',
        timestamp: '10:45:00',
        source: 'Manager',
        message: 'Task received: "Find lowest ETH gas fees"',
        type: 'info'
    },
    {
        id: 'log-6',
        timestamp: '10:45:02',
        source: 'Manager',
        message: 'Delegating to crypto-price-agent...',
        type: 'info'
    },
    {
        id: 'log-7',
        timestamp: '10:45:05',
        source: 'Agent',
        message: 'crypto-price-agent: Gas is 15 gwei',
        type: 'success'
    }
];

export const MOCK_TRANSACTIONS: Transaction[] = [
    {
        id: 'tx-1',
        hash: '0x88d...92a1',
        type: 'payment',
        from: '0xUser',
        to: '0x90F...c9C1',
        amount: '0.02',
        token: 'USDC',
        status: 'confirmed',
        timestamp: '10:45'
    },
    {
        id: 'tx-2',
        hash: '0x77a...11b2',
        type: 'deposit',
        from: '0xExchange',
        to: '0xUser',
        amount: '100.00',
        token: 'USDC',
        status: 'confirmed',
        timestamp: '09:30'
    },
    {
        id: 'tx-3',
        hash: '0x66c...33d4',
        type: 'payment',
        from: '0xUser',
        to: '0x71C...976F',
        amount: '0.05',
        token: 'USDC',
        status: 'confirmed',
        timestamp: 'Yesterday'
    },
    {
        id: 'tx-4',
        hash: '0x55e...44f5',
        type: 'payment',
        from: '0xUser',
        to: '0x254...Ec30',
        amount: '0.20',
        token: 'USDC',
        status: 'failed',
        timestamp: 'Yesterday'
    },
    {
        id: 'tx-5',
        hash: '0x44g...55h6',
        type: 'deposit',
        from: '0xBridge',
        to: '0xUser',
        amount: '0.5',
        token: 'ETH',
        status: 'confirmed',
        timestamp: '2 days ago'
    }
];
