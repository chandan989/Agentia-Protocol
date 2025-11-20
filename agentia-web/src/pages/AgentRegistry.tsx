import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AgentCard } from '../components/shared/AgentCard';
import type { Agent } from '../types';

export const AgentRegistry: React.FC = () => {
    const { availableAgents, hireAgent } = useApp();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState('ALL');

    const categories = ['ALL', 'WEB', 'DATA', 'CRYPTO', 'AI'];

    const filteredAgents = availableAgents.filter(agent => {
        const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            agent.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            agent.capabilities.some(cap => cap.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesCategory = category === 'ALL' ||
            (category === 'WEB' && agent.type === 'web') ||
            (category === 'DATA' && (agent.type === 'data' || agent.type === 'document')) ||
            (category === 'CRYPTO' && agent.type === 'crypto') ||
            (category === 'AI' && (agent.type === 'image' || agent.type === 'sentiment' || agent.type === 'translation' || agent.type === 'code'));

        return matchesSearch && matchesCategory;
    });

    const handleHire = (agent: Agent) => {
        hireAgent(agent.id);
        navigate('/app');
    };

    return (
        <div className="bg-canvas text-ink-primary font-sans antialiased">
            <main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto">
                    <h1 className="font-sans font-bold text-4xl sm:text-5xl text-ink-primary tracking-tight">Agent Registry</h1>
                    <p className="mt-4 text-lg text-ink-secondary">
                        Discover and hire specialist agents for your autonomous workflows.
                        Verified capabilities, transparent pricing, and instant availability.
                    </p>
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row gap-4 md:gap-6 my-12 sm:my-16 items-center justify-center">
                    <div className="relative w-full md:w-96">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary font-mono font-bold">{'>'}</span>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-surface border border-border-faint text-ink-primary font-mono text-sm rounded-md pl-8 pr-10 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
                            placeholder="SEARCH BY NAME OR CAPABILITY_"
                        />
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-secondary" size={18} />
                    </div>

                    <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto justify-center">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setCategory(cat)}
                                className={`px-4 py-2 font-mono text-sm font-bold rounded-sm transition-all duration-200 whitespace-nowrap ${category === cat
                                    ? 'bg-primary text-ink-primary'
                                    : 'bg-surface border border-border-faint text-ink-secondary hover:border-primary hover:text-primary'
                                    }`}
                            >
                                [ {cat} ]
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAgents.map(agent => (
                        <AgentCard
                            key={agent.id}
                            agent={agent}
                            onHire={handleHire}
                        />
                    ))}
                </div>

                {filteredAgents.length === 0 && (
                    <div className="text-center py-24 bg-surface border border-dashed border-border-faint rounded-md col-span-full">
                        <Filter size={48} className="mx-auto text-ink-secondary opacity-50 mb-4" />
                        <h3 className="text-lg font-bold text-ink-secondary">No agents found</h3>
                        <p className="text-ink-secondary">Try adjusting your search or filter criteria.</p>
                    </div>
                )}
            </main>
        </div>
    );
};
