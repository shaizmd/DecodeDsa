"use client"

import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Code } from "lucide-react"
import { Button } from "../../components/ui/button"

interface ArrayElement {
  value: number
  isHighlighted: boolean
  isPointer1: boolean
  isPointer2: boolean
  isPointer3: boolean
}

interface Step {
  array: ArrayElement[]
  description: string
  code: string
}

function TwoPointerPage() {
  const [arrayInput, setArrayInput] = useState<string>("")
  const [target, setTarget] = useState<number>(0)
  const [steps, setSteps] = useState<Step[]>([])
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [isVisualizing, setIsVisualizing] = useState<boolean>(false)
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<"two-sum" | "three-sum" | "container-with-most-water">("two-sum")
  const [showFullCode, setShowFullCode] = useState<boolean>(false)

  const resetVisualization = () => {
    setSteps([])
    setCurrentStep(0)
    setIsVisualizing(false)
    setShowFullCode(false)
  }

  const generateTwoSumSteps = (array: number[]) => {
    const sortedArray = [...array].sort((a, b) => a - b)
    const newSteps: Step[] = []
    let left = 0
    let right = sortedArray.length - 1

    // Initial state
    newSteps.push({
      array: sortedArray.map(num => ({
        value: num,
        isHighlighted: false,
        isPointer1: false,
        isPointer2: false,
        isPointer3: false
      })),
      description: "Initial sorted array",
      code: `# Sort the array
array.sort()`
    })

    while (left < right) {
      const currentLeft = left
      const currentRight = right
      // Update pointers
      const currentArray = sortedArray.map((num, i) => ({
        value: num,
        isHighlighted: false,
        isPointer1: i === currentLeft,
        isPointer2: i === currentRight,
        isPointer3: false
      }))
      newSteps.push({
        array: currentArray,
        description: `Checking ${sortedArray[currentLeft]} + ${sortedArray[currentRight]} = ${sortedArray[currentLeft] + sortedArray[currentRight]}`,
        code: `# Check sum of elements at left and right pointers
sum = array[left] + array[right]
if sum == target:
  return [left, right]
elif sum < target:
  left += 1
else:
  right -= 1`
      })

      const sum = sortedArray[left] + sortedArray[right]
      if (sum === target) {
        // Found a pair
        const finalArray = currentArray.map((el, i) => ({
          ...el,
          isHighlighted: i === currentLeft || i === currentRight
        }))
        newSteps.push({
          array: finalArray,
          description: `Found pair: ${sortedArray[currentLeft]} + ${sortedArray[currentRight]} = ${target}`,
          code: `# Found the target sum
return [left, right]`
        })
        break
      } else if (sum < target) {
        left++
      } else {
        right--
      }
    }

    if (left >= right) {
      newSteps.push({
        array: sortedArray.map(num => ({
          value: num,
          isHighlighted: false,
          isPointer1: false,
          isPointer2: false,
          isPointer3: false
        })),
        description: "No pair found that sums to target",
        code: `# No solution found
return []`
      })
    }

    return newSteps
  }

  const generateThreeSumSteps = (array: number[]) => {
    const sortedArray = [...array].sort((a, b) => a - b)
    const newSteps: Step[] = []

    // Initial state
    newSteps.push({
      array: sortedArray.map(num => ({
        value: num,
        isHighlighted: false,
        isPointer1: false,
        isPointer2: false,
        isPointer3: false
      })),
      description: "Initial sorted array",
      code: `# Sort the array
array.sort()`
    })

    for (let i = 0; i < sortedArray.length - 2; i++) {
      let left = i + 1
      let right = sortedArray.length - 1

      while (left < right) {
        const currentI = i
        const currentLeft = left
        const currentRight = right
        // Update pointers
        const currentArray = sortedArray.map((num, idx) => ({
          value: num,
          isHighlighted: false,
          isPointer1: idx === currentI,
          isPointer2: idx === currentLeft,
          isPointer3: idx === currentRight
        }))
        newSteps.push({
          array: currentArray,
          description: `Checking ${sortedArray[currentI]} + ${sortedArray[currentLeft]} + ${sortedArray[currentRight]} = ${sortedArray[currentI] + sortedArray[currentLeft] + sortedArray[currentRight]}`,
          code: `# Check sum of three elements
sum = array[i] + array[left] + array[right]
if sum == target:
  return [i, left, right]
elif sum < target:
  left += 1
else:
  right -= 1`
        })

        const sum = sortedArray[i] + sortedArray[left] + sortedArray[right]
        if (sum === target) {
          // Found a triplet
          const finalArray = currentArray.map((el, idx) => ({
            ...el,
            isHighlighted: idx === currentI || idx === currentLeft || idx === currentRight
          }))
          newSteps.push({
            array: finalArray,
            description: `Found triplet: ${sortedArray[currentI]} + ${sortedArray[currentLeft]} + ${sortedArray[currentRight]} = ${target}`,
            code: `# Found the target sum
return [i, left, right]`
          })
          return newSteps
        } else if (sum < target) {
          left++
        } else {
          right--
        }
      }
    }

    newSteps.push({
      array: sortedArray.map(num => ({
        value: num,
        isHighlighted: false,
        isPointer1: false,
        isPointer2: false,
        isPointer3: false
      })),
      description: "No triplet found that sums to target",
      code: `# No solution found
return []`
    })

    return newSteps
  }

  const generateContainerWithMostWaterSteps = (heights: number[]) => {
    const newSteps: Step[] = []
    let left = 0
    let right = heights.length - 1
    let maxArea = 0

    // Initial state
    newSteps.push({
      array: heights.map(h => ({
        value: h,
        isHighlighted: false,
        isPointer1: false,
        isPointer2: false,
        isPointer3: false
      })),
      description: "Initial array of heights.",
      code: `left, right = 0, len(heights) - 1
max_area = 0`
    })

    while (left < right) {
      const currentLeft = left
      const currentRight = right

      const width = right - left
      const height = Math.min(heights[left], heights[right])
      const currentArea = width * height

      // Calculation step
      newSteps.push({
        array: heights.map((h, i) => ({
          value: h,
          isHighlighted: false,
          isPointer1: i === currentLeft,
          isPointer2: i === currentRight,
          isPointer3: false
        })),
        description: `Calculating area: width (${width}) * height (${height}) = ${currentArea}. Current max area: ${maxArea}.`,
        code: `width = right - left
height = min(heights[left], heights[right])
current_area = width * height`
      })

      if (currentArea > maxArea) {
        maxArea = currentArea
        // Max area updated step
        newSteps.push({
          array: heights.map((h, i) => ({
            value: h,
            isHighlighted: i === currentLeft || i === currentRight,
            isPointer1: i === currentLeft,
            isPointer2: i === currentRight,
            isPointer3: false
          })),
          description: `New maximum area found: ${maxArea}.`,
          code: "max_area = max(max_area, current_area)"
        })
      }

      // Pointer movement step
      if (heights[left] < heights[right]) {
        newSteps.push({
          array: heights.map((h, i) => ({
            value: h,
            isHighlighted: false,
            isPointer1: i === currentLeft,
            isPointer2: i === currentRight,
            isPointer3: false
          })),
          description: `Moving left pointer because height at left (${heights[currentLeft]}) is smaller than height at right (${heights[currentRight]}).`,
          code: `if heights[left] < heights[right]:
    left += 1`
        })
        left++
      } else {
        newSteps.push({
          array: heights.map((h, i) => ({
            value: h,
            isHighlighted: false,
            isPointer1: i === currentLeft,
            isPointer2: i === currentRight,
            isPointer3: false
          })),
          description: `Moving right pointer because height at right (${heights[currentRight]}) is not smaller than height at left (${heights[currentLeft]}).`,
          code: `else:
    right -= 1`
        })
        right--
      }
    }

    // Final state
    newSteps.push({
      array: heights.map(h => ({
        value: h,
        isHighlighted: false,
        isPointer1: false,
        isPointer2: false,
        isPointer3: false
      })),
      description: `Finished. The maximum area is ${maxArea}.`,
      code: "return max_area"
    })

    return newSteps
  }

  const handleVisualize = () => {
    try {
      const numbers = arrayInput.split(",").map(num => parseInt(num.trim()))
      if (numbers.some(isNaN)) {
        throw new Error("Invalid number in array")
      }
      resetVisualization()
      setIsVisualizing(true)

      let newSteps: Step[]
      if (selectedAlgorithm === "two-sum") {
        newSteps = generateTwoSumSteps(numbers)
      } else if (selectedAlgorithm === "three-sum") {
        newSteps = generateThreeSumSteps(numbers)
      } else {
        newSteps = generateContainerWithMostWaterSteps(numbers)
      }

      setSteps(newSteps)
      setIsVisualizing(false)
    } catch (err) {
      alert("Please enter valid numbers separated by commas")
    }
  }

  const getFullCode = () => {
    if (selectedAlgorithm === "two-sum") {
      return `def two_sum(array, target):
  # Sort the array
  array.sort()
  left, right = 0, len(array) - 1
  
  while left < right:
      sum = array[left] + array[right]
      if sum == target:
          return [left, right]
      elif sum < target:
          left += 1
      else:
          right -= 1
  
  return []  # No solution found`
    } else if (selectedAlgorithm === "three-sum") {
      return `def three_sum(array, target):
  # Sort the array
  array.sort()
  
  for i in range(len(array) - 2):
      left, right = i + 1, len(array) - 1
      
      while left < right:
          sum = array[i] + array[left] + array[right]
          if sum == target:
              return [i, left, right]
          elif sum < target:
              left += 1
          else:
              right -= 1
  
  return []  # No solution found`
    } else {
      return `def max_area(heights):
    left, right = 0, len(heights) - 1
    max_area = 0
    
    while left < right:
        width = right - left
        height = min(heights[left], heights[right])
        current_area = width * height
        max_area = max(max_area, current_area)
        
        if heights[left] < heights[right]:
            left += 1
        else:
            right -= 1
            
    return max_area`
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <header className="bg-white dark:bg-slate-800 shadow-sm border-b dark:border-slate-700">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link to="/array-algorithms" className="p-2 hover:bg-gray-100 dark:bg-slate-700 rounded-lg transition-colors">
                <ArrowLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              </Link>
              <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                <ArrowRight className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Two Pointer Techniques
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Algorithm Selection */}
        <div className="mb-8 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Select Algorithm</h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setSelectedAlgorithm("two-sum")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedAlgorithm === "two-sum"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200"
              }`}
            >
              Two Sum
            </button>
            <button
              onClick={() => setSelectedAlgorithm("three-sum")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedAlgorithm === "three-sum"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200"
              }`}
            >
              Three Sum
            </button>
            <button
              onClick={() => setSelectedAlgorithm("container-with-most-water")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedAlgorithm === "container-with-most-water"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200"
              }`}
            >
              Container With Most Water
            </button>
          </div>
        </div>

        {/* Array and Target Input */}
        <div className="mb-8 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Input</h2>
          <div className="flex flex-col gap-4">
            <div>
              <label htmlFor="array-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Array (comma-separated numbers)
              </label>
              <input
                id="array-input"
                type="text"
                value={arrayInput}
                onChange={(e) => setArrayInput(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 1, 8, 6, 2, 5, 4, 8, 3, 7"
              />
            </div>
            {(selectedAlgorithm === "two-sum" || selectedAlgorithm === "three-sum") && (
              <div>
                <label htmlFor="target-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Target Sum
                </label>
                <input
                  id="target-input"
                  type="number"
                  value={target}
                  onChange={(e) => setTarget(parseInt(e.target.value))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter target sum"
                />
              </div>
            )}
            <button
              onClick={handleVisualize}
              disabled={isVisualizing}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              Visualize
            </button>
          </div>
        </div>

        {steps.length > 0 && (
          <>
            {/* Step Navigation */}
            <div className="mb-8 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Step {currentStep + 1} of {steps.length}</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                    disabled={currentStep === 0}
                    className="p-2 rounded-lg bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600 disabled:opacity-50"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))}
                    disabled={currentStep === steps.length - 1}
                    className="p-2 rounded-lg bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600 disabled:opacity-50"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4 min-h-[40px]">{steps[currentStep].description}</p>
              <Button onClick={()=> setCurrentStep(0)} variant="secondary">
                Reset
              </Button>
            </div>

            {/* Array Visualization */}
            <div className="mb-8 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700 p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Array Visualization</h2>
              <div className="flex flex-wrap gap-4 justify-center">
                {steps[currentStep].array.map((element, index) => (
                  <div
                    key={index}
                    className={`w-16 h-16 flex items-center justify-center rounded-lg text-lg font-bold transition-all duration-300 ${
                      element.isHighlighted
                        ? "bg-green-500 text-white"
                        : element.isPointer1
                        ? "bg-blue-500 text-white"
                        : element.isPointer2
                        ? "bg-purple-500 text-white"
                        : element.isPointer3
                        ? "bg-orange-500 text-white"
                        : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {element.value}
                  </div>
                ))}
              </div>
            </div>

            {/* Code Display */}
            <div className="mb-8 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Code</h2>
                <button
                  onClick={() => setShowFullCode(!showFullCode)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600"
                >
                  <Code className="w-5 h-5" />
                  {showFullCode ? "Show Step Code" : "Show Full Code"}
                </button>
              </div>
              <pre className="bg-gray-50 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto">
                <code className="text-sm text-gray-800 dark:text-gray-300">
                  {showFullCode ? getFullCode() : steps[currentStep].code}
                </code>
              </pre>
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default TwoPointerPage