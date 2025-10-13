import React, { useState } from "react";
import { Search, Clock, Code2 } from "lucide-react";
import SearchingVisualizer from "../components/SearchingVisualizer";
import { Link } from "react-router-dom";

interface SearchingAlgorithm {
  name: string;
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
  bestCase: string;
  worstCase: string;
}

const searchingAlgorithms: SearchingAlgorithm[] = [
  {
    name: "Linear Search",
    description:
      "A simple search algorithm that checks every element in the array sequentially until the target is found or the array ends.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    bestCase: "O(1) - Target is first element",
    worstCase: "O(n) - Target is last element or not found",
  },
  {
    name: "Binary Search",
    description:
      "An efficient search algorithm that works on sorted arrays by repeatedly dividing the search interval in half.",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    bestCase: "O(1) - Target is middle element",
    worstCase: "O(log n) - Maximum divisions needed",
  },
];

function SearchingAlgorithmsPage() {
  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState<SearchingAlgorithm | null>(null);
  const [inputArray, setInputArray] = useState<string>("");
  const [targetValue, setTargetValue] = useState<string>("");
  const [showVisualization, setShowVisualization] = useState(false);

  const handleAlgorithmSelect = (algorithm: SearchingAlgorithm) => {
    setSelectedAlgorithm(algorithm);
    setShowVisualization(false);
    // Set default values based on algorithm
    if (algorithm.name === "Binary Search") {
      setInputArray("1 3 5 7 9 11 13 15 17 19");
      setTargetValue("7");
    } else {
      setInputArray("64 34 25 12 22 11 90 88");
      setTargetValue("22");
    }
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputArray.trim() && targetValue.trim()) {
      setShowVisualization(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3">
            <Link to={"/"}>
              <div className="p-2 bg-gradient-to-r from-green-500 cursor-pointer to-emerald-500 rounded-lg">
                <Search className="w-6 h-6 text-white" />
              </div>
            </Link>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Searching Algorithms Visualizer
            </h1>
          </div>
          <p className="mt-2 text-gray-600">
            Explore how different searching algorithms find elements in arrays
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {searchingAlgorithms.map((algorithm) => (
            <div
              key={algorithm.name}
              className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 transform hover:-translate-y-1 ${
                selectedAlgorithm?.name === algorithm.name
                  ? "border-green-500 ring-2 ring-green-200"
                  : "border-gray-200 hover:border-green-300"
              }`}
              onClick={() => handleAlgorithmSelect(algorithm)}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    {algorithm.name}
                  </h3>
                  <div className="p-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg">
                    <Search className="w-5 h-5 text-green-600" />
                  </div>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {algorithm.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">
                        Time Complexity
                      </span>
                    </div>
                    <p className="text-lg font-bold text-green-600">
                      {algorithm.timeComplexity}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <Code2 className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">
                        Space Complexity
                      </span>
                    </div>
                    <p className="text-lg font-bold text-blue-600">
                      {algorithm.spaceComplexity}
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="text-sm">
                    <span className="font-medium text-green-700">
                      Best Case:
                    </span>
                    <span className="text-gray-600 ml-2">
                      {algorithm.bestCase}
                    </span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-red-700">
                      Worst Case:
                    </span>
                    <span className="text-gray-600 ml-2">
                      {algorithm.worstCase}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedAlgorithm && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Visualize {selectedAlgorithm.name}
              </h3>

              {selectedAlgorithm.name === "Binary Search" && (
                <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> Binary Search requires a sorted
                    array. The array will be automatically sorted if needed.
                  </p>
                </div>
              )}

              <form onSubmit={handleInputSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="array-input"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Array Elements
                    </label>
                    <input
                      id="array-input"
                      type="text"
                      value={inputArray}
                      onChange={(e) => setInputArray(e.target.value)}
                      placeholder="Enter array (e.g., 64 34 25 12 22 11 90)"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="target-input"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Target Value
                    </label>
                    <input
                      id="target-input"
                      type="text"
                      value={targetValue}
                      onChange={(e) => setTargetValue(e.target.value)}
                      placeholder="Enter target value"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg shadow-lg hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Start Search Visualization
                </button>
              </form>

              {showVisualization && (
                <div className="mt-8 border-t pt-8">
                  <SearchingVisualizer
                    algorithm={selectedAlgorithm.name}
                    inputArray={inputArray}
                    targetValue={parseInt(targetValue)}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default SearchingAlgorithmsPage;
