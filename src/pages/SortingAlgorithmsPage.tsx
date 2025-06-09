"use client"

import type React from "react"
import { useState } from "react"
import { ArrowUpDown, Clock, Code2 } from "lucide-react"
import SortingVisualizer from "../components/SortingVisualizer"

interface SortingAlgorithm {
  name: string
  description: string
  timeComplexity: string
  spaceComplexity: string
  bestCase: string
  worstCase: string
}

const sortingAlgorithms: SortingAlgorithm[] = [
  {
    name: "Bubble Sort",
    description:
      "A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    bestCase: "O(n) - Already sorted",
    worstCase: "O(n²) - Reverse sorted",
  },
  {
    name: "Selection Sort",
    description:
      "A simple sorting algorithm that divides the input into a sorted and unsorted region, and repeatedly selects the smallest element from the unsorted region.",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    bestCase: "O(n²) - Not improved by sorted data",
    worstCase: "O(n²) - Not improved by sorted data",
  },
  {
    name: "Insertion Sort",
    description:
      "A simple sorting algorithm that builds the final sorted array one item at a time by comparing each new item with the already sorted portion.",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    bestCase: "O(n) - Already sorted",
    worstCase: "O(n²) - Reverse sorted",
  },
  {
    name: "Merge Sort",
    description:
      "A divide-and-conquer algorithm that recursively breaks down the problem into smaller subproblems until they become simple enough to solve directly.",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    bestCase: "O(n log n)",
    worstCase: "O(n log n)",
  },
  {
    name: "Quick Sort",
    description:
      "A divide-and-conquer algorithm that picks an element as pivot and partitions the array around the pivot.",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(log n)",
    bestCase: "O(n log n)",
    worstCase: "O(n²) - Poor pivot choices",
  },
  {
    name: "Heap Sort",
    description: "A comparison-based sorting algorithm that uses a binary heap data structure to sort elements.",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(1)",
    bestCase: "O(n log n)",
    worstCase: "O(n log n)",
  },
]

function SortingAlgorithmsPage() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<SortingAlgorithm | null>(null)
  const [inputArray, setInputArray] = useState<string>("")
  const [showVisualization, setShowVisualization] = useState(false)

  const handleAlgorithmSelect = (algorithm: SortingAlgorithm) => {
    setSelectedAlgorithm(algorithm)
    setShowVisualization(false)
    // Set default values based on algorithm
    setInputArray("64 34 25 12 22 11 90")
  }

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputArray.trim()) {
      setShowVisualization(true)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
              <ArrowUpDown className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Sorting Algorithms Visualizer
            </h1>
          </div>
          <p className="mt-2 text-gray-600">Explore how different sorting algorithms organize data step by step</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {sortingAlgorithms.map((algorithm) => (
            <div
              key={algorithm.name}
              className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 transform hover:-translate-y-1 ${
                selectedAlgorithm?.name === algorithm.name
                  ? "border-blue-500 ring-2 ring-blue-200"
                  : "border-gray-200 hover:border-blue-300"
              }`}
              onClick={() => handleAlgorithmSelect(algorithm)}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{algorithm.name}</h3>
                  <div className="p-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg">
                    <ArrowUpDown className="w-5 h-5 text-blue-600" />
                  </div>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">{algorithm.description}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">Time Complexity</span>
                    </div>
                    <p className="text-lg font-bold text-blue-600">{algorithm.timeComplexity}</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <Code2 className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">Space Complexity</span>
                    </div>
                    <p className="text-lg font-bold text-purple-600">{algorithm.spaceComplexity}</p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="text-sm">
                    <span className="font-medium text-green-700">Best Case:</span>
                    <span className="text-gray-600 ml-2">{algorithm.bestCase}</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-red-700">Worst Case:</span>
                    <span className="text-gray-600 ml-2">{algorithm.worstCase}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedAlgorithm && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Visualize {selectedAlgorithm.name}</h3>

              <form onSubmit={handleInputSubmit} className="space-y-4">
                <div>
                  <label htmlFor="array-input" className="block text-sm font-medium text-gray-700 mb-2">
                    Array Elements
                  </label>
                  <input
                    id="array-input"
                    type="text"
                    value={inputArray}
                    onChange={(e) => setInputArray(e.target.value)}
                    placeholder="Enter array (e.g., 64 34 25 12 22 11 90)"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  <ArrowUpDown className="w-5 h-5 mr-2" />
                  Start Sorting Visualization
                </button>
              </form>

              {showVisualization && (
                <div className="mt-8 border-t pt-8">
                  <SortingVisualizer algorithm={selectedAlgorithm.name} inputArray={inputArray} />
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default SortingAlgorithmsPage
