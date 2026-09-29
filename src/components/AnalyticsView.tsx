import React, { useState, useMemo } from 'react';
import { BarChart3, ScatterChart as ScatterIcon, PieChart as PieIcon, Info, HelpCircle } from 'lucide-react';
import { IRIS_DATASET, SpeciesType, SPECIES_PROFILES, GLOBAL_FEATURE_STATS } from '../data/irisData';

type FeatureKey = 'sepalLength' | 'sepalWidth' | 'petalLength' | 'petalWidth';

interface BinData {
  label: string;
  min: number;
  max: number;
  Setosa: number;
  Versicolor: number;
  Virginica: number;
  total: number;
}

export const AnalyticsView: React.FC = () => {
  // Scatter Plot Axis Selection
  const [xAxis, setXAxis] = useState<FeatureKey>('petalLength');
  const [yAxis, setYAxis] = useState<FeatureKey>('petalWidth');
  const [hoveredPoint, setHoveredPoint] = useState<typeof IRIS_DATASET[0] | null>(null);

  // Active distribution feature tab
  const [distFeature, setDistFeature] = useState<FeatureKey>('petalLength');

  const featureLabels: Record<FeatureKey, string> = {
    sepalLength: 'Sepal Length (cm)',
    sepalWidth: 'Sepal Width (cm)',
    petalLength: 'Petal Length (cm)',
    petalWidth: 'Petal Width (cm)'
  };

  // 1. Calculate histograms for all 4 features (real dataset calculation)
  const distributions = useMemo(() => {
    const buildBins = (key: FeatureKey, numBins = 8): BinData[] => {
      const stats = GLOBAL_FEATURE_STATS[key];
      const range = stats.max - stats.min;
      const binWidth = range / numBins;

      const bins: BinData[] = [];
      for (let i = 0; i < numBins; i++) {
        const bMin = Number((stats.min + i * binWidth).toFixed(2));
        const bMax = Number((stats.min + (i + 1) * binWidth).toFixed(2));
        bins.push({
          label: `${bMin}–${bMax}`,
          min: bMin,
          max: bMax,
          Setosa: 0,
          Versicolor: 0,
          Virginica: 0,
          total: 0
        });
      }

      IRIS_DATASET.forEach((item) => {
        const val = item[key];
        let placed = false;
        for (let i = 0; i < bins.length; i++) {
          // Include upper bound for last bin
          if (val >= bins[i].min && (i === bins.length - 1 ? val <= bins[i].max : val < bins[i].max)) {
            bins[i][item.species]++;
            bins[i].total++;
            placed = true;
            break;
          }
        }
        if (!placed && bins.length > 0) {
          bins[bins.length - 1][item.species]++;
          bins[bins.length - 1].total++;
        }
      });

      return bins;
    };

    return {
      sepalLength: buildBins('sepalLength'),
      sepalWidth: buildBins('sepalWidth'),
      petalLength: buildBins('petalLength'),
      petalWidth: buildBins('petalWidth')
    };
  }, []);

  // 2. Correlation matrix computation (Pearson r)
  const correlationMatrix = useMemo(() => {
    const keys: FeatureKey[] = ['sepalLength', 'sepalWidth', 'petalLength', 'petalWidth'];
    const matrix: Record<FeatureKey, Record<FeatureKey, number>> = {
      sepalLength: { sepalLength: 1, sepalWidth: 0, petalLength: 0, petalWidth: 0 },
      sepalWidth: { sepalLength: 0, sepalWidth: 1, petalLength: 0, petalWidth: 0 },
      petalLength: { sepalLength: 0, sepalWidth: 0, petalLength: 1, petalWidth: 0 },
      petalWidth: { sepalLength: 0, sepalWidth: 0, petalLength: 0, petalWidth: 1 }
    };

    keys.forEach(k1 => {
      keys.forEach(k2 => {
        if (k1 === k2) {
          matrix[k1][k2] = 1.0;
          return;
        }
        const mean1 = GLOBAL_FEATURE_STATS[k1].mean;
        const mean2 = GLOBAL_FEATURE_STATS[k2].mean;

        let num = 0;
        let den1 = 0;
        let den2 = 0;

        IRIS_DATASET.forEach(d => {
          const diff1 = d[k1] - mean1;
          const diff2 = d[k2] - mean2;
          num += diff1 * diff2;
          den1 += diff1 * diff1;
          den2 += diff2 * diff2;
        });

        const r = num / (Math.sqrt(den1) * Math.sqrt(den2));
        matrix[k1][k2] = Number(r.toFixed(2));
      });
    });

    return matrix;
  }, []);

  // Scatter Plot scales
  const scatterStatsX = GLOBAL_FEATURE_STATS[xAxis];
  const scatterStatsY = GLOBAL_FEATURE_STATS[yAxis];
  const paddingX = (scatterStatsX.max - scatterStatsX.min) * 0.08;
  const paddingY = (scatterStatsY.max - scatterStatsY.min) * 0.08;
  const minX = scatterStatsX.min - paddingX;
  const maxX = scatterStatsX.max + paddingX;
  const minY = scatterStatsY.min - paddingY;
  const maxY = scatterStatsY.max + paddingY;

  // Active histogram data
  const currentBins = distributions[distFeature];
  const maxBinCount = Math.max(...currentBins.map(b => b.total), 1);

  return (
    <div className="space-y-10 py-6 sm:py-8 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <div className="text-xs font-mono text-indigo-600 font-medium">EXPLORATORY DATA ANALYSIS</div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          Machine Learning Analytics Dashboard
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-3xl">
          Empirical distribution histograms, 2D feature space projections, class clustering, and correlation matrices
          derived from the 150 historical observations.
        </p>
      </div>

      {/* Top Grid: Species Distribution Donut + Feature Correlation Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart 5: Species Distribution (Donut Chart) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">5. Species Distribution</h3>
              <span className="text-[11px] font-mono text-slate-500">150 Samples (Balanced)</span>
            </div>

            {/* Donut SVG */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-6">
              <div className="relative w-44 h-44 shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  {/* Total circle circum = 2 * PI * 38 = 238.76 */}
                  {/* 1/3 = 79.58 */}
                  {/* Setosa segment */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#10B981"
                    strokeWidth="14"
                    strokeDasharray="79.58 159.18"
                    strokeDashoffset="0"
                  />
                  {/* Versicolor segment */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#3B82F6"
                    strokeWidth="14"
                    strokeDasharray="79.58 159.18"
                    strokeDashoffset="-79.58"
                  />
                  {/* Virginica segment */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#8B5CF6"
                    strokeWidth="14"
                    strokeDasharray="79.58 159.18"
                    strokeDashoffset="-159.16"
                  />
                </svg>
                {/* Center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-xl font-bold font-mono text-slate-900 tabular-nums">150</span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Specimens</span>
                </div>
              </div>

              {/* Legend with species counts (Prompt requires Setosa: 50, Versicolor: 50, Virginica: 50) */}
              <div className="space-y-3 w-full sm:w-auto">
                <div className="p-2 rounded-lg bg-emerald-50/60 border border-emerald-100 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="font-semibold text-emerald-950">Iris Setosa</span>
                  </div>
                  <span className="font-mono font-bold text-emerald-800 tabular-nums">50 (33.3%)</span>
                </div>

                <div className="p-2 rounded-lg bg-blue-50/60 border border-blue-100 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-blue-500" />
                    <span className="font-semibold text-blue-950">Iris Versicolor</span>
                  </div>
                  <span className="font-mono font-bold text-blue-800 tabular-nums">50 (33.3%)</span>
                </div>

                <div className="p-2 rounded-lg bg-purple-50/60 border border-purple-100 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-purple-500" />
                    <span className="font-semibold text-purple-950">Iris Virginica</span>
                  </div>
                  <span className="font-mono font-bold text-purple-800 tabular-nums">50 (33.3%)</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 pt-3 border-t border-slate-100 leading-normal">
            The dataset is perfectly balanced with exactly 50 samples per class, preventing majority class bias during supervised model training.
          </p>
        </div>

        {/* Feature Pearson Correlation Heatmap */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Feature Correlation Matrix (Pearson r)</h3>
              <span className="text-[11px] font-mono text-slate-500">Degree of Linear Association</span>
            </div>

            <div className="overflow-x-auto py-3">
              <table className="w-full text-xs text-center border-collapse">
                <thead>
                  <tr>
                    <th className="p-2 text-left font-mono text-[11px] text-slate-400">Feature</th>
                    <th className="p-2 font-mono text-[11px] text-slate-600">Sepal L</th>
                    <th className="p-2 font-mono text-[11px] text-slate-600">Sepal W</th>
                    <th className="p-2 font-mono text-[11px] text-slate-600">Petal L</th>
                    <th className="p-2 font-mono text-[11px] text-slate-600">Petal W</th>
                  </tr>
                </thead>
                <tbody className="font-mono text-xs">
                  {(['sepalLength', 'sepalWidth', 'petalLength', 'petalWidth'] as FeatureKey[]).map(rowKey => (
                    <tr key={rowKey}>
                      <td className="p-2 text-left font-sans font-medium text-slate-800 whitespace-nowrap">
                        {rowKey === 'sepalLength' ? 'Sepal Length' : rowKey === 'sepalWidth' ? 'Sepal Width' : rowKey === 'petalLength' ? 'Petal Length' : 'Petal Width'}
                      </td>
                      {(['sepalLength', 'sepalWidth', 'petalLength', 'petalWidth'] as FeatureKey[]).map(colKey => {
                        const val = correlationMatrix[rowKey][colKey];
                        // Color scale based on r
                        let bg = 'bg-slate-50 text-slate-700';
                        if (val === 1.0) bg = 'bg-indigo-600 text-white font-bold';
                        else if (val >= 0.8) bg = 'bg-indigo-500 text-white font-bold';
                        else if (val >= 0.5) bg = 'bg-indigo-100 text-indigo-900 font-semibold';
                        else if (val <= -0.3) bg = 'bg-amber-100 text-amber-900 font-semibold';

                        return (
                          <td key={colKey} className="p-1.5">
                            <div className={`p-2 rounded-md ${bg} tabular-nums text-center transition-colors`}>
                              {val > 0 && val !== 1 ? `+${val.toFixed(2)}` : val.toFixed(2)}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-600 flex items-center justify-between">
            <span>Critical Insight: Petal Length and Petal Width exhibit extreme positive correlation (<span className="font-mono font-bold text-indigo-600">+0.96</span>).</span>
          </div>
        </div>
      </div>

      {/* Chart 6: Feature Comparison 2D Scatter Plot (Required) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              6. Interactive Feature Comparison (2D Feature Space Scatter Plot)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Project all 150 specimens across any two chosen dimensions to inspect cluster separation boundaries.
            </p>
          </div>

          {/* Axis Selectors */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-700">
              <span className="font-mono text-slate-500">X-Axis:</span>
              <select
                value={xAxis}
                onChange={(e) => setXAxis(e.target.value as FeatureKey)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-medium text-slate-800"
              >
                <option value="sepalLength">Sepal Length</option>
                <option value="sepalWidth">Sepal Width</option>
                <option value="petalLength">Petal Length</option>
                <option value="petalWidth">Petal Width</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-700">
              <span className="font-mono text-slate-500">Y-Axis:</span>
              <select
                value={yAxis}
                onChange={(e) => setYAxis(e.target.value as FeatureKey)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-medium text-slate-800"
              >
                <option value="sepalLength">Sepal Length</option>
                <option value="sepalWidth">Sepal Width</option>
                <option value="petalLength">Petal Length</option>
                <option value="petalWidth">Petal Width</option>
              </select>
            </div>
          </div>
        </div>

        {/* Scatter Plot Viewport */}
        <div className="relative bg-slate-50/70 border border-slate-200 rounded-xl p-4 sm:p-6 overflow-hidden">
          {/* Legend */}
          <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-xs border border-slate-200 rounded-lg px-3 py-2 shadow-xs text-xs space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="font-medium text-slate-700">Setosa</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <span className="font-medium text-slate-700">Versicolor</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
              <span className="font-medium text-slate-700">Virginica</span>
            </div>
          </div>

          {/* SVG Canvas */}
          <div className="w-full aspect-16/9 min-h-[300px] max-h-[460px]">
            <svg viewBox="0 0 800 450" className="w-full h-full" fill="none">
              {/* Grid Lines */}
              {[0, 1, 2, 3, 4].map((i) => {
                const yPos = 50 + (350 / 4) * i;
                const xPos = 70 + (680 / 4) * i;
                const yVal = (maxY - (i / 4) * (maxY - minY)).toFixed(1);
                const xVal = (minX + (i / 4) * (maxX - minX)).toFixed(1);
                return (
                  <g key={i}>
                    {/* Horizontal grid */}
                    <line x1="70" y1={yPos} x2="750" y2={yPos} stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />
                    <text x="62" y={yPos + 4} fontSize="10" fontFamily="monospace" fill="#64748B" textAnchor="end">
                      {yVal}
                    </text>
                    {/* Vertical grid */}
                    <line x1={xPos} y1="50" x2={xPos} y2="400" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />
                    <text x={xPos} y="418" fontSize="10" fontFamily="monospace" fill="#64748B" textAnchor="middle">
                      {xVal}
                    </text>
                  </g>
                );
              })}

              {/* Axes lines */}
              <line x1="70" y1="400" x2="750" y2="400" stroke="#94A3B8" strokeWidth="1.5" />
              <line x1="70" y1="50" x2="70" y2="400" stroke="#94A3B8" strokeWidth="1.5" />

              {/* Axis Labels */}
              <text x="410" y="440" fontSize="11" fontFamily="sans-serif" fontWeight="600" fill="#334155" textAnchor="middle">
                {featureLabels[xAxis]}
              </text>
              <text x="24" y="225" fontSize="11" fontFamily="sans-serif" fontWeight="600" fill="#334155" textAnchor="middle" transform="rotate(-90 24 225)">
                {featureLabels[yAxis]}
              </text>

              {/* Points (All 150 Iris observations) */}
              {IRIS_DATASET.map((item) => {
                const xVal = item[xAxis];
                const yVal = item[yAxis];
                const cx = 70 + ((xVal - minX) / (maxX - minX)) * 680;
                const cy = 400 - ((yVal - minY) / (maxY - minY)) * 350;

                const color =
                  item.species === 'Setosa'
                    ? '#10B981'
                    : item.species === 'Versicolor'
                    ? '#3B82F6'
                    : '#8B5CF6';

                const isHovered = hoveredPoint?.id === item.id;

                return (
                  <circle
                    key={item.id}
                    cx={cx}
                    cy={cy}
                    r={isHovered ? 7 : 4.5}
                    fill={color}
                    fillOpacity={isHovered ? 1 : 0.8}
                    stroke={isHovered ? '#0F172A' : '#FFFFFF'}
                    strokeWidth={isHovered ? 2 : 1}
                    className="cursor-pointer transition-all duration-150"
                    onMouseEnter={() => setHoveredPoint(item)}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                );
              })}
            </svg>
          </div>

          {/* Active Hover Point Tooltip card */}
          {hoveredPoint && (
            <div className="mt-3 p-3 bg-white border border-slate-200 rounded-lg shadow-sm flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${SPECIES_PROFILES[hoveredPoint.species].dotColor}`} />
                <span className="font-bold text-slate-900">
                  Sample #{hoveredPoint.id}: Iris {hoveredPoint.species}
                </span>
              </div>
              <div className="font-mono text-slate-600 space-x-3">
                <span>{featureLabels[xAxis].split(' ')[0]}: <strong className="text-slate-900">{hoveredPoint[xAxis]} cm</strong></span>
                <span>{featureLabels[yAxis].split(' ')[0]}: <strong className="text-slate-900">{hoveredPoint[yAxis]} cm</strong></span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Charts 1-4: Feature Distribution Histograms */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              1–4. Feature Distributions (Histogram Analysis)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Inspect density distributions across Sepal Length, Sepal Width, Petal Length, and Petal Width.
            </p>
          </div>

          {/* Distribution Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg overflow-x-auto">
            {(['petalLength', 'petalWidth', 'sepalLength', 'sepalWidth'] as FeatureKey[]).map((f) => (
              <button
                key={f}
                onClick={() => setDistFeature(f)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                  distFeature === f
                    ? 'bg-white text-indigo-700 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {f === 'petalLength' ? '3. Petal Length' : f === 'petalWidth' ? '4. Petal Width' : f === 'sepalLength' ? '1. Sepal Length' : '2. Sepal Width'}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Histogram */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-600">
            <span className="font-semibold text-slate-800">
              Distribution for {featureLabels[distFeature]} (Stacked by Species)
            </span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-emerald-500 rounded-xs"></span> Setosa</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-blue-500 rounded-xs"></span> Versicolor</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-purple-500 rounded-xs"></span> Virginica</span>
            </div>
          </div>

          {/* Histogram Bars */}
          <div className="grid grid-cols-8 gap-2 items-end h-56 pt-6 px-2 bg-slate-50/70 border border-slate-200 rounded-xl">
            {currentBins.map((bin, idx) => {
              const hSetosa = (bin.Setosa / maxBinCount) * 100;
              const hVersicolor = (bin.Versicolor / maxBinCount) * 100;
              const hVirginica = (bin.Virginica / maxBinCount) * 100;

              return (
                <div key={idx} className="flex flex-col items-center h-full justify-end group">
                  {/* Tooltip on hover */}
                  <div className="text-[10px] font-mono text-slate-500 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    n={bin.total}
                  </div>

                  {/* Stacked bar */}
                  <div className="w-full max-w-[42px] bg-slate-200 rounded-t overflow-hidden flex flex-col-reverse shadow-2xs group-hover:brightness-105 transition-all" style={{ height: `${(bin.total / maxBinCount) * 85}%` }}>
                    <div style={{ height: `${(bin.Setosa / (bin.total || 1)) * 100}%` }} className="bg-emerald-500 w-full" />
                    <div style={{ height: `${(bin.Versicolor / (bin.total || 1)) * 100}%` }} className="bg-blue-500 w-full" />
                    <div style={{ height: `${(bin.Virginica / (bin.total || 1)) * 100}%` }} className="bg-purple-500 w-full" />
                  </div>

                  <span className="text-[10px] font-mono text-slate-500 mt-2 truncate w-full text-center">
                    {bin.min}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Analytical Narrative Section: Why Petal Measurements are useful for distinguishing Iris species (Required) */}
      <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2">
          <Info className="w-5 h-5 text-indigo-600" />
          <h3 className="text-base font-bold text-indigo-950">
            Why Petal Measurements are Superior for Distinguishing Iris Species
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs text-indigo-950/90 leading-relaxed pt-2">
          <div className="p-4 rounded-xl bg-white border border-indigo-100 shadow-2xs space-y-1.5">
            <h4 className="font-bold text-indigo-900 text-sm">1. Linear Separability of Setosa</h4>
            <p>
              In feature space, <strong className="text-emerald-700">Iris Setosa</strong> exhibits a complete bimodal gap in petal length.
              All Setosa specimens have petal lengths strictly between 1.0 cm and 1.9 cm, whereas Versicolor starts at 3.0 cm. A single hyperplane at
              <code className="mx-1 px-1 bg-indigo-50 font-mono rounded">petal_length = 2.45 cm</code> achieves 100% classification precision for Setosa with zero training error.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-indigo-100 shadow-2xs space-y-1.5">
            <h4 className="font-bold text-indigo-900 text-sm">2. High Discriminant Ratio</h4>
            <p>
              Petal width has the highest Fisher Discriminant Ratio among all four variables. Versicolor petal widths cluster tightly around
              <strong className="text-blue-700"> 1.3 cm</strong> (range: 1.0–1.8 cm), while Virginica petal widths average
              <strong className="text-purple-700"> 2.03 cm</strong> (range: 1.4–2.5 cm). The 1.8 cm boundary provides decisive statistical separation.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-indigo-100 shadow-2xs space-y-1.5">
            <h4 className="font-bold text-indigo-900 text-sm">3. Low Sepal Variance Utility</h4>
            <p>
              Sepal measurements display substantial morphological overlap across all three species. For example, Sepal Width ranges between 2.0 cm and 4.4 cm,
              with all three species co-existing between 2.8 cm and 3.4 cm. Without petal dimensions, sepal data alone results in classification error exceeding 28%.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
