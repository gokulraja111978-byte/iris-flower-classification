import React, { useState } from 'react';
import { Sparkles, Menu, X, ArrowRight } from 'lucide-react';

export type NavTab = 'home' | 'classify' | 'dataset' | 'analytics' | 'model' | 'about';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: NavTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'classify', label: 'Classification' },
    { id: 'dataset', label: 'Dataset' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'model', label: 'Model Info' },
    { id: 'about', label: 'About' },
  ];

  const handleNavClick = (tab: NavTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Brand Wordmark with custom Iris botanical icon */}
          <div 
            onClick={() => handleNavClick('home')} 
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform duration-200">
              {/* Custom Iris Flower SVG Icon */}
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20" stroke="#E0E7FF" strokeWidth="1.5" />
                <path d="M12 4c-2.5 3-5 5-5 9 0 3 2.5 5 5 5s5-2 5-5c0-4-2.5-6-5-9z" fill="#C7D2FE" fillOpacity="0.4" />
                <path d="M7 13c-3 1-5 3-5 5 0 1.5 2 2 4 1 2-1 3-3 3-4" />
                <path d="M17 13c3 1 5 3 5 5 0 1.5-2 2-4 1-2-1-3-3-3-4" />
              </svg>
            </div>
            <span className="text-base font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors whitespace-nowrap">
              Iris Classifier
            </span>
          </div>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-7">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative text-sm font-medium transition-colors py-1 whitespace-nowrap ${
                    isActive
                      ? 'text-indigo-600 font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('classify')}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg shadow-xs transition-colors whitespace-nowrap"
            >
              <span>Classify Flower</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => handleNavClick('classify')}
              className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Start Classification</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
