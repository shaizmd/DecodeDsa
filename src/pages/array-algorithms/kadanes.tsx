"use client"

import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, TrendingUp, ChevronLeft, ChevronRight, Code } from "lucide-react"

interface ArrayElement {
  value: number
  isHighlighted: boolean
  isCurrentSum: boolean
  isMaxSum: boolean
}

interface Step {
  array: ArrayElement[]
  currentSum: number
  maxSum: number
  description: string
  code: string
}

function KadanesPage() {
  const [arrayInput, setArrayInput] = useState<string>("")
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

  const generateSteps = (array: number[]) => {
    const newSteps: Step[] = []
    let currentSum = array[0]
    let maxSum = array[0]
    let start = 0
    let end = 0
    let tempStart = 0

    // Initial state
    newSteps.push({
      array: array.map((num, idx) => ({
        value: num,
        isHighlighted: idx === 0,
        isCurrentSum: idx === 0,
        isMaxSum: idx === 0
      })),
      currentSum: array[0],
      maxSum: array[0],
      description: "Initialize with first element",
      code: `# Initialize variables
current_sum = array[0]
max_sum = array[0]`
    })

    // Process each element starting from the second one
    for (let i = 1; i < array.length; i++) {
      // Update current sum
      if (currentSum + array[i] > array[i]) {
        currentSum += array[i]
      } else {
        currentSum = array[i]
        tempStart = i
      }

      // Update max sum if needed
      if (currentSum > maxSum) {
        maxSum = currentSum
        start = tempStart
        end = i
      }

      // Capture current values to avoid unsafe references
      const currentTempStart = tempStart
      const currentStart = start
      const currentEnd = end

      // Create step
      const currentArray = array.map((num, idx) => ({
        value: num,
        isHighlighted: idx >= currentTempStart && idx <= i,
        isCurrentSum: idx === i,
        isMaxSum: idx >= currentStart && idx <= currentEnd
      }))

      newSteps.push({
        array: currentArray,
        currentSum,
        maxSum,
        description: `Processing element ${array[i]}: current sum = ${currentSum}, max sum = ${maxSum}`,
        code: `# Update current sum
if current_sum + array[i] > array[i]:
    current_sum += array[i]
else:
    current_sum = array[i]
    temp_start = i

# Update max sum if needed
if current_sum > max_sum:
    max_sum = current_sum
    start = temp_start
    end = i`
      })
    }

    // Final state
    newSteps.push({
      array: array.map((num, idx) => ({
        value: num,
        isHighlighted: idx >= start && idx <= end,
        isCurrentSum: false,
        isMaxSum: true
      })),
      currentSum,
      maxSum,
      description: `Maximum subarray sum: ${maxSum} (from index ${start} to ${end})`,
      code: `# Return maximum subarray sum
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
      resetVisualization()
      setIsVisualizing(true)
      const newSteps = generateSteps(numbers)
      setSteps(newSteps)
      setIsVisualizing(false)
    } catch (err) {
      alert("Please enter valid numbers separated by commas")
    }
  }

  const getFullCode = () => {
    return `def kadanes_algorithm(array):
    # Initialize variables
    current_sum = array[0]
    max_sum = array[0]
    start = 0
    end = 0
    temp_start = 0
    
    # Process each element
    for i in range(1, len(array)):
        # Update current sum
        if current_sum + array[i] > array[i]:
            current_sum += array[i]
        else:
            current_sum = array[i]
            temp_start = i
        
        # Update max sum if needed
        if current_sum > max_sum:
            max_sum = current_sum
            start = temp_start
            end = i
    
    return max_sum, start, end`
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
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Kadane's Algorithm
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
                placeholder="e.g., -2, 1, -3, 4, -1, 2, 1, -5, 4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={handleVisualize}
              disabled={isVisualizing}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
                      element.isMaxSum
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                        : element.isCurrentSum
                        ? "bg-blue-100 text-blue-700"
                        : element.isHighlighted
                        ? "bg-purple-100 text-purple-700"
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
                    <p className="text-gray-600">Current Sum: {steps[currentStep].currentSum}</p>
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
                  className="flex items-center space-x-2 text-purple-600 hover:text-purple-700"
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

export default KadanesPage 