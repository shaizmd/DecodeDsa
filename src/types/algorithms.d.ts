import { SortingAlgorithms } from "../enums/SortingAlgorithms"
import { SearchingAlgorithms } from "../enums/SearchingAlgorithms"
import { SortStep, SearchStep } from "./steps"

export default interface Algorithm<T = SortingAlgorithms | SearchingAlgorithms> {
  name: string
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
  bestCase: string;
  worstCase: string;
  algorithm: T;
  code: string;
}

export interface SortingAlgorithm extends Algorithm<SortingAlgorithms> {
  generateSteps(array: number[]): SortStep[]
}

export interface SearchingAlgorithm extends Algorithm<SearchingAlgorithms> {
  generateSteps(array: number[], target: number): SearchStep[]
}