import { Step, Algorithm } from "./index"

export class MergeSort implements Algorithm {
  name = "Merge Sort"

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
        })
        i++
      } else {
        arr[k] = rightArr[j]
        steps.push({
          array: [...arr],
          description: `${rightArr[j]} < ${leftArr[i]}, so place ${rightArr[j]} at position ${k}`,
          code: `arr[${k}] = ${rightArr[j]}; // ${rightArr[j]} < ${leftArr[i]}`,
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
      })
      j++
      k++
    }
  }
}
