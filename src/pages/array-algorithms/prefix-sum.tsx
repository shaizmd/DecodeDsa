"use client"

import { useState, useEffect } from "react"

// Types
interface ArrayElement {
  value: number;
  isHighlighted: boolean;
  isPrefixSum: boolean;
  isRange: boolean;
}
interface PrefixSumElement {
  value: number;
  isHighlighted: boolean;
  isPrefixSum: boolean;
  isRange: boolean;
}
interface Step {
  array: ArrayElement[];
  prefixSum?: PrefixSumElement[];
  message: string;
  result?: string;
}

const PrefixSum = () => {
  const [array, setArray] = useState<number[]>([5, 2, 9, 1, 5, 6])
  const [prefixSum, setPrefixSum] = useState<number[]>([])
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [steps, setSteps] = useState<Step[]>([])
  const [operation, setOperation] = useState<string | null>(null)
  const [rangeStart, setRangeStart] = useState<number>(0)
  const [rangeEnd, setRangeEnd] = useState<number>(2)

  const initialize = () => {
    const initialArray: ArrayElement[] = array.map((value: number) => ({ value, isHighlighted: false, isPrefixSum: false, isRange: false }))
    setSteps([{ array: initialArray, message: "Original array" }])
    setCurrentStep(0)
    calculatePrefixSum(array)
  }

  useEffect(() => {
    initialize()
  }, [initialize])

  const calculatePrefixSum = (arr: number[]) => {
    const prefix: number[] = []
    let currentSum = 0
    const newSteps: Step[] = [
      {
        array: arr.map((value: number) => ({ value, isHighlighted: false, isPrefixSum: false, isRange: false })),
        message: "Starting prefix sum calculation",
      },
    ]

    for (let i = 0; i < arr.length; i++) {
      currentSum += arr[i]
      prefix[i] = currentSum

      const arrayCopy: ArrayElement[] = arr.map((value: number, index: number) => ({
        value,
        isHighlighted: index === i,
        isPrefixSum: false,
        isRange: false,
      }))
      newSteps.push({ array: arrayCopy, message: `Adding ${arr[i]} to the current sum` })

      const prefixSumCopy: PrefixSumElement[] = prefix.map((value: number, index: number) => ({
        value,
        isHighlighted: false,
        isPrefixSum: index === i,
        isRange: false,
      }))

      const combinedArray: ArrayElement[] = arr.map((value: number, index: number) => ({
        value,
        isHighlighted: index === i,
        isPrefixSum: false,
        isRange: false,
      }))

      newSteps.push({
        array: combinedArray,
        prefixSum: prefixSumCopy,
        message: `Prefix sum at index ${i} is ${currentSum}`,
      })
    }

    setPrefixSum(prefix)
    setSteps(newSteps)
  }

  const handleRangeSum = () => {
    setOperation("range")
    let result: number
    if (rangeStart === 0) {
      result = prefixSum[rangeEnd]
    } else {
      result = prefixSum[rangeEnd] - prefixSum[rangeStart - 1]
    }

    const newSteps = [...steps]
    const arrayCopy: ArrayElement[] = array.map((value: number, index: number) => ({
      value,
      isHighlighted: false,
      isPrefixSum: false,
      isRange: index >= rangeStart && index <= rangeEnd,
    }))
    newSteps.push({
      array: arrayCopy,
      message: `Calculating range sum from index ${rangeStart} to ${rangeEnd}`,
      result: `prefix_sum[${rangeEnd + 1}] - prefix_sum[${rangeStart}] = ${prefixSum[rangeEnd]} - ${rangeStart > 0 ? prefixSum[rangeStart - 1] : 0} = ${result}`,
    })
    setSteps(newSteps)
    setCurrentStep(newSteps.length - 1)
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-semibold mb-4">Prefix Sum Algorithm Visualization</h1>

      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">Array:</label>
        <input
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={array.join(", ")}
          onChange={(e) => {
            const newArray = e.target.value.split(",").map(Number)
            setArray(newArray)
            calculatePrefixSum(newArray)
          }}
        />
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Array Visualization</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Original Array</h3>
            <div className="flex flex-wrap gap-4 justify-center">
              {steps[currentStep].array.map((element, index) => (
                <div key={index} className="text-center">
                  <div
                    className={`w-16 h-16 flex items-center justify-center rounded-lg text-lg font-semibold transition-all duration-300 ${
                      element.isRange
                        ? "bg-pink-500 text-white shadow-lg"
                        : element.isPrefixSum
                          ? "bg-purple-500 text-white shadow-lg"
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
          </div>

          {/* Arrow pointing down */}
          <div className="flex justify-center">
            <div className="text-purple-500">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v10.586l2.293-2.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {prefixSum.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Prefix Sum Array</h3>
          <div className="flex flex-wrap gap-4 justify-center">
            {prefixSum.map((sum, index) => (
              <div key={index} className="text-center">
                <div
                  className={`w-16 h-16 flex items-center justify-center rounded-lg text-lg font-semibold ${Boolean(steps[currentStep].prefixSum?.[index]?.isPrefixSum) ? "bg-purple-500 text-white shadow-lg" : "bg-gray-100 text-gray-700"}`}
                >
                  {sum}
                </div>
                <div className="text-xs text-gray-500 mt-1">i={index}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Range Sum</h2>
        <div className="flex gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Start Index:</label>
            <input
              type="number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={rangeStart}
              onChange={(e) => setRangeStart(Number.parseInt(e.target.value))}
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">End Index:</label>
            <input
              type="number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={rangeEnd}
              onChange={(e) => setRangeEnd(Number.parseInt(e.target.value))}
            />
          </div>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
          onClick={handleRangeSum}
        >
          Calculate Range Sum
        </button>
        {operation === "range" && steps[currentStep].result && (
          <div className="mt-4 p-4 bg-green-50 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">Range Sum Formula</h4>
            <div className="text-sm text-green-700">
              <div>Range Sum = prefix_sum[end + 1] - prefix_sum[start]</div>
              <div className="mt-1 font-mono">{steps[currentStep].result}</div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          Previous
        </button>
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleNext}
          disabled={currentStep === steps.length - 1}
        >
          Next
        </button>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-2">Explanation</h4>
        <p className="text-sm text-gray-700">{steps[currentStep].message}</p>
      </div>
    </div>
  )
}

export default PrefixSum
