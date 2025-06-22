"use client"

import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, Grid, ChevronLeft, ChevronRight, Code } from "lucide-react"

interface ArrayElement {
  value: number
  isHighlighted: boolean
  isWindowStart: boolean
  isWindowEnd: boolean
}

interface Step {
  array: ArrayElement[]
  windowSum: number
  maxSum: number
  description: string
  code: string
}

function SlidingWindowPage() {
  const [arrayInput, setArrayInput] = useState<string>("")
  const [windowSize, setWindowSize] = useState<number>(3)
  const [steps, setSteps] = useState<Step[]>([])
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [isVisualizing, setIsVisualizing] = useState<boolean>(false)
  const [showFullCode, setShowFullCode] = useState<boolean>(false)

  const resetVisualization = () => {
    setSteps([])
    setCurrentStep(0)
    setIsVisualizing(false)
    setShowFullCode(false)
  }

  const generateSteps = (array: number[], k: number) => {
    const newSteps: Step[] = []
    let windowSum = 0
    let maxSum = -Infinity

    // Initial state
    newSteps.push({
      array: array.map(num => ({
        value: num,
        isHighlighted: false,
        isWindowStart: false,
        isWindowEnd: false
      })),
      windowSum: 0,
      maxSum: -Infinity,
      description: "Initialize window sum and max sum",
      code: `# Initialize variables
window_sum = 0
max_sum = float('-inf')`
    })

    // Calculate sum of first window
    for (let i = 0; i < k; i++) {
      windowSum += array[i]
    }
    maxSum = windowSum

    // Create step for first window
    newSteps.push({
      array: array.map((num, idx) => ({
        value: num,
        isHighlighted: idx < k,
        isWindowStart: idx === 0,
        isWindowEnd: idx === k - 1
      })),
      windowSum,
      maxSum,
      description: `Initial window sum: ${windowSum}`,
      code: `# Calculate sum of first window
for i in range(k):
    window_sum += array[i]
max_sum = window_sum`
    })

    // Slide window and calculate sums
    for (let i = k; i < array.length; i++) {
      windowSum = windowSum - array[i - k] + array[i]
      maxSum = Math.max(maxSum, windowSum)

      // Create step
      newSteps.push({
        array: array.map((num, idx) => ({
          value: num,
          isHighlighted: idx >= i - k + 1 && idx <= i,
          isWindowStart: idx === i - k + 1,
          isWindowEnd: idx === i
        })),
        windowSum,
        maxSum,
        description: `Sliding window: sum = ${windowSum}, max sum = ${maxSum}`,
        code: `# Slide window and update sum
window_sum = window_sum - array[i - k] + array[i]
max_sum = max(max_sum, window_sum)`
      })
    }

    // Final state
    newSteps.push({
      array: array.map((num, idx) => ({
        value: num,
        isHighlighted: false,
        isWindowStart: false,
        isWindowEnd: false
      })),
      windowSum,
      maxSum,
      description: `Maximum window sum: ${maxSum}`,
      code: `# Return maximum window sum
return max_sum`
    })

    return newSteps
  }

  const handleVisualize = () => {
    try {
      const numbers = arrayInput.split(',').map(num => parseInt(num.trim()))
      if (numbers.some(isNaN)) {
        throw new Error("Invalid number in array")
      }
      if (windowSize <= 0 || windowSize > numbers.length) {
        throw new Error("Invalid window size")
      }
      resetVisualization()
      setIsVisualizing(true)
      const newSteps = generateSteps(numbers, windowSize)
      setSteps(newSteps)
      setIsVisualizing(false)
    } catch (err) {
      alert(err instanceof Error ? err.message : "Please enter valid numbers separated by commas")
    }
  }

  const getFullCode = () => {
    return `def sliding_window_max_sum(array, k):
    # Initialize variables
    window_sum = 0
    max_sum = float('-inf')
    
    # Calculate sum of first window
    for i in range(k):
        window_sum += array[i]
    max_sum = window_sum
    
    # Slide window and calculate sums
    for i in range(k, len(array)):
        window_sum = window_sum - array[i - k] + array[i]
        max_sum = max(max_sum, window_sum)
    
    return max_sum`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link to="/array-algorithms" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </Link>
              <div className="p-2 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg">
                <Grid className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                Sliding Window
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Input Section */}
        <div className="mb-8 bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Input</h2>
          <div className="flex flex-col gap-4">
            <div>
              <label htmlFor="array-input" className="block text-sm font-medium text-gray-700 mb-2">
                Array (comma-separated numbers)
              </label>
              <input
                id="array-input"
                type="text"
                value={arrayInput}
                onChange={(e) => setArrayInput(e.target.value)}
                placeholder="e.g., 2, 1, 5, 1, 3, 2"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="window-size" className="block text-sm font-medium text-gray-700 mb-2">
                Window Size
              </label>
              <input
                id="window-size"
                type="number"
                value={windowSize}
                onChange={(e) => setWindowSize(parseInt(e.target.value))}
                min="1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={handleVisualize}
              disabled={isVisualizing}
              className="px-6 py-3 bg-gradient-to-r from-orange-600 to-yellow-600 text-white font-semibold rounded-lg hover:from-orange-700 hover:to-yellow-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isVisualizing ? "Visualizing..." : "Visualize"}
            </button>
          </div>
        </div>

        {/* Visualization Section */}
        {steps.length > 0 && (
          <div className="space-y-8">
            {/* Array Visualization */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Visualization</h2>
              <div className="flex flex-wrap gap-4 justify-center">
                {steps[currentStep].array.map((element, index) => (
                  <div
                    key={index}
                    className={`w-16 h-16 flex items-center justify-center rounded-lg text-lg font-semibold transition-all duration-200 ${
                      element.isWindowStart
                        ? "bg-orange-500 text-white"
                        : element.isWindowEnd
                        ? "bg-yellow-500 text-white"
                        : element.isHighlighted
                        ? "bg-orange-100 text-orange-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {element.value}
                  </div>
                ))}
              </div>
            </div>

            {/* Step Information */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Step Information</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-600">Window Sum: {steps[currentStep].windowSum}</p>
                    <p className="text-gray-600">Maximum Sum: {steps[currentStep].maxSum}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                      disabled={currentStep === 0}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-6 h-6 text-gray-600" />
                    </button>
                    <span className="text-gray-600">
                      Step {currentStep + 1} of {steps.length}
                    </span>
                    <button
                      onClick={() => setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))}
                      disabled={currentStep === steps.length - 1}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="w-6 h-6 text-gray-600" />
                    </button>
                  </div>
                </div>
                <p className="text-gray-700">{steps[currentStep].description}</p>
              </div>
            </div>

            {/* Code Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Code</h2>
                <button
                  onClick={() => setShowFullCode(!showFullCode)}
                  className="flex items-center space-x-2 text-orange-600 hover:text-orange-700"
                >
                  <Code className="w-5 h-5" />
                  <span>{showFullCode ? "Show Current Step" : "Show Full Code"}</span>
                </button>
              </div>
              <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                <code className="text-sm text-gray-800">
                  {showFullCode ? getFullCode() : steps[currentStep].code}
                </code>
              </pre>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default SlidingWindowPage 