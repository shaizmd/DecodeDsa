import { SortingAlgorithms } from "../../enums/SortingAlgorithms"
import { SortingAlgorithm } from "../../types/algorithms"
import { SortStep } from "../../types/steps"

export class QuickSort implements SortingAlgorithm {
  name = "Quick Sort"
  description = "A divide-and-conquer algorithm that picks an element as pivot and partitions the array around the pivot."
  timeComplexity = "O(n log n)"
  spaceComplexity = "O(log n)"
  bestCase = "O(n log n)"
  worstCase = "O(n²) - Poor pivot choices"
  algorithm = SortingAlgorithms.QuickSort

  code = `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pi = partition(arr, low, high);
    
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`

  generateSteps(array: number[]): SortStep[] {
    const steps: SortStep[] = []
    const arr = [...array]

    steps.push({
      array: [...arr],
      description: `Initial array: [${arr.join(", ")}]`,
      code: `// Initial array\nlet arr = [${arr.join(", ")}];`,
    })

    this.quickSortHelper(arr, 0, arr.length - 1, steps)

    steps.push({
      array: [...arr],
      description: `Quick sort complete! Final array: [${arr.join(", ")}]`,
      code: `// Quick sort completed\n// Final array: [${arr.join(", ")}]`,
      sorted: Array.from({ length: arr.length }, (_, i) => i),
    })

    return steps
  }

  private quickSortHelper(arr: number[], low: number, high: number, steps: SortStep[], depth = 0): void {
    if (low < high) {
      steps.push({
        array: [...arr],
        description: `Partitioning array from index ${low} to ${high}`,
        code: `// Quick sort (depth ${depth})\n// Partition from ${low} to ${high}`,
      })

      const pi = this.partition(arr, low, high, steps)

      steps.push({
        array: [...arr],
        description: `Pivot ${arr[pi]} is now in correct position ${pi}`,
        code: `// Pivot ${arr[pi]} placed at position ${pi}`,
        pivot: pi,
      })

      this.quickSortHelper(arr, low, pi - 1, steps, depth + 1)
      this.quickSortHelper(arr, pi + 1, high, steps, depth + 1)
    }
  }

  private partition(arr: number[], low: number, high: number, steps: SortStep[]): number {
    const pivot = arr[high]
    let i = low - 1

    steps.push({
      array: [...arr],
      description: `Choosing pivot: ${pivot} (last element)`,
      code: `let pivot = arr[${high}]; // ${pivot}\nlet i = ${low - 1};`,
      pivot: high,
    })

    for (let j = low; j < high; j++) {
      steps.push({
        array: [...arr],
        description: `Comparing ${arr[j]} with pivot ${pivot}`,
        code: `if (arr[${j}] <= pivot) {\n  // ${arr[j]} <= ${pivot} is ${arr[j] <= pivot}\n}`,
        comparing: [j, high],
      })

      if (arr[j] <= pivot) {
        i++
        if (i !== j) {
          steps.push({
            array: [...arr],
            description: `${arr[j]} ≤ ${pivot}, so swap arr[${i}] and arr[${j}]`,
            code: `i++; // i = ${i}\n[arr[${i}], arr[${j}]] = [arr[${j}], arr[${i}]];`,
            swapping: [i, j],
          })
          ;[arr[i], arr[j]] = [arr[j], arr[i]]
        } else {
          steps.push({
            array: [...arr],
            description: `${arr[j]} ≤ ${pivot}, no swap needed`,
            code: `i++; // i = ${i}`,
          })
        }
      }
    }

    steps.push({
      array: [...arr],
      description: `Place pivot ${pivot} in correct position by swapping with arr[${i + 1}]`,
      code: `[arr[${i + 1}], arr[${high}]] = [arr[${high}], arr[${i + 1}]];`,
      swapping: [i + 1, high],
    })
    ;[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]
    return i + 1
  }
}
