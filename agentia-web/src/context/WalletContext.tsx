import React, { createContext, useContext, useState, type ReactNode } from 'react';

// NOTE: This is a dummy implementation for development.
// The real wallet connection logic is temporarily disabled.

interface WalletContextType {
    isConnected: boolean;
    accountId: string | null;
    connect: () => void;
    disconnect: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [accountId, setAccountId] = useState<string | null>(null);

    const connect = () => {
        console.log("Connecting to wallet... (dummy operation)");
        // Simulate a successful connection after a short delay
        setTimeout(() => {
            const dummyAccountId = "0.0.123456";
            setAccountId(dummyAccountId);
            setIsConnected(true);
            console.log(`Wallet connected: ${dummyAccountId}`);
        }, 500);
    };

    const disconnect = () => {
        console.log("Disconnecting wallet... (dummy operation)");
        setAccountId(null);
        setIsConnected(false);
        console.log("Wallet disconnected.");
    };

    // The original HashConnect initialization is commented out for dummy operation.
    // useEffect(() => {
    //     const initHashConnect = async () => { ... };
    //     initHashConnect();
    // }, []);

    return (
        <WalletContext.Provider value={{ isConnected, accountId, connect, disconnect }}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = () => {
    const context = useContext(WalletContext);
    if (context === undefined) {
        throw new Error('useWallet must be used within a WalletProvider');
    }
    return context;
};
