/**
 * Main entry point for sorting algorithms
 * Uses Factory Pattern for algorithm selection and execution
 * 
 * Individual algorithm implementations are located in ./sortingAlgorithms/
 */

import { SortingAlgorithmFactory, SortingAlgorithms } from "./sortingAlgorithms/index"
import type { Step } from "./sortingAlgorithms/index"

// Re-export for backward compatibility
export type { Step }
export { SortingAlgorithms }


/**
 * Generate sorting steps for a given algorithm
 * @param algorithm - Name of the sorting algorithm
 * @param array - Array to sort
 * @returns Array of steps showing the sorting process
 * @throws Error if algorithm is not found
 */
export const generateSteps = (algorithm: string, array: number[]): Step[] => {
  try {
    // Convert algorithm name to enum key format. Kept for backward compatibility
    algorithm = algorithm.replace(/\s+/g, '')
    const algoEnum = SortingAlgorithms[algorithm as keyof typeof SortingAlgorithms] as SortingAlgorithms
    
    const sortingAlgorithm = SortingAlgorithmFactory.getAlgorithm(algoEnum)
    return sortingAlgorithm.generateSteps(array)
  } catch (error) {
    console.error(`Error generating steps for ${algorithm}:`, error)
    // Return initial state as fallback
    return [
      {
        array: [...array],
        description: `Algorithm "${algorithm}" not found`,
        code: `// Unknown algorithm: ${algorithm}`,
      },
    ]
  }
}