import { Step, Algorithm } from "./index"

export class HeapSort implements Algorithm {
  name = "Heap Sort"

  generateSteps(array: number[]): Step[] {
    const steps: Step[] = []
    const arr = [...array]

    steps.push({
      array: [...arr],
      description: `Initial array: [${arr.join(", ")}]`,
      code: `// Initial array\nlet arr = [${arr.join(", ")}];`,
    })

    const n = arr.length

    // Build max heap
    steps.push({
      array: [...arr],
      description: `Building max heap from array`,
      code: `// Build max heap\n// Start from last non-leaf node`,
    })

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      this.heapify(arr, n, i, steps)
    }

    steps.push({
      array: [...arr],
      description: `Max heap built: [${arr.join(", ")}]`,
      code: `// Max heap construction complete`,
    })

    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
      steps.push({
        array: [...arr],
        description: `Move current root ${arr[0]} to end (position ${i})`,
        code: `// Move root to end\n[arr[0], arr[${i}]] = [arr[${i}], arr[0]];`,
        swapping: [0, i],
      })
      ;[arr[0], arr[i]] = [arr[i], arr[0]]

      steps.push({
        array: [...arr],
        description: `Heapify remaining ${i} elements`,
        code: `// Heapify reduced heap of size ${i}`,
        sorted: Array.from({ length: n - i }, (_, idx) => n - 1 - idx),
      })

      this.heapify(arr, i, 0, steps)
    }

    steps.push({
      array: [...arr],
      description: `Heap sort complete! Final array: [${arr.join(", ")}]`,
      code: `// Heap sort completed\n// Final array: [${arr.join(", ")}]`,
      sorted: Array.from({ length: arr.length }, (_, i) => i),
    })

    return steps
  }

  private heapify(arr: number[], n: number, i: number, steps: Step[]): void {
    let largest = i
    const left = 2 * i + 1
    const right = 2 * i + 2

    if (left < n && arr[left] > arr[largest]) {
      largest = left
    }

    if (right < n && arr[right] > arr[largest]) {
      largest = right
    }

    if (largest !== i) {
      steps.push({
        array: [...arr],
        description: `Swap ${arr[i]} with ${arr[largest]} to maintain heap property`,
        code: `// Heapify: swap parent with larger child\n[arr[${i}], arr[${largest}]] = [arr[${largest}], arr[${i}]];`,
        swapping: [i, largest],
      })
      const temp = arr[i]
      arr[i] = arr[largest]
      arr[largest] = temp
      this.heapify(arr, n, largest, steps)
    }
  }
}
