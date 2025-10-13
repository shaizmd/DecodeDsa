import { SortingAlgorithms } from "../../enums/SortingAlgorithms"
import type Algorithm from "../../types/algorithms"
import Step from "../../types/steps"

export class RadixSort implements Algorithm<SortingAlgorithms> {
  name = "Radix Sort"
  description = "A non-comparison-based sorting algorithm that sorts numbers by processing individual digits. It uses counting sort as a subroutine to achieve linear time complexity for integer keys."
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
}
function countingSort(arr, exp) {
  const n = arr.length;
  const output = new Array(n);
  const count = new Array(10).fill(0);
  for (let i = 0; i < n; i++) {
    const digit = Math.floor(arr[i] / exp) % 10;
    count[digit]++;
  }
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }
  for (let i = n - 1; i >= 0; i--) {
    const digit = Math.floor(arr[i] / exp) % 10;
    output[count[digit] - 1] = arr[i];
    count[digit]--;
  }
  for (let i = 0; i < n; i++) {
    arr[i] = output[i];
  }
}`

  private getMax = (arr: number[]): number => {
    let max = arr[0]
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
        max = arr[i]
      }
    }
    return max
  }

  private countingSort = (arr: number[], exp: number, steps: Step[]): void => {
    const n = arr.length
    const output = new Array(n)
    const count = new Array(10).fill(0)

    steps.push({
      array: [...arr],
      description: `Processing digit at position ${exp} (ones, tens, hundreds, etc.)`,
      code: `// Counting sort for digit position ${exp}\nlet count = new Array(10).fill(0);`,
    })

    for (let i = 0; i < n; i++) {
      const digit = Math.floor(arr[i] / exp) % 10
      count[digit]++
    }

    steps.push({
      array: [...arr],
      description: `Count array for current digit: [${count.join(", ")}]`,
      code: `// Count occurrences of each digit\ncount = [${count.join(", ")}]`,
    })

    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1]
    }

    steps.push({
      array: [...arr],
      description: `Cumulative count array: [${count.join(", ")}]`,
      code: `// Build cumulative count array\ncount = [${count.join(", ")}]`,
    })

    for (let i = n - 1; i >= 0; i--) {
      const digit = Math.floor(arr[i] / exp) % 10
      output[count[digit] - 1] = arr[i]
      count[digit]--

      steps.push({
        array: [...output.map(v => v ?? 0)],
        description: `Placing ${arr[i]} at position based on digit ${digit}`,
        code: `output[${count[digit]}] = ${arr[i]}; // digit: ${digit}`,
      })
    }

    for (let i = 0; i < n; i++) {
      arr[i] = output[i]
    }

    steps.push({
      array: [...arr],
      description: `Array after sorting by digit position ${exp}: [${arr.join(", ")}]`,
      code: `// Copy output back to arr\narr = [${arr.join(", ")}]`,
    })
  }

  generateSteps(array: number[]): Step[] {
    const steps: Step[] = []
    const arr = [...array]
    const max = this.getMax(arr)

      steps.push({
        array: [...arr],
        description: `Starting Radix Sort. Maximum value: ${max}`,
        code: `// Find maximum number to know number of digits\nlet max = ${max};`,
      })

      for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        this.countingSort(arr, exp, steps)
      }

      steps.push({
        array: [...arr],
        description: `Radix sort complete! Final sorted array: [${arr.join(", ")}]`,
        code: `// Radix sort completed\n// Final array: [${arr.join(", ")}]`,
        sorted: Array.from({ length: arr.length }, (_, i) => i),
      })

      return steps
  }
}
