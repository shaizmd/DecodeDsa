import { SearchingAlgorithms } from "../../enums/SearchingAlgorithms"
import type { SearchingAlgorithm } from "../../types/algorithms"
import { SearchStep } from "../../types/steps"

export class BinarySearch implements SearchingAlgorithm {
  name = "Binary Search"
  description = "An efficient search algorithm that works on sorted arrays by repeatedly dividing the search interval in half."
  timeComplexity = "O(log n)"
  spaceComplexity = "O(1)"
  bestCase = "O(1) - Target is middle element"
  worstCase = "O(log n) - Maximum divisions needed"
  algorithm = SearchingAlgorithms.BinarySearch

  code = `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    // Calculate middle index
    let mid = Math.floor((left + right) / 2);
    
    // Check if target is at middle
    if (arr[mid] === target) {
      return mid; // Found target
    }
    
    // If target is greater, ignore left half
    if (arr[mid] < target) {
      left = mid + 1;
    }
    // If target is smaller, ignore right half
    else {
      right = mid - 1;
    }
  }
  
  return -1; // Target not found
}

// Usage example:
const sortedArray = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
const target = 7;
const result = binarySearch(sortedArray, target);

if (result !== -1) {
  console.log(\`Element found at index: \${result}\`);
} else {
  console.log("Element not found");
}`

  generateSteps(array: number[], target: number): SearchStep[] {
    const steps: SearchStep[] = []
    const arr = [...array]

    // For binary search, sort the array first
    const originalArr = [...arr]
    arr.sort((a, b) => a - b)

    if (JSON.stringify(originalArr) !== JSON.stringify(arr)) {
      steps.push({
        array: [...arr],
        description: `Array sorted for Binary Search: [${arr.join(", ")}]`,
        code: `// Binary Search requires sorted array\nlet arr = [${originalArr.join(", ")}].sort();\n// Sorted: [${arr.join(", ")}]`,
      })
    } else {
      steps.push({
        array: [...arr],
        description: `Array is already sorted: [${arr.join(", ")}]`,
        code: `// Array is already sorted for Binary Search\nlet arr = [${arr.join(", ")}];`,
      })
    }

    let left = 0
    let right = arr.length - 1

    steps.push({
      array: [...arr],
      description: `Initialize Binary Search: left = ${left}, right = ${right}`,
      code: `function binarySearch(arr, target) {\n  let left = 0;\n  let right = arr.length - 1;`,
      left,
      right,
    })

    while (left <= right) {
      const mid = Math.floor((left + right) / 2)

      steps.push({
        array: [...arr],
        description: `Calculate middle: mid = Math.floor((${left} + ${right}) / 2) = ${mid}`,
        code: `  while (left <= right) {\n    let mid = Math.floor((${left} + ${right}) / 2); // ${mid}`,
        left,
        right,
        mid,
      })

      steps.push({
        array: [...arr],
        description: `Compare arr[${mid}] = ${arr[mid]} with target ${target}`,
        code: `    if (arr[${mid}] === target) {\n      // ${arr[mid]} === ${target} is ${arr[mid] === target}\n    }`,
        left,
        right,
        mid,
        comparing: [mid],
      })

      if (arr[mid] === target) {
        steps.push({
          array: [...arr],
          description: `🎉 Target ${target} found at index ${mid}!`,
          code: `      return ${mid}; // Found target at index ${mid}\n    }\n  }\n}`,
          foundIndex: mid,
          found: true,
          searchComplete: true,
          mid,
        })
        return steps
      } else if (arr[mid] < target) {
        steps.push({
          array: [...arr],
          description: `${arr[mid]} < ${target}, search right half`,
          code: `    } else if (arr[${mid}] < target) {\n      left = ${mid + 1}; // Search right half`,
          left,
          right,
          mid,
        })
        left = mid + 1
      } else {
        steps.push({
          array: [...arr],
          description: `${arr[mid]} > ${target}, search left half`,
          code: `    } else {\n      right = ${mid - 1}; // Search left half`,
          left,
          right,
          mid,
        })
        right = mid - 1
      }

      steps.push({
        array: [...arr],
        description: `Update search range: left = ${left}, right = ${right}`,
        code: `    // New range: left = ${left}, right = ${right}`,
        left,
        right,
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
