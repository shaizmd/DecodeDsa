import type Algorithm from "../../types/algorithms"
import { SortingAlgorithms } from "../../enums/SortingAlgorithms"
import { BubbleSort } from "./bubbleSort"
import { SelectionSort } from "./selectionSort"
import { InsertionSort } from "./insertionSort"
import { QuickSort } from "./quickSort"
import { MergeSort } from "./mergeSort"
import { HeapSort } from "./heapSort"

/**
 * Factory class for creating sorting algorithm instances
 * Implements the Factory Pattern for better extensibility
 */
export class SortingAlgorithmFactory {
  private static algorithms: Map<SortingAlgorithms, Algorithm<SortingAlgorithms>> = new Map([
    [SortingAlgorithms.BubbleSort, new BubbleSort()],
    [SortingAlgorithms.SelectionSort, new SelectionSort()],
    [SortingAlgorithms.InsertionSort, new InsertionSort()],
    [SortingAlgorithms.QuickSort, new QuickSort()],
    [SortingAlgorithms.MergeSort, new MergeSort()],
    [SortingAlgorithms.HeapSort, new HeapSort()],
  ])

  /**
   * Get a sorting algorithm instance by name
   * @param algorithmName - The name of the sorting algorithm
   * @returns The sorting algorithm instance
   * @throws Error if algorithm is not found
   */
  static getAlgorithm(algorithmName: SortingAlgorithms): Algorithm {
    const algorithm = this.algorithms.get(algorithmName)
    if (!algorithm) {
      throw new Error(`Sorting algorithm "${algorithmName}" not found`)
    }
    return algorithm
  }

  /**
   * Get all available sorting algorithm names
   * @returns Array of algorithm names
   */
  static getAvailableAlgorithms(): Algorithm<SortingAlgorithms>[] {
    return Array.from(this.algorithms.values())
  }
}
