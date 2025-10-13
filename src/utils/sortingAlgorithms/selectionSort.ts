import { SortingAlgorithms } from "../../enums/SortingAlgorithms"
import { SortingAlgorithm } from "../../types/algorithms"
import { SortStep } from "../../types/steps"

export class SelectionSort implements SortingAlgorithm {
  name = "Selection Sort"
  description = "A simple sorting algorithm that divides the input into a sorted and unsorted region, and repeatedly selects the smallest element from the unsorted region."
  timeComplexity = "O(n²)"
  spaceComplexity = "O(1)"
  bestCase = "O(n²) - Not improved by sorted data"
  worstCase = "O(n²) - Not improved by sorted data"
  algorithm = SortingAlgorithms.SelectionSort

  code = `function selectionSort(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    
    // Find minimum element in remaining array
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    
    // Swap minimum element with first element
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  
  return arr;
}`

  generateSteps(array: number[]): SortStep[] {
    const steps: SortStep[] = []
    const arr = [...array]

    steps.push({
      array: [...arr],
      description: `Initial array: [${arr.join(", ")}]`,
      code: `// Initial array\nlet arr = [${arr.join(", ")}];`,
    })

    const n = arr.length

    for (let i = 0; i < n - 1; i++) {
      let minIdx = i

      steps.push({
        array: [...arr],
        description: `Pass ${i + 1}: Finding minimum element in unsorted portion`,
        code: `// Pass ${i + 1}\nlet minIdx = ${i};\nlet minValue = arr[${i}]; // ${arr[i]}`,
      })

      for (let j = i + 1; j < n; j++) {
        steps.push({
          array: [...arr],
          description: `Comparing arr[${minIdx}] = ${arr[minIdx]} with arr[${j}] = ${arr[j]}`,
          code: `if (arr[${j}] < arr[${minIdx}]) {\n  // ${arr[j]} < ${arr[minIdx]} is ${arr[j] < arr[minIdx]}\n}`,
          comparing: [minIdx, j],
        })

        if (arr[j] < arr[minIdx]) {
          minIdx = j
          steps.push({
            array: [...arr],
            description: `New minimum found: ${arr[j]} at position ${j}`,
            code: `minIdx = ${j}; // New minimum: ${arr[j]}`,
          })
        }
      }

      if (minIdx !== i) {
        steps.push({
          array: [...arr],
          description: `Swapping arr[${i}] = ${arr[i]} with arr[${minIdx}] = ${arr[minIdx]}`,
          code: `// Swap minimum with first unsorted element\n[arr[${i}], arr[${minIdx}]] = [arr[${minIdx}], arr[${i}]];`,
          swapping: [i, minIdx],
        })
        ;[arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]
      }

      steps.push({
        array: [...arr],
        description: `Position ${i} is now sorted with value ${arr[i]}`,
        code: `// Position ${i} is now in correct place`,
        sorted: Array.from({ length: i + 1 }, (_, idx) => idx),
      })
    }

    steps.push({
      array: [...arr],
      description: `Selection sort complete! Final array: [${arr.join(", ")}]`,
      code: `// Selection sort completed\n// Final array: [${arr.join(", ")}]`,
      sorted: Array.from({ length: arr.length }, (_, i) => i),
    })

    return steps
  }
}
