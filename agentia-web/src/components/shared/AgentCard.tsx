import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Zap, Globe, Database, FileText, Image, Code, Languages, Activity } from 'lucide-react';
import type { Agent } from '../../types';

interface AgentCardProps {
    agent: Agent;
    onHire?: (agent: Agent) => void;
}

const getIcon = (type: Agent['type']) => {
    switch (type) {
        case 'web': return <Globe size={20} />;
        case 'data': return <Database size={20} />;
        case 'crypto': return <Zap size={20} />;
        case 'document': return <FileText size={20} />;
        case 'image': return <Image size={20} />;
        case 'code': return <Code size={20} />;
        case 'translation': return <Languages size={20} />;
        case 'sentiment': return <Activity size={20} />;
        default: return <Shield size={20} />;
    }
};

export const AgentCard: React.FC<AgentCardProps> = ({ agent, onHire }) => {
    return (
        <div className="card group relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-50 rounded-sm text-agentia-carbon group-hover:text-agentia-green transition-colors">
                        {getIcon(agent.type)}
                    </div>
                    <div>
                        <h3 className="font-bold text-lg leading-tight group-hover:text-agentia-green transition-colors">
                            {agent.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                            <span className={`w-2 h-2 rounded-full ${agent.status === 'active' ? 'bg-agentia-green' : 'bg-gray-300'}`}></span>
                            <span className="text-xs font-mono text-agentia-grey uppercase">[{agent.status}]</span>
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    <div className="font-mono text-lg font-bold text-agentia-green">
                        {agent.price} {agent.priceUnit}
                    </div>
                    <div className="text-xs text-agentia-grey">per call</div>
                </div>
            </div>

            <div className="mb-4">
                <div className="text-xs font-mono text-agentia-grey mb-2">CAPABILITIES_</div>
                <ul className="space-y-1">
                    {agent.capabilities.slice(0, 3).map((cap, idx) => (
                        <li key={idx} className="text-sm font-mono text-agentia-carbon flex items-center gap-2">
                            <span className="text-agentia-green">{'>'}</span>
                            {cap}
                        </li>
                    ))}
                    {agent.capabilities.length > 3 && (
                        <li className="text-xs text-agentia-grey pl-4">
                            + {agent.capabilities.length - 3} more...
                        </li>
                    )}
                </ul>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="font-mono text-xs text-agentia-grey border border-gray-200 px-2 py-1 rounded-sm">
                    ID: {agent.id.slice(0, 6)}...{agent.id.slice(-4)}
                </div>
                <div className="flex gap-2">
                    <Link
                        to={`/registry/${agent.id}`}
                        className="btn-ghost text-xs px-3 py-1"
                    >
                        DETAILS
                    </Link>
                    {onHire && (
                        <button
                            onClick={() => onHire(agent)}
                            className="btn-primary text-xs px-3 py-1"
                        >
                            HIRE
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
