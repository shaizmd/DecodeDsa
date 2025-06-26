"use client"

import { useState, useEffect } from "react"

interface ArrayElement {
  value: number;
  isPointer1?: boolean;
  isPointer2?: boolean;
  isPointer3?: boolean;
  isHighlighted?: boolean;
}

interface Step {
  array: ArrayElement[];
  message: string;
}

const TwoPointer = () => {
  const [arraySize, setArraySize] = useState(10)
  const [array, setArray] = useState<number[]>([])
  const [targetSum, setTargetSum] = useState(10)
  const [steps, setSteps] = useState<Step[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [algorithm, setAlgorithm] = useState("Two Sum")

  const generateRandomArray = () => {
    const newArray: number[] = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 20))
    setArray(newArray)
  }

  useEffect(() => {
    generateRandomArray()
  }, [arraySize])

  const visualizeTwoSum = () => {
    const arr: number[] = [...array].sort((a, b) => a - b)
    const target: number = targetSum
    let left = 0
    let right = arr.length - 1
    const newSteps: Step[] = []

    // Helper to create step array (moved outside the loop)
    const makeStepArray = (left: number, right: number, highlight: boolean = false): ArrayElement[] =>
      arr.map((num, index) => ({
        value: num,
        isPointer1: index === left,
        isPointer2: index === right,
        isHighlighted: highlight && (index === left || index === right),
      }))

    while (left < right) {
      const currentSum = arr[left] + arr[right]

      newSteps.push({ array: makeStepArray(left, right), message: `Checking ${arr[left]} + ${arr[right]} = ${currentSum}` })

      if (currentSum === target) {
        newSteps.push({ array: makeStepArray(left, right, true), message: `Found pair: ${arr[left]} + ${arr[right]} = ${target}` })
        setSteps(newSteps)
        return
      } else if (currentSum < target) {
        left++
      } else {
        right--
      }
    }

    const finalStepArray: ArrayElement[] = arr.map((num, index) => ({
      value: num,
      isPointer1: false,
      isPointer2: false,
      isHighlighted: false,
    }))
    newSteps.push({ array: finalStepArray, message: "No pair found." })
    setSteps(newSteps)
  }

  const visualizeThreeSum = () => {
    const arr: number[] = [...array].sort((a, b) => a - b)
    const target: number = targetSum
    const newSteps: Step[] = []

    // Helper to create step array (moved outside the loop)
    const makeStepArray = (i: number, left: number, right: number, highlight: boolean = false): ArrayElement[] =>
      arr.map((num, index) => ({
        value: num,
        isPointer1: index === i,
        isPointer2: index === left,
        isPointer3: index === right,
        isHighlighted: highlight && (index === i || index === left || index === right),
      }))

    for (let i = 0; i < arr.length - 2; i++) {
      let left = i + 1
      let right = arr.length - 1

      while (left < right) {
        const currentSum = arr[i] + arr[left] + arr[right]

        newSteps.push({
          array: makeStepArray(i, left, right),
          message: `Checking ${arr[i]} + ${arr[left]} + ${arr[right]} = ${currentSum}`,
        })

        if (currentSum === target) {
          newSteps.push({
            array: makeStepArray(i, left, right, true),
            message: `Found triplet: ${arr[i]} + ${arr[left]} + ${arr[right]} = ${target}`,
          })
          setSteps(newSteps)
          return
        } else if (currentSum < target) {
          left++
        } else {
          right--
        }
      }
    }

    const finalStepArray: ArrayElement[] = arr.map((num, index) => ({
      value: num,
      isPointer1: false,
      isPointer2: false,
      isPointer3: false,
      isHighlighted: false,
    }))
    newSteps.push({ array: finalStepArray, message: "No triplet found." })
    setSteps(newSteps)
  }

  const handleVisualize = () => {
    setCurrentStep(0)
    if (algorithm === "Two Sum") {
      visualizeTwoSum()
    } else if (algorithm === "Three Sum") {
      visualizeThreeSum()
    }
  }

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Two Pointer Algorithm Visualizer</h1>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="arraySize">
          Array Size:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="arraySize"
          type="number"
          value={arraySize}
          onChange={(e) => setArraySize(Number.parseInt(e.target.value))}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="targetSum">
          Target Sum:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="targetSum"
          type="number"
          value={targetSum}
          onChange={(e) => setTargetSum(Number.parseInt(e.target.value))}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="algorithm">
          Algorithm:
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="algorithm"
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
        >
          <option>Two Sum</option>
          <option>Three Sum</option>
        </select>
      </div>

      <div className="mb-4 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">Algorithm Complexity</h3>
        <div className="text-sm text-blue-700">
          <div>Time Complexity: O(n log n) for sorting + O(n) for two pointers = O(n log n)</div>
          <div>Space Complexity: O(1) auxiliary space</div>
        </div>
      </div>

      <div className="mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={handleVisualize}
        >
          Visualize
        </button>
      </div>

      {steps.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Steps:</h2>
          <p className="mb-2">{steps[currentStep].message}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            {steps[currentStep].array.map((element, index) => (
              <div
                key={index}
                className={`w-16 h-16 flex items-center justify-center rounded-lg text-lg font-bold transition-all duration-300 shadow-md ${
                  element.isHighlighted
                    ? "bg-green-500 text-white shadow-lg scale-110"
                    : element.isPointer1
                      ? "bg-blue-500 text-white shadow-md"
                      : element.isPointer2
                        ? "bg-purple-500 text-white shadow-md"
                        : element.isPointer3
                          ? "bg-orange-500 text-white shadow-md"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {element.value}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 justify-center mt-2">
            {steps[currentStep].array.map((element, index) => (
              <div key={index} className="w-16 text-center">
                <div className="text-xs font-medium">
                  {element.isPointer1 && <span className="text-blue-500">P1</span>}
                  {element.isPointer2 && <span className="text-purple-500">P2</span>}
                  {element.isPointer3 && <span className="text-orange-500">P3</span>}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between">
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handlePreviousStep}
              disabled={currentStep === 0}
            >
              Previous
            </button>
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleNextStep}
              disabled={currentStep === steps.length - 1}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default TwoPointer
