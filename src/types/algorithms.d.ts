import { SortingAlgorithms } from "../utils/sortingAlgorithms"

export default interface Algorithm<T = SortingAlgorithms> {
  name: string
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
  bestCase: string;
  worstCase: string;
  algorithm: T;
  code: string;
  generateSteps(array: number[]): Step[]
}