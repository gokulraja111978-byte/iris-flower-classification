import React from 'react';
import { SpeciesType } from '../data/irisData';

interface SpeciesIllustrationProps {
  species: SpeciesType;
  className?: string;
}

/**
 * Botanical SVG artwork tailored specifically for each of the three Iris species,
 * depicting their anatomical differences (e.g. Setosa's diminutive standards,
 * Versicolor's intermediate proportions and blue-flag markings,
 * Virginica's large regal standards and prominent yellow pubescent beard).
 */
export const SpeciesIllustration: React.FC<SpeciesIllustrationProps> = ({ species, className = 'w-full h-48' }) => {
  if (species === 'Setosa') {
    return (
      <div className={`relative overflow-hidden rounded-xl bg-gradient-to-b from-emerald-50/80 to-teal-50/40 flex items-center justify-center p-4 ${className}`}>
        <svg viewBox="0 0 200 200" className="w-full h-full max-h-48 drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Stem & Leaves */}
          <path d="M100 130 C100 160 102 185 104 200" stroke="#059669" strokeWidth="4" strokeLinecap="round" />
          <path d="M100 145 C80 155 70 175 60 195" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M102 155 C120 165 130 180 140 195" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />

          {/* Lower Sepals (Falls) - Wide & Spreading */}
          <path d="M100 115 C70 120 40 130 50 148 C60 160 85 140 98 125 Z" fill="#6EE7B7" fillOpacity="0.4" stroke="#059669" strokeWidth="1.5" />
          <path d="M100 115 C130 120 160 130 150 148 C140 160 115 140 102 125 Z" fill="#6EE7B7" fillOpacity="0.4" stroke="#059669" strokeWidth="1.5" />
          <path d="M100 118 C85 130 85 155 100 165 C115 155 115 130 100 118 Z" fill="#14B8A6" fillOpacity="0.3" stroke="#0D9488" strokeWidth="1.5" />

          {/* Sepal Yellow Signal / Crest */}
          <path d="M96 128 C98 135 102 135 104 128 C102 124 98 124 96 128 Z" fill="#FBBF24" />
          <circle cx="100" cy="133" r="3" fill="#F59E0B" />

          {/* Inner Petals (Standards) - Characteristic small/diminutive petals */}
          <path d="M95 115 C85 95 86 70 95 62 C100 75 102 95 98 115 Z" fill="#818CF8" fillOpacity="0.8" stroke="#4F46E5" strokeWidth="1.5" />
          <path d="M105 115 C115 95 114 70 105 62 C100 75 98 95 102 115 Z" fill="#A5B4FC" fillOpacity="0.9" stroke="#4F46E5" strokeWidth="1.5" />
          <path d="M100 112 C96 90 98 72 100 60 C102 72 104 90 100 112 Z" fill="#C7D2FE" stroke="#6366F1" strokeWidth="1.5" />

          {/* Style Arms */}
          <path d="M97 105 C93 98 92 90 95 86 C97 92 100 98 98 105 Z" fill="#E0E7FF" stroke="#4F46E5" strokeWidth="1" />
          <path d="M103 105 C107 98 108 90 105 86 C103 92 100 98 102 105 Z" fill="#E0E7FF" stroke="#4F46E5" strokeWidth="1" />

          {/* Measurement Annotations Accent */}
          <circle cx="100" cy="60" r="2.5" fill="#4F46E5" />
          <circle cx="100" cy="112" r="2.5" fill="#4F46E5" />
          <line x1="80" y1="60" x2="80" y2="112" stroke="#4F46E5" strokeWidth="1" strokeDasharray="2 2" />
          <text x="74" y="88" fontSize="8" fontFamily="monospace" fill="#4338CA" textAnchor="end">1.4 cm</text>
        </svg>
        <span className="absolute bottom-2 right-3 text-[11px] font-mono font-medium text-emerald-800 bg-white/80 px-2 py-0.5 rounded shadow-xs">
          Short Petals: ~1.4 cm
        </span>
      </div>
    );
  }

  if (species === 'Versicolor') {
    return (
      <div className={`relative overflow-hidden rounded-xl bg-gradient-to-b from-blue-50/80 to-indigo-50/40 flex items-center justify-center p-4 ${className}`}>
        <svg viewBox="0 0 200 200" className="w-full h-full max-h-48 drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Stem & Foliage */}
          <path d="M100 125 C100 155 101 180 102 200" stroke="#047857" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M100 140 C75 150 65 170 52 195" stroke="#059669" strokeWidth="3" strokeLinecap="round" />
          <path d="M101 150 C125 160 135 175 145 195" stroke="#059669" strokeWidth="3" strokeLinecap="round" />

          {/* Lower Sepals (Falls) with intricate veins */}
          <path d="M100 110 C65 115 35 128 42 152 C52 168 85 145 98 120 Z" fill="#93C5FD" fillOpacity="0.6" stroke="#2563EB" strokeWidth="1.5" />
          <path d="M100 110 C135 115 165 128 158 152 C148 168 115 145 102 120 Z" fill="#93C5FD" fillOpacity="0.6" stroke="#2563EB" strokeWidth="1.5" />
          <path d="M100 114 C80 128 78 160 100 172 C122 160 120 128 100 114 Z" fill="#60A5FA" fillOpacity="0.4" stroke="#1D4ED8" strokeWidth="1.5" />

          {/* Blue Flag Vein details */}
          <path d="M100 120 L100 155" stroke="#1E40AF" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M96 130 C90 140 85 148 75 152" stroke="#1E40AF" strokeWidth="1" strokeLinecap="round" />
          <path d="M104 130 C110 140 115 148 125 152" stroke="#1E40AF" strokeWidth="1" strokeLinecap="round" />

          {/* Yellow crest / signal */}
          <path d="M95 122 C97 132 103 132 105 122 C102 118 98 118 95 122 Z" fill="#FCD34D" />
          <circle cx="100" cy="126" r="3.5" fill="#F59E0B" />

          {/* Intermediate Standards (Petals) */}
          <path d="M92 110 C75 80 80 48 93 38 C102 55 102 85 96 110 Z" fill="#3B82F6" fillOpacity="0.8" stroke="#1D4ED8" strokeWidth="1.5" />
          <path d="M108 110 C125 80 120 48 107 38 C98 55 98 85 104 110 Z" fill="#60A5FA" fillOpacity="0.85" stroke="#1D4ED8" strokeWidth="1.5" />
          <path d="M100 105 C93 75 95 50 100 35 C105 50 107 75 100 105 Z" fill="#93C5FD" stroke="#2563EB" strokeWidth="1.5" />

          {/* Measurement Annotations Accent */}
          <circle cx="100" cy="35" r="2.5" fill="#2563EB" />
          <circle cx="100" cy="105" r="2.5" fill="#2563EB" />
          <line x1="72" y1="35" x2="72" y2="105" stroke="#2563EB" strokeWidth="1" strokeDasharray="2 2" />
          <text x="66" y="72" fontSize="8" fontFamily="monospace" fill="#1D4ED8" textAnchor="end">4.3 cm</text>
        </svg>
        <span className="absolute bottom-2 right-3 text-[11px] font-mono font-medium text-blue-800 bg-white/80 px-2 py-0.5 rounded shadow-xs">
          Medium Petals: ~4.3 cm
        </span>
      </div>
    );
  }

  // Virginica
  return (
    <div className={`relative overflow-hidden rounded-xl bg-gradient-to-b from-purple-50/80 to-violet-50/40 flex items-center justify-center p-4 ${className}`}>
      <svg viewBox="0 0 200 200" className="w-full h-full max-h-48 drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Strong Stem & Leaves */}
        <path d="M100 120 C100 150 100 175 101 200" stroke="#065F46" strokeWidth="5" strokeLinecap="round" />
        <path d="M100 135 C70 145 60 165 48 195" stroke="#047857" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M101 145 C130 155 142 170 152 195" stroke="#047857" strokeWidth="3.5" strokeLinecap="round" />

        {/* Expansive Lower Sepals (Falls) */}
        <path d="M100 105 C60 110 25 125 32 155 C45 174 82 148 98 116 Z" fill="#C084FC" fillOpacity="0.5" stroke="#7E22CE" strokeWidth="1.5" />
        <path d="M100 105 C140 110 175 125 168 155 C155 174 118 148 102 116 Z" fill="#C084FC" fillOpacity="0.5" stroke="#7E22CE" strokeWidth="1.5" />
        <path d="M100 110 C75 128 72 165 100 180 C128 165 125 128 100 110 Z" fill="#A855F7" fillOpacity="0.5" stroke="#6B21A8" strokeWidth="1.5" />

        {/* Prominent Golden Pubescent Signal / Beard */}
        <path d="M94 116 C96 128 104 128 106 116 C102 110 98 110 94 116 Z" fill="#F59E0B" />
        <circle cx="100" cy="120" r="4" fill="#D97706" />
        <path d="M98 122 L98 140 M100 122 L100 144 M102 122 L102 140" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" />

        {/* Majestic Large Standards (Petals) */}
        <path d="M88 105 C65 65 72 30 90 20 C102 42 104 78 95 105 Z" fill="#7C3AED" fillOpacity="0.8" stroke="#5B21B6" strokeWidth="1.5" />
        <path d="M112 105 C135 65 128 30 110 20 C98 42 96 78 105 105 Z" fill="#8B5CF6" fillOpacity="0.85" stroke="#5B21B6" strokeWidth="1.5" />
        <path d="M100 100 C90 62 92 34 100 18 C108 34 110 62 100 100 Z" fill="#A78BFA" stroke="#6D28D9" strokeWidth="1.5" />

        {/* Style crests */}
        <path d="M95 95 C90 85 88 72 92 68 C96 76 98 86 96 95 Z" fill="#DDD6FE" stroke="#6D28D9" strokeWidth="1" />
        <path d="M105 95 C110 85 112 72 108 68 C104 76 102 86 104 95 Z" fill="#DDD6FE" stroke="#6D28D9" strokeWidth="1" />

        {/* Measurement Annotations Accent */}
        <circle cx="100" cy="18" r="2.5" fill="#6D28D9" />
        <circle cx="100" cy="100" r="2.5" fill="#6D28D9" />
        <line x1="65" y1="18" x2="65" y2="100" stroke="#6D28D9" strokeWidth="1" strokeDasharray="2 2" />
        <text x="59" y="60" fontSize="8" fontFamily="monospace" fill="#5B21B6" textAnchor="end">5.6 cm</text>
      </svg>
      <span className="absolute bottom-2 right-3 text-[11px] font-mono font-medium text-purple-800 bg-white/80 px-2 py-0.5 rounded shadow-xs">
        Large Petals: ~5.6 cm
      </span>
    </div>
  );
};

/**
 * Botanical Flower Anatomy Diagram highlighting Sepal vs Petal,
 * Length vs Width measurements.
 */
export const IrisAnatomyDiagram: React.FC = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">Iris Flower Morphology & Measurement Guide</h3>
          <p className="text-xs text-slate-500 mt-0.5">Anatomical distinction between upright Petals (Standards) and drooping Sepals (Falls)</p>
        </div>
        <span className="text-[11px] font-mono text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded">
          4 Morphological Dimensions
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* SVG Diagram */}
        <div className="relative bg-slate-50 rounded-lg p-4 border border-slate-100 flex items-center justify-center">
          <svg viewBox="0 0 320 240" className="w-full h-auto max-h-56" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Flower stem */}
            <path d="M160 150 L160 230" stroke="#15803D" strokeWidth="5" strokeLinecap="round" />
            <path d="M160 180 C130 190 110 205 90 230" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" />
            <path d="M160 190 C190 200 210 215 230 230" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" />

            {/* Sepal (Fall) - Drooping outer modified leaf */}
            <path d="M160 140 C110 145 70 160 80 190 C95 210 140 180 158 150 Z" fill="#93C5FD" fillOpacity="0.5" stroke="#2563EB" strokeWidth="2" />
            <path d="M160 140 C210 145 250 160 240 190 C225 210 180 180 162 150 Z" fill="#93C5FD" fillOpacity="0.5" stroke="#2563EB" strokeWidth="2" />
            <path d="M160 145 C130 165 125 205 160 220 C195 205 190 165 160 145 Z" fill="#60A5FA" fillOpacity="0.4" stroke="#1D4ED8" strokeWidth="2" />

            {/* Sepal Signal / Beard */}
            <circle cx="160" cy="165" r="4" fill="#F59E0B" />
            <path d="M157 168 L157 185 M160 168 L160 190 M163 168 L163 185" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" />

            {/* Petal (Standard) - Upright inner floral leaf */}
            <path d="M145 135 C115 85 125 40 148 25 C162 50 160 95 152 135 Z" fill="#8B5CF6" fillOpacity="0.8" stroke="#6D28D9" strokeWidth="2" />
            <path d="M175 135 C205 85 195 40 172 25 C158 50 160 95 168 135 Z" fill="#A78BFA" fillOpacity="0.85" stroke="#6D28D9" strokeWidth="2" />
            <path d="M160 130 C150 80 152 42 160 20 C168 42 170 80 160 130 Z" fill="#C4B5FD" stroke="#7C3AED" strokeWidth="2" />

            {/* Measurement lines: Petal Length */}
            <line x1="120" y1="20" x2="120" y2="130" stroke="#7C3AED" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="114" y1="20" x2="126" y2="20" stroke="#7C3AED" strokeWidth="1.5" />
            <line x1="114" y1="130" x2="126" y2="130" stroke="#7C3AED" strokeWidth="1.5" />
            <text x="110" y="78" fontSize="10" fontFamily="sans-serif" fontWeight="600" fill="#6D28D9" textAnchor="end">Petal Length</text>

            {/* Measurement lines: Petal Width */}
            <line x1="145" y1="65" x2="175" y2="65" stroke="#7C3AED" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="145" y1="60" x2="145" y2="70" stroke="#7C3AED" strokeWidth="1.5" />
            <line x1="175" y1="60" x2="175" y2="70" stroke="#7C3AED" strokeWidth="1.5" />
            <text x="160" y="58" fontSize="9" fontFamily="sans-serif" fontWeight="600" fill="#6D28D9" textAnchor="middle">Petal Width</text>

            {/* Measurement lines: Sepal Length */}
            <line x1="200" y1="145" x2="200" y2="220" stroke="#2563EB" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="194" y1="145" x2="206" y2="145" stroke="#2563EB" strokeWidth="1.5" />
            <line x1="194" y1="220" x2="206" y2="220" stroke="#2563EB" strokeWidth="1.5" />
            <text x="210" y="185" fontSize="10" fontFamily="sans-serif" fontWeight="600" fill="#1D4ED8" textAnchor="start">Sepal Length</text>

            {/* Measurement lines: Sepal Width */}
            <line x1="135" y1="210" x2="185" y2="210" stroke="#2563EB" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="135" y1="205" x2="135" y2="215" stroke="#2563EB" strokeWidth="1.5" />
            <line x1="185" y1="205" x2="185" y2="215" stroke="#2563EB" strokeWidth="1.5" />
            <text x="160" y="234" fontSize="9" fontFamily="sans-serif" fontWeight="600" fill="#1D4ED8" textAnchor="middle">Sepal Width</text>
          </svg>
        </div>

        {/* Feature Explanations */}
        <div className="space-y-3">
          <div className="p-3 rounded-lg bg-purple-50/60 border border-purple-100">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
              <h4 className="text-xs font-semibold text-purple-900">Petals (The Standards)</h4>
            </div>
            <p className="text-xs text-purple-800 mt-1 leading-relaxed">
              The three upright inner floral segments. Petal length and width provide the highest statistical discriminant power in classifying Iris species, with near-perfect separation between Setosa (&lt; 2.5 cm) and the others.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-blue-50/60 border border-blue-100">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
              <h4 className="text-xs font-semibold text-blue-900">Sepals (The Falls)</h4>
            </div>
            <p className="text-xs text-blue-800 mt-1 leading-relaxed">
              The three drooping outer modified floral leaves that support pollinating insects. While displaying more variance, sepal width is particularly high in Setosa (mean 3.43 cm) and lowest in Versicolor (mean 2.77 cm).
            </p>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-600 flex items-center justify-between font-mono">
            <span>R.A. Fisher Study: 150 Specimens</span>
            <span className="text-slate-400">·</span>
            <span>Edgar Anderson Collection: 1935</span>
          </div>
        </div>
      </div>
    </div>
  );
};
