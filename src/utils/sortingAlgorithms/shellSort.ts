import { SortingAlgorithm } from "../../types/algorithms";
import { SortStep } from "../../types/steps";
import { SortingAlgorithms } from "../../enums/SortingAlgorithms";

export class ShellSort implements SortingAlgorithm {
  name = "Shell Sort";
  description = "Shell Sort is an optimization of insertion sort that allows the exchange of items that are far apart. The idea is to arrange the list of elements so that, starting with the elements that are far apart, it progressively reduces the gap between elements to be compared.";
  timeComplexity = "O(n^1.3) on average";
  spaceComplexity = "O(1)";
  bestCase = "O(n log n)";
  worstCase = "O(n^2)";
  algorithm = SortingAlgorithms.ShellSort;
  code = `function shellSort(arr) {
  const n = arr.length;
  
  // Start with a big gap, then reduce the gap
  for (let gap = Math.floor(n/2); gap > 0; gap = Math.floor(gap/2)) {
    // Do a gapped insertion sort
    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j;
      
      // Shift earlier gap-sorted elements up
      for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
        arr[j] = arr[j - gap];
      }
      
      arr[j] = temp;
    }
  }
  return arr;
}`;
  
  generateSteps(arr: number[]): SortStep[] {
    const steps: SortStep[] = [];
    const n = arr.length;
    let array = [...arr];
    
    // Start with a big gap, then reduce the gap
    for (let gap = Math.floor(n/2); gap > 0; gap = Math.floor(gap/2)) {
      steps.push({
        array: [...array],
        description: `Setting gap size to ${gap}`,
        code: `gap = ${gap}`,
        comparing: [],
      });

      // Do a gapped insertion sort
      for (let i = gap; i < n; i++) {
        // Add this element to gap sorting
        let temp = array[i];
        let j;
        
        steps.push({
          array: [...array],
          description: `Comparing elements with gap ${gap}, starting from index ${i}`,
          code: `temp = arr[${i}]`,
          comparing: [i],
        });
        
        // Shift earlier gap-sorted elements up until the correct location for a[i] is found
        for (j = i; j >= gap && array[j - gap] > temp; j -= gap) {
          array[j] = array[j - gap];
          steps.push({
            array: [...array],
            description: `Moving element at index ${j-gap} to index ${j}`,
            code: `arr[${j}] = arr[${j-gap}]`,
            comparing: [j, j - gap],
            swapping: [j, j - gap],
          });
        }
        
        // Put temp in its correct location
        array[j] = temp;
        if (j !== i) {
          steps.push({
            array: [...array],
            description: `Placing ${temp} at index ${j}`,
            code: `arr[${j}] = temp`,
            comparing: [i, j],
            swapping: [i, j],
          });
        }
      }
    }
    
    steps.push({
      array: [...array],
      description: "Array is sorted",
      code: "return arr",
      comparing: [],
      sorted: array.map((_, index) => index),
    });
    
    return steps;
  }
}
