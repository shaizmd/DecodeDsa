import { SortingAlgorithms } from "../../enums/SortingAlgorithms"
import type Algorithm from "../../types/algorithms"
import Step from "../../types/steps"

export class BubbleSort implements Algorithm<SortingAlgorithms> {
  name = "Bubble Sort"
  description = "A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order."
  timeComplexity = "O(n²)"
  spaceComplexity = "O(1)"
  bestCase = "O(n) - Already sorted"
  worstCase = "O(n²) - Reverse sorted"
  algorithm = SortingAlgorithms.BubbleSort

  generateSteps(array: number[]): Step[] {
    const steps: Step[] = []
    const arr = [...array]

    steps.push({
      array: [...arr],
      description: `Initial array: [${arr.join(", ")}]`,
      code: `// Initial array\nlet arr = [${arr.join(", ")}];`,
    })

    const n = arr.length

    for (let i = 0; i < n - 1; i++) {
      let swapped = false

      steps.push({
        array: [...arr],
        description: `Pass ${i + 1}: Starting bubble sort pass`,
        code: `// Pass ${i + 1}\nfor (let j = 0; j < ${n - i - 1}; j++) {`,
      })

      for (let j = 0; j < n - i - 1; j++) {
        steps.push({
          array: [...arr],
          description: `Comparing elements at positions ${j} and ${j + 1}: ${arr[j]} and ${arr[j + 1]}`,
          code: `if (arr[${j}] > arr[${j + 1}]) {\n  // ${arr[j]} > ${arr[j + 1]} is ${arr[j] > arr[j + 1]}\n}`,
          comparing: [j, j + 1],
        })

        if (arr[j] > arr[j + 1]) {
          ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
          swapped = true

          steps.push({
            array: [...arr],
            description: `Swapped ${arr[j]} and ${arr[j + 1]} because ${arr[j + 1]} < ${arr[j]}`,
            code: `// Swap elements\n[arr[${j}], arr[${j + 1}]] = [arr[${j + 1}], arr[${j}]];`,
            swapping: [j, j + 1],
          })
        }
      }

      if (!swapped) {
        steps.push({
          array: [...arr],
          description: `No swaps in this pass - array is sorted!`,
          code: `// No swaps occurred, array is sorted\nbreak;`,
        })
        break
      }
    }

    steps.push({
      array: [...arr],
      description: `Sorting complete! Final sorted array: [${arr.join(", ")}]`,
      code: `// Bubble sort completed\n// Final array: [${arr.join(", ")}]`,
      sorted: Array.from({ length: arr.length }, (_, i) => i),
    })

    return steps
  }
}
