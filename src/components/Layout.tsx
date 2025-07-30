import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Plus, BarChart3, Menu, X, Download } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowInstallPrompt(false);
      }
      setDeferredPrompt(null);
    }
  };

  const navItems = [
    { path: '/', icon: Home, label: 'होम / Home' },
    { path: '/create', icon: Plus, label: 'नया उत्पाद / Create' },
    { path: '/dashboard', icon: BarChart3, label: 'डैशबोर्ड / Dashboard' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">भ</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">BharatBazzar</h1>
                <p className="text-xs text-gray-600">भारत बाज़ार</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      location.pathname === item.path
                        ? 'bg-orange-100 text-orange-700'
                        : 'text-gray-600 hover:text-orange-700 hover:bg-orange-50'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Install App Button */}
            {showInstallPrompt && (
              <button
                onClick={handleInstallClick}
                className="hidden md:flex items-center space-x-2 pwa-button text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                <Download size={18} />
                <span>Install App</span>
              </button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-orange-700 hover:bg-orange-50"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium transition-colors ${
                      location.pathname === item.path
                        ? 'bg-orange-100 text-orange-700'
                        : 'text-gray-600 hover:text-orange-700 hover:bg-orange-50'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              {showInstallPrompt && (
                <button
                  onClick={handleInstallClick}
                  className="w-full flex items-center space-x-3 px-3 py-3 pwa-button text-white rounded-md text-base font-medium"
                >
                  <Download size={20} />
                  <span>ऐप इंस्टॉल करें / Install App</span>
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Install Prompt (Mobile Bottom) */}
      {showInstallPrompt && (
        <div className="fixed bottom-4 left-4 right-4 md:hidden install-prompt">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">भ</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">BharatBazzar ऐप</p>
                  <p className="text-xs text-gray-600">ऑफलाइन उपयोग के लिए इंस्टॉल करें</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowInstallPrompt(false)}
                  className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                >
                  बाद में
                </button>
                <button
                  onClick={handleInstallClick}
                  className="px-3 py-1 bg-orange-500 text-white text-sm rounded-md hover:bg-orange-600"
                >
                  इंस्टॉल
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}