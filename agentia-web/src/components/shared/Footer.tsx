import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="border-t border-border-faint">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                    <div className="font-mono text-ink-secondary text-sm uppercase tracking-wider space-x-6">
                        <a href="#" className="hover:text-primary transition-colors">[ DOCS ]</a>
                        <a href="#" className="hover:text-primary transition-colors">[ DISCORD ]</a>
                        <a href="#" className="hover:text-primary transition-colors">[ TWITTER ]</a>
                        <a href="#" className="hover:text-primary transition-colors">[ GITHUB ]</a>
                    </div>
                    <div className="font-mono text-primary text-sm uppercase font-bold tracking-wider">
                        STATUS: PRE-ALPHA [ SYSTEMS OPERATIONAL ]
                    </div>
                </div>
            </div>
        </footer>
    );
};
