import { SortingAlgorithms } from "../../enums/SortingAlgorithms"
import type Algorithm from "../../types/algorithms"
import Step from "../../types/steps"

export class MergeSort implements Algorithm<SortingAlgorithms> {
  name = "Merge Sort"
  description = "A divide-and-conquer algorithm that recursively breaks down the problem into smaller subproblems until they become simple enough to solve directly."
  timeComplexity = "O(n log n)"
  spaceComplexity = "O(n)"
  bestCase = "O(n log n)"
  worstCase = "O(n log n)"
  algorithm = SortingAlgorithms.MergeSort

  code = `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
}

function merge(left, right) {
  let result = [];
  let i = 0, j = 0;
  
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }
  
  // Add remaining elements
  while (i < left.length) {
    result.push(left[i]);
    i++;
  }
  
  while (j < right.length) {
    result.push(right[j]);
    j++;
  }
  
  return result;
}`

  generateSteps(array: number[]): Step[] {
    const steps: Step[] = []
    const arr = [...array]

    steps.push({
      array: [...arr],
      description: `Initial array: [${arr.join(", ")}]`,
      code: `// Initial array\nlet arr = [${arr.join(", ")}];`,
    })

    this.mergeSortHelper(arr, 0, arr.length - 1, steps)

    steps.push({
      array: [...arr],
      description: `Merge sort complete! Final array: [${arr.join(", ")}]`,
      code: `// Merge sort completed\n// Final array: [${arr.join(", ")}]`,
      sorted: Array.from({ length: arr.length }, (_, i) => i),
    })

    return steps
  }

  private mergeSortHelper(arr: number[], left: number, right: number, steps: Step[], depth = 0): void {
    if (left >= right) return

    const mid = Math.floor((left + right) / 2)

    steps.push({
      array: [...arr],
      description: `Divide: Splitting array from index ${left} to ${right} at middle ${mid}`,
      code: `// Divide phase (depth ${depth})\nlet mid = Math.floor((${left} + ${right}) / 2); // ${mid}`,
      pivot: mid,
    })

    this.mergeSortHelper(arr, left, mid, steps, depth + 1)
    this.mergeSortHelper(arr, mid + 1, right, steps, depth + 1)

    // Merge phase
    const leftArr = arr.slice(left, mid + 1)
    const rightArr = arr.slice(mid + 1, right + 1)

    steps.push({
      array: [...arr],
      description: `Merge: Combining [${leftArr.join(", ")}] and [${rightArr.join(", ")}]`,
      code: `// Merge phase\nleft = [${leftArr.join(", ")}]\nright = [${rightArr.join(", ")}]`,
      comparing: Array.from({ length: leftArr.length }, (_, i) => left + i).concat(Array.from({ length: rightArr.length }, (_, i) => mid + 1 + i)),
    })

    let i = 0,
      j = 0,
      k = left

    while (i < leftArr.length && j < rightArr.length) {
      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i]
        steps.push({
          array: [...arr],
          description: `${leftArr[i]} ≤ ${rightArr[j]}, so place ${leftArr[i]} at position ${k}`,
          code: `arr[${k}] = ${leftArr[i]}; // ${leftArr[i]} ≤ ${rightArr[j]}`,
          sorted: [k + i],
        })
        i++
      } else {
        arr[k] = rightArr[j]
        steps.push({
          array: [...arr],
          description: `${rightArr[j]} < ${leftArr[i]}, so place ${rightArr[j]} at position ${k}`,
          code: `arr[${k}] = ${rightArr[j]}; // ${rightArr[j]} < ${leftArr[i]}`,
          sorted: [k + i],
        })
        j++
      }
      k++
    }

    while (i < leftArr.length) {
      arr[k] = leftArr[i]
      steps.push({
        array: [...arr],
        description: `Copy remaining element ${leftArr[i]} to position ${k}`,
        code: `arr[${k}] = ${leftArr[i]}; // Copy remaining`,
        sorted: Array.from({ length: k + 1 }, (_, idx) => idx).filter(idx => idx >= left),
      })
      i++
      k++
    }

    while (j < rightArr.length) {
      arr[k] = rightArr[j]
      steps.push({
        array: [...arr],
        description: `Copy remaining element ${rightArr[j]} to position ${k}`,
        code: `arr[${k}] = ${rightArr[j]}; // Copy remaining`,
        sorted: Array.from({ length: k + 1 }, (_, idx) => idx).filter(idx => idx >= mid + 1),
      })
      j++
      k++
    }
  }
}
