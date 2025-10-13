import { SortingAlgorithms } from "../../enums/SortingAlgorithms"
import type Algorithm from "../../types/algorithms"
import Step from "../../types/steps"

export class InsertionSort implements Algorithm<SortingAlgorithms> {
  name = "Insertion Sort"
  description = "A simple sorting algorithm that builds the final sorted array one item at a time by comparing each new item with the already sorted portion."
  timeComplexity = "O(n²)"
  spaceComplexity = "O(1)"
  bestCase = "O(n) - Already sorted"
  worstCase = "O(n²) - Reverse sorted"
  algorithm = SortingAlgorithms.InsertionSort

  generateSteps(array: number[]): Step[] {
    const steps: Step[] = []
    const arr = [...array]

    steps.push({
      array: [...arr],
      description: `Initial array: [${arr.join(", ")}]`,
      code: `// Initial array\nlet arr = [${arr.join(", ")}];`,
    })

    for (let i = 1; i < arr.length; i++) {
      const key = arr[i]
      let j = i - 1

      steps.push({
        array: [...arr],
        description: `Pass ${i}: Inserting ${key} into sorted portion`,
        code: `// Pass ${i}\nlet key = arr[${i}]; // ${key}\nlet j = ${i - 1};`,
        comparing: [i],
      })

      while (j >= 0 && arr[j] > key) {
        steps.push({
          array: [...arr],
          description: `Comparing ${arr[j]} with ${key}. Since ${arr[j]} > ${key}, shift ${arr[j]} right`,
          code: `while (j >= 0 && arr[j] > key) {\n  arr[j + 1] = arr[j]; // Shift ${arr[j]} right\n  j--;\n}`,
          comparing: [j, j + 1],
        })

        arr[j + 1] = arr[j]
        j--

        steps.push({
          array: [...arr],
          description: `Shifted element right, continue checking position ${j >= 0 ? j : "none"}`,
          code: `// Element shifted, j = ${j}`,
        })
      }

      arr[j + 1] = key

      steps.push({
        array: [...arr],
        description: `Inserted ${key} at position ${j + 1}`,
        code: `arr[${j + 1}] = key; // Insert ${key}`,
        sorted: Array.from({ length: i + 1 }, (_, idx) => idx),
      })
    }

    steps.push({
      array: [...arr],
      description: `Insertion sort complete! Final array: [${arr.join(", ")}]`,
      code: `// Insertion sort completed\n// Final array: [${arr.join(", ")}]`,
      sorted: Array.from({ length: arr.length }, (_, i) => i),
    })

    return steps
  }
}
