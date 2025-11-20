import React, { useState } from 'react';
import { Wallet, ArrowUpRight, DollarSign, X, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TransactionItem } from '../components/shared/TransactionItem';

export const WalletDashboard: React.FC = () => {
    const { balances, transactions, addTransaction } = useApp();
    const [filter, setFilter] = useState<'ALL' | 'SENT' | 'RECEIVED'>('ALL');
    const [isSendModalOpen, setIsSendModalOpen] = useState(false);

    // Send Form State
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [token, setToken] = useState<'ETH' | 'USDC'>('USDC');
    const [isSuccess, setIsSuccess] = useState(false);

    const filteredTransactions = transactions.filter(tx => {
        if (filter === 'ALL') return true;
        if (filter === 'SENT') return tx.type === 'payment';
        if (filter === 'RECEIVED') return tx.type === 'deposit';
        return true;
    });

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();

        addTransaction({
            hash: `0x${Math.random().toString(16).substr(2, 40)}`,
            type: 'payment',
            from: '0xUser',
            to: recipient,
            amount: amount,
            token: token,
            status: 'confirmed'
        });

        setIsSuccess(true);
        setTimeout(() => {
            setIsSuccess(false);
            setIsSendModalOpen(false);
            setRecipient('');
            setAmount('');
        }, 1500);
    };

    const totalValue = (parseFloat(balances.eth) * 2000 + parseFloat(balances.usdc)).toFixed(2);

    return (
        <div className="bg-canvas text-ink-primary font-sans antialiased">
            <main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
                    <h1 className="font-sans font-bold text-4xl sm:text-5xl text-ink-primary tracking-tight">Wallet Dashboard</h1>
                    <p className="mt-4 text-lg text-ink-secondary">
                        Manage your digital assets, view transaction history, and send payments securely.
                    </p>
                </div>

                {/* Balance Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12 sm:my-16">
                    {/* Total Portfolio Card */}
                    <div className="card group relative overflow-hidden flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-gray-50 rounded-sm text-ink-primary group-hover:text-primary transition-colors">
                                    <Wallet size={24} />
                                </div>
                                <div className="text-xs font-mono text-ink-secondary uppercase tracking-wider">Total Portfolio</div>
                            </div>
                            <div className="mb-6">
                                <div className="text-3xl font-bold font-mono text-primary tracking-tight">${totalValue}</div>
                                <div className="text-xs text-ink-secondary mt-1 font-mono">USD VALUE</div>
                            </div>
                        </div>
                        <div className="flex gap-2 mt-auto pt-4 border-t border-border-faint">
                            <button
                                onClick={() => setIsSendModalOpen(true)}
                                className="btn-primary flex-1 text-xs"
                            >
                                SEND
                            </button>
                            <button className="btn-secondary flex-1 text-xs">
                                RECEIVE
                            </button>
                        </div>
                    </div>

                    {/* ETH Card */}
                    <div className="card group relative overflow-hidden flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-gray-50 rounded-sm text-ink-primary group-hover:text-primary transition-colors">
                                    <DollarSign size={24} />
                                </div>
                                <div className="text-xs font-mono text-ink-secondary uppercase tracking-wider">ETH Balance</div>
                            </div>
                            <div className="mb-6">
                                <div className="text-2xl font-bold font-mono text-ink-primary">{balances.eth} ETH</div>
                                <div className="text-xs text-ink-secondary mt-1 font-mono">≈ ${(parseFloat(balances.eth) * 2000).toFixed(2)} USD</div>
                            </div>
                        </div>
                        <div className="pt-4 border-t border-border-faint">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-primary"></span>
                                <span className="text-xs font-mono text-ink-secondary">ACTIVE</span>
                            </div>
                        </div>
                    </div>

                    {/* USDC Card */}
                    <div className="card group relative overflow-hidden flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-gray-50 rounded-sm text-ink-primary group-hover:text-primary transition-colors">
                                    <DollarSign size={24} />
                                </div>
                                <div className="text-xs font-mono text-ink-secondary uppercase tracking-wider">USDC Balance</div>
                            </div>
                            <div className="mb-6">
                                <div className="text-2xl font-bold font-mono text-ink-primary">{balances.usdc} USDC</div>
                                <div className="text-xs text-ink-secondary mt-1 font-mono">≈ ${balances.usdc} USD</div>
                            </div>
                        </div>
                        <div className="pt-4 border-t border-border-faint">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-primary"></span>
                                <span className="text-xs font-mono text-ink-secondary">ACTIVE</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Transactions */}
                <div className="card p-0 overflow-hidden">
                    <div className="p-6 border-b border-border-faint flex flex-col md:flex-row justify-between items-center gap-4">
                        <h2 className="font-sans font-bold text-xl text-ink-primary flex items-center gap-2">
                            <ArrowUpRight size={20} className="text-primary" />
                            TRANSACTION HISTORY
                        </h2>

                        <div className="flex gap-2">
                            {['ALL', 'SENT', 'RECEIVED'].map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f as any)}
                                    className={`px-4 py-2 font-mono text-xs font-bold rounded-sm transition-all duration-200 whitespace-nowrap ${filter === f
                                        ? 'bg-primary text-ink-primary'
                                        : 'bg-transparent text-ink-secondary hover:text-primary border border-transparent hover:border-primary'
                                        }`}
                                >
                                    [ {f} ]
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="divide-y divide-border-faint">
                        {filteredTransactions.length > 0 ? (
                            filteredTransactions.map(tx => (
                                <TransactionItem key={tx.hash} transaction={tx} />
                            ))
                        ) : (
                            <div className="p-12 text-center text-ink-secondary font-mono text-sm">
                                NO TRANSACTIONS FOUND
                            </div>
                        )}
                    </div>
                </div>

                {/* Send Modal */}
                {isSendModalOpen && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                        <div className="card w-full max-w-md p-6 relative animate-in fade-in zoom-in duration-200 shadow-green-glow-lg">
                            <button
                                onClick={() => setIsSendModalOpen(false)}
                                className="absolute right-4 top-4 text-ink-secondary hover:text-ink-primary transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <h2 className="font-sans font-bold text-2xl text-ink-primary mb-6 flex items-center gap-2">
                                <span className="text-primary">{'>'}</span> SEND PAYMENT
                            </h2>

                            {isSuccess ? (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle size={32} className="text-primary" />
                                    </div>
                                    <h3 className="font-sans font-bold text-xl text-ink-primary mb-2">Payment Sent!</h3>
                                    <p className="text-ink-secondary font-mono text-sm">Transaction confirmed on-chain.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSend} className="space-y-6">
                                    <div>
                                        <label className="block text-xs font-mono font-bold text-ink-secondary mb-2">RECIPIENT ADDRESS_</label>
                                        <input
                                            type="text"
                                            required
                                            value={recipient}
                                            onChange={(e) => setRecipient(e.target.value)}
                                            className="w-full bg-surface border border-border-faint rounded-sm p-3 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors text-ink-primary"
                                            placeholder="0x..."
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-mono font-bold text-ink-secondary mb-2">AMOUNT_</label>
                                            <input
                                                type="number"
                                                required
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                                className="w-full bg-surface border border-border-faint rounded-sm p-3 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors text-ink-primary"
                                                placeholder="0.00"
                                                step="0.000001"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-mono font-bold text-ink-secondary mb-2">TOKEN_</label>
                                            <select
                                                value={token}
                                                onChange={(e) => setToken(e.target.value as any)}
                                                className="w-full bg-surface border border-border-faint rounded-sm p-3 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors text-ink-primary"
                                            >
                                                <option value="USDC">USDC</option>
                                                <option value="ETH">ETH</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="pt-2">
                                        <button
                                            type="submit"
                                            className="btn-primary w-full py-3"
                                        >
                                            CONFIRM PAYMENT
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};
