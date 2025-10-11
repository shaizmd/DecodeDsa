// Shared sorting algorithm implementations for visualization

export interface Step {
  array: number[]
  description: string
  code: string
  comparing?: number[]
  swapping?: number[]
  sorted?: number[]
  pivot?: number
}

export const bubbleSort = (arr: number[], steps: Step[]): Step[] => {
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

export const selectionSort = (arr: number[], steps: Step[]): Step[] => {
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

export const insertionSort = (arr: number[], steps: Step[]): Step[] => {
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

export const quickSort = (arr: number[], steps: Step[]): Step[] => {
  const quickSortHelper = (arr: number[], low: number, high: number, depth = 0): void => {
    if (low < high) {
      steps.push({
        array: [...arr],
        description: `Partitioning array from index ${low} to ${high}`,
        code: `// Quick sort (depth ${depth})\n// Partition from ${low} to ${high}`,
      })

      const pi = partition(arr, low, high)

      steps.push({
        array: [...arr],
        description: `Pivot ${arr[pi]} is now in correct position ${pi}`,
        code: `// Pivot ${arr[pi]} placed at position ${pi}`,
        pivot: pi,
      })

      quickSortHelper(arr, low, pi - 1, depth + 1)
      quickSortHelper(arr, pi + 1, high, depth + 1)
    }
  }

  const partition = (arr: number[], low: number, high: number): number => {
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

  quickSortHelper(arr, 0, arr.length - 1)

  steps.push({
    array: [...arr],
    description: `Quick sort complete! Final array: [${arr.join(", ")}]`,
    code: `// Quick sort completed\n// Final array: [${arr.join(", ")}]`,
    sorted: Array.from({ length: arr.length }, (_, i) => i),
  })

  return steps
}

export const mergeSort = (arr: number[], steps: Step[]): Step[] => {
  const mergeSortHelper = (arr: number[], left: number, right: number, depth = 0): void => {
    if (left >= right) return

    const mid = Math.floor((left + right) / 2)

    steps.push({
      array: [...arr],
      description: `Divide: Splitting array from index ${left} to ${right} at middle ${mid}`,
      code: `// Divide phase (depth ${depth})\nlet mid = Math.floor((${left} + ${right}) / 2); // ${mid}`,
    })

    mergeSortHelper(arr, left, mid, depth + 1)
    mergeSortHelper(arr, mid + 1, right, depth + 1)

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

  mergeSortHelper(arr, 0, arr.length - 1)

  steps.push({
    array: [...arr],
    description: `Merge sort complete! Final array: [${arr.join(", ")}]`,
    code: `// Merge sort completed\n// Final array: [${arr.join(", ")}]`,
    sorted: Array.from({ length: arr.length }, (_, i) => i),
  })

  return steps
}

export const heapSort = (arr: number[], steps: Step[]): Step[] => {
  const n = arr.length

  // Build max heap
  steps.push({
    array: [...arr],
    description: `Building max heap from array`,
    code: `// Build max heap\n// Start from last non-leaf node`,
  })

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i, steps)
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

    heapify(arr, i, 0, steps)
  }

  steps.push({
    array: [...arr],
    description: `Heap sort complete! Final array: [${arr.join(", ")}]`,
    code: `// Heap sort completed\n// Final array: [${arr.join(", ")}]`,
    sorted: Array.from({ length: arr.length }, (_, i) => i),
  })

  return steps
}

const heapify = (arr: number[], n: number, i: number, steps: Step[]): void => {
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
    heapify(arr, n, largest, steps)
  }
}

export const generateSteps = (algorithm: string, array: number[]): Step[] => {
  const steps: Step[] = []
  const arr = [...array]

  steps.push({
    array: [...arr],
    description: `Initial array: [${arr.join(", ")}]`,
    code: `// Initial array\nlet arr = [${arr.join(", ")}];`,
  })

  switch (algorithm) {
    case "Bubble Sort":
      return bubbleSort(arr, steps)
    case "Selection Sort":
      return selectionSort(arr, steps)
    case "Insertion Sort":
      return insertionSort(arr, steps)
    case "Merge Sort":
      return mergeSort(arr, steps)
    case "Quick Sort":
      return quickSort(arr, steps)
    case "Heap Sort":
      return heapSort(arr, steps)
    default:
      return steps
  }
}