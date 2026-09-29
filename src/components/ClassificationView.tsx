import React, { useState, useEffect } from 'react';
import { Sparkles, AlertCircle, RefreshCw, CheckCircle2, ChevronRight, Sliders, Info, Flower2, History, Trash2, Clock, Eye, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SpeciesType, PRESETS, FEATURE_INFO, SPECIES_PROFILES } from '../data/irisData';
import { FlowerInput, ClassificationResult, classifyIris } from '../ml/classifier';
import { SpeciesIllustration, IrisAnatomyDiagram } from './SpeciesIllustrations';

const STORAGE_KEY = 'iris_prediction_history';

export interface PredictionHistoryItem {
  id: string;
  species: SpeciesType;
  confidence: number;
  input: FlowerInput;
  timestamp: string;
  probabilities: {
    Setosa: number;
    Versicolor: number;
    Virginica: number;
  };
  kNeighbors: number;
}

interface ClassificationViewProps {
  initialValues?: FlowerInput | null;
  onExploreDatasetWithValues?: (values: FlowerInput) => void;
}

export const ClassificationView: React.FC<ClassificationViewProps> = ({
  initialValues,
  onExploreDatasetWithValues
}) => {
  // Form input states (string to allow controlled numeric input editing)
  const [sepalLength, setSepalLength] = useState<string>('5.8');
  const [sepalWidth, setSepalWidth] = useState<string>('3.0');
  const [petalLength, setPetalLength] = useState<string>('4.2');
  const [petalWidth, setPetalWidth] = useState<string>('1.3');

  // Algorithm settings
  const [kNeighbors, setKNeighbors] = useState<number>(5);

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [warnings, setWarnings] = useState<Record<string, string>>({});

  // Classification state
  const [isClassifying, setIsClassifying] = useState<boolean>(false);
  const [result, setResult] = useState<ClassificationResult | null>(null);

  // Local storage-backed history of last 5 predictions
  const [history, setHistory] = useState<PredictionHistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.slice(0, 5);
        }
      }
    } catch (err) {
      console.error('Failed to load history from localStorage', err);
    }
    return [];
  });

  const saveToHistory = (pred: ClassificationResult, k: number) => {
    const newItem: PredictionHistoryItem = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      species: pred.species,
      confidence: pred.confidence,
      input: { ...pred.input },
      timestamp: pred.timestamp || new Date().toLocaleTimeString(),
      probabilities: { ...pred.probabilities },
      kNeighbors: k
    };

    setHistory((prev) => {
      // Filter out duplicate identical inputs to keep history diverse
      const filtered = prev.filter(
        item =>
          !(
            item.input.sepalLength === newItem.input.sepalLength &&
            item.input.sepalWidth === newItem.input.sepalWidth &&
            item.input.petalLength === newItem.input.petalLength &&
            item.input.petalWidth === newItem.input.petalWidth
          )
      );
      const updated = [newItem, ...filtered].slice(0, 5);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {
        console.error('Failed to save history to localStorage', err);
      }
      return updated;
    });
  };

  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.error('Failed to clear history from localStorage', err);
    }
  };

  const handleReviewHistoryItem = (item: PredictionHistoryItem) => {
    setSepalLength(item.input.sepalLength.toString());
    setSepalWidth(item.input.sepalWidth.toString());
    setPetalLength(item.input.petalLength.toString());
    setPetalWidth(item.input.petalWidth.toString());
    setKNeighbors(item.kNeighbors || 5);
    setErrors({});
    setWarnings({});

    // Deterministically compute the full classification result for display
    const fullResult = classifyIris(item.input, item.kNeighbors || 5);
    setResult(fullResult);

    // Scroll smoothly to result card
    const cardEl = document.getElementById('prediction-result-card');
    if (cardEl) {
      cardEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLoadInputsOnly = (item: PredictionHistoryItem) => {
    setSepalLength(item.input.sepalLength.toString());
    setSepalWidth(item.input.sepalWidth.toString());
    setPetalLength(item.input.petalLength.toString());
    setPetalWidth(item.input.petalWidth.toString());
    setKNeighbors(item.kNeighbors || 5);
    setErrors({});
    setWarnings({});
  };

  // If initialValues provided (e.g. from dataset or preset), load them
  useEffect(() => {
    if (initialValues) {
      setSepalLength(initialValues.sepalLength.toString());
      setSepalWidth(initialValues.sepalWidth.toString());
      setPetalLength(initialValues.petalLength.toString());
      setPetalWidth(initialValues.petalWidth.toString());
      // Trigger prediction automatically on external load
      runClassification({
        sepalLength: initialValues.sepalLength,
        sepalWidth: initialValues.sepalWidth,
        petalLength: initialValues.petalLength,
        petalWidth: initialValues.petalWidth
      });
    }
  }, [initialValues]);

  // Real-time validation
  const validateInputs = (): { isValid: boolean; parsed: FlowerInput | null } => {
    const newErrors: Record<string, string> = {};
    const newWarnings: Record<string, string> = {};

    const sl = parseFloat(sepalLength);
    const sw = parseFloat(sepalWidth);
    const pl = parseFloat(petalLength);
    const pw = parseFloat(petalWidth);

    // Sepal Length checks
    if (!sepalLength.trim()) {
      newErrors.sepalLength = 'Sepal length is required';
    } else if (isNaN(sl)) {
      newErrors.sepalLength = 'Must be a valid numerical value';
    } else if (sl <= 0) {
      newErrors.sepalLength = 'Length must be greater than 0';
    } else if (sl < 3.5 || sl > 9.5) {
      newErrors.sepalLength = 'Measurement outside plausible biological range (3.5 – 9.5 cm)';
    } else if (sl < 4.3 || sl > 7.9) {
      newWarnings.sepalLength = 'Uncommon value (standard Iris dataset is 4.3 – 7.9 cm)';
    }

    // Sepal Width checks
    if (!sepalWidth.trim()) {
      newErrors.sepalWidth = 'Sepal width is required';
    } else if (isNaN(sw)) {
      newErrors.sepalWidth = 'Must be a valid numerical value';
    } else if (sw <= 0) {
      newErrors.sepalWidth = 'Width must be greater than 0';
    } else if (sw < 1.5 || sw > 5.5) {
      newErrors.sepalWidth = 'Measurement outside plausible biological range (1.5 – 5.5 cm)';
    } else if (sw < 2.0 || sw > 4.4) {
      newWarnings.sepalWidth = 'Uncommon value (standard Iris dataset is 2.0 – 4.4 cm)';
    }

    // Petal Length checks
    if (!petalLength.trim()) {
      newErrors.petalLength = 'Petal length is required';
    } else if (isNaN(pl)) {
      newErrors.petalLength = 'Must be a valid numerical value';
    } else if (pl <= 0) {
      newErrors.petalLength = 'Length must be greater than 0';
    } else if (pl < 0.5 || pl > 8.5) {
      newErrors.petalLength = 'Measurement outside plausible biological range (0.5 – 8.5 cm)';
    } else if (pl < 1.0 || pl > 6.9) {
      newWarnings.petalLength = 'Uncommon value (standard Iris dataset is 1.0 – 6.9 cm)';
    }

    // Petal Width checks
    if (!petalWidth.trim()) {
      newErrors.petalWidth = 'Petal width is required';
    } else if (isNaN(pw)) {
      newErrors.petalWidth = 'Must be a valid numerical value';
    } else if (pw <= 0) {
      newErrors.petalWidth = 'Width must be greater than 0';
    } else if (pw < 0.05 || pw > 4.0) {
      newErrors.petalWidth = 'Measurement outside plausible biological range (0.05 – 4.0 cm)';
    } else if (pw < 0.1 || pw > 2.5) {
      newWarnings.petalWidth = 'Uncommon value (standard Iris dataset is 0.1 – 2.5 cm)';
    }

    setErrors(newErrors);
    setWarnings(newWarnings);

    if (Object.keys(newErrors).length > 0) {
      return { isValid: false, parsed: null };
    }

    return {
      isValid: true,
      parsed: {
        sepalLength: Number(sl.toFixed(2)),
        sepalWidth: Number(sw.toFixed(2)),
        petalLength: Number(pl.toFixed(2)),
        petalWidth: Number(pw.toFixed(2))
      }
    };
  };

  const runClassification = (inputData: FlowerInput) => {
    setIsClassifying(true);

    // Brief timeout for realistic computation feedback and smooth UI settling
    setTimeout(() => {
      const pred = classifyIris(inputData, kNeighbors);
      setResult(pred);
      saveToHistory(pred, kNeighbors);
      setIsClassifying(false);

      // Trigger celebratory confetti on high confidence prediction
      try {
        confetti({
          particleCount: 40,
          spread: 55,
          origin: { y: 0.65 },
          colors: ['#6366f1', '#8b5cf6', '#10b981', '#3b82f6']
        });
      } catch {
        // safely ignore if environment blocks canvas
      }

      // Smooth scroll down to result card on small screens
      const resultEl = document.getElementById('prediction-result-card');
      if (resultEl && window.innerWidth < 1024) {
        resultEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 280);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { isValid, parsed } = validateInputs();
    if (!isValid || !parsed) return;
    runClassification(parsed);
  };

  const handleApplyPreset = (preset: typeof PRESETS[0]) => {
    setSepalLength(preset.values.sepalLength.toString());
    setSepalWidth(preset.values.sepalWidth.toString());
    setPetalLength(preset.values.petalLength.toString());
    setPetalWidth(preset.values.petalWidth.toString());
    setErrors({});
    setWarnings({});
    runClassification(preset.values);
  };

  const handleReset = () => {
    setResult(null);
    setErrors({});
    setWarnings({});
  };

  return (
    <div className="space-y-10 py-6 sm:py-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div>
        <div className="text-xs font-mono text-indigo-600 font-medium">SUPERVISED INFERENCE CONSOLE</div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          Interactive Flower Classification
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-3xl">
          Enter floral measurements in centimeters. The machine learning model analyzes the coordinates
          against the canonical 150-sample Iris dataset to compute the predicted species and confidence probability.
        </p>
      </div>

      {/* Quick Specimen Presets Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <span className="text-xs font-semibold text-slate-700">
            Quick Specimen Presets (Click to Load & Test):
          </span>
          <span className="text-[11px] font-mono text-slate-500">
            Pre-calibrated test cases from botanical archives
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {PRESETS.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => handleApplyPreset(preset)}
              className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/70 hover:bg-indigo-50/80 hover:border-indigo-300 text-left transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 group-hover:text-indigo-700">
                  {preset.label}
                </span>
                <span className={`w-2 h-2 rounded-full ${SPECIES_PROFILES[preset.species].dotColor}`} />
              </div>
              <div className="text-[11px] font-mono text-slate-500 mt-1">
                {preset.values.petalLength}cm × {preset.values.petalWidth}cm
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Console Split: Left Form / Right Result */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Input Form (5 cols on lg) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Flower2 className="w-5 h-5 text-indigo-600" />
              <h2 className="text-base font-bold text-slate-900">Flower Measurements</h2>
            </div>
            <span className="text-[11px] font-mono text-slate-500">Units: Centimeters (cm)</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Sepal Length */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="sepalLength" className="text-xs font-semibold text-slate-800">
                  Sepal Length
                </label>
                <span className="text-[11px] font-mono text-slate-400">Typical: 4.3 – 7.9 cm</span>
              </div>
              <div className="relative">
                <input
                  id="sepalLength"
                  type="number"
                  step="0.1"
                  min="0.1"
                  max="15"
                  value={sepalLength}
                  onChange={(e) => {
                    setSepalLength(e.target.value);
                    if (errors.sepalLength) setErrors(prev => ({ ...prev, sepalLength: '' }));
                  }}
                  className={`w-full px-3.5 py-2.5 text-sm font-mono rounded-lg border transition-colors bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 ${
                    errors.sepalLength
                      ? 'border-rose-400 focus:border-rose-500 bg-rose-50/20'
                      : 'border-slate-300 focus:border-indigo-600'
                  }`}
                  placeholder="e.g. 5.8"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 pointer-events-none">
                  cm
                </span>
              </div>
              {errors.sepalLength && (
                <p className="text-[11px] text-rose-600 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{errors.sepalLength}</span>
                </p>
              )}
              {!errors.sepalLength && warnings.sepalLength && (
                <p className="text-[11px] text-amber-600 mt-1">{warnings.sepalLength}</p>
              )}
            </div>

            {/* Sepal Width */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="sepalWidth" className="text-xs font-semibold text-slate-800">
                  Sepal Width
                </label>
                <span className="text-[11px] font-mono text-slate-400">Typical: 2.0 – 4.4 cm</span>
              </div>
              <div className="relative">
                <input
                  id="sepalWidth"
                  type="number"
                  step="0.1"
                  min="0.1"
                  max="10"
                  value={sepalWidth}
                  onChange={(e) => {
                    setSepalWidth(e.target.value);
                    if (errors.sepalWidth) setErrors(prev => ({ ...prev, sepalWidth: '' }));
                  }}
                  className={`w-full px-3.5 py-2.5 text-sm font-mono rounded-lg border transition-colors bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 ${
                    errors.sepalWidth
                      ? 'border-rose-400 focus:border-rose-500 bg-rose-50/20'
                      : 'border-slate-300 focus:border-indigo-600'
                  }`}
                  placeholder="e.g. 3.0"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 pointer-events-none">
                  cm
                </span>
              </div>
              {errors.sepalWidth && (
                <p className="text-[11px] text-rose-600 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{errors.sepalWidth}</span>
                </p>
              )}
              {!errors.sepalWidth && warnings.sepalWidth && (
                <p className="text-[11px] text-amber-600 mt-1">{warnings.sepalWidth}</p>
              )}
            </div>

            {/* Petal Length */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="petalLength" className="text-xs font-semibold text-slate-800">
                  Petal Length
                </label>
                <span className="text-[11px] font-mono text-slate-400">Typical: 1.0 – 6.9 cm</span>
              </div>
              <div className="relative">
                <input
                  id="petalLength"
                  type="number"
                  step="0.1"
                  min="0.1"
                  max="12"
                  value={petalLength}
                  onChange={(e) => {
                    setPetalLength(e.target.value);
                    if (errors.petalLength) setErrors(prev => ({ ...prev, petalLength: '' }));
                  }}
                  className={`w-full px-3.5 py-2.5 text-sm font-mono rounded-lg border transition-colors bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 ${
                    errors.petalLength
                      ? 'border-rose-400 focus:border-rose-500 bg-rose-50/20'
                      : 'border-slate-300 focus:border-indigo-600'
                  }`}
                  placeholder="e.g. 4.2"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 pointer-events-none">
                  cm
                </span>
              </div>
              {errors.petalLength && (
                <p className="text-[11px] text-rose-600 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{errors.petalLength}</span>
                </p>
              )}
              {!errors.petalLength && warnings.petalLength && (
                <p className="text-[11px] text-amber-600 mt-1">{warnings.petalLength}</p>
              )}
            </div>

            {/* Petal Width */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="petalWidth" className="text-xs font-semibold text-slate-800">
                  Petal Width
                </label>
                <span className="text-[11px] font-mono text-slate-400">Typical: 0.1 – 2.5 cm</span>
              </div>
              <div className="relative">
                <input
                  id="petalWidth"
                  type="number"
                  step="0.1"
                  min="0.05"
                  max="6"
                  value={petalWidth}
                  onChange={(e) => {
                    setPetalWidth(e.target.value);
                    if (errors.petalWidth) setErrors(prev => ({ ...prev, petalWidth: '' }));
                  }}
                  className={`w-full px-3.5 py-2.5 text-sm font-mono rounded-lg border transition-colors bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 ${
                    errors.petalWidth
                      ? 'border-rose-400 focus:border-rose-500 bg-rose-50/20'
                      : 'border-slate-300 focus:border-indigo-600'
                  }`}
                  placeholder="e.g. 1.3"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 pointer-events-none">
                  cm
                </span>
              </div>
              {errors.petalWidth && (
                <p className="text-[11px] text-rose-600 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{errors.petalWidth}</span>
                </p>
              )}
              {!errors.petalWidth && warnings.petalWidth && (
                <p className="text-[11px] text-amber-600 mt-1">{warnings.petalWidth}</p>
              )}
            </div>

            {/* KNN Hyperparameter k selector */}
            <div className="pt-2">
              <div className="flex items-center justify-between text-xs text-slate-600 mb-1.5">
                <span className="font-semibold flex items-center gap-1">
                  <Sliders className="w-3 h-3 text-slate-500" />
                  Algorithm: K-Nearest Neighbors (k = {kNeighbors})
                </span>
                <span className="font-mono text-slate-400 text-[11px]">Normalized Euclidean</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-100 rounded-lg">
                {[1, 3, 5, 7].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setKNeighbors(num)}
                    className={`py-1 text-xs font-mono font-medium rounded-md transition-all ${
                      kNeighbors === num
                        ? 'bg-white text-indigo-700 shadow-xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    k = {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Large Prominent PREDICT SPECIES Button */}
            <button
              type="submit"
              disabled={isClassifying}
              className="w-full mt-4 py-3.5 px-6 text-sm font-bold tracking-wide uppercase text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:bg-indigo-400 rounded-xl shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isClassifying ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>ANALYZING 150 OBSERVATIONS...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>PREDICT SPECIES</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Prediction Result Card (7 cols on lg) */}
        <div id="prediction-result-card" className="lg:col-span-7">
          {result ? (
            <div className="bg-white border-2 border-indigo-200/80 rounded-2xl p-6 sm:p-7 shadow-md space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-indigo-600 font-bold">
                    PREDICTION RESULT
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                      Iris {result.species}
                    </h2>
                    <span className={`w-3 h-3 rounded-full ${SPECIES_PROFILES[result.species].dotColor}`} />
                  </div>
                  <p className="text-xs italic text-slate-500">
                    {SPECIES_PROFILES[result.species].scientificName}
                  </p>
                </div>

                {/* Prominent Confidence Display */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center sm:items-end">
                  <span className="text-[11px] font-mono text-slate-500 uppercase">Model Confidence</span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 font-mono tabular-nums">
                    {result.confidence}%
                  </div>
                </div>
              </div>

              {/* Visual Card Representation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <SpeciesIllustration species={result.species} className="w-full h-44 rounded-xl border border-slate-100" />
                
                {/* Input Measurements Summary (As specifically formatted in user brief) */}
                <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 space-y-2">
                  <div className="text-xs font-mono uppercase text-slate-500 font-semibold mb-1">
                    Input Measurements:
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-slate-700">
                      <span>Sepal Length:</span>
                      <span className="font-mono font-bold text-slate-900 tabular-nums">
                        {result.input.sepalLength.toFixed(1)} cm
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-700">
                      <span>Sepal Width:</span>
                      <span className="font-mono font-bold text-slate-900 tabular-nums">
                        {result.input.sepalWidth.toFixed(1)} cm
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-700">
                      <span>Petal Length:</span>
                      <span className="font-mono font-bold text-slate-900 tabular-nums">
                        {result.input.petalLength.toFixed(1)} cm
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-700">
                      <span>Petal Width:</span>
                      <span className="font-mono font-bold text-slate-900 tabular-nums">
                        {result.input.petalWidth.toFixed(1)} cm
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Class Probability Distribution */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-slate-500 font-semibold">
                  Probability Distribution Across Classes:
                </span>
                <div className="space-y-2">
                  {(['Setosa', 'Versicolor', 'Virginica'] as SpeciesType[]).map((sp) => {
                    const prob = result.probabilities[sp];
                    const isWinner = result.species === sp;
                    return (
                      <div key={sp} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className={`font-medium ${isWinner ? 'font-bold text-slate-900' : 'text-slate-600'}`}>
                            Iris {sp}
                          </span>
                          <span className="font-mono tabular-nums text-slate-700 font-semibold">
                            {prob}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              sp === 'Setosa'
                                ? 'bg-emerald-500'
                                : sp === 'Versicolor'
                                ? 'bg-blue-500'
                                : 'bg-purple-500'
                            }`}
                            style={{ width: `${Math.max(prob, 2)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Explanation of the Prediction (Required) */}
              <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-900">
                  <Info className="w-4 h-4 text-indigo-600" />
                  <span>Prediction Explanation:</span>
                </div>
                <p className="text-xs text-indigo-950 leading-relaxed">
                  {result.explanation}
                </p>
                <div className="pt-2 border-t border-indigo-100/80 space-y-1">
                  {result.botanicalReasoning.map((reason, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-xs text-indigo-900/90">
                      <span className="text-indigo-500 text-xs font-mono">•</span>
                      <span>{reason}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nearest Neighbors Inspection Table */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span className="font-semibold">Top {result.nearestNeighbors.length} Nearest Botanical Neighbors in Dataset</span>
                  <span className="font-mono text-[11px] text-slate-400">Euclidean Distance</span>
                </div>
                <div className="overflow-x-auto border border-slate-200 rounded-lg">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-50 text-slate-600 text-[11px] font-mono border-b border-slate-200">
                      <tr>
                        <th className="py-2 px-3">Sample ID</th>
                        <th className="py-2 px-3">Species</th>
                        <th className="py-2 px-3">Sepal (L×W)</th>
                        <th className="py-2 px-3">Petal (L×W)</th>
                        <th className="py-2 px-3 text-right">Distance</th>
                        <th className="py-2 px-3 text-right">Match</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono">
                      {result.nearestNeighbors.map((neighbor) => (
                        <tr key={neighbor.id} className="hover:bg-slate-50/50">
                          <td className="py-1.5 px-3 text-slate-500 font-mono">#{neighbor.id}</td>
                          <td className="py-1.5 px-3 font-sans font-medium text-slate-900">
                            <span className="flex items-center gap-1.5">
                              <span className={`w-1.5 h-1.5 rounded-full ${SPECIES_PROFILES[neighbor.species].dotColor}`} />
                              <span>{neighbor.species}</span>
                            </span>
                          </td>
                          <td className="py-1.5 px-3 text-slate-600 tabular-nums">
                            {neighbor.sepalLength} × {neighbor.sepalWidth}
                          </td>
                          <td className="py-1.5 px-3 text-slate-600 tabular-nums">
                            {neighbor.petalLength} × {neighbor.petalWidth}
                          </td>
                          <td className="py-1.5 px-3 text-right text-slate-700 tabular-nums">
                            {neighbor.distance}
                          </td>
                          <td className="py-1.5 px-3 text-right text-emerald-600 font-bold tabular-nums">
                            {neighbor.similarity}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Footer Actions: Try Another Prediction */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Try Another Prediction</span>
                </button>

                <div className="text-[11px] font-mono text-slate-400">
                  Calculated deterministically at {result.timestamp}
                </div>
              </div>
            </div>
          ) : (
            /* Empty State before prediction */
            <div className="h-full min-h-[420px] bg-white border border-dashed border-slate-300 rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                <Flower2 className="w-7 h-7" />
              </div>
              <div className="max-w-md">
                <h3 className="text-base font-bold text-slate-900">Awaiting Flower Measurements</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Enter sepal and petal dimensions on the left panel or click any preset specimen above,
                  then click <span className="font-semibold text-indigo-600">PREDICT SPECIES</span> to run
                  the classification model.
                </p>
              </div>

              <div className="pt-4 flex flex-wrap justify-center gap-2">
                <button
                  type="button"
                  onClick={() => handleApplyPreset(PRESETS[0])}
                  className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  Load Setosa Preset
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyPreset(PRESETS[1])}
                  className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  Load Versicolor Preset
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyPreset(PRESETS[2])}
                  className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  Load Virginica Preset
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Local Storage-Backed Prediction History Section (Last 5 Predictions) */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <History className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">Prediction History</h3>
                <span className="text-[11px] font-mono text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded">
                  {history.length} of 5 saved
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Saved locally in browser memory. Review prior outputs or reload previous flower dimensions with 1 click.
              </p>
            </div>
          </div>

          {history.length > 0 && (
            <button
              type="button"
              onClick={handleClearHistory}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 rounded-lg transition-colors self-start sm:self-auto cursor-pointer"
              title="Clear all saved prediction history"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="py-8 px-4 text-center rounded-xl bg-slate-50/70 border border-dashed border-slate-200 flex flex-col items-center justify-center space-y-2">
            <Clock className="w-6 h-6 text-slate-400" />
            <p className="text-xs font-semibold text-slate-700">No predictions recorded yet</p>
            <p className="text-[11px] text-slate-500 max-w-sm">
              Your last 5 flower predictions will be stored here automatically across page visits so you can review previous results.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {history.map((item, index) => {
              const isCurrentActive =
                result &&
                result.species === item.species &&
                result.input.sepalLength === item.input.sepalLength &&
                result.input.petalLength === item.input.petalLength;

              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-xl border transition-all flex flex-col justify-between space-y-3 ${
                    isCurrentActive
                      ? 'bg-indigo-50/40 border-indigo-300 ring-1 ring-indigo-400/30 shadow-2xs'
                      : 'bg-slate-50/70 hover:bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-[10px] text-slate-400">
                        #{index + 1} · {item.timestamp}
                      </span>
                      <span className="font-mono font-bold text-xs text-indigo-700 tabular-nums">
                        {item.confidence}%
                      </span>
                    </div>

                    {/* Species */}
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${SPECIES_PROFILES[item.species].dotColor}`} />
                      <span className="text-sm font-bold text-slate-900">
                        Iris {item.species}
                      </span>
                    </div>

                    {/* Measurements */}
                    <div className="mt-2.5 pt-2 border-t border-slate-200/60 text-[11px] font-mono space-y-1 text-slate-600">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Sepal:</span>
                        <span className="text-slate-800 tabular-nums">{item.input.sepalLength} × {item.input.sepalWidth} cm</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Petal:</span>
                        <span className="text-slate-800 tabular-nums">{item.input.petalLength} × {item.input.petalWidth} cm</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-slate-200/60 flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleReviewHistoryItem(item)}
                      className="flex-1 py-1.5 px-2 text-[11px] font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      title="Review full results and comparison in the result card"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Review</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleLoadInputsOnly(item)}
                      className="py-1.5 px-2 text-[11px] font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-md transition-colors flex items-center justify-center cursor-pointer"
                      title="Populate input form with these measurements"
                    >
                      <RotateCcw className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Anatomy Guide Section at bottom of classification view */}
      <section className="pt-6">
        <IrisAnatomyDiagram />
      </section>
    </div>
  );
};
