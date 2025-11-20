import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type { AppState, LogEntry, Transaction } from '../types';
import { MOCK_AGENTS, MOCK_LOGS, MOCK_TRANSACTIONS } from '../data/mockData';
import { useWallet } from './WalletContext';

interface AppContextType extends AppState {
    addLog: (entry: Omit<LogEntry, 'id' | 'timestamp'>) => void;
    addTransaction: (tx: Omit<Transaction, 'id' | 'timestamp'>) => void;
    hireAgent: (agentId: string) => void;
    setFilter: (filter: string) => void;
    setSearchQuery: (query: string) => void;
}

const initialState: AppState = {
    activeAgents: [],
    availableAgents: MOCK_AGENTS,
    terminalHistory: MOCK_LOGS,
    transactions: MOCK_TRANSACTIONS,
    balances: {
        eth: '145.20',
        usdc: '25,400.00'
    },
    filter: 'all',
    searchQuery: '',
    walletAccountId: null
};

// Add filter state to AppState in types if not present, or handle locally
// For now, we'll extend the state locally for the reducer
interface ExtendedAppState extends AppState {
    filters: {
        category: string;
        searchQuery: string;
    };
}

const extendedInitialState: ExtendedAppState = {
    ...initialState,
    filters: {
        category: 'ALL',
        searchQuery: '',
    },
};

type Action =
    | { type: 'ADD_LOG'; payload: LogEntry }
    | { type: 'ADD_TRANSACTION'; payload: Transaction }
    | { type: 'HIRE_AGENT'; payload: string }
    | { type: 'SET_FILTER'; payload: string }
    | { type: 'SET_SEARCH'; payload: string };

const appReducer = (state: ExtendedAppState, action: Action): ExtendedAppState => {
    switch (action.type) {
        case 'ADD_LOG':
            return {
                ...state,
                terminalHistory: [...state.terminalHistory, action.payload],
            };
        case 'ADD_TRANSACTION':
            return {
                ...state,
                transactions: [action.payload, ...state.transactions],
            };
        case 'HIRE_AGENT': {
            const agent = state.availableAgents.find(a => a.id === action.payload);
            if (!agent || state.activeAgents.find(a => a.id === agent.id)) return state;
            return {
                ...state,
                activeAgents: [...state.activeAgents, agent],
            };
        }
        case 'SET_FILTER':
            return {
                ...state,
                filters: { ...state.filters, category: action.payload },
            };
        case 'SET_SEARCH':
            return {
                ...state,
                filters: { ...state.filters, searchQuery: action.payload },
            };
        default:
            return state;
    }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, extendedInitialState);

    const { accountId } = useWallet();

    // Sync wallet state
    useEffect(() => {
        if (accountId) {
            const newLog: LogEntry = {
                source: 'System',
                message: `Wallet connected: ${accountId} `,
                type: 'success',
                id: Math.random().toString(36).substr(2, 9), // Generate ID
                timestamp: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }), // Generate timestamp
            };
            dispatch({ type: 'ADD_LOG', payload: newLog });
        }
    }, [accountId]);

    const addLog = (log: Omit<LogEntry, 'id' | 'timestamp'>) => {
        const newLog: LogEntry = {
            ...log,
            id: Math.random().toString(36).substr(2, 9),
            timestamp: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        };
        dispatch({ type: 'ADD_LOG', payload: newLog });
    };

    const addTransaction = (tx: Omit<Transaction, 'id' | 'timestamp'>) => {
        const newTx: Transaction = {
            ...tx,
            id: Math.random().toString(36).substr(2, 9),
            timestamp: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' }),
        };
        dispatch({ type: 'ADD_TRANSACTION', payload: newTx });
    };

    const hireAgent = (agentId: string) => {
        dispatch({ type: 'HIRE_AGENT', payload: agentId });
        addLog({
            source: 'Manager',
            message: `Hiring agent ${agentId.slice(0, 8)}...`,
            type: 'info'
        });
        setTimeout(() => {
            addLog({
                source: 'Registry',
                message: `Agent ${agentId.slice(0, 8)}... successfully hired and active.`,
                type: 'success'
            });
        }, 1000);
    };

    const setFilter = (category: string) => {
        dispatch({ type: 'SET_FILTER', payload: category });
    };

    const setSearchQuery = (query: string) => {
        dispatch({ type: 'SET_SEARCH', payload: query });
    };

    return (
        <AppContext.Provider value={{ ...state, addLog, addTransaction, hireAgent, setFilter, setSearchQuery }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};
