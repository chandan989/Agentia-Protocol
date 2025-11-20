import React, { useEffect, useRef } from 'react';
import type { LogEntry } from '../../types';

interface TerminalLogProps {
    logs: LogEntry[];
    className?: string;
}

export const TerminalLog: React.FC<TerminalLogProps> = ({ logs, className = '' }) => {
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [logs]);

    const getSourceColor = (source: LogEntry['source']) => {
        switch (source) {
            case 'Manager': return 'text-primary';
            case 'Registry': return 'text-purple-600';
            case 'Agent': return 'text-green-600';
            case 'Wallet': return 'text-orange-600';
            default: return 'text-ink-secondary';
        }
    };

    return (
        <div className={`font-mono text-sm p-4 overflow-y-auto ${className}`}>
            <div className="space-y-1">
                {logs.map((log) => (
                    <div key={log.id} className="break-all hover:bg-black/5 px-1 -mx-1 rounded transition-colors">
                        <span className="text-ink-secondary opacity-70">[{log.timestamp}]</span>{' '}
                        <span className={`font-bold ${getSourceColor(log.source)}`}>{log.source}:</span>{' '}
                        <span className={log.type === 'error' ? 'text-red-600' : 'text-ink-primary'}>
                            {log.message}
                        </span>
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>
        </div>
    );
};
