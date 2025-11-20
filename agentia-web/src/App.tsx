import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { LandingPage } from './pages/LandingPage';
import { AppDashboard } from './pages/AppDashboard';
import { AgentRegistry } from './pages/AgentRegistry';
import { AgentDetail } from './pages/AgentDetail';
import { WalletDashboard } from './pages/WalletDashboard';
import { Documentation } from './pages/Documentation'; // Changed to named import

import { WalletProvider } from './context/WalletContext';

function App() {
  return (
    <WalletProvider>
      <AppProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-agentia-white text-agentia-carbon font-sans selection:bg-agentia-green selection:text-white">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/app" element={<AppDashboard />} />
                <Route path="/registry" element={<AgentRegistry />} />
                <Route path="/registry/:id" element={<AgentDetail />} />
                <Route path="/wallet" element={<WalletDashboard />} />
                <Route path="/docs" element={<Documentation />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AppProvider>
    </WalletProvider>
  );
}

export default App;
