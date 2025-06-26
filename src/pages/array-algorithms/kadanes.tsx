"use client"

import { useState, useEffect } from "react"

interface Step {
  array: {
    value: number;
    isHighlighted: boolean;
    isCurrentSum: boolean;
    isMaxSum: boolean;
  }[];
  maxSoFar: number;
  currentMax: number;
  start: number;
  end: number;
}

const KadanesAlgorithm = () => {
  const initialArray = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
  const [array, setArray] = useState(initialArray)
  const [steps, setSteps] = useState<Step[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    if (!isRunning) return

    const timeoutId = setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1)
      } else {
        setIsRunning(false)
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [isRunning, currentStep, steps])

  const kadane = () => {
    let maxSoFar = Number.NEGATIVE_INFINITY
    let currentMax = 0
    let start = 0
    let end = 0
    let j = 0

    const steps = []
    let tempArray = initialArray.map((value) => ({ value, isHighlighted: false, isCurrentSum: false, isMaxSum: false }))

    for (let i = 0; i < initialArray.length; i++) {
      tempArray = tempArray.map((item, index) => ({ ...item, isHighlighted: index >= j && index <= i }))

      currentMax += initialArray[i]

      tempArray = tempArray.map((item, index) => ({ ...item, isCurrentSum: index === i }))

      if (currentMax > maxSoFar) {
        maxSoFar = currentMax
        start = j
        end = i
      }

      if (currentMax < 0) {
        currentMax = 0
        j = i + 1
      }

      const maxSumSubarray = tempArray.map((item, index) => ({ ...item, isMaxSum: index >= start && index <= end }))
      steps.push({ array: maxSumSubarray, maxSoFar, currentMax, start, end })
    }

    setSteps(steps)
  }

  const handleStart = () => {
    kadane()
    setCurrentStep(0)
    setIsRunning(true)
  }

  const handlePauseResume = () => {
    setIsRunning(!isRunning)
  }

  const handleReset = () => {
    setIsRunning(false)
    setCurrentStep(0)
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4 text-gray-900">Kadane's Algorithm Visualization</h1>

      <div className="mb-6">
        <button
          onClick={handleStart}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Start
        </button>
        <button
          onClick={handlePauseResume}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          {isRunning ? "Pause" : "Resume"}
        </button>
        <button onClick={handleReset} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
          Reset
        </button>
      </div>

      {steps.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-900">Step {currentStep + 1}</h2>
          <p className="text-gray-700">
            Max So Far: {steps[currentStep].maxSoFar}, Current Max: {steps[currentStep].currentMax}, Start:{" "}
            {steps[currentStep].start}, End: {steps[currentStep].end}
          </p>
        </div>
      )}

      {steps.length > 0 && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {steps[currentStep].array.map((element, index) => (
              <div key={index} className="text-center">
                <div
                  className={`w-16 h-16 flex items-center justify-center rounded-lg text-lg font-semibold transition-all duration-300 ${
                    element.isMaxSum
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105"
                      : element.isCurrentSum
                        ? "bg-blue-100 text-blue-700 shadow-md border-2 border-blue-300"
                        : element.isHighlighted
                          ? "bg-purple-100 text-purple-700 shadow-md"
                          : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {element.value}
                </div>
                <div className="text-xs text-gray-500 mt-1">i={index}</div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded"></div>
              <span>Max Subarray</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-100 border-2 border-blue-300 rounded"></div>
              <span>Current Element</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-100 rounded"></div>
              <span>Current Subarray</span>
            </div>
          </div>
        </div>
      )}

      {steps.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Algorithm Insight</h2>
          <div className="space-y-3 text-sm">
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="font-semibold text-purple-800">Key Principle:</div>
              <div className="text-purple-700">
                At each position, decide whether to extend the current subarray or start a new one
              </div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="font-semibold text-blue-800">Decision Rule:</div>
              <div className="text-blue-700">current_sum = max(current_sum + arr[i], arr[i])</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default KadanesAlgorithm
