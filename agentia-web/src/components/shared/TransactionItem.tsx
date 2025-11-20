import React from 'react';
import { ArrowUpRight, ArrowDownLeft, Clock, CheckCircle, XCircle, Copy } from 'lucide-react';
import type { Transaction } from '../../types';

interface TransactionItemProps {
    transaction: Transaction;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
    const isReceived = transaction.type === 'deposit';

    const getStatusIcon = (status: Transaction['status']) => {
        switch (status) {
            case 'confirmed': return <CheckCircle size={16} className="text-primary" />;
            case 'pending': return <Clock size={16} className="text-yellow-500" />;
            case 'failed': return <XCircle size={16} className="text-red-500" />;
        }
    };

    return (
        <div className="flex items-center justify-between p-4 border-b border-border-faint hover:bg-black/5 transition-colors group">
            <div className="flex items-center gap-4">
                <div className={`p-2 rounded-sm ${isReceived ? 'bg-primary/10 text-primary' : 'bg-surface border border-border-faint text-ink-secondary'}`}>
                    {isReceived ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                </div>
                <div>
                    <div className="font-mono text-sm font-bold text-ink-primary group-hover:text-primary transition-colors">
                        {isReceived ? 'RECEIVED' : 'SENT'} {transaction.token}
                    </div>
                    <div className="text-xs text-ink-secondary flex items-center gap-2 mt-0.5">
                        <span>{transaction.timestamp}</span>
                        <span className="text-border-faint">|</span>
                        <span className="font-mono">{transaction.hash.slice(0, 6)}...{transaction.hash.slice(-4)}</span>
                        <button className="hover:text-ink-primary transition-colors"><Copy size={12} /></button>
                    </div>
                </div>
            </div>

            <div className="text-right">
                <div className={`font-mono font-bold ${isReceived ? 'text-primary' : 'text-ink-primary'}`}>
                    {isReceived ? '+' : '-'}{transaction.amount} {transaction.token}
                </div>
                <div className="flex items-center justify-end gap-1 mt-1">
                    {getStatusIcon(transaction.status)}
                    <span className="text-xs uppercase font-mono text-ink-secondary">{transaction.status}</span>
                </div>
            </div>
        </div>
    );
};
