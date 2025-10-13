/**
 * Main entry point for searching algorithms
 * Uses Factory Pattern for algorithm selection and execution
 * 
 * Individual algorithm implementations are located in ./searchingAlgorithms/
 */

import { SearchingAlgorithmFactory } from "./searchingAlgorithms/factory"
import { SearchingAlgorithms } from "../enums/SearchingAlgorithms"
import type { SearchingAlgorithm } from "../types/algorithms"
import { SearchStep } from "../types/steps"

/**
 * Generate searching steps for a given algorithm
 * @param algorithm - Name of the searching algorithm
 * @param array - Array to search in
 * @param target - Target value to find
 * @returns Array of steps showing the searching process
 * @throws Error if algorithm is not found
 */
export const generateSteps = (algorithm: SearchingAlgorithms, array: number[], target: number): SearchStep[] => {
  try {
    const searchingAlgorithm = SearchingAlgorithmFactory.getAlgorithm(algorithm)
    return searchingAlgorithm.generateSteps(array, target)
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

export const getAvailableAlgorithms = (): SearchingAlgorithm[] => {
  return SearchingAlgorithmFactory.getAvailableAlgorithms()
}
