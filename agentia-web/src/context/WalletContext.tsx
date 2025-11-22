import React, { createContext, useContext, useState, useRef, type ReactNode } from 'react';
import { DAppConnector } from '@hashgraph/hedera-wallet-connect';
import { LedgerId } from '@hashgraph/sdk';

interface WalletContextType {
    isConnected: boolean;
    accountId: string | null;
    connect: () => Promise<void> | void;
    disconnect: () => Promise<void> | void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [accountId, setAccountId] = useState<string | null>(null);
    const connectorRef = useRef<DAppConnector | null>(null);

    const connect = async () => {
        try {
            const projectId = import.meta.env.VITE_WC_PROJECT_ID as string | undefined;
            const networkEnv = (import.meta.env.VITE_HEDERA_NETWORK as string | undefined) || 'testnet';

            if (!projectId) {
                console.warn('Missing VITE_WC_PROJECT_ID. Set it in .env to enable WalletConnect.');
                return; // Abort connect until project id is provided
            }

            const ledgerId = networkEnv.toLowerCase() === 'mainnet'
                ? LedgerId.MAINNET
                : networkEnv.toLowerCase() === 'previewnet'
                ? LedgerId.PREVIEWNET
                : LedgerId.TESTNET;

            if (!connectorRef.current) {
                connectorRef.current = new DAppConnector(
                    {
                        name: 'Agentia Protocol',
                        description: 'Agent discovery, hire, and pay',
                        url: window.location.origin,
                        icons: [`${window.location.origin}/logo.svg`],
                    },
                    ledgerId,
                    projectId
                );
                await connectorRef.current.init();
            }

            // Prefer HashPack extension if detected, otherwise fall back to QR modal
            let session;
            const extensions = connectorRef.current.extensions || [];
            const hashpackExt = extensions.find((e) =>
                e.available && (
                    (e.name && e.name.toLowerCase().includes('hashpack')) ||
                    (e.id && e.id.toLowerCase().includes('hashpack'))
                )
            );

            if (hashpackExt) {
                session = await connectorRef.current.connectExtension(hashpackExt.id);
            } else {
                session = await connectorRef.current.openModal();
            }

            const signer = connectorRef.current.signers[0];
            const connectedAccount = signer?.getAccountId()?.toString() ?? null;

            if (connectedAccount) {
                setAccountId(connectedAccount);
                setIsConnected(true);
                console.log(`Wallet connected: ${connectedAccount}`);
            } else {
                console.warn('No Hedera account selected during WalletConnect pairing.');
            }
        } catch (err) {
            console.error('WalletConnect connection failed:', err);
        }
    };

    const disconnect = async () => {
        try {
            if (connectorRef.current) {
                await connectorRef.current.disconnectAll();
            }
        } catch (err) {
            console.error('Wallet disconnect failed:', err);
        } finally {
            setAccountId(null);
            setIsConnected(false);
        }
    };

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
