"use client"

import { useState, useEffect } from "react"

interface Step {
  array: {
    value: number;
    isHighlighted: boolean;
    isWindowStart: boolean;
    isWindowEnd: boolean;
  }[];
  windowSum: number;
  maxSum: number;
}

const SlidingWindow = () => {
  const [array, setArray] = useState([1, 3, -1, -3, 5, 3, 6, 7])
  const [windowSize, setWindowSize] = useState(3)
  const [steps, setSteps] = useState<Step[]>([])
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const calculateSlidingWindow = () => {
      const newSteps = []
      let currentSum = 0
      let maxSum = Number.NEGATIVE_INFINITY

      // Initialize the first window
      for (let i = 0; i < windowSize; i++) {
        currentSum += array[i]
      }
      maxSum = currentSum

      let tempArray = array.map((value, index) => ({
        value: value,
        isHighlighted: index < windowSize,
        isWindowStart: index === 0,
        isWindowEnd: index === windowSize - 1,
      }))

      newSteps.push({
        array: tempArray,
        windowSum: currentSum,
        maxSum: maxSum,
      })

      // Slide the window
      for (let i = 1; i <= array.length - windowSize; i++) {
        currentSum = currentSum - array[i - 1] + array[i + windowSize - 1]
        maxSum = Math.max(maxSum, currentSum)

        tempArray = array.map((value, index) => ({
          value: value,
          isHighlighted: index >= i && index < i + windowSize,
          isWindowStart: index === i,
          isWindowEnd: index === i + windowSize - 1,
        }))

        newSteps.push({
          array: tempArray,
          windowSum: currentSum,
          maxSum: maxSum,
        })
      }

      setSteps(newSteps)
      setCurrentStep(0)
    }

    calculateSlidingWindow()
  }, [array, windowSize])

  const handleNextStep = () => {
    setCurrentStep((prevStep: number) => Math.min(prevStep + 1, steps.length - 1))
  }

  const handlePreviousStep = () => {
    setCurrentStep((prevStep: number) => Math.max(prevStep - 1, 0))
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Sliding Window Algorithm Visualization</h1>

      <div className="mb-4">
        <label htmlFor="arrayInput" className="block text-gray-700 text-sm font-bold mb-2">
          Array:
        </label>
        <input
          type="text"
          id="arrayInput"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={array.join(",")}
          onChange={(e) => {
            const newArray = e.target.value.split(",").map(Number)
            setArray(newArray)
          }}
        />
      </div>

      <div className="mb-4" >
        <label htmlFor="windowSizeInput" className="block text-gray-700 text-sm font-bold mb-2" >
          Window Size:
        </label>
        <input
          type="number"
          id="windowSizeInput"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={windowSize}
          min={1}
          max={array.length}
          onChange={(e) => {
            const val = Math.max(1, Math.min(array.length, Number(e.target.value)))
            setWindowSize(val)
          }}
        />
      </div>

      {steps.length > 0 && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {steps[currentStep].array.map((element, index) => {
              const windowStart = steps[currentStep].array.findIndex(el => el.isWindowStart);
              const windowEnd = steps[currentStep].array.findIndex(el => el.isWindowEnd);
              return (
                <div key={index} className="relative">
                  <div
                    className={`w-16 h-16 flex items-center justify-center rounded-lg text-lg font-semibold transition-all duration-300 ${
                      element.isWindowStart
                        ? "bg-orange-500 text-white shadow-lg border-4 border-orange-300"
                        : element.isWindowEnd
                          ? "bg-yellow-500 text-white shadow-lg border-4 border-yellow-300"
                          : element.isHighlighted
                            ? "bg-orange-100 text-orange-700 shadow-md"
                            : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {element.value}
                  </div>
                  {element.isWindowStart && index !== windowEnd && (
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-orange-600">
                      START
                    </div>
                  )}
                  {element.isWindowEnd && index !== windowStart && (
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-yellow-600">
                      END
                    </div>
                  )}
                  <div className="text-xs text-gray-500 mt-1 text-center">i={index}</div>
                </div>
              );
            })}
          </div>

          {/* Window size indicator */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-lg">
              <span className="text-orange-800 font-semibold">Window Size: {windowSize}</span>
            </div>
          </div>
        </div>
      )}

      {steps.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Window Analysis</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-orange-50 rounded-lg text-center">
              <div className="text-2xl font-bold text-orange-600">{steps[currentStep].windowSum}</div>
              <div className="text-sm text-orange-700">Current Window Sum</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">{steps[currentStep].maxSum}</div>
              <div className="text-sm text-green-700">Maximum Sum Found</div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">{windowSize}</div>
              <div className="text-sm text-blue-700">Window Size</div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
          onClick={handlePreviousStep}
          disabled={currentStep === 0}
        >
          Previous
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleNextStep}
          disabled={currentStep === steps.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default SlidingWindow
