"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { ArrowUpDown, Code, Play, Pause, RotateCcw } from "lucide-react"
import ZoomableArrayCanvas from "./ZoomableArrayCanvas"
import { generateSteps } from "../utils/sortingAlgorithms"
import type Algorithm from "../types/algorithms"
import { SortingAlgorithms } from "../enums/SortingAlgorithms"
import Step from "../types/steps"

interface SortingVisualizerProps {
  algorithm: Algorithm<SortingAlgorithms>
  inputArray: string
}

interface SortResult {
  comparisons: number
  swaps: number
  steps: number
}

const SortingVisualizer: React.FC<SortingVisualizerProps> = ({ algorithm, inputArray }) => {
  const [steps, setSteps] = useState<Step[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playSpeed, setPlaySpeed] = useState(1000) // milliseconds
  const [sortResult, setSortResult] = useState<SortResult | null>(null)

  useEffect(() => {
    const array = inputArray
      .split(/[\s,]+/)
      .filter(n => n)
      .map(Number)
      .filter((n) => !isNaN(n))
    const newSteps = generateSteps(algorithm.algorithm, array)
    setSteps(newSteps)
    setCurrentStep(0)

    // Calculate sort metrics
    const comparisons = newSteps.filter((step) => step.comparing?.length).length
    const swaps = newSteps.filter((step) => step.swapping?.length).length
    setSortResult({
      comparisons,
      swaps,
      steps: newSteps.length,
    })
  }, [algorithm, inputArray, generateSteps])

  // Auto-play functionality
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying && currentStep < steps.length - 1) {
      interval = setInterval(() => {
        setCurrentStep(prev => prev + 1)
      }, playSpeed)
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false)
    }
    return () => clearInterval(interval)
  }, [isPlaying, currentStep, steps.length, playSpeed])

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

  const handleReset = () => {
    setCurrentStep(0)
    setIsPlaying(false)
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const getElementColor = (index: number): string => {
    const step = steps[currentStep]
    if (!step) return "bg-blue-500"

    if (step.sorted?.includes(index)) return "bg-green-500"
    if (step.swapping?.includes(index)) return "bg-red-500"
    if (step.comparing?.includes(index)) return "bg-yellow-500"
    if (step.pivot === index) return "bg-purple-500"

    return "bg-blue-500"
  }

  const getElementColorHex = (index: number): string => {
    const step = steps[currentStep]
    if (!step) return "#3b82f6" // blue-500

    if (step.sorted?.includes(index)) return "#22c55e" // green-500
    if (step.swapping?.includes(index)) return "#ef4444" // red-500
    if (step.comparing?.includes(index)) return "#eab308" // yellow-500
    if (step.pivot === index) return "#a855f7" // purple-500

    return "#3b82f6" // blue-500
  }

  const prepareCanvasElements = () => {
    const step = steps[currentStep]
    if (!step) return []

    return step.array.map((value, index) => ({
      value,
      index,
      color: getElementColorHex(index),
    }))
  }

  if (steps.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-500">Loading visualization...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Sort Result Summary */}
      {sortResult && (
        <Card className="border-2 border-dashed border-gray-300">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-2">
              <div className="flex items-center justify-between space-x-3">
                <div className="p-2 bg-blue-100 rounded-full">
                  <ArrowUpDown className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{algorithm.name} Statistics</h3>
                  <p className="text-gray-600">Step-by-step visualization of the sorting process</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center mt-3">
                <div className="flex flex-col gap-1 md:gap-0">
                  <div className="text-2xl font-bold text-blue-600">{sortResult.comparisons}</div>
                  <div className="text-sm text-gray-500">Comparisons</div>
                </div>
                <div className="flex flex-col gap-1 md:gap-0">
                  <div className="text-2xl font-bold text-red-600">{sortResult.swaps}</div>
                  <div className="text-sm text-gray-500">Swaps</div>
                </div>
                <div className="flex flex-col gap-1 md:gap-0">
                  <div className="text-2xl font-bold text-purple-600">{sortResult.steps}</div>
                  <div className="text-sm text-gray-500">Total Steps</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Array Visualization */}
      <div className="w-full bg-white rounded-lg p-4 md:p-6 shadow-sm border">
        <div className="w-full flex items-center justify-between mb-4">
          <h3 className="w-[60%] text-base md:text-lg font-semibold flex items-center" title="Array Visualization">
            <ArrowUpDown className="w-6 h-6 mr-2 text-blue-600" />
            <span className="truncate">Array Visualization</span>
          </h3>
          <div className="text-sm md:text-base text-gray-600 text-right flex flex-col md:flex-row md:gap-1">
            <span>Algorithm:</span>
            <span className="font-semibold text-blue-600">{algorithm.name}</span>
          </div>
        </div>

        {steps[currentStep]?.array.length >= 100 ? (
          // Canvas-based visualization for large arrays
          <div className="flex justify-center">
            <ZoomableArrayCanvas
              elements={prepareCanvasElements()}
              width={Math.min(1000, typeof window !== 'undefined' ? window.innerWidth - 100 : 1000)}
              height={200}
            />
          </div>
        ) : (
          // DOM-based visualization for small arrays
          <div className="flex flex-wrap items-center justify-center gap-2 p-4 bg-gray-50 rounded-lg min-h-[80px]">
            {steps[currentStep]?.array.map((value, index) => (
              <div key={index} className="relative">
                <div
                  className={`w-12 h-12 flex items-center justify-center text-white rounded-md font-semibold transition-all duration-300 ${getElementColor(index)}`}
                >
                  {value}
                </div>
                <div className="text-xs text-gray-500 text-center mt-1">{index}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-sm bg-white rounded-lg p-4 shadow-sm border">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span>Unsorted</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
          <span>Comparing</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span>Swapping</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-purple-500 rounded"></div>
          <span>Pivot</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span>Sorted</span>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg p-4 shadow-sm border">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <Button onClick={handleReset} variant="secondary" size="sm">
              <RotateCcw className="w-4 h-4 mr-1" />
              Reset
            </Button>
            <Button onClick={handlePrevious} disabled={currentStep === 0} variant="secondary" size="sm">
              Previous
            </Button>
            <Button 
              onClick={togglePlay} 
              variant={isPlaying ? "secondary" : "primary"}
              size="sm"
            >
              {isPlaying ? <Pause className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
              {isPlaying ? "Pause" : "Play"}
            </Button>
            <Button onClick={handleNext} disabled={currentStep === steps.length - 1} size="sm">
              Next
            </Button>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-600">Speed:</label>
              <select 
                value={playSpeed} 
                onChange={(e) => setPlaySpeed(Number(e.target.value))}
                className="text-sm border rounded px-2 py-1"
              >
                <option value={2000}>0.5x</option>
                <option value={1000}>1x</option>
                <option value={500}>2x</option>
                <option value={250}>4x</option>
              </select>
            </div>
            <Badge variant="default" className="text-sm">
              Step {currentStep + 1} of {steps.length}
            </Badge>
          </div>
        </div>
      </div>

      {/* Step Description */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Code className="w-5 h-5 mr-2" />
            Step Description
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">{steps[currentStep]?.description}</p>
        </CardContent>
      </Card>

      {/* Code Display */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Code Execution</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-md overflow-x-auto text-sm font-mono">
            <code>{steps[currentStep]?.code}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Complete Algorithm Code - Show only when at the last step */}
      {currentStep === steps.length - 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Complete {algorithm.name} Implementation</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-md overflow-x-auto text-sm font-mono max-h-96 overflow-y-auto">
              <code>{algorithm.code}</code>
            </pre>
            <div className="mt-4 p-3 bg-blue-50 rounded-md">
              <p className="text-sm text-blue-800">
                <strong>💡 Complete Implementation:</strong> This is the full {algorithm.name} algorithm that you just
                visualized step by step. You can copy this code and use it in your own projects!
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default SortingVisualizer
