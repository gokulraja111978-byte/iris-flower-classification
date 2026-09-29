import React from 'react';
import { NavTab } from './Navbar';

interface FooterProps {
  onNavigateTab: (tab: NavTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab }) => {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white py-10 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-indigo-600 flex items-center justify-center text-white">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v20M7 13c-3 1-5 3-5 5 0 1.5 2 2 4 1 2-1 3-3 3-4M17 13c3 1 5 3 5 5 0 1.5-2 2-4 1-2-1-3-3-3-4" />
              </svg>
            </div>
            {/* Required footer text */}
            <span className="font-semibold text-slate-800">
              Iris Flower Classification | Machine Learning Project
            </span>
          </div>

          <div className="flex items-center gap-6 text-slate-600">
            <button onClick={() => onNavigateTab('home')} className="hover:text-slate-900 transition-colors">
              Home
            </button>
            <button onClick={() => onNavigateTab('classify')} className="hover:text-slate-900 transition-colors">
              Classification
            </button>
            <button onClick={() => onNavigateTab('dataset')} className="hover:text-slate-900 transition-colors">
              Dataset
            </button>
            <button onClick={() => onNavigateTab('analytics')} className="hover:text-slate-900 transition-colors">
              Analytics
            </button>
            <button onClick={() => onNavigateTab('model')} className="hover:text-slate-900 transition-colors">
              Model
            </button>
            <button onClick={() => onNavigateTab('about')} className="hover:text-slate-900 transition-colors">
              About
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
          <span>Based on R.A. Fisher (1936) &amp; Edgar Anderson (1935) botanical dataset.</span>
          <span className="font-mono">Supervised KNN &amp; Decision Tree Classifier</span>
        </div>
      </div>
    </footer>
  );
};
