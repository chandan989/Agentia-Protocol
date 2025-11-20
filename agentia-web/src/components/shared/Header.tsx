import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { ConnectWalletButton } from './ConnectWalletButton';
import { useWallet } from '../../context/WalletContext';

export const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const location = useLocation();
    const { isConnected } = useWallet();

    const isActive = (path: string) => location.pathname === path;

    const navLinks = [
        { path: '/app', label: 'APP', auth: true },
        { path: '/registry', label: 'REGISTRY', auth: true },
        { path: '/wallet', label: 'WALLET', auth: true },
        { path: '/docs', label: 'DOCS', auth: false },
    ];

    const visibleLinks = navLinks.filter(link => !link.auth || (link.auth && isConnected));

    return (
        <header className="w-full sticky top-0 bg-canvas/95 backdrop-blur-sm z-50">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="relative flex justify-between items-center h-16">
                    {/* Logo Area */}
                    {isConnected ? (
                        <div className="flex items-center gap-3">
                            <Link to="/">
                                <img src="logo.svg" alt="Agentia Protocol Logo" className="h-8" />
                            </Link>
                            <div className="font-mono font-bold text-lg text-ink-primary tracking-wider">
                                <Link to="/">AGENTIA PROTOCOL</Link>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Text Logo */}
                            <div className="font-mono font-bold text-lg text-ink-primary tracking-wider">
                                <Link to="/">AGENTIA PROTOCOL</Link>
                            </div>
                            {/* Centered Logo */}
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                <Link to="/">
                                    <img src="logo.svg" alt="Agentia Protocol Logo" className="h-8" />
                                </Link>
                            </div>
                        </>
                    )}

                    {/* Desktop Navigation & Actions */}
                    <div className="hidden md:flex items-center gap-6">
                        <nav className="flex items-center gap-6">
                            {visibleLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`font-mono text-xs uppercase tracking-widest transition-colors duration-200 ${isActive(link.path)
                                        ? 'text-primary font-bold'
                                        : 'text-ink-secondary hover:text-primary'
                                        } `}
                                >
                                    [ {link.label} ]
                                </Link>
                            ))}
                        </nav>
                        <ConnectWalletButton />
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-ink-primary"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-border-faint bg-canvas absolute w-full">
                    <div className="px-4 pt-2 pb-4 space-y-2">
                        {visibleLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`block px-3 py-2 font-mono text-sm uppercase ${isActive(link.path)
                                    ? 'text-primary bg-surface'
                                    : 'text-ink-primary hover:bg-surface'
                                    } `}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="pt-2 border-t border-border-faint">
                            <ConnectWalletButton />
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};
