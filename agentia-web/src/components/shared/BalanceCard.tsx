import React from 'react';
import { Wallet } from 'lucide-react';

interface BalanceCardProps {
    title: string;
    amount: string;
    subAmount?: string;
    isPrimary?: boolean;
    onSend?: () => void;
    onReceive?: () => void;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({
    title,
    amount,
    subAmount,
    isPrimary = false,
    onSend,
    onReceive
}) => {
    if (isPrimary) {
        return (
            <div className="bg-primary text-ink-primary p-6 rounded-md shadow-lg relative overflow-hidden group col-span-1 md:col-span-1 flex flex-col justify-between">
                <div>
                    <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-30 transition-opacity">
                        <Wallet size={64} />
                    </div>
                    <div className="font-mono text-sm opacity-80 mb-2">{title}</div>
                    <div className="font-mono font-bold text-3xl">{amount}</div>
                </div>
                <div className="mt-6 flex gap-2">
                    <button
                        onClick={onSend}
                        className="flex-1 bg-surface text-ink-primary py-2 rounded-sm font-bold text-sm hover:bg-ink-primary hover:text-surface transition-colors font-mono"
                    >
                        [ SEND ]
                    </button>
                    <button
                        onClick={onReceive}
                        className="flex-1 bg-transparent border border-ink-primary text-ink-primary py-2 rounded-sm font-bold text-sm hover:bg-ink-primary hover:text-surface transition-colors font-mono"
                    >
                        [ RECEIVE ]
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-surface border border-border-faint p-6 rounded-md hover:border-primary transition-colors group">
            <div className="font-mono text-sm text-ink-secondary mb-2">{title}</div>
            <div className="font-mono font-bold text-2xl text-ink-primary">{amount}</div>
            {subAmount && <div className="font-mono text-sm text-ink-secondary mt-1">{subAmount}</div>}
        </div>
    );
};
