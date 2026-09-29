/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar, NavTab } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { ClassificationView } from './components/ClassificationView';
import { DatasetView } from './components/DatasetView';
import { AnalyticsView } from './components/AnalyticsView';
import { ModelView } from './components/ModelView';
import { AboutView } from './components/AboutView';
import { Footer } from './components/Footer';
import { SpeciesType, PRESETS } from './data/irisData';
import { FlowerInput } from './ml/classifier';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [selectedFlowerInput, setSelectedFlowerInput] = useState<FlowerInput | null>(null);

  const handleStartClassification = () => {
    setActiveTab('classify');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreDataset = () => {
    setActiveTab('dataset');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSpeciesPreset = (species: SpeciesType) => {
    const preset = PRESETS.find(p => p.species === species);
    if (preset) {
      setSelectedFlowerInput(preset.values);
    }
    setActiveTab('classify');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClassifySample = (sample: FlowerInput) => {
    setSelectedFlowerInput(sample);
    setActiveTab('classify');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navigation Bar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {activeTab === 'home' && (
          <HomeView
            onStartClassification={handleStartClassification}
            onExploreDataset={handleExploreDataset}
            onSelectSpeciesPreset={handleSelectSpeciesPreset}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'classify' && (
          <ClassificationView
            initialValues={selectedFlowerInput}
          />
        )}

        {activeTab === 'dataset' && (
          <DatasetView
            onClassifySample={handleClassifySample}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsView />
        )}

        {activeTab === 'model' && (
          <ModelView />
        )}

        {activeTab === 'about' && (
          <AboutView />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigateTab={setActiveTab} />
    </div>
  );
}
