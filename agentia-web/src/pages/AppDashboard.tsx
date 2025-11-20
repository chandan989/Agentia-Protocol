import React, { useState, useEffect } from 'react';
import { Activity, CreditCard, Cpu, Shield, Zap, Clock, MoreHorizontal } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TerminalLog } from '../components/shared/TerminalLog';
import { TransactionItem } from '../components/shared/TransactionItem';

export const AppDashboard: React.FC = () => {
    const { activeAgents, terminalHistory, transactions, addLog } = useApp();
    const [input, setInput] = useState('');
    const [uptime, setUptime] = useState(0);

    // Simulate uptime counter
    useEffect(() => {
        const interval = setInterval(() => {
            setUptime(prev => prev + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const formatUptime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        addLog({
            source: 'Manager',
            message: input,
            type: 'info'
        });

        const command = input.toLowerCase();
        setInput('');

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
        <div className="bg-canvas min-h-screen text-ink-primary font-sans antialiased selection:bg-primary/20 selection:text-primary">
            <main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 border-b border-border-faint pb-8">
                    <div>
                        <h1 className="font-sans font-bold text-4xl sm:text-5xl text-ink-primary tracking-tight flex items-center gap-3">
                            Command Center
                        </h1>
                        <p className="mt-4 text-lg text-ink-secondary max-w-2xl">
                            Monitor active agents, manage system resources, and execute protocol commands.
                        </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <div className="px-4 py-2 bg-surface border border-border-faint rounded-sm flex items-center gap-3 shadow-sm">
                            <div className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                            </div>
                            <span className="font-mono text-sm font-bold text-green-600">SYSTEM ONLINE</span>
                        </div>
                        <p className="text-xs font-mono text-ink-secondary">
                            ID: <span className="text-ink-primary">AG-8842-X</span> | NET: <span className="text-primary">MAINNET</span>
                        </p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <div className="bg-surface p-6 rounded-md border border-border-faint shadow-sm hover:border-primary/50 transition-colors group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-canvas rounded-md text-ink-secondary group-hover:text-primary transition-colors">
                                <Activity size={24} />
                            </div>
                            <span className="text-xs font-mono text-green-500 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">+2.4%</span>
                        </div>
                        <div className="text-3xl font-bold font-mono text-ink-primary tracking-tight">98.2%</div>
                        <div className="text-xs text-ink-secondary font-mono mt-2 font-bold">SYSTEM LOAD</div>
                    </div>

                    <div className="bg-surface p-6 rounded-md border border-border-faint shadow-sm hover:border-primary/50 transition-colors group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-canvas rounded-md text-ink-secondary group-hover:text-primary transition-colors">
                                <Cpu size={24} />
                            </div>
                            <span className="text-xs font-mono text-ink-secondary bg-canvas px-2 py-0.5 rounded-full border border-border-faint">{activeAgents.length}/10</span>
                        </div>
                        <div className="text-3xl font-bold font-mono text-ink-primary tracking-tight">{activeAgents.length}</div>
                        <div className="text-xs text-ink-secondary font-mono mt-2 font-bold">ACTIVE AGENTS</div>
                    </div>

                    <div className="bg-surface p-6 rounded-md border border-border-faint shadow-sm hover:border-primary/50 transition-colors group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-canvas rounded-md text-ink-secondary group-hover:text-primary transition-colors">
                                <Zap size={24} />
                            </div>
                            <span className="text-xs font-mono text-ink-secondary bg-canvas px-2 py-0.5 rounded-full border border-border-faint">24H</span>
                        </div>
                        <div className="text-3xl font-bold font-mono text-ink-primary tracking-tight">{transactions.length}</div>
                        <div className="text-xs text-ink-secondary font-mono mt-2 font-bold">TRANSACTIONS</div>
                    </div>

                    <div className="bg-surface p-6 rounded-md border border-border-faint shadow-sm hover:border-primary/50 transition-colors group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-canvas rounded-md text-ink-secondary group-hover:text-primary transition-colors">
                                <Clock size={24} />
                            </div>
                        </div>
                        <div className="text-3xl font-bold font-mono text-ink-primary tracking-tight">{formatUptime(uptime)}</div>
                        <div className="text-xs text-ink-secondary font-mono mt-2 font-bold">SESSION UPTIME</div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[600px]">
                    {/* Left: Terminal (2 cols) */}
                    <div className="lg:col-span-2 h-full flex flex-col">
                        <div className="flex-1 bg-surface rounded-md border border-border-faint shadow-lg flex flex-col overflow-hidden">
                            {/* Terminal Window Header */}
                            <div className="bg-canvas border-b border-border-faint px-4 py-3 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                                </div>
                                <div className="text-xs font-mono text-ink-secondary flex items-center gap-2">
                                    <Shield size={12} />
                                    <span>SECURE_SHELL</span>
                                </div>
                                <div className="w-12"></div> {/* Spacer for balance */}
                            </div>

                            {/* Terminal Output */}
                            <div className="flex-1 bg-canvas/50 p-0 overflow-hidden relative">
                                <div className="absolute inset-0 overflow-y-auto p-6 font-mono text-sm">
                                    <TerminalLog logs={terminalHistory} />
                                </div>
                            </div>

                            {/* Input Area */}
                            <div className="p-4 bg-surface border-t border-border-faint">
                                <form onSubmit={handleCommand} className="relative w-full">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary font-mono font-bold">{'>'}</span>
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        className="w-full bg-surface border border-border-faint text-ink-primary font-mono text-sm rounded-md pl-8 pr-24 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors placeholder-ink-secondary/50"
                                        placeholder="ENTER COMMAND..."
                                        autoFocus
                                    />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-ink-secondary border border-border-faint px-2 py-1 rounded bg-canvas">
                                        CMD + K
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Right: System Monitor (1 col) */}
                    <div className="flex flex-col gap-6 h-full overflow-hidden">
                        {/* Active Agents List */}
                        <div className="flex-1 bg-surface rounded-md border border-border-faint shadow-sm flex flex-col overflow-hidden">
                            <div className="p-4 border-b border-border-faint flex justify-between items-center bg-canvas/30">
                                <h3 className="font-bold text-sm text-ink-primary flex items-center gap-2">
                                    <Cpu size={16} className="text-ink-secondary" />
                                    Active Processes
                                </h3>
                                <button className="text-ink-secondary hover:text-primary transition-colors">
                                    <MoreHorizontal size={16} />
                                </button>
                            </div>
                            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                                {activeAgents.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                                        <Cpu size={32} className="mb-2" />
                                        <p className="text-xs font-mono">NO ACTIVE AGENTS</p>
                                    </div>
                                ) : (
                                    activeAgents.map(agent => (
                                        <div key={agent.id} className="p-3 bg-canvas rounded border border-border-faint hover:border-primary/30 transition-colors group">
                                            <div className="flex justify-between items-start mb-1">
                                                <span className="font-bold text-sm text-ink-primary group-hover:text-primary transition-colors">{agent.name}</span>
                                                <div className="flex h-2 w-2 relative mt-1">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center text-xs text-ink-secondary font-mono">
                                                <span>{agent.type.toUpperCase()}</span>
                                                <span>{agent.price}/op</span>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Recent Transactions */}
                        <div className="flex-1 bg-surface rounded-md border border-border-faint shadow-sm flex flex-col overflow-hidden">
                            <div className="p-4 border-b border-border-faint flex justify-between items-center bg-canvas/30">
                                <h3 className="font-bold text-sm text-ink-primary flex items-center gap-2">
                                    <CreditCard size={16} className="text-ink-secondary" />
                                    Ledger
                                </h3>
                                <button className="text-ink-secondary hover:text-primary transition-colors">
                                    <MoreHorizontal size={16} />
                                </button>
                            </div>
                            <div className="flex-1 overflow-y-auto">
                                {transactions.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center text-center opacity-50 p-4">
                                        <CreditCard size={32} className="mb-2" />
                                        <p className="text-xs font-mono">NO TRANSACTIONS</p>
                                    </div>
                                ) : (
                                    <div className="divide-y divide-border-faint">
                                        {transactions.slice(0, 10).map(tx => (
                                            <div key={tx.id} className="p-3 hover:bg-canvas transition-colors">
                                                <TransactionItem transaction={tx} />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
