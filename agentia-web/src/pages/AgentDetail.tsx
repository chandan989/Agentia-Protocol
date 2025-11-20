import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Shield, Zap, Globe, Database, FileText, Image, Code, Languages, Activity, CheckCircle, Clock, Copy } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { Agent } from '../types';

export const AgentDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { availableAgents, hireAgent } = useApp();
    const navigate = useNavigate();

    const agent = availableAgents.find(a => a.id === id);

    if (!agent) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-24 text-center">
                <h2 className="text-2xl font-bold mb-4">Agent Not Found</h2>
                <Link to="/registry" className="text-agentia-green hover:underline">Return to Registry</Link>
            </div>
        );
    }

    const handleHire = () => {
        hireAgent(agent.id);
        navigate('/app');
    };

    const getIcon = (type: Agent['type']) => {
        switch (type) {
            case 'web': return <Globe size={32} />;
            case 'data': return <Database size={32} />;
            case 'crypto': return <Zap size={32} />;
            case 'document': return <FileText size={32} />;
            case 'image': return <Image size={32} />;
            case 'code': return <Code size={32} />;
            case 'translation': return <Languages size={32} />;
            case 'sentiment': return <Activity size={32} />;
            default: return <Shield size={32} />;
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <button
                onClick={() => navigate('/registry')}
                className="flex items-center gap-2 text-agentia-grey hover:text-agentia-carbon mb-8 transition-colors"
            >
                <ArrowLeft size={16} />
                <span className="font-mono text-sm">BACK TO REGISTRY</span>
            </button>

            {/* Header Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8 shadow-sm">
                <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                    <div className="flex items-center gap-6">
                        <div className="p-4 bg-gray-50 rounded-lg text-agentia-carbon">
                            {getIcon(agent.type)}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold mb-2">{agent.name}</h1>
                            <div className="flex items-center gap-3 mb-2">
                                <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-mono font-bold border ${agent.status === 'active'
                                    ? 'bg-green-50 text-agentia-green border-green-100'
                                    : 'bg-gray-50 text-gray-500 border-gray-200'
                                    }`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${agent.status === 'active' ? 'bg-agentia-green' : 'bg-gray-400'}`}></span>
                                    {agent.status.toUpperCase()}
                                </div>
                                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-mono bg-gray-50 text-agentia-grey border border-gray-200">
                                    ID: {agent.id.slice(0, 8)}...{agent.id.slice(-6)}
                                    <Copy size={10} className="cursor-pointer hover:text-agentia-carbon" />
                                </div>
                            </div>
                            <p className="text-agentia-grey max-w-xl">{agent.description}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-3xl font-mono font-bold text-agentia-green mb-1">
                            {agent.price} {agent.priceUnit}
                        </div>
                        <div className="text-sm text-agentia-grey mb-4">per execution</div>
                        <button
                            onClick={handleHire}
                            className="btn-primary w-full md:w-auto"
                        >
                            HIRE AGENT
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="md:col-span-2 space-y-8">
                    {/* Capabilities */}
                    <section>
                        <h2 className="font-mono font-bold text-lg mb-4 border-b border-gray-200 pb-2">AVAILABLE TOOLS</h2>
                        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                            <ul className="space-y-3">
                                {agent.capabilities.map((cap, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <span className="text-agentia-green font-mono mt-1">{'>'}</span>
                                        <div>
                                            <div className="font-mono font-bold text-agentia-carbon">{cap}</div>
                                            <div className="text-sm text-agentia-grey">
                                                Automated capability for {cap.replace(/_/g, ' ')} tasks.
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    {/* Sample Usage */}
                    <section>
                        <h2 className="font-mono font-bold text-lg mb-4 border-b border-gray-200 pb-2">SAMPLE USAGE</h2>
                        <div className="bg-agentia-carbon rounded-lg p-6 text-white font-mono text-sm overflow-x-auto shadow-lg">
                            <div className="flex items-center gap-2 mb-4 border-b border-gray-700 pb-4">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                <span className="ml-2 text-xs text-gray-500">bash</span>
                            </div>
                            <div className="space-y-2">
                                <div className="text-gray-400"># Execute task via CLI</div>
                                <div>
                                    <span className="text-agentia-green">agentia</span> run {agent.name} \
                                </div>
                                <div className="pl-4">
                                    --task "Analyze market sentiment for ETH" \
                                </div>
                                <div className="pl-4">
                                    --budget {agent.price} {agent.priceUnit}
                                </div>
                                <br />
                                <div className="text-gray-400"># Response</div>
                                <div className="text-agentia-green">
                                    {'{'}
                                    <br />
                                    &nbsp;&nbsp;"status": "success",
                                    <br />
                                    &nbsp;&nbsp;"result": "Bullish sentiment detected...",
                                    <br />
                                    &nbsp;&nbsp;"cost": "{agent.price} {agent.priceUnit}"
                                    <br />
                                    {'}'}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                    {/* Performance */}
                    <section>
                        <h2 className="font-mono font-bold text-lg mb-4 border-b border-gray-200 pb-2">METRICS</h2>
                        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
                            <div>
                                <div className="text-xs text-agentia-grey font-mono mb-1">SUCCESS RATE</div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle size={16} className="text-agentia-green" />
                                    <span className="font-bold text-lg">{agent.successRate}%</span>
                                </div>
                            </div>
                            <div>
                                <div className="text-xs text-agentia-grey font-mono mb-1">AVG RESPONSE</div>
                                <div className="flex items-center gap-2">
                                    <Clock size={16} className="text-agentia-carbon" />
                                    <span className="font-bold text-lg">{agent.avgTime}</span>
                                </div>
                            </div>
                            <div>
                                <div className="text-xs text-agentia-grey font-mono mb-1">TOTAL JOBS</div>
                                <div className="flex items-center gap-2">
                                    <Activity size={16} className="text-agentia-carbon" />
                                    <span className="font-bold text-lg">{agent.totalJobs?.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Payment */}
                    <section>
                        <h2 className="font-mono font-bold text-lg mb-4 border-b border-gray-200 pb-2">PAYMENT</h2>
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <div className="mb-4">
                                <div className="text-xs text-agentia-grey font-mono mb-1">ACCEPTED TOKENS</div>
                                <div className="flex gap-2">
                                    <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs font-bold">USDC</span>
                                    <span className="px-2 py-1 bg-purple-50 text-purple-600 rounded text-xs font-bold">ETH</span>
                                </div>
                            </div>
                            <div>
                                <div className="text-xs text-agentia-grey font-mono mb-1">PAYMENT ADDRESS</div>
                                <div className="flex items-center gap-2 bg-gray-50 p-2 rounded border border-gray-200">
                                    <span className="font-mono text-xs truncate">{agent.address}</span>
                                    <Copy size={12} className="text-agentia-grey cursor-pointer hover:text-agentia-carbon" />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};
