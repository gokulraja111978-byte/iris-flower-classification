/**
 * Fisher's canonical Iris flower dataset (1936).
 * 150 samples: 50 Setosa, 50 Versicolor, 50 Virginica.
 * Features: Sepal Length, Sepal Width, Petal Length, Petal Width (all in cm).
 */

export interface IrisSample {
  id: number;
  sepalLength: number;
  sepalWidth: number;
  petalLength: number;
  petalWidth: number;
  species: 'Setosa' | 'Versicolor' | 'Virginica';
}

export type SpeciesType = 'Setosa' | 'Versicolor' | 'Virginica';

export const IRIS_DATASET: IrisSample[] = [
  // Iris-setosa (1-50)
  { id: 1, sepalLength: 5.1, sepalWidth: 3.5, petalLength: 1.4, petalWidth: 0.2, species: 'Setosa' },
  { id: 2, sepalLength: 4.9, sepalWidth: 3.0, petalLength: 1.4, petalWidth: 0.2, species: 'Setosa' },
  { id: 3, sepalLength: 4.7, sepalWidth: 3.2, petalLength: 1.3, petalWidth: 0.2, species: 'Setosa' },
  { id: 4, sepalLength: 4.6, sepalWidth: 3.1, petalLength: 1.5, petalWidth: 0.2, species: 'Setosa' },
  { id: 5, sepalLength: 5.0, sepalWidth: 3.6, petalLength: 1.4, petalWidth: 0.2, species: 'Setosa' },
  { id: 6, sepalLength: 5.4, sepalWidth: 3.9, petalLength: 1.7, petalWidth: 0.4, species: 'Setosa' },
  { id: 7, sepalLength: 4.6, sepalWidth: 3.4, petalLength: 1.4, petalWidth: 0.3, species: 'Setosa' },
  { id: 8, sepalLength: 5.0, sepalWidth: 3.4, petalLength: 1.5, petalWidth: 0.2, species: 'Setosa' },
  { id: 9, sepalLength: 4.4, sepalWidth: 2.9, petalLength: 1.4, petalWidth: 0.2, species: 'Setosa' },
  { id: 10, sepalLength: 4.9, sepalWidth: 3.1, petalLength: 1.5, petalWidth: 0.1, species: 'Setosa' },
  { id: 11, sepalLength: 5.4, sepalWidth: 3.7, petalLength: 1.5, petalWidth: 0.2, species: 'Setosa' },
  { id: 12, sepalLength: 4.8, sepalWidth: 3.4, petalLength: 1.6, petalWidth: 0.2, species: 'Setosa' },
  { id: 13, sepalLength: 4.8, sepalWidth: 3.0, petalLength: 1.4, petalWidth: 0.1, species: 'Setosa' },
  { id: 14, sepalLength: 4.3, sepalWidth: 3.0, petalLength: 1.1, petalWidth: 0.1, species: 'Setosa' },
  { id: 15, sepalLength: 5.8, sepalWidth: 4.0, petalLength: 1.2, petalWidth: 0.2, species: 'Setosa' },
  { id: 16, sepalLength: 5.7, sepalWidth: 4.4, petalLength: 1.5, petalWidth: 0.4, species: 'Setosa' },
  { id: 17, sepalLength: 5.4, sepalWidth: 3.9, petalLength: 1.3, petalWidth: 0.4, species: 'Setosa' },
  { id: 18, sepalLength: 5.1, sepalWidth: 3.5, petalLength: 1.4, petalWidth: 0.3, species: 'Setosa' },
  { id: 19, sepalLength: 5.7, sepalWidth: 3.8, petalLength: 1.7, petalWidth: 0.3, species: 'Setosa' },
  { id: 20, sepalLength: 5.1, sepalWidth: 3.8, petalLength: 1.5, petalWidth: 0.3, species: 'Setosa' },
  { id: 21, sepalLength: 5.4, sepalWidth: 3.4, petalLength: 1.7, petalWidth: 0.2, species: 'Setosa' },
  { id: 22, sepalLength: 5.1, sepalWidth: 3.7, petalLength: 1.5, petalWidth: 0.4, species: 'Setosa' },
  { id: 23, sepalLength: 4.6, sepalWidth: 3.6, petalLength: 1.0, petalWidth: 0.2, species: 'Setosa' },
  { id: 24, sepalLength: 5.1, sepalWidth: 3.3, petalLength: 1.7, petalWidth: 0.5, species: 'Setosa' },
  { id: 25, sepalLength: 4.8, sepalWidth: 3.4, petalLength: 1.9, petalWidth: 0.2, species: 'Setosa' },
  { id: 26, sepalLength: 5.0, sepalWidth: 3.0, petalLength: 1.6, petalWidth: 0.2, species: 'Setosa' },
  { id: 27, sepalLength: 5.0, sepalWidth: 3.4, petalLength: 1.6, petalWidth: 0.4, species: 'Setosa' },
  { id: 28, sepalLength: 5.2, sepalWidth: 3.5, petalLength: 1.5, petalWidth: 0.2, species: 'Setosa' },
  { id: 29, sepalLength: 5.2, sepalWidth: 3.4, petalLength: 1.4, petalWidth: 0.2, species: 'Setosa' },
  { id: 30, sepalLength: 4.7, sepalWidth: 3.2, petalLength: 1.6, petalWidth: 0.2, species: 'Setosa' },
  { id: 31, sepalLength: 4.8, sepalWidth: 3.1, petalLength: 1.6, petalWidth: 0.2, species: 'Setosa' },
  { id: 32, sepalLength: 5.4, sepalWidth: 3.4, petalLength: 1.5, petalWidth: 0.4, species: 'Setosa' },
  { id: 33, sepalLength: 5.2, sepalWidth: 4.1, petalLength: 1.5, petalWidth: 0.1, species: 'Setosa' },
  { id: 34, sepalLength: 5.5, sepalWidth: 4.2, petalLength: 1.4, petalWidth: 0.2, species: 'Setosa' },
  { id: 35, sepalLength: 4.9, sepalWidth: 3.1, petalLength: 1.5, petalWidth: 0.2, species: 'Setosa' },
  { id: 36, sepalLength: 5.0, sepalWidth: 3.2, petalLength: 1.2, petalWidth: 0.2, species: 'Setosa' },
  { id: 37, sepalLength: 5.5, sepalWidth: 3.5, petalLength: 1.3, petalWidth: 0.2, species: 'Setosa' },
  { id: 38, sepalLength: 4.9, sepalWidth: 3.6, petalLength: 1.4, petalWidth: 0.1, species: 'Setosa' },
  { id: 39, sepalLength: 4.4, sepalWidth: 3.0, petalLength: 1.3, petalWidth: 0.2, species: 'Setosa' },
  { id: 40, sepalLength: 5.1, sepalWidth: 3.4, petalLength: 1.5, petalWidth: 0.2, species: 'Setosa' },
  { id: 41, sepalLength: 5.0, sepalWidth: 3.5, petalLength: 1.3, petalWidth: 0.3, species: 'Setosa' },
  { id: 42, sepalLength: 4.5, sepalWidth: 2.3, petalLength: 1.3, petalWidth: 0.3, species: 'Setosa' },
  { id: 43, sepalLength: 4.4, sepalWidth: 3.2, petalLength: 1.3, petalWidth: 0.2, species: 'Setosa' },
  { id: 44, sepalLength: 5.0, sepalWidth: 3.5, petalLength: 1.6, petalWidth: 0.6, species: 'Setosa' },
  { id: 45, sepalLength: 5.1, sepalWidth: 3.8, petalLength: 1.9, petalWidth: 0.4, species: 'Setosa' },
  { id: 46, sepalLength: 4.8, sepalWidth: 3.0, petalLength: 1.4, petalWidth: 0.3, species: 'Setosa' },
  { id: 47, sepalLength: 5.1, sepalWidth: 3.8, petalLength: 1.6, petalWidth: 0.2, species: 'Setosa' },
  { id: 48, sepalLength: 4.6, sepalWidth: 3.2, petalLength: 1.4, petalWidth: 0.2, species: 'Setosa' },
  { id: 49, sepalLength: 5.3, sepalWidth: 3.7, petalLength: 1.5, petalWidth: 0.2, species: 'Setosa' },
  { id: 50, sepalLength: 5.0, sepalWidth: 3.3, petalLength: 1.4, petalWidth: 0.2, species: 'Setosa' },

  // Iris-versicolor (51-100)
  { id: 51, sepalLength: 7.0, sepalWidth: 3.2, petalLength: 4.7, petalWidth: 1.4, species: 'Versicolor' },
  { id: 52, sepalLength: 6.4, sepalWidth: 3.2, petalLength: 4.5, petalWidth: 1.5, species: 'Versicolor' },
  { id: 53, sepalLength: 6.9, sepalWidth: 3.1, petalLength: 4.9, petalWidth: 1.5, species: 'Versicolor' },
  { id: 54, sepalLength: 5.5, sepalWidth: 2.3, petalLength: 4.0, petalWidth: 1.3, species: 'Versicolor' },
  { id: 55, sepalLength: 6.5, sepalWidth: 2.8, petalLength: 4.6, petalWidth: 1.5, species: 'Versicolor' },
  { id: 56, sepalLength: 5.7, sepalWidth: 2.8, petalLength: 4.5, petalWidth: 1.3, species: 'Versicolor' },
  { id: 57, sepalLength: 6.3, sepalWidth: 3.3, petalLength: 4.7, petalWidth: 1.6, species: 'Versicolor' },
  { id: 58, sepalLength: 4.9, sepalWidth: 2.4, petalLength: 3.3, petalWidth: 1.0, species: 'Versicolor' },
  { id: 59, sepalLength: 6.6, sepalWidth: 2.9, petalLength: 4.6, petalWidth: 1.3, species: 'Versicolor' },
  { id: 60, sepalLength: 5.2, sepalWidth: 2.7, petalLength: 3.9, petalWidth: 1.4, species: 'Versicolor' },
  { id: 61, sepalLength: 5.0, sepalWidth: 2.0, petalLength: 3.5, petalWidth: 1.0, species: 'Versicolor' },
  { id: 62, sepalLength: 5.9, sepalWidth: 3.0, petalLength: 4.2, petalWidth: 1.5, species: 'Versicolor' },
  { id: 63, sepalLength: 6.0, sepalWidth: 2.2, petalLength: 4.0, petalWidth: 1.0, species: 'Versicolor' },
  { id: 64, sepalLength: 6.1, sepalWidth: 2.9, petalLength: 4.7, petalWidth: 1.4, species: 'Versicolor' },
  { id: 65, sepalLength: 5.6, sepalWidth: 2.9, petalLength: 3.6, petalWidth: 1.3, species: 'Versicolor' },
  { id: 66, sepalLength: 6.7, sepalWidth: 3.1, petalLength: 4.4, petalWidth: 1.4, species: 'Versicolor' },
  { id: 67, sepalLength: 5.6, sepalWidth: 3.0, petalLength: 4.5, petalWidth: 1.5, species: 'Versicolor' },
  { id: 68, sepalLength: 5.8, sepalWidth: 2.7, petalLength: 4.1, petalWidth: 1.0, species: 'Versicolor' },
  { id: 69, sepalLength: 6.2, sepalWidth: 2.2, petalLength: 4.5, petalWidth: 1.5, species: 'Versicolor' },
  { id: 70, sepalLength: 5.6, sepalWidth: 2.5, petalLength: 3.9, petalWidth: 1.1, species: 'Versicolor' },
  { id: 71, sepalLength: 5.9, sepalWidth: 3.2, petalLength: 4.8, petalWidth: 1.8, species: 'Versicolor' },
  { id: 72, sepalLength: 6.1, sepalWidth: 2.8, petalLength: 4.0, petalWidth: 1.3, species: 'Versicolor' },
  { id: 73, sepalLength: 6.3, sepalWidth: 2.5, petalLength: 4.9, petalWidth: 1.5, species: 'Versicolor' },
  { id: 74, sepalLength: 6.1, sepalWidth: 2.8, petalLength: 4.7, petalWidth: 1.2, species: 'Versicolor' },
  { id: 75, sepalLength: 6.4, sepalWidth: 2.9, petalLength: 4.3, petalWidth: 1.3, species: 'Versicolor' },
  { id: 76, sepalLength: 6.6, sepalWidth: 3.0, petalLength: 4.4, petalWidth: 1.4, species: 'Versicolor' },
  { id: 77, sepalLength: 6.8, sepalWidth: 2.8, petalLength: 4.8, petalWidth: 1.4, species: 'Versicolor' },
  { id: 78, sepalLength: 6.7, sepalWidth: 3.0, petalLength: 5.0, petalWidth: 1.7, species: 'Versicolor' },
  { id: 79, sepalLength: 6.0, sepalWidth: 2.9, petalLength: 4.5, petalWidth: 1.5, species: 'Versicolor' },
  { id: 80, sepalLength: 5.7, sepalWidth: 2.6, petalLength: 3.5, petalWidth: 1.0, species: 'Versicolor' },
  { id: 81, sepalLength: 5.5, sepalWidth: 2.4, petalLength: 3.8, petalWidth: 1.1, species: 'Versicolor' },
  { id: 82, sepalLength: 5.5, sepalWidth: 2.4, petalLength: 3.7, petalWidth: 1.0, species: 'Versicolor' },
  { id: 83, sepalLength: 5.8, sepalWidth: 2.7, petalLength: 3.9, petalWidth: 1.2, species: 'Versicolor' },
  { id: 84, sepalLength: 6.0, sepalWidth: 2.7, petalLength: 5.1, petalWidth: 1.6, species: 'Versicolor' },
  { id: 85, sepalLength: 5.4, sepalWidth: 3.0, petalLength: 4.5, petalWidth: 1.5, species: 'Versicolor' },
  { id: 86, sepalLength: 6.0, sepalWidth: 3.4, petalLength: 4.5, petalWidth: 1.6, species: 'Versicolor' },
  { id: 87, sepalLength: 6.7, sepalWidth: 3.1, petalLength: 4.7, petalWidth: 1.5, species: 'Versicolor' },
  { id: 88, sepalLength: 6.3, sepalWidth: 2.3, petalLength: 4.4, petalWidth: 1.3, species: 'Versicolor' },
  { id: 89, sepalLength: 5.6, sepalWidth: 3.0, petalLength: 4.1, petalWidth: 1.3, species: 'Versicolor' },
  { id: 90, sepalLength: 5.5, sepalWidth: 2.5, petalLength: 4.0, petalWidth: 1.3, species: 'Versicolor' },
  { id: 91, sepalLength: 5.5, sepalWidth: 2.6, petalLength: 4.4, petalWidth: 1.2, species: 'Versicolor' },
  { id: 92, sepalLength: 6.1, sepalWidth: 3.0, petalLength: 4.6, petalWidth: 1.4, species: 'Versicolor' },
  { id: 93, sepalLength: 5.8, sepalWidth: 2.6, petalLength: 4.0, petalWidth: 1.2, species: 'Versicolor' },
  { id: 94, sepalLength: 5.0, sepalWidth: 2.3, petalLength: 3.3, petalWidth: 1.0, species: 'Versicolor' },
  { id: 95, sepalLength: 5.6, sepalWidth: 2.7, petalLength: 4.2, petalWidth: 1.3, species: 'Versicolor' },
  { id: 96, sepalLength: 5.7, sepalWidth: 3.0, petalLength: 4.2, petalWidth: 1.2, species: 'Versicolor' },
  { id: 97, sepalLength: 5.7, sepalWidth: 2.9, petalLength: 4.2, petalWidth: 1.3, species: 'Versicolor' },
  { id: 98, sepalLength: 6.2, sepalWidth: 2.9, petalLength: 4.3, petalWidth: 1.3, species: 'Versicolor' },
  { id: 99, sepalLength: 5.1, sepalWidth: 2.5, petalLength: 3.0, petalWidth: 1.1, species: 'Versicolor' },
  { id: 100, sepalLength: 5.7, sepalWidth: 2.8, petalLength: 4.1, petalWidth: 1.3, species: 'Versicolor' },

  // Iris-virginica (101-150)
  { id: 101, sepalLength: 6.3, sepalWidth: 3.3, petalLength: 6.0, petalWidth: 2.5, species: 'Virginica' },
  { id: 102, sepalLength: 5.8, sepalWidth: 2.7, petalLength: 5.1, petalWidth: 1.9, species: 'Virginica' },
  { id: 103, sepalLength: 7.1, sepalWidth: 3.0, petalLength: 5.9, petalWidth: 2.1, species: 'Virginica' },
  { id: 104, sepalLength: 6.3, sepalWidth: 2.9, petalLength: 5.6, petalWidth: 1.8, species: 'Virginica' },
  { id: 105, sepalLength: 6.5, sepalWidth: 3.0, petalLength: 5.8, petalWidth: 2.2, species: 'Virginica' },
  { id: 106, sepalLength: 7.6, sepalWidth: 3.0, petalLength: 6.6, petalWidth: 2.1, species: 'Virginica' },
  { id: 107, sepalLength: 4.9, sepalWidth: 2.5, petalLength: 4.5, petalWidth: 1.7, species: 'Virginica' },
  { id: 108, sepalLength: 7.3, sepalWidth: 2.9, petalLength: 6.3, petalWidth: 1.8, species: 'Virginica' },
  { id: 109, sepalLength: 6.7, sepalWidth: 2.5, petalLength: 5.8, petalWidth: 1.8, species: 'Virginica' },
  { id: 110, sepalLength: 7.2, sepalWidth: 3.6, petalLength: 6.1, petalWidth: 2.5, species: 'Virginica' },
  { id: 111, sepalLength: 6.5, sepalWidth: 3.2, petalLength: 5.1, petalWidth: 2.0, species: 'Virginica' },
  { id: 112, sepalLength: 6.4, sepalWidth: 2.7, petalLength: 5.3, petalWidth: 1.9, species: 'Virginica' },
  { id: 113, sepalLength: 6.8, sepalWidth: 3.0, petalLength: 5.5, petalWidth: 2.1, species: 'Virginica' },
  { id: 114, sepalLength: 5.7, sepalWidth: 2.5, petalLength: 5.0, petalWidth: 2.0, species: 'Virginica' },
  { id: 115, sepalLength: 5.8, sepalWidth: 2.8, petalLength: 5.1, petalWidth: 2.4, species: 'Virginica' },
  { id: 116, sepalLength: 6.4, sepalWidth: 3.2, petalLength: 5.3, petalWidth: 2.3, species: 'Virginica' },
  { id: 117, sepalLength: 6.5, sepalWidth: 3.0, petalLength: 5.5, petalWidth: 1.8, species: 'Virginica' },
  { id: 118, sepalLength: 7.7, sepalWidth: 3.8, petalLength: 6.7, petalWidth: 2.2, species: 'Virginica' },
  { id: 119, sepalLength: 7.7, sepalWidth: 2.6, petalLength: 6.9, petalWidth: 2.3, species: 'Virginica' },
  { id: 120, sepalLength: 6.0, sepalWidth: 2.2, petalLength: 5.0, petalWidth: 1.5, species: 'Virginica' },
  { id: 121, sepalLength: 6.9, sepalWidth: 3.2, petalLength: 5.7, petalWidth: 2.3, species: 'Virginica' },
  { id: 122, sepalLength: 5.6, sepalWidth: 2.8, petalLength: 4.9, petalWidth: 2.0, species: 'Virginica' },
  { id: 123, sepalLength: 7.7, sepalWidth: 2.8, petalLength: 6.7, petalWidth: 2.0, species: 'Virginica' },
  { id: 124, sepalLength: 6.3, sepalWidth: 2.7, petalLength: 4.9, petalWidth: 1.8, species: 'Virginica' },
  { id: 125, sepalLength: 6.7, sepalWidth: 3.3, petalLength: 5.7, petalWidth: 2.1, species: 'Virginica' },
  { id: 126, sepalLength: 7.2, sepalWidth: 3.2, petalLength: 6.0, petalWidth: 1.8, species: 'Virginica' },
  { id: 127, sepalLength: 6.2, sepalWidth: 2.8, petalLength: 4.8, petalWidth: 1.8, species: 'Virginica' },
  { id: 128, sepalLength: 6.1, sepalWidth: 3.0, petalLength: 4.9, petalWidth: 1.8, species: 'Virginica' },
  { id: 129, sepalLength: 6.4, sepalWidth: 2.8, petalLength: 5.6, petalWidth: 2.1, species: 'Virginica' },
  { id: 130, sepalLength: 7.2, sepalWidth: 3.0, petalLength: 5.8, petalWidth: 1.6, species: 'Virginica' },
  { id: 131, sepalLength: 7.4, sepalWidth: 2.8, petalLength: 6.1, petalWidth: 1.9, species: 'Virginica' },
  { id: 132, sepalLength: 7.9, sepalWidth: 3.8, petalLength: 6.4, petalWidth: 2.0, species: 'Virginica' },
  { id: 133, sepalLength: 6.4, sepalWidth: 2.8, petalLength: 5.6, petalWidth: 2.2, species: 'Virginica' },
  { id: 134, sepalLength: 6.3, sepalWidth: 2.8, petalLength: 5.1, petalWidth: 1.5, species: 'Virginica' },
  { id: 135, sepalLength: 6.1, sepalWidth: 2.6, petalLength: 5.6, petalWidth: 1.4, species: 'Virginica' },
  { id: 136, sepalLength: 7.7, sepalWidth: 3.0, petalLength: 6.1, petalWidth: 2.3, species: 'Virginica' },
  { id: 137, sepalLength: 6.3, sepalWidth: 3.4, petalLength: 5.6, petalWidth: 2.4, species: 'Virginica' },
  { id: 138, sepalLength: 6.4, sepalWidth: 3.1, petalLength: 5.5, petalWidth: 1.8, species: 'Virginica' },
  { id: 139, sepalLength: 6.0, sepalWidth: 3.0, petalLength: 4.8, petalWidth: 1.8, species: 'Virginica' },
  { id: 140, sepalLength: 6.9, sepalWidth: 3.1, petalLength: 5.4, petalWidth: 2.1, species: 'Virginica' },
  { id: 141, sepalLength: 6.7, sepalWidth: 3.1, petalLength: 5.6, petalWidth: 2.4, species: 'Virginica' },
  { id: 142, sepalLength: 6.9, sepalWidth: 3.1, petalLength: 5.1, petalWidth: 2.3, species: 'Virginica' },
  { id: 143, sepalLength: 5.8, sepalWidth: 2.7, petalLength: 5.1, petalWidth: 1.9, species: 'Virginica' },
  { id: 144, sepalLength: 6.8, sepalWidth: 3.2, petalLength: 5.9, petalWidth: 2.3, species: 'Virginica' },
  { id: 145, sepalLength: 6.7, sepalWidth: 3.3, petalLength: 5.7, petalWidth: 2.5, species: 'Virginica' },
  { id: 146, sepalLength: 6.7, sepalWidth: 3.0, petalLength: 5.2, petalWidth: 2.3, species: 'Virginica' },
  { id: 147, sepalLength: 6.3, sepalWidth: 2.5, petalLength: 5.0, petalWidth: 1.9, species: 'Virginica' },
  { id: 148, sepalLength: 6.5, sepalWidth: 3.0, petalLength: 5.2, petalWidth: 2.0, species: 'Virginica' },
  { id: 149, sepalLength: 6.2, sepalWidth: 3.4, petalLength: 5.4, petalWidth: 2.3, species: 'Virginica' },
  { id: 150, sepalLength: 5.9, sepalWidth: 3.0, petalLength: 5.1, petalWidth: 1.8, species: 'Virginica' }
];

export interface FeatureStats {
  min: number;
  max: number;
  mean: number;
  std: number;
  median: number;
}

export interface SpeciesProfile {
  name: SpeciesType;
  fullName: string;
  scientificName: string;
  commonName: string;
  color: string;
  bgLight: string;
  borderColor: string;
  dotColor: string;
  textColor: string;
  count: number;
  sepalLength: FeatureStats;
  sepalWidth: FeatureStats;
  petalLength: FeatureStats;
  petalWidth: FeatureStats;
  distinguishingFeatures: string[];
  description: string;
}

function calculateStats(values: number[]): FeatureStats {
  const sorted = [...values].sort((a, b) => a - b);
  const min = sorted[0];
  const max = sorted[sorted.length - 1];
  const sum = sorted.reduce((acc, v) => acc + v, 0);
  const mean = Number((sum / sorted.length).toFixed(2));
  const variance = sorted.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / sorted.length;
  const std = Number(Math.sqrt(variance).toFixed(2));
  const mid = Math.floor(sorted.length / 2);
  const median = sorted.length % 2 === 0 ? Number(((sorted[mid - 1] + sorted[mid]) / 2).toFixed(2)) : sorted[mid];
  return { min, max, mean, std, median };
}

// Global dataset stats
export const GLOBAL_FEATURE_STATS: Record<'sepalLength' | 'sepalWidth' | 'petalLength' | 'petalWidth', FeatureStats> = {
  sepalLength: calculateStats(IRIS_DATASET.map(d => d.sepalLength)),
  sepalWidth: calculateStats(IRIS_DATASET.map(d => d.sepalWidth)),
  petalLength: calculateStats(IRIS_DATASET.map(d => d.petalLength)),
  petalWidth: calculateStats(IRIS_DATASET.map(d => d.petalWidth))
};

export const SPECIES_PROFILES: Record<SpeciesType, SpeciesProfile> = {
  Setosa: {
    name: 'Setosa',
    fullName: 'Iris setosa',
    scientificName: 'Iris setosa Pall. ex Link',
    commonName: 'Bristle-pointed Iris',
    color: '#0D9488', // Teal/Emerald
    bgLight: 'bg-emerald-50/70',
    borderColor: 'border-emerald-200',
    dotColor: 'bg-emerald-500',
    textColor: 'text-emerald-800',
    count: 50,
    sepalLength: calculateStats(IRIS_DATASET.filter(d => d.species === 'Setosa').map(d => d.sepalLength)),
    sepalWidth: calculateStats(IRIS_DATASET.filter(d => d.species === 'Setosa').map(d => d.sepalWidth)),
    petalLength: calculateStats(IRIS_DATASET.filter(d => d.species === 'Setosa').map(d => d.petalLength)),
    petalWidth: calculateStats(IRIS_DATASET.filter(d => d.species === 'Setosa').map(d => d.petalWidth)),
    distinguishingFeatures: [
      'Very short and narrow petals (1.0 - 1.9 cm)',
      'Petal width is consistently under 0.6 cm',
      'Wide sepals relative to length (avg 3.43 cm width)',
      '100% linearly separable from the other two species'
    ],
    description: 'Native to Alaska, Siberia, and Northern Japan. Characterized by diminutive petals and wide sepals. In feature space, it forms a completely isolated, dense cluster easily identified by petal length < 2.4 cm.'
  },
  Versicolor: {
    name: 'Versicolor',
    fullName: 'Iris versicolor',
    scientificName: 'Iris versicolor L.',
    commonName: 'Blue Flag / Harlequin Blueflag',
    color: '#3B82F6', // Blue/Indigo
    bgLight: 'bg-blue-50/70',
    borderColor: 'border-blue-200',
    dotColor: 'bg-blue-500',
    textColor: 'text-blue-800',
    count: 50,
    sepalLength: calculateStats(IRIS_DATASET.filter(d => d.species === 'Versicolor').map(d => d.sepalLength)),
    sepalWidth: calculateStats(IRIS_DATASET.filter(d => d.species === 'Versicolor').map(d => d.sepalWidth)),
    petalLength: calculateStats(IRIS_DATASET.filter(d => d.species === 'Versicolor').map(d => d.petalLength)),
    petalWidth: calculateStats(IRIS_DATASET.filter(d => d.species === 'Versicolor').map(d => d.petalWidth)),
    distinguishingFeatures: [
      'Intermediate petal length (3.0 - 5.1 cm, avg 4.26 cm)',
      'Petal width generally ranges between 1.0 - 1.8 cm',
      'Narrower sepals compared to Setosa (avg 2.77 cm)',
      'Partially overlaps with Virginica at the upper boundary'
    ],
    description: 'Native to eastern North America. Morphologically intermediate between Setosa and Virginica. Distinguishable from Setosa by much longer petals, and from Virginica by narrower petal width (< 1.8 cm).'
  },
  Virginica: {
    name: 'Virginica',
    fullName: 'Iris virginica',
    scientificName: 'Iris virginica L.',
    commonName: 'Virginia Iris / Great Blue Flag',
    color: '#8B5CF6', // Purple/Violet
    bgLight: 'bg-purple-50/70',
    borderColor: 'border-purple-200',
    dotColor: 'bg-purple-500',
    textColor: 'text-purple-800',
    count: 50,
    sepalLength: calculateStats(IRIS_DATASET.filter(d => d.species === 'Virginica').map(d => d.sepalLength)),
    sepalWidth: calculateStats(IRIS_DATASET.filter(d => d.species === 'Virginica').map(d => d.sepalWidth)),
    petalLength: calculateStats(IRIS_DATASET.filter(d => d.species === 'Virginica').map(d => d.petalLength)),
    petalWidth: calculateStats(IRIS_DATASET.filter(d => d.species === 'Virginica').map(d => d.petalWidth)),
    distinguishingFeatures: [
      'Largest overall petals (4.5 - 6.9 cm, avg 5.55 cm)',
      'Distinctively thick petals (width 1.4 - 2.5 cm, avg 2.03 cm)',
      'Longest sepals among all 3 species (avg 6.59 cm)',
      'High correlation between petal length and width'
    ],
    description: 'Native to the southeastern United States. The largest of the three species in floral dimensions. Best distinguished by petal width exceeding 1.8 cm and petal length typically greater than 5.0 cm.'
  }
};

export const FEATURE_INFO = [
  {
    key: 'sepalLength' as const,
    label: 'Sepal Length',
    unit: 'cm',
    min: 4.0,
    max: 8.5,
    step: 0.1,
    typicalRange: '4.3 – 7.9 cm',
    botanicalRole: 'The outer protective modified leaf that encloses the flower bud.'
  },
  {
    key: 'sepalWidth' as const,
    label: 'Sepal Width',
    unit: 'cm',
    min: 1.8,
    max: 4.8,
    step: 0.1,
    typicalRange: '2.0 – 4.4 cm',
    botanicalRole: 'The lateral spread of the sepal; inversely correlated with petal length.'
  },
  {
    key: 'petalLength' as const,
    label: 'Petal Length',
    unit: 'cm',
    min: 0.8,
    max: 7.5,
    step: 0.1,
    typicalRange: '1.0 – 6.9 cm',
    botanicalRole: 'The upright inner floral leaf (standard). The single most discriminating feature.'
  },
  {
    key: 'petalWidth' as const,
    label: 'Petal Width',
    unit: 'cm',
    min: 0.1,
    max: 3.0,
    step: 0.1,
    typicalRange: '0.1 – 2.5 cm',
    botanicalRole: 'Width of the petal standard; separates Versicolor (< 1.8 cm) from Virginica (≥ 1.8 cm).'
  }
];

// Presets for quick user testing
export const PRESETS = [
  {
    label: 'Typical Setosa',
    species: 'Setosa' as SpeciesType,
    values: { sepalLength: 5.0, sepalWidth: 3.4, petalLength: 1.5, petalWidth: 0.2 },
    note: 'Characteristic small petal dimensions (1.5cm × 0.2cm)'
  },
  {
    label: 'Typical Versicolor',
    species: 'Versicolor' as SpeciesType,
    values: { sepalLength: 5.9, sepalWidth: 2.8, petalLength: 4.3, petalWidth: 1.3 },
    note: 'Mid-range petal length & width'
  },
  {
    label: 'Typical Virginica',
    species: 'Virginica' as SpeciesType,
    values: { sepalLength: 6.5, sepalWidth: 3.0, petalLength: 5.5, petalWidth: 2.0 },
    note: 'Large petal length (>5.0cm) and thick petal width (2.0cm)'
  },
  {
    label: 'Boundary Case',
    species: 'Virginica' as SpeciesType,
    values: { sepalLength: 6.0, sepalWidth: 2.7, petalLength: 5.1, petalWidth: 1.6 },
    note: 'Near the Versicolor / Virginica boundary threshold'
  }
];
