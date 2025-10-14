import { SearchingAlgorithms } from "../../enums/SearchingAlgorithms"
import type { SearchingAlgorithm } from "../../types/algorithms"
import { SearchStep } from "../../types/steps"

export class LinearSearch implements SearchingAlgorithm {
  name = "Linear Search"
  description = "A simple search algorithm that checks every element in the array sequentially until the target is found or the array ends."
  timeComplexity = "O(n)"
  spaceComplexity = "O(1)"
  bestCase = "O(1) - Target is first element"
  worstCase = "O(n) - Target is last element or not found"
  algorithm = SearchingAlgorithms.LinearSearch

  code = `function linearSearch(arr, target) {
  // Iterate through each element in the array
  for (let i = 0; i < arr.length; i++) {
    // Check if current element matches target
    if (arr[i] === target) {
      return i; // Return index if found
    }
  }
  
  return -1; // Return -1 if not found
}

// Usage example:
const array = [64, 34, 25, 12, 22, 11, 90];
const target = 22;
const result = linearSearch(array, target);

if (result !== -1) {
  console.log(\`Element found at index: \${result}\`);
} else {
  console.log("Element not found");
}`

  generateSteps(array: number[], target: number): SearchStep[] {
    const steps: SearchStep[] = []
    const arr = [...array]

    steps.push({
      array: [...arr],
      description: `Initial array: [${arr.join(", ")}], Target: ${target}`,
      code: `// Linear Search Setup\nlet arr = [${arr.join(", ")}];\nlet target = ${target};`,
    })

    steps.push({
      array: [...arr],
      description: `Starting Linear Search for target ${target}`,
      code: `function linearSearch(arr, target) {\n  for (let i = 0; i < arr.length; i++) {`,
    })

    for (let i = 0; i < arr.length; i++) {
      steps.push({
        array: [...arr],
        description: `Checking element at index ${i}: ${arr[i]}`,
        code: `    if (arr[${i}] === target) {\n      // ${arr[i]} === ${target} is ${arr[i] === target}\n    }`,
        currentIndex: i,
        comparing: [i],
      })

      if (arr[i] === target) {
        steps.push({
          array: [...arr],
          description: `🎉 Target ${target} found at index ${i}!`,
          code: `      return ${i}; // Found target at index ${i}\n  }\n}`,
          foundIndex: i,
          found: true,
          searchComplete: true,
        })
        return steps
      }

      steps.push({
        array: [...arr],
        description: `${arr[i]} ≠ ${target}, continue to next element`,
        code: `    // ${arr[i]} ≠ ${target}, continue searching`,
      })
    }

    steps.push({
      array: [...arr],
      description: `❌ Target ${target} not found in the array`,
      code: `  return -1; // Target not found\n}`,
      found: false,
      searchComplete: true,
    })

    return steps
  }
}
