"use client"

import type React from "react"
import { useState } from "react"
import { Layers, Plus, Minus, Eye, AlertCircle, CheckCircle2 } from "lucide-react"

interface StackOperation {
  name: string
  description: string
  timeComplexity: string
  spaceComplexity: string
  pythonCode: string
}

const stackOperations: StackOperation[] = [
  {
    name: "Push",
    description: "Adds an element to the top of the stack.",
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
    pythonCode: 'def push(self, item):\n    if self.is_full():\n        # Handle stack full error\n        return\n    self.stack.append(item)',
  },
  {
    name: "Pop",
    description: "Removes and returns the top element from the stack.",
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
    pythonCode: 'def pop(self):\n    if self.is_empty():\n        # Handle stack empty error\n        return None\n    return self.stack.pop()',
  },
  {
    name: "Peek",
    description: "Returns the top element without removing it.",
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
    pythonCode: 'def peek(self):\n    if self.is_empty():\n        # Handle stack empty error\n        return None\n    return self.stack[-1]',
  },
  {
    name: "Is Empty",
    description: "Checks if the stack has no elements.",
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
    pythonCode: 'def is_empty(self):\n    return len(self.stack) == 0',
  },
  {
    name: "Is Full",
    description: "Checks if the stack has reached its maximum capacity.",
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
    pythonCode: 'def is_full(self):\n    return len(self.stack) == self.capacity',
  },
  {
    name: "Size",
    description: "Returns the number of elements in the stack.",
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
    pythonCode: 'def size(self):\n    return len(self.stack)',
  },
]

interface StackElement {
  value: number
  isHighlighted: boolean
}

function StackVisualizerPage() {
  const [stack, setStack] = useState<StackElement[]>([])
  const [maxSize, setMaxSize] = useState<number>(10)
  const [inputValue, setInputValue] = useState<string>("")
  const [operationHistory, setOperationHistory] = useState<string[]>([])
  const [isAnimating, setIsAnimating] = useState(false)
  const [showFullPythonCode, setShowFullPythonCode] = useState(false)
  const [showCodeMap, setShowCodeMap] = useState<Record<string, boolean>>({});

  const toggleCodeVisibility = (operationName: string) => {
    setShowCodeMap(prev => ({
      ...prev,
      [operationName]: !prev[operationName]
    }));
  };

  const push = () => {
    if (stack.length >= maxSize) {
      setOperationHistory(prev => [...prev, "Error: Stack is full!"])
      return
    }
    if (!inputValue || isNaN(Number(inputValue))) {
      setOperationHistory(prev => [...prev, "Error: Please enter a valid number!"])
      return
    }

    setIsAnimating(true)
    const newElement = { value: Number(inputValue), isHighlighted: true }
    setStack(prev => [...prev, newElement])
    setOperationHistory(prev => [...prev, `Pushed ${inputValue} to stack`])
    setInputValue("")

    setTimeout(() => {
      setStack(prev => prev.map(el => ({ ...el, isHighlighted: false })))
      setIsAnimating(false)
    }, 1000)
  }

  const pop = () => {
    if (stack.length === 0) {
      setOperationHistory(prev => [...prev, "Error: Stack is empty!"])
      return
    }

    setIsAnimating(true)
    const poppedValue = stack[stack.length - 1].value
    setStack(prev => prev.slice(0, -1))
    setOperationHistory(prev => [...prev, `Popped ${poppedValue} from stack`])

    setTimeout(() => {
      setIsAnimating(false)
    }, 1000)
  }

  const peek = () => {
    if (stack.length === 0) {
      setOperationHistory(prev => [...prev, "Error: Stack is empty!"])
      return
    }

    setIsAnimating(true)
    const topValue = stack[stack.length - 1].value
    setStack(prev => prev.map((el, idx) => 
      idx === prev.length - 1 ? { ...el, isHighlighted: true } : el
    ))
    setOperationHistory(prev => [...prev, `Peeked at ${topValue}`])

    setTimeout(() => {
      setStack(prev => prev.map(el => ({ ...el, isHighlighted: false })))
      setIsAnimating(false)
    }, 1000)
  }

  const isEmpty = () => {
    const empty = stack.length === 0
    setOperationHistory(prev => [...prev, `Stack is ${empty ? "empty" : "not empty"}`])
  }

  const isFull = () => {
    const full = stack.length >= maxSize
    setOperationHistory(prev => [...prev, `Stack is ${full ? "full" : "not full"}`])
  }

  const size = () => {
    setOperationHistory(prev => [...prev, `Stack size: ${stack.length}`])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
              <Layers className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Stack Operations Visualizer
            </h1>
          </div>
          <p className="mt-2 text-gray-600">Visualize stack operations step by step</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Stack Operations Information */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stackOperations.map((operation) => {
            return (
              <div
                key={operation.name}
                className="bg-white rounded-lg shadow-md p-4 border border-gray-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex justify-between items-center">
                  {operation.name}
                  <button 
                    onClick={() => toggleCodeVisibility(operation.name)}
                    className="text-blue-500 hover:text-blue-700 text-sm"
                  >
                    {showCodeMap[operation.name] ? "Hide Code" : "Show Code"}
                  </button>
                </h3>
                <p className="text-gray-600 mb-2">{operation.description}</p>
                <div className="text-sm text-gray-500">
                  <div>Time Complexity: {operation.timeComplexity}</div>
                  <div>Space Complexity: {operation.spaceComplexity}</div>
                </div>
                {showCodeMap[operation.name] && (
                  <div className="mt-4 bg-gray-100 p-3 rounded-md overflow-x-auto">
                    <pre><code className="lang-python text-sm">{operation.pythonCode}</code></pre>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="mb-8 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex justify-between items-center">
            Full Stack Python Implementation
            <button
              onClick={() => setShowFullPythonCode(!showFullPythonCode)}
              className="text-blue-500 hover:text-blue-700 text-sm"
            >
              {showFullPythonCode ? "Hide Full Code" : "Show Full Code"}
            </button>
          </h2>
          {showFullPythonCode && (
            <div className="mt-4 bg-gray-100 p-3 rounded-md overflow-x-auto">
              <pre><code className="lang-python text-sm">{'class Stack:\n    def __init__(self, capacity=10):\n        self.stack = []\n        self.capacity = capacity\n\n    def is_empty(self):\n        return len(self.stack) == 0\n\n    def is_full(self):\n        return len(self.stack) == self.capacity\n\n    def push(self, item):\n        if self.is_full():\n            print("Error: Stack is full!")\n            return False\n        self.stack.append(item)\n        print(f"Pushed: {item}")\n        return True\n\n    def pop(self):\n        if self.is_empty():\n            print("Error: Stack is empty!")\n            return None\n        item = self.stack.pop()\n        print(f"Popped: {item}")\n        return item\n\n    def peek(self):\n        if self.is_empty():\n            print("Error: Stack is empty!")\n            return None\n        item = self.stack[-1]\n        print(f"Peeked: {item}")\n        return item\n\n    def size(self):\n        return len(self.stack)\n\n    def display(self):\n        if self.is_empty():\n            print("Stack: []")\n        else:\n            print("Stack:", self.stack)'}</code></pre>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Stack Visualization */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Stack Visualization</h2>
            
            <div className="mb-4">
              <label htmlFor="max-size" className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Stack Size
              </label>
              <input
                id="max-size"
                type="number"
                value={maxSize}
                onChange={(e) => setMaxSize(Math.max(1, Number(e.target.value)))}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                min="1"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="input-value" className="block text-sm font-medium text-gray-700 mb-2">
                Value to Push
              </label>
              <input
                id="input-value"
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter a number"
              />
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={push}
                disabled={isAnimating}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                <Plus className="w-5 h-5 inline mr-1" />
                Push
              </button>
              <button
                onClick={pop}
                disabled={isAnimating}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                <Minus className="w-5 h-5 inline mr-1" />
                Pop
              </button>
              <button
                onClick={peek}
                disabled={isAnimating}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                <Eye className="w-5 h-5 inline mr-1" />
                Peek
              </button>
              <button
                onClick={isEmpty}
                disabled={isAnimating}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
              >
                <AlertCircle className="w-5 h-5 inline mr-1" />
                Is Empty
              </button>
              <button
                onClick={isFull}
                disabled={isAnimating}
                className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:opacity-50"
              >
                <CheckCircle2 className="w-5 h-5 inline mr-1" />
                Is Full
              </button>
              <button
                onClick={size}
                disabled={isAnimating}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50"
              >
                Size
              </button>
            </div>

            {/* Stack Display */}
            <div className="border-2 border-gray-300 rounded-lg p-4 min-h-[300px] flex flex-col-reverse">
              {stack.map((element, index) => (
                <div
                  key={index}
                  className={`w-full h-12 mb-2 rounded-lg flex items-center justify-center text-white font-bold transition-all duration-300 ${
                    element.isHighlighted
                      ? "bg-green-500 transform scale-105"
                      : "bg-blue-500"
                  }`}
                >
                  {element.value}
                </div>
              ))}
              {stack.length === 0 && (
                <div className="text-gray-400 text-center my-auto">Stack is empty</div>
              )}
            </div>
          </div>

          {/* Operation History */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Operation History</h2>
            <div className="h-[500px] overflow-y-auto border rounded-lg p-4">
              {operationHistory.map((operation, index) => (
                <div
                  key={index}
                  className={`p-2 mb-2 rounded-lg ${
                    operation.startsWith("Error")
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {operation}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default StackVisualizerPage 