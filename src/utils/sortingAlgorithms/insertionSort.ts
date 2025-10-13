import { Step, Algorithm } from "./index"

export class InsertionSort implements Algorithm {
  name = "Insertion Sort"

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
