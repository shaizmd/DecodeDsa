/**
 * Main entry point for sorting algorithms
 * Uses Factory Pattern for algorithm selection and execution
 * 
 * Individual algorithm implementations are located in ./sortingAlgorithms/
 */

import { SortingAlgorithmFactory } from "./sortingAlgorithms/factory"
import { SortingAlgorithms } from "../enums/SortingAlgorithms"
import type Algorithm from "../types/algorithms"
import Step from "../types/steps"

/**
 * Generate sorting steps for a given algorithm
 * @param algorithm - Name of the sorting algorithm
 * @param array - Array to sort
 * @returns Array of steps showing the sorting process
 * @throws Error if algorithm is not found
 */
export const generateSteps = (algorithm: SortingAlgorithms, array: number[]): Step[] => {
  try {
    const sortingAlgorithm = SortingAlgorithmFactory.getAlgorithm(algorithm)
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

export const getAvailableAlgorithms = (): Algorithm<SortingAlgorithms>[] => {
  return SortingAlgorithmFactory.getAvailableAlgorithms()
}