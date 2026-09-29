/**
 * Machine Learning Classification Engine for Iris Flowers.
 * Implements K-Nearest Neighbors (KNN) with Euclidean distance metric
 * and a trained Decision Tree Classifier on the 150 Iris samples.
 */

import { IRIS_DATASET, IrisSample, SpeciesType, GLOBAL_FEATURE_STATS } from '../data/irisData';

export interface FlowerInput {
  sepalLength: number;
  sepalWidth: number;
  petalLength: number;
  petalWidth: number;
}

export interface NeighborResult {
  id: number;
  species: SpeciesType;
  sepalLength: number;
  sepalWidth: number;
  petalLength: number;
  petalWidth: number;
  distance: number;
  similarity: number; // 0-100%
}

export interface ClassificationResult {
  species: SpeciesType;
  confidence: number; // percentage e.g. 96
  algorithmUsed: 'KNN' | 'DecisionTree';
  probabilities: {
    Setosa: number;
    Versicolor: number;
    Virginica: number;
  };
  nearestNeighbors: NeighborResult[];
  explanation: string;
  botanicalReasoning: string[];
  decisionTreePath: string[];
  treeSpecies: SpeciesType;
  input: FlowerInput;
  timestamp: string;
}

/**
 * Normalizes a value using dataset min/max for standardized distance comparison
 */
function normalize(val: number, min: number, max: number): number {
  if (max === min) return 0;
  return (val - min) / (max - min);
}

/**
 * Calculates Euclidean distance between two 4D feature vectors (normalized)
 */
function calculateDistance(
  a: FlowerInput,
  b: IrisSample,
  standardize: boolean = true
): number {
  if (!standardize) {
    return Math.sqrt(
      Math.pow(a.sepalLength - b.sepalLength, 2) +
      Math.pow(a.sepalWidth - b.sepalWidth, 2) +
      Math.pow(a.petalLength - b.petalLength, 2) +
      Math.pow(a.petalWidth - b.petalWidth, 2)
    );
  }

  // Min-max normalization for scale-invariant distance
  const nSL_a = normalize(a.sepalLength, GLOBAL_FEATURE_STATS.sepalLength.min, GLOBAL_FEATURE_STATS.sepalLength.max);
  const nSW_a = normalize(a.sepalWidth, GLOBAL_FEATURE_STATS.sepalWidth.min, GLOBAL_FEATURE_STATS.sepalWidth.max);
  const nPL_a = normalize(a.petalLength, GLOBAL_FEATURE_STATS.petalLength.min, GLOBAL_FEATURE_STATS.petalLength.max);
  const nPW_a = normalize(a.petalWidth, GLOBAL_FEATURE_STATS.petalWidth.min, GLOBAL_FEATURE_STATS.petalWidth.max);

  const nSL_b = normalize(b.sepalLength, GLOBAL_FEATURE_STATS.sepalLength.min, GLOBAL_FEATURE_STATS.sepalLength.max);
  const nSW_b = normalize(b.sepalWidth, GLOBAL_FEATURE_STATS.sepalWidth.min, GLOBAL_FEATURE_STATS.sepalWidth.max);
  const nPL_b = normalize(b.petalLength, GLOBAL_FEATURE_STATS.petalLength.min, GLOBAL_FEATURE_STATS.petalLength.max);
  const nPW_b = normalize(b.petalWidth, GLOBAL_FEATURE_STATS.petalWidth.min, GLOBAL_FEATURE_STATS.petalWidth.max);

  return Math.sqrt(
    Math.pow(nSL_a - nSL_b, 2) +
    Math.pow(nSW_a - nSW_b, 2) +
    Math.pow(nPL_a - nPL_b, 2) +
    Math.pow(nPW_a - nPW_b, 2)
  );
}

/**
 * Decision Tree Classifier rule traversal
 */
export function classifyWithDecisionTree(input: FlowerInput): { species: SpeciesType; path: string[] } {
  const path: string[] = [];

  // Split 1: Petal Length <= 2.45 cm (Separates Setosa perfectly)
  if (input.petalLength <= 2.45) {
    path.push(`Petal Length (${input.petalLength} cm) ≤ 2.45 cm → Node pure: Iris Setosa`);
    return { species: 'Setosa', path };
  } else {
    path.push(`Petal Length (${input.petalLength} cm) > 2.45 cm → Move to right branch`);
  }

  // Split 2: Petal Width <= 1.75 cm
  if (input.petalWidth <= 1.75) {
    path.push(`Petal Width (${input.petalWidth} cm) ≤ 1.75 cm → Leaning Versicolor`);
    
    // Split 3: Petal Length <= 4.95 cm
    if (input.petalLength <= 4.95) {
      path.push(`Petal Length (${input.petalLength} cm) ≤ 4.95 cm → Classify as Iris Versicolor`);
      return { species: 'Versicolor', path };
    } else {
      path.push(`Petal Length (${input.petalLength} cm) > 4.95 cm → Boundary split → Classify as Iris Virginica`);
      return { species: 'Virginica', path };
    }
  } else {
    path.push(`Petal Width (${input.petalWidth} cm) > 1.75 cm → Large petals → Classify as Iris Virginica`);
    return { species: 'Virginica', path };
  }
}

/**
 * Classifies an Iris flower using K-Nearest Neighbors (KNN)
 * @param input Flower measurements
 * @param k Number of nearest neighbors (default 5)
 */
export function classifyIris(input: FlowerInput, k: number = 5): ClassificationResult {
  // 1. Calculate distances to all 150 training points
  const distances = IRIS_DATASET.map(sample => {
    const rawDist = calculateDistance(input, sample, false);
    const normDist = calculateDistance(input, sample, true);
    return {
      sample,
      distance: Number(rawDist.toFixed(3)),
      normDistance: normDist
    };
  });

  // Sort ascending by normalized distance
  distances.sort((a, b) => a.normDistance - b.normDistance);

  // Take top k neighbors
  const topK = distances.slice(0, k);

  // Weighted voting based on inverse normalized distance
  // w = 1 / (normDist + 0.05) to avoid division by zero
  const voteWeights: Record<SpeciesType, number> = {
    Setosa: 0,
    Versicolor: 0,
    Virginica: 0
  };

  const counts: Record<SpeciesType, number> = {
    Setosa: 0,
    Versicolor: 0,
    Virginica: 0
  };

  topK.forEach(({ sample, normDistance }) => {
    const weight = 1 / (normDistance + 0.05);
    voteWeights[sample.species] += weight;
    counts[sample.species] += 1;
  });

  const totalWeight = voteWeights.Setosa + voteWeights.Versicolor + voteWeights.Virginica;

  const probabilities = {
    Setosa: Number(((voteWeights.Setosa / totalWeight) * 100).toFixed(1)),
    Versicolor: Number(((voteWeights.Versicolor / totalWeight) * 100).toFixed(1)),
    Virginica: Number(((voteWeights.Virginica / totalWeight) * 100).toFixed(1))
  };

  // Determine winning species
  let predictedSpecies: SpeciesType = 'Setosa';
  let maxWeight = voteWeights.Setosa;

  if (voteWeights.Versicolor > maxWeight) {
    maxWeight = voteWeights.Versicolor;
    predictedSpecies = 'Versicolor';
  }
  if (voteWeights.Virginica > maxWeight) {
    maxWeight = voteWeights.Virginica;
    predictedSpecies = 'Virginica';
  }

  const confidence = Math.round(probabilities[predictedSpecies]);

  // Evaluate Decision Tree for verification
  const treeResult = classifyWithDecisionTree(input);

  // Generate nearest neighbors detailed objects
  const nearestNeighbors: NeighborResult[] = topK.map(({ sample, distance, normDistance }) => {
    // similarity percentage relative to max expected distance (~2.0 normalized)
    const similarity = Math.max(0, Math.min(100, Math.round((1 - normDistance / 1.5) * 100)));
    return {
      id: sample.id,
      species: sample.species,
      sepalLength: sample.sepalLength,
      sepalWidth: sample.sepalWidth,
      petalLength: sample.petalLength,
      petalWidth: sample.petalWidth,
      distance,
      similarity
    };
  });

  // Construct botanical reasoning & explanations
  const botanicalReasoning: string[] = [];
  if (predictedSpecies === 'Setosa') {
    botanicalReasoning.push(`Petal length of ${input.petalLength.toFixed(1)} cm is well within the Setosa standard range (1.0 - 1.9 cm).`);
    botanicalReasoning.push(`Petal width of ${input.petalWidth.toFixed(1)} cm is below 0.6 cm, which is an exclusive hallmark of Setosa.`);
    botanicalReasoning.push(`High sepal width relative to length (${input.sepalWidth.toFixed(1)} cm / ${input.sepalLength.toFixed(1)} cm) is typical of Setosa anatomy.`);
  } else if (predictedSpecies === 'Versicolor') {
    botanicalReasoning.push(`Petal length of ${input.petalLength.toFixed(1)} cm places the specimen in the intermediate range between Setosa (< 2.5 cm) and Virginica (> 5.0 cm).`);
    botanicalReasoning.push(`Petal width of ${input.petalWidth.toFixed(1)} cm is below the typical 1.8 cm threshold that separates Versicolor from Virginica.`);
    botanicalReasoning.push(`KNN analysis shows ${counts.Versicolor} of the ${k} closest known botanical specimens are Iris Versicolor.`);
  } else {
    botanicalReasoning.push(`Petal length of ${input.petalLength.toFixed(1)} cm and petal width of ${input.petalWidth.toFixed(1)} cm represent the large floral dimensions characteristic of Virginica.`);
    botanicalReasoning.push(`Petal width ≥ 1.8 cm is a decisive morphological indicator distinguishing Virginica from Versicolor in 96% of historical specimens.`);
    botanicalReasoning.push(`KNN distance vectors heavily cluster around established Virginica coordinates in 4-dimensional Euclidean space.`);
  }

  let explanation = '';
  if (predictedSpecies === 'Setosa') {
    explanation = `The specimen exhibits compact petal dimensions (length ${input.petalLength.toFixed(1)} cm, width ${input.petalWidth.toFixed(1)} cm), which are linearly separable and characteristic of Iris Setosa with ${confidence}% model confidence.`;
  } else if (predictedSpecies === 'Versicolor') {
    explanation = `The specimen displays moderate petal length (${input.petalLength.toFixed(1)} cm) and slender petal width (${input.petalWidth.toFixed(1)} cm). The nearest ${k} neighbors in the 150-sample dataset decisively align with Iris Versicolor (${confidence}% confidence).`;
  } else {
    explanation = `The specimen possesses extended petal dimensions (length ${input.petalLength.toFixed(1)} cm, width ${input.petalWidth.toFixed(1)} cm) that surpass the Versicolor threshold and match the canonical Iris Virginica profile with ${confidence}% confidence.`;
  }

  return {
    species: predictedSpecies,
    confidence,
    algorithmUsed: 'KNN',
    probabilities,
    nearestNeighbors,
    explanation,
    botanicalReasoning,
    decisionTreePath: treeResult.path,
    treeSpecies: treeResult.species,
    input,
    timestamp: new Date().toLocaleTimeString()
  };
}

/**
 * Pre-computes Cross Validation metrics on the dataset for the Analytics/Model page
 */
export function getModelMetrics(k: number = 5) {
  // Leave-One-Out Cross Validation (LOOCV)
  let correct = 0;
  const confusionMatrix: Record<SpeciesType, Record<SpeciesType, number>> = {
    Setosa: { Setosa: 0, Versicolor: 0, Virginica: 0 },
    Versicolor: { Setosa: 0, Versicolor: 0, Virginica: 0 },
    Virginica: { Setosa: 0, Versicolor: 0, Virginica: 0 }
  };

  IRIS_DATASET.forEach(sample => {
    // Train on remaining 149 samples
    const otherSamples = IRIS_DATASET.filter(s => s.id !== sample.id);
    
    // Find k nearest neighbors among otherSamples
    const distances = otherSamples.map(other => {
      const normDist = calculateDistance(
        {
          sepalLength: sample.sepalLength,
          sepalWidth: sample.sepalWidth,
          petalLength: sample.petalLength,
          petalWidth: sample.petalWidth
        },
        other,
        true
      );
      return { other, normDist };
    });

    distances.sort((a, b) => a.normDist - b.normDist);
    const top = distances.slice(0, k);

    const weights: Record<SpeciesType, number> = { Setosa: 0, Versicolor: 0, Virginica: 0 };
    top.forEach(({ other, normDist }) => {
      weights[other.species] += 1 / (normDist + 0.05);
    });

    let bestSpecies: SpeciesType = 'Setosa';
    let bestW = weights.Setosa;
    if (weights.Versicolor > bestW) {
      bestW = weights.Versicolor;
      bestSpecies = 'Versicolor';
    }
    if (weights.Virginica > bestW) {
      bestSpecies = 'Virginica';
    }

    confusionMatrix[sample.species][bestSpecies] += 1;
    if (bestSpecies === sample.species) {
      correct += 1;
    }
  });

  const accuracy = Number(((correct / IRIS_DATASET.length) * 100).toFixed(1));

  // Compute precision, recall, F1 per class
  const classMetrics = (['Setosa', 'Versicolor', 'Virginica'] as SpeciesType[]).map(species => {
    const truePos = confusionMatrix[species][species];
    const totalActual = 50;
    const totalPredicted = confusionMatrix.Setosa[species] + confusionMatrix.Versicolor[species] + confusionMatrix.Virginica[species];

    const precision = totalPredicted > 0 ? (truePos / totalPredicted) * 100 : 0;
    const recall = totalActual > 0 ? (truePos / totalActual) * 100 : 0;
    const f1 = (precision + recall) > 0 ? (2 * precision * recall) / (precision + recall) : 0;

    return {
      species,
      precision: Number(precision.toFixed(1)),
      recall: Number(recall.toFixed(1)),
      f1Score: Number(f1.toFixed(1)),
      support: 50
    };
  });

  return {
    accuracy,
    correctCount: correct,
    totalCount: IRIS_DATASET.length,
    confusionMatrix,
    classMetrics,
    k
  };
}
