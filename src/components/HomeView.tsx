import React from 'react';
import { ArrowRight, Activity, BookOpen, Layers, BarChart3, CheckCircle2 } from 'lucide-react';
import { SpeciesIllustration } from './SpeciesIllustrations';
import { SPECIES_PROFILES, SpeciesType } from '../data/irisData';
import { NavTab } from './Navbar';

interface HomeViewProps {
  onStartClassification: () => void;
  onExploreDataset: () => void;
  onSelectSpeciesPreset: (species: SpeciesType) => void;
  onNavigateTab: (tab: NavTab) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onStartClassification,
  onExploreDataset,
  onSelectSpeciesPreset,
  onNavigateTab
}) => {
  const speciesList: SpeciesType[] = ['Setosa', 'Versicolor', 'Virginica'];

  return (
    <div className="space-y-16 py-6 sm:py-10">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 lg:p-12 shadow-xs">
        {/* Subtle background decorative grid */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        />

        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-700 font-medium mb-3">
            <span>Machine Learning Classification Project</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>Supervised Botanical Pattern Recognition</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight text-balance leading-tight">
            Iris Flower Classification
          </h1>
          
          <p className="mt-2 text-lg sm:text-xl font-medium text-indigo-900/80">
            Machine Learning Based Flower Species Prediction
          </p>

          <p className="mt-4 text-base text-slate-600 leading-relaxed text-balance max-w-2xl">
            Analyze Iris flower measurements and predict whether the flower belongs to Setosa, Versicolor, or Virginica using a machine-learning classification model.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <button
              onClick={onStartClassification}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl shadow-sm hover:shadow transition-all group whitespace-nowrap"
            >
              <span>Start Classification</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={onExploreDataset}
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors whitespace-nowrap"
            >
              <BookOpen className="w-4 h-4 text-slate-500" />
              <span>Explore 150 Dataset Samples</span>
            </button>
          </div>
        </div>

        {/* 4 Core Pillars Strip (Required by user brief: Machine Learning, Classification, 3 Species, 4 Features) */}
        <div className="relative z-10 mt-10 pt-8 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-3.5 rounded-lg bg-slate-50/70 border border-slate-100">
            <div className="text-xs font-mono text-slate-500">PARADIGM</div>
            <div className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">Machine Learning</div>
            <div className="text-xs text-slate-500 mt-0.5">Supervised Learning</div>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50/70 border border-slate-100">
            <div className="text-xs font-mono text-slate-500">TASK TYPE</div>
            <div className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">Classification</div>
            <div className="text-xs text-slate-500 mt-0.5">KNN & Decision Tree</div>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50/70 border border-slate-100">
            <div className="text-xs font-mono text-slate-500">TARGET CLASSES</div>
            <div className="text-base sm:text-lg font-bold text-slate-900 mt-0.5 font-mono tabular-nums">3 Species</div>
            <div className="text-xs text-slate-500 mt-0.5">Balanced (50 each)</div>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50/70 border border-slate-100">
            <div className="text-xs font-mono text-slate-500">INPUT DIMENSIONS</div>
            <div className="text-base sm:text-lg font-bold text-slate-900 mt-0.5 font-mono tabular-nums">4 Features</div>
            <div className="text-xs text-slate-500 mt-0.5">Sepal & Petal (cm)</div>
          </div>
        </div>
      </section>

      {/* Three Species Cards Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="text-xs font-mono text-indigo-600 font-medium">BOTANICAL TAXONOMY</div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
              The Three Iris Target Species
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Distinct floral morphology documented by Edgar Anderson and analyzed in Ronald Fisher’s landmark 1936 paper.
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('dataset')}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors self-start sm:self-auto flex items-center gap-1"
          >
            <span>View dataset statistics</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {speciesList.map((speciesKey) => {
            const profile = SPECIES_PROFILES[speciesKey];
            return (
              <div
                key={speciesKey}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs hover:border-slate-300 hover:shadow-md transition-all flex flex-col group"
              >
                {/* Visual Botanical Card */}
                <div className="p-4 pb-0">
                  <SpeciesIllustration species={speciesKey} className="w-full h-44 rounded-lg" />
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                          {profile.fullName}
                        </h3>
                        <p className="text-xs italic text-slate-500">{profile.commonName}</p>
                      </div>
                      <span className={`text-[11px] font-mono px-2 py-0.5 rounded border ${profile.borderColor} ${profile.bgLight} ${profile.textColor} font-medium`}>
                        {profile.count} specimens
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                      {profile.description}
                    </p>

                    {/* Characteristic metrics table */}
                    <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between text-slate-600">
                        <span>Avg Petal Length:</span>
                        <span className="font-mono font-semibold text-slate-900 tabular-nums">
                          {profile.petalLength.mean} cm
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span>Avg Petal Width:</span>
                        <span className="font-mono font-semibold text-slate-900 tabular-nums">
                          {profile.petalWidth.mean} cm
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span>Avg Sepal Length:</span>
                        <span className="font-mono font-semibold text-slate-900 tabular-nums">
                          {profile.sepalLength.mean} cm
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Test button */}
                  <button
                    onClick={() => onSelectSpeciesPreset(speciesKey)}
                    className="w-full mt-2 inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
                  >
                    <span>Test {speciesKey} Specimen</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Visual Prediction Pipeline Explanation */}
      <section className="bg-slate-900 text-slate-100 rounded-2xl p-6 sm:p-8 lg:p-10">
        <div className="max-w-3xl">
          <div className="text-xs font-mono text-indigo-400 font-medium">HOW IT WORKS</div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
            Machine Learning Inference Pipeline
          </h2>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            Every classification follows a deterministic, mathematically grounded evaluation pipeline
            benchmarked against the 150 historical observations.
          </p>
        </div>

        {/* 5-Step Pipeline */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80">
            <span className="text-xs font-mono text-indigo-400">STEP 01</span>
            <h4 className="text-sm font-semibold text-white mt-1">Input Measurements</h4>
            <p className="text-xs text-slate-400 mt-1">
              4 anatomical inputs in centimeters (Sepal L/W, Petal L/W).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80">
            <span className="text-xs font-mono text-indigo-400">STEP 02</span>
            <h4 className="text-sm font-semibold text-white mt-1">Data Validation</h4>
            <p className="text-xs text-slate-400 mt-1">
              Bound checks against biological limits and numeric format check.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80">
            <span className="text-xs font-mono text-indigo-400">STEP 03</span>
            <h4 className="text-sm font-semibold text-white mt-1">ML Model Execution</h4>
            <p className="text-xs text-slate-400 mt-1">
              K-Nearest Neighbors computes 4D distance to all 150 samples.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80">
            <span className="text-xs font-mono text-indigo-400">STEP 04</span>
            <h4 className="text-sm font-semibold text-white mt-1">Species Prediction</h4>
            <p className="text-xs text-slate-400 mt-1">
              Weighted voting determines Setosa, Versicolor, or Virginica.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80">
            <span className="text-xs font-mono text-indigo-400">STEP 05</span>
            <h4 className="text-sm font-semibold text-white mt-1">Confidence Score</h4>
            <p className="text-xs text-slate-400 mt-1">
              Probability breakdown & botanical reasoning returned.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>96.7% cross-validated model accuracy on Fisher’s benchmark dataset</span>
          </div>
          <button
            onClick={onStartClassification}
            className="text-xs font-semibold text-indigo-300 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <span>Launch classification tool</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>
    </div>
  );
};
