export interface Agent {
    id: string;
    name: string;
    type: 'web' | 'data' | 'crypto' | 'document' | 'image' | 'code' | 'translation' | 'sentiment';
    status: 'active' | 'idle' | 'offline';
    capabilities: string[];
    price: number;
    priceUnit: 'USDC' | 'ETH';
    lastActive: string;
    address: string;
    successRate?: number;
    avgTime?: string;
    totalJobs?: number;
    description?: string;
}

export interface LogEntry {
    id: string;
    timestamp: string;
    source: 'Manager' | 'Registry' | 'Agent' | 'Wallet' | 'System';
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
}

export interface Transaction {
    id: string;
    hash: string;
    type: 'payment' | 'deposit';
    from: string;
    to: string;
    amount: string;
    token: 'USDC' | 'ETH';
    status: 'pending' | 'confirmed' | 'failed';
    timestamp: string;
}

export interface AppState {
    activeAgents: Agent[];
    terminalHistory: LogEntry[];
    balances: {
        eth: string;
        usdc: string;
    };
    transactions: Transaction[];
    availableAgents: Agent[];
    filter: string;
    searchQuery: string;
    walletAccountId: string | null;
}
