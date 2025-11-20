import React, { useState } from 'react';
import { Send, Activity, CreditCard, Cpu, Terminal } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TerminalLog } from '../components/shared/TerminalLog';
import { TransactionItem } from '../components/shared/TransactionItem';

export const AppDashboard: React.FC = () => {
    const { activeAgents, terminalHistory, transactions, addLog } = useApp();
    const [input, setInput] = useState('');

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        // Add user command to log
        addLog({
            source: 'Manager',
            message: input,
            type: 'info'
        });

        const command = input.toLowerCase();
        setInput('');

        // Simulate response
        setTimeout(() => {
            if (command.includes('help')) {
                addLog({
                    source: 'System',
                    message: 'Available commands: find <task>, pay <agent> <amount>, status, clear',
                    type: 'info'
                });
            } else if (command.includes('find')) {
                addLog({
                    source: 'Manager',
                    message: 'Querying Registry for suitable agents...',
                    type: 'info'
                });
                setTimeout(() => {
                    addLog({
                        source: 'Registry',
                        message: 'Found 3 agents matching criteria. Top match: web-scraper-agent (98% match)',
                        type: 'success'
                    });
                }, 1500);
            } else {
                addLog({
                    source: 'System',
                    message: `Command executed: ${command}`,
                    type: 'info'
                });
            }
        }, 600);
    };

    return (
        <div className="h-[calc(100vh-64px)] flex flex-col md:flex-row overflow-hidden bg-canvas text-ink-primary font-sans">
            {/* Left Panel - Terminal */}
            <div className="flex-1 flex flex-col p-4 md:p-6 overflow-hidden">
                <div className="flex-1 flex flex-col bg-surface rounded-lg shadow-sm border border-border-faint overflow-hidden">
                    {/* Terminal Header */}
                    <div className="h-14 flex-shrink-0 flex items-center px-6 border-b border-border-faint bg-surface">
                        <div className="flex items-center gap-3">
                            <div className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                            </div>
                            <span className="font-mono text-sm font-bold tracking-wider text-ink-primary">MANAGER_TERMINAL</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700 border border-green-200">ONLINE</span>
                        </div>
                    </div>

                    {/* Terminal Log */}
                    <div className="flex-1 overflow-hidden relative bg-surface">
                        <TerminalLog logs={terminalHistory} className="h-full pb-4" />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-surface border-t border-border-faint">
                        <form onSubmit={handleCommand} className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-mono font-bold">{'>'}</span>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="w-full bg-canvas text-ink-primary font-mono text-sm rounded-md pl-10 pr-12 py-3 focus:outline-none focus:ring-1 focus:ring-primary border border-border-faint placeholder-ink-secondary/50"
                                placeholder="Enter command..."
                                autoFocus
                            />
                            <button
                                type="submit"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-secondary hover:text-primary transition-colors"
                            >
                                <Send size={16} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Right Panel - Network State */}
            <div className="w-full md:w-[400px] lg:w-[450px] bg-canvas flex flex-col overflow-y-auto border-l border-border-faint">
                {/* Stats Section */}
                <div className="p-6 border-b border-border-faint">
                    <div className="flex items-center gap-2 mb-6">
                        <Activity size={20} className="text-primary" />
                        <h2 className="font-bold text-lg tracking-tight">NETWORK STATE</h2>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-surface rounded-lg border border-border-faint shadow-sm">
                            <div className="text-xs text-ink-secondary font-mono mb-2">ACTIVE AGENTS</div>
                            <div className="text-3xl font-bold font-mono text-ink-primary">{activeAgents.length}</div>
                        </div>
                        <div className="p-4 bg-surface rounded-lg border border-border-faint shadow-sm">
                            <div className="text-xs text-ink-secondary font-mono mb-2">UPTIME</div>
                            <div className="text-3xl font-bold font-mono text-ink-primary">99.9%</div>
                        </div>
                    </div>
                </div>

                {/* Active Agents Section */}
                <div className="p-6 border-b border-border-faint">
                    <div className="flex items-center gap-2 mb-4">
                        <Cpu size={20} className="text-primary" />
                        <h3 className="font-bold text-sm font-mono text-ink-secondary">HIRED AGENTS</h3>
                    </div>
                    <div className="space-y-3">
                        {activeAgents.length === 0 ? (
                            <div className="p-8 text-center border border-dashed border-border-faint rounded-lg bg-surface/50">
                                <div className="text-sm text-ink-secondary italic">No active agents hired.</div>
                            </div>
                        ) : (
                            activeAgents.map(agent => (
                                <div key={agent.id} className="bg-surface p-4 rounded-lg border border-border-faint shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="font-bold text-sm text-ink-primary">{agent.name}</div>
                                        <div className="flex items-center gap-1.5">
                                            <span className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                            </span>
                                            <span className="text-[10px] font-mono font-bold text-green-600">ACTIVE</span>
                                        </div>
                                    </div>
                                    <div className="text-xs font-mono text-ink-secondary mb-3 bg-canvas p-1.5 rounded border border-border-faint truncate">
                                        ID: {agent.id}
                                    </div>
                                    <div className="flex justify-between text-xs text-ink-secondary border-t border-border-faint pt-3">
                                        <span className="flex items-center gap-1">
                                            <Terminal size={12} />
                                            {agent.lastActive}
                                        </span>
                                        <span className="font-mono">{agent.price} {agent.priceUnit}/call</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Recent Transactions Section */}
                <div className="p-6 flex-1 bg-canvas">
                    <div className="flex items-center gap-2 mb-4">
                        <CreditCard size={20} className="text-primary" />
                        <h3 className="font-bold text-sm font-mono text-ink-secondary">RECENT TRANSACTIONS</h3>
                    </div>
                    <div className="bg-surface rounded-lg border border-border-faint shadow-sm overflow-hidden">
                        {transactions.length === 0 ? (
                            <div className="p-8 text-center">
                                <div className="text-sm text-ink-secondary italic">No transactions yet.</div>
                            </div>
                        ) : (
                            transactions.slice(0, 5).map(tx => (
                                <TransactionItem key={tx.id} transaction={tx} />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
