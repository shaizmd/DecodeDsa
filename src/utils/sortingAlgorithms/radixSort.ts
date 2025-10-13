import { SortingAlgorithms } from "../../enums/SortingAlgorithms"
import type Algorithm from "../../types/algorithms"
import Step from "../../types/steps"

export class RadixSort implements Algorithm<SortingAlgorithms> {
  name = "Radix Sort"
  description =
    "A non-comparison-based sorting algorithm that sorts numbers by processing individual digits using counting sort as a subroutine."
  timeComplexity = "O(nk)"
  spaceComplexity = "O(n + k)"
  bestCase = "O(nk)"
  worstCase = "O(nk)"
  algorithm = SortingAlgorithms.RadixSort

  code = `function radixSort(arr) {
  const max = Math.max(...arr);
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    countingSort(arr, exp);
  }
  return arr;
}`

  private getMax = (arr: number[]): number => Math.max(...arr)

  private countingSort = (arr: number[], exp: number, steps: Step[]): void => {
    const n = arr.length
    const output = new Array(n)
    const count = new Array(10).fill(0)

    // Start of counting sort for a specific digit
    steps.push({
      array: [...arr],
      description: `Sorting by digit at position ${exp}`,
      code: `// Counting sort for digit position ${exp}`,
    })

    // Count occurrences of digits
    for (let i = 0; i < n; i++) {
      const digit = Math.floor(arr[i] / exp) % 10
      count[digit]++
      steps.push({
        array: [...arr],
        comparing: [i],
        description: `Counting digit ${digit} for element ${arr[i]}`,
        code: `// count[${digit}]++ for ${arr[i]}`,
      })
    }

    // Update count to contain actual positions
    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1]
    }
    steps.push({
      array: [...arr],
      description: `Cumulative count array after update: [${count.join(", ")}]`,
      code: `// Build cumulative count array\ncount = [${count.join(", ")}]`,
    })

    // Build output array (traverse backwards for stability)
    for (let i = n - 1; i >= 0; i--) {
      const digit = Math.floor(arr[i] / exp) % 10
      output[count[digit] - 1] = arr[i]
      count[digit]--
      steps.push({
        array: [...output.map(v => v ?? 0)],
        swapping: [i],
        description: `Placing ${arr[i]} into position for digit ${digit}`,
        code: `output[${count[digit]}] = ${arr[i]};`,
      })
    }

    // Copy back to arr
    for (let i = 0; i < n; i++) {
      arr[i] = output[i]
    }

    steps.push({
      array: [...arr],
      description: `Array after sorting by digit ${exp}: [${arr.join(", ")}]`,
      code: `// Copy output back to arr\narr = [${arr.join(", ")}]`,
    })
  }

  generateSteps(array: number[]): Step[] {
    const steps: Step[] = []
    const arr = [...array]
    const max = this.getMax(arr)

    steps.push({
      array: [...arr],
      description: `Starting Radix Sort. Maximum number: ${max}`,
      code: `let max = ${max}; // Find maximum to determine digit count`,
    })

    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
      steps.push({
        array: [...arr],
        description: `Starting pass for digit position ${exp}`,
        code: `// Sorting by digit position ${exp}`,
      })

      this.countingSort(arr, exp, steps)

      steps.push({
        array: [...arr],
        description: `After completing pass for digit ${exp}: [${arr.join(", ")}]`,
        code: `// Completed pass for digit ${exp}`,
      })
    }

    steps.push({
      array: [...arr],
      description: `Radix Sort complete! Final sorted array: [${arr.join(", ")}]`,
      code: `// Final sorted array\n[${arr.join(", ")}]`,
      sorted: Array.from({ length: arr.length }, (_, i) => i),
    })

    return steps
  }
}
