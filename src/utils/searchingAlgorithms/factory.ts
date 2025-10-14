import type { SearchingAlgorithm } from "../../types/algorithms"
import { SearchingAlgorithms } from "../../enums/SearchingAlgorithms"
import { LinearSearch } from "./linearSearch"
import { BinarySearch } from "./binarySearch"

/**
 * Factory class for creating searching algorithm instances
 * Implements the Factory Pattern for better extensibility
 */
export class SearchingAlgorithmFactory {
  private static algorithms: Map<SearchingAlgorithms, SearchingAlgorithm> = new Map([
    [SearchingAlgorithms.LinearSearch, new LinearSearch()],
    [SearchingAlgorithms.BinarySearch, new BinarySearch()],
  ])

  /**
   * Get a searching algorithm instance by name
   * @param algorithmName - The name of the searching algorithm
   * @returns The searching algorithm instance
   * @throws Error if algorithm is not found
   */
  static getAlgorithm(algorithmName: SearchingAlgorithms): SearchingAlgorithm {
    const algorithm = this.algorithms.get(algorithmName)
    if (!algorithm) {
      throw new Error(`Searching algorithm "${algorithmName}" not found`)
    }
    return algorithm
  }

  /**
   * Get all available searching algorithm instances
   * @returns Array of algorithm instances
   */
  static getAvailableAlgorithms(): SearchingAlgorithm[] {
    return Array.from(this.algorithms.values())
  }
}
