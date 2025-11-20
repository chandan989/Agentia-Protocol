import React from 'react';
import { Wallet, LogOut } from 'lucide-react';
import { useWallet } from '../../context/WalletContext';

export const ConnectWalletButton: React.FC = () => {
    const { isConnected, accountId, connect, disconnect } = useWallet();

    if (isConnected && accountId) {
        return (
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-2 bg-agentia-green/10 border border-agentia-green rounded-sm text-agentia-carbon font-mono text-sm font-bold">
                    <div className="w-2 h-2 rounded-full bg-agentia-green animate-pulse"></div>
                    {accountId}
                </div>
                <button
                    onClick={disconnect}
                    className="p-2 text-agentia-grey hover:text-red-500 transition-colors"
                    title="Disconnect Wallet"
                >
                    <LogOut size={18} />
                </button>
            </div>
        );
    }

    return (
        <button
            onClick={connect}
            className="btn-primary"
        >
            <Wallet size={18} />
            CONNECT WALLET
        </button>
    );
};
