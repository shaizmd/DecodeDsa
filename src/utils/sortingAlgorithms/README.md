# Sorting Algorithms Module

This directory contains the refactored sorting algorithm implementations using the **Factory Pattern** for better maintainability and extensibility.

## Architecture

### Factory Pattern Implementation

The module implements the Factory Pattern to separate algorithm selection logic from implementation:

```
sortingAlgorithms/
├── factory.ts            # Factory class for algorithm instantiation
├── index.ts              # Common Module exports
├── bubbleSort.ts         # Bubble Sort implementation
├── selectionSort.ts      # Selection Sort implementation
├── insertionSort.ts      # Insertion Sort implementation
├── quickSort.ts          # Quick Sort implementation
├── mergeSort.ts          # Merge Sort implementation
└── heapSort.ts           # Heap Sort implementation
```

## Usage

### Using the Factory Pattern (Recommended)

```typescript
import { SortingAlgorithmFactory } from './sortingAlgorithms'

// Get an algorithm instance
const algorithm = SortingAlgorithmFactory.getAlgorithm(SortingAlgorithms.BubbleSort)

// Generate sorting steps
const steps = algorithm.generateSteps([64, 34, 25, 12, 22, 11, 90])

// Get all available algorithms
const available = SortingAlgorithmFactory.getAvailableAlgorithms()
```

### Using the Helper Function

```typescript
import { generateSteps } from './sortingAlgorithms'

// Automatically selects and executes the correct algorithm
const steps = generateSteps('Quick Sort', [64, 34, 25, 12, 22, 11, 90])
```

### Direct Class Usage

```typescript
import { BubbleSort, QuickSort } from './sortingAlgorithms'

const bubbleSort = new BubbleSort()
const steps = bubbleSort.generateSteps([5, 2, 8, 1, 9])
```

## Adding a New Algorithm

1. **Create a new file** in the `sortingAlgorithms/` folder (e.g., `timSort.ts`)

2. **Implement the `SortingAlgorithm` interface**:

```typescript
import { Step, SortingAlgorithm } from "./types"

export class TimSort implements SortingAlgorithm {
  name = "Tim Sort"

  generateSteps(array: number[]): Step[] {
    const steps: Step[] = []
    const arr = [...array]

    steps.push({
      array: [...arr],
      description: `Initial array: [${arr.join(", ")}]`,
      code: `// Initial array\nlet arr = [${arr.join(", ")}];`,
    })

    // Your algorithm implementation here
    
    return steps
  }
}
```

3. **Register in the factory** (`factory.ts`):

```typescript
import { TimSort } from "./timSort"

export enum SortingAlgorithms {
  // ... existing algorithms
  TimSort, // New entry
}

private static algorithms: Map<string, SortingAlgorithm> = new Map([
  // ... existing algorithms
  [SortingAlgorithms.TimSort, new TimSort()],
])
```

4. **Export from index** (`index.ts`):

```typescript
export { TimSort } from "./timSort"
```

## Benefits of This Architecture

### 1. **Separation of Concerns**
Each algorithm is in its own file, making it easier to:
- Understand individual implementations
- Test algorithms in isolation
- Modify without affecting others

### 2. **Factory Pattern**
- Centralized algorithm selection
- Easy to add new algorithms
- Type-safe algorithm retrieval
- Runtime algorithm selection

### 3. **Extensibility**
- New algorithms can be added without modifying existing code
- Custom algorithms can be registered dynamically
- Follows Open/Closed Principle

### 4. **Maintainability**
- Smaller, focused files
- Clear interfaces and contracts
- Better code organization
- Easier debugging

## Interface: `SortingAlgorithm`

All sorting algorithms must implement this interface:

```typescript
export interface SortingAlgorithm {
  name: string
  generateSteps(array: number[]): Step[]
}
```

## Type: `Step`

Each step in the visualization contains:

```typescript
export interface Step {
  array: number[]           // Current state of the array
  description: string       // Human-readable description
  code: string             // Code snippet for this step
  comparing?: number[]     // Indices being compared (optional)
  swapping?: number[]      // Indices being swapped (optional)
  sorted?: number[]        // Indices that are sorted (optional)
  pivot?: number           // Pivot index for Quick Sort (optional)
}
```
