import React from 'react';
import { BookOpen, GraduationCap, Cpu, GitMerge, LineChart, Target, Sparkles, Database, Layers, ArrowUpRight } from 'lucide-react';
import { IrisAnatomyDiagram } from './SpeciesIllustrations';

export const AboutView: React.FC = () => {
  return (
    <div className="space-y-12 py-6 sm:py-8 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <div className="text-xs font-mono text-indigo-600 font-medium">ACADEMIC MACHINE LEARNING DEMONSTRATION</div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          About Iris Flower Classification
        </h1>
        <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
          An academic and technical machine-learning project showcasing end-to-end data science workflows:
          from raw botanical data preprocessing and exploratory data analysis to supervised machine learning,
          multi-class classification, deterministic real-time prediction, and high-fidelity interactive data visualization.
        </p>
      </div>

      {/* 6 Core Competency Pillars (Explicitly requested by user) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 text-indigo-600 mb-2">
            <Database className="w-4 h-4" />
            <h3 className="text-sm font-bold text-slate-900">1. Data Preprocessing</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Standardization, min-max feature scaling, and continuous boundary validation to eliminate feature scale dominance between centimeter measurements.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 text-indigo-600 mb-2">
            <LineChart className="w-4 h-4" />
            <h3 className="text-sm font-bold text-slate-900">2. Exploratory Data Analysis</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Distribution histograms, cross-feature Pearson correlation analysis, class separation boundaries, and statistical variance calculation.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 text-indigo-600 mb-2">
            <Cpu className="w-4 h-4" />
            <h3 className="text-sm font-bold text-slate-900">3. Supervised Machine Learning</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Training deterministic algorithms with labeled specimens (Setosa, Versicolor, Virginica) to formulate repeatable decision rules.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 text-indigo-600 mb-2">
            <GitMerge className="w-4 h-4" />
            <h3 className="text-sm font-bold text-slate-900">4. Classification Modeling</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Multi-class classification utilizing K-Nearest Neighbors (KNN) in 4D space alongside binary decision tree rule induction.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 text-indigo-600 mb-2">
            <Target className="w-4 h-4" />
            <h3 className="text-sm font-bold text-slate-900">5. Inference & Prediction</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Deterministic real-time prediction with continuous confidence scoring, probability distribution, and morphological reasoning output.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 text-indigo-600 mb-2">
            <Layers className="w-4 h-4" />
            <h3 className="text-sm font-bold text-slate-900">6. Data Visualization</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Interactive responsive 2D projection scatter plots, species donuts, and confusion matrices designed to communicate empirical results clearly.
          </p>
        </div>
      </div>

      {/* Structured Sections (Required by prompt: Project Objective, Dataset, Features, Algorithm, Applications, Future Improvements) */}
      <div className="space-y-8">
        {/* Section 1: Project Objective */}
        <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-600 font-bold uppercase">
            <Target className="w-4 h-4" />
            <span>Project Objective</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            Automating Botanical Species Identification Through Empirical Measurement
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            The primary objective of this project is to construct a production-ready, client-side machine learning system that accurately classifies Iris flowers into three target species: <strong>Iris Setosa</strong>, <strong>Iris Versicolor</strong>, and <strong>Iris Virginica</strong>.
            Rather than relying on mock APIs or simulated responses, this application performs actual mathematical vector calculations in Euclidean space, enabling students, botanists, and machine learning practitioners to understand exactly how feature measurements translate into statistical classifications.
          </p>
        </div>

        {/* Section 2: Dataset */}
        <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-600 font-bold uppercase">
            <Database className="w-4 h-4" />
            <span>Dataset History & Provenance</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            Fisher's 1936 Iris Dataset (Anderson's Collection)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            First compiled in 1935 by American botanist Edgar Anderson across the Gaspé Peninsula in Quebec, Canada, the dataset was published by British statistician and geneticist Ronald A. Fisher in his seminal 1936 paper, <em>"The use of multiple measurements in taxonomic problems"</em>.
            It contains 150 instances, 50 from each of the three species. Two of the three species were collected in the wild from the same pasture on the same day by the same observer to eliminate environmental confounding factors.
          </p>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 font-mono text-xs text-slate-600 flex flex-wrap items-center justify-between gap-2">
            <span>Citation: Fisher, R.A. (1936). Annals of Eugenics, 7(2), 179-188.</span>
            <span className="text-indigo-600">UCI Machine Learning Repository #53</span>
          </div>
        </div>

        {/* Section 3: Features */}
        <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-600 font-bold uppercase">
            <Layers className="w-4 h-4" />
            <span>Features & Morphological Variables</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            Four Morphological Variables in Continuous Centimeters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <strong className="text-slate-900 block font-semibold text-sm mb-1">1. Sepal Length (4.3 – 7.9 cm)</strong>
              The total longitudinal measurement of the outer calyx leaf segment. Virginica exhibits the longest average sepal length (6.59 cm), while Setosa averages 5.01 cm.
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <strong className="text-slate-900 block font-semibold text-sm mb-1">2. Sepal Width (2.0 – 4.4 cm)</strong>
              The lateral width of the calyx segment. Interestingly, Setosa has the broadest sepals (mean 3.43 cm), creating a distinctive stout aspect ratio compared to Versicolor (mean 2.77 cm).
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <strong className="text-slate-900 block font-semibold text-sm mb-1">3. Petal Length (1.0 – 6.9 cm)</strong>
              The length of the upright standard petal. The single most important discriminant feature in the dataset, providing complete linear separability for Setosa (&lt; 2.5 cm).
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <strong className="text-slate-900 block font-semibold text-sm mb-1">4. Petal Width (0.1 – 2.5 cm)</strong>
              The thickness of the upright standard petal. Extremely correlated with Petal Length (+0.96) and crucial for resolving the boundary between Versicolor (&lt; 1.8 cm) and Virginica (&ge; 1.8 cm).
            </div>
          </div>
        </div>

        {/* Section 4: Algorithm */}
        <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-600 font-bold uppercase">
            <Cpu className="w-4 h-4" />
            <span>Algorithm Implementation</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            Non-Parametric K-Nearest Neighbors (KNN) & Binary Decision Trees
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            The primary algorithm utilizes non-parametric <strong>K-Nearest Neighbors (KNN)</strong> with normalized Euclidean distance:
          </p>
          <div className="p-3.5 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto">
            <code>d(x, y) = √ [ ∑ᵢ₌₁⁴ ((xᵢ - yᵢ) / (maxᵢ - minᵢ))² ]</code>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Weights are applied inversely proportional to Euclidean distance: <code>w = 1 / (d + 0.05)</code>, ensuring closer historical specimens exercise greater influence over the final prediction probability. In parallel, a binary decision tree checks hierarchical splits (Petal Length ≤ 2.45 cm and Petal Width ≤ 1.75 cm) for interpretive verification.
          </p>
        </div>

        {/* Section 5: Applications */}
        <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-600 font-bold uppercase">
            <GraduationCap className="w-4 h-4" />
            <span>Real-World Applications</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            Practical Applications of Pattern Classification
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1 text-xs text-slate-600">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
              <strong className="text-slate-900 block font-semibold">Automated Horticulture</strong>
              Automated sorting and species verification in commercial nurseries, robotic harvesting, and digital plant registration.
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
              <strong className="text-slate-900 block font-semibold">Biodiversity Field Studies</strong>
              Mobile field taxonomist tooling for ecological surveys and conservation status tracking in wildlife reserves.
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
              <strong className="text-slate-900 block font-semibold">Algorithm Benchmark</strong>
              Standard benchmark for evaluating dimensionality reduction algorithms (PCA, t-SNE, UMAP) and novel classifier architectures.
            </div>
          </div>
        </div>

        {/* Section 6: Future Improvements */}
        <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-600 font-bold uppercase">
            <Sparkles className="w-4 h-4" />
            <span>Future Improvements</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            Planned Technical Enhancements
          </h2>
          <ul className="space-y-2 text-xs text-slate-600 list-disc list-inside">
            <li><strong>Principal Component Analysis (PCA):</strong> Interactive 3D dimensionality reduction visualization to project 4D features onto orthogonal eigenvectors.</li>
            <li><strong>Computer Vision Pipeline:</strong> Image-based Convolutional Neural Network (CNN) integration capable of auto-extracting measurements directly from mobile camera photos.</li>
            <li><strong>Ensemble Modeling:</strong> Comparative multi-model view contrasting KNN against Support Vector Machines (SVM with RBF kernel), Random Forest, and Gaussian Naive Bayes.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
