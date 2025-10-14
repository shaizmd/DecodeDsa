"use client"
import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, Calculator, ChevronLeft, ChevronRight, Code } from 'lucide-react'

interface StackElement {
  value: string
  isActive: boolean
  isOperator: boolean
}

interface Step {
  input: string
  stack: StackElement[]
  output: string[]
  currentToken: string
  description: string
  code: string
  tokenIndex: number
}

type ConversionType = "infix-to-postfix" | "infix-to-prefix" | "postfix-to-infix" | "prefix-to-infix" | "postfix-to-prefix" | "prefix-to-postfix"

function ExpressionConverterPage() {
  const [inputExpression, setInputExpression] = useState<string>("A + B * C - D")
  const [conversionType, setConversionType] = useState<ConversionType>("infix-to-postfix")
  const [steps, setSteps] = useState<Step[]>([])
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [isVisualizing, setIsVisualizing] = useState<boolean>(false)
  const [showFullCode, setShowFullCode] = useState<boolean>(false)
  const [result, setResult] = useState<string>("")

  const resetVisualization = () => {
    setSteps([])
    setCurrentStep(0)
    setIsVisualizing(false)
    setShowFullCode(false)
    setResult("")
  }

  // Utility functions
  const isOperator = (char: string): boolean => {
    return ['+', '-', '*', '/', '^', '(', ')'].includes(char)
  }

  const getPrecedence = (op: string): number => {
    switch (op) {
      case '+':
      case '-':
        return 1
      case '*':
      case '/':
        return 2
      case '^':
        return 3
      default:
        return 0
    }
  }

  const isRightAssociative = (op: string): boolean => {
    return op === '^'
  }

  const tokenize = (expression: string): string[] => {
    return expression.replace(/\s+/g, '').split('').filter(char => char !== ' ')
  }

  const reverseString = (str: string): string => {
    return str.split('').reverse().join('')
  }

  const swapParentheses = (expression: string): string => {
    return expression.replace(/$$/g, 'TEMP').replace(/$$/g, '(').replace(/TEMP/g, ')')
  }

  // Infix to Postfix conversion
  const generateInfixToPostfixSteps = (expression: string) => {
    const newSteps: Step[] = []
    const tokens = tokenize(expression)
    const stack: string[] = []
    const output: string[] = []

    // Initial state
    newSteps.push({
      input: expression,
      stack: [],
      output: [],
      currentToken: "",
      description: "Initialize empty stack and output array",
      code: `# Infix to Postfix Conversion
stack = []
output = []`,
      tokenIndex: -1,
    })

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i]

      if (!isOperator(token)) {
        // Operand
        output.push(token)
        newSteps.push({
          input: expression,
          stack: stack.map((item, idx) => ({
            value: item,
            isActive: false,
            isOperator: isOperator(item),
          })),
          output: [...output],
          currentToken: token,
          description: `'${token}' is an operand, add to output`,
          code: `# Operand found
if isOperand(token):
    output.append(token)`,
          tokenIndex: i,
        })
      } else if (token === '(') {
        // Left parenthesis
        stack.push(token)
        newSteps.push({
          input: expression,
          stack: stack.map((item, idx) => ({
            value: item,
            isActive: idx === stack.length - 1,
            isOperator: isOperator(item),
          })),
          output: [...output],
          currentToken: token,
          description: `'${token}' is left parenthesis, push to stack`,
          code: `# Left parenthesis
if token == '(':
    stack.append(token)`,
          tokenIndex: i,
        })
      } else if (token === ')') {
        // Right parenthesis
        while (stack.length > 0 && stack[stack.length - 1] !== '(') {
          const poppedOp = stack.pop()!
          output.push(poppedOp)
          newSteps.push({
            input: expression,
            stack: stack.map((item, idx) => ({
              value: item,
              isActive: false,
              isOperator: isOperator(item),
            })),
            output: [...output],
            currentToken: token,
            description: `Pop '${poppedOp}' from stack to output`,
            code: `# Pop until '('
while stack and stack[-1] != '(':
    output.append(stack.pop())`,
            tokenIndex: i,
          })
        }
        if (stack.length > 0) {
          stack.pop() // Remove the '('
        }
        newSteps.push({
          input: expression,
          stack: stack.map((item, idx) => ({
            value: item,
            isActive: false,
            isOperator: isOperator(item),
          })),
          output: [...output],
          currentToken: token,
          description: `'${token}' is right parenthesis, pop '(' from stack`,
          code: `# Remove left parenthesis
stack.pop()  # Remove '('`,
          tokenIndex: i,
        })
      } else {
        // Operator
        while (
          stack.length > 0 &&
          stack[stack.length - 1] !== '(' &&
          (getPrecedence(stack[stack.length - 1]) > getPrecedence(token) ||
            (getPrecedence(stack[stack.length - 1]) === getPrecedence(token) && !isRightAssociative(token)))
        ) {
          const poppedOp = stack.pop()!
          output.push(poppedOp)
          newSteps.push({
            input: expression,
            stack: stack.map((item, idx) => ({
              value: item,
              isActive: false,
              isOperator: isOperator(item),
            })),
            output: [...output],
            currentToken: token,
            description: `Pop '${poppedOp}' (higher/equal precedence) to output`,
            code: `# Pop higher precedence operators
while (stack and precedence(stack[-1]) >= precedence(token)):
    output.append(stack.pop())`,
            tokenIndex: i,
          })
        }
        stack.push(token)
        newSteps.push({
          input: expression,
          stack: stack.map((item, idx) => ({
            value: item,
            isActive: idx === stack.length - 1,
            isOperator: isOperator(item),
          })),
          output: [...output],
          currentToken: token,
          description: `Push operator '${token}' to stack`,
          code: `# Push current operator
stack.append(token)`,
          tokenIndex: i,
        })
      }
    }

    // Pop remaining operators
    while (stack.length > 0) {
      const poppedOp = stack.pop()!
      output.push(poppedOp)
      newSteps.push({
        input: expression,
        stack: stack.map((item, idx) => ({
          value: item,
          isActive: false,
          isOperator: isOperator(item),
        })),
        output: [...output],
        currentToken: "",
        description: `Pop remaining operator '${poppedOp}' to output`,
        code: `# Pop remaining operators
while stack:
    output.append(stack.pop())`,
        tokenIndex: -1,
      })
    }

    // Final result
    newSteps.push({
      input: expression,
      stack: [],
      output: [...output],
      currentToken: "",
      description: `Conversion complete! Postfix: ${output.join(' ')}`,
      code: `# Return postfix expression
return ''.join(output)`,
      tokenIndex: -1,
    })

    return { steps: newSteps, result: output.join(' ') }
  }

  // Infix to Prefix conversion
  const generateInfixToPrefixSteps = (expression: string) => {
    const newSteps: Step[] = []
    
    // Step 1: Reverse the expression and swap parentheses
    const reversedExpr = swapParentheses(reverseString(expression))
    
    newSteps.push({
      input: expression,
      stack: [],
      output: [],
      currentToken: "",
      description: `Step 1: Reverse expression and swap parentheses: "${reversedExpr}"`,
      code: `# Infix to Prefix Conversion
# Step 1: Reverse and swap parentheses
reversed_expr = reverse_and_swap("${expression}")`,
      tokenIndex: -1,
    })

    // Step 2: Convert to postfix
    const { steps: postfixSteps, result: postfixResult } = generateInfixToPostfixSteps(reversedExpr)
    
    // Add postfix conversion steps
    postfixSteps.forEach((step, index) => {
      if (index === 0) return // Skip initial step
      newSteps.push({
        ...step,
        description: `Step 2: ${step.description}`,
        code: `# Converting reversed expression to postfix
${step.code}`,
      })
    })

    // Step 3: Reverse the result
    const finalResult = reverseString(postfixResult.replace(/\s+/g, ''))
    
    newSteps.push({
      input: expression,
      stack: [],
      output: finalResult.split(''),
      currentToken: "",
      description: `Step 3: Reverse postfix result: "${finalResult}"`,
      code: `# Step 3: Reverse the postfix result
prefix_result = reverse("${postfixResult}")
return prefix_result`,
      tokenIndex: -1,
    })

    return { steps: newSteps, result: finalResult.split('').join(' ') }
  }

  // Postfix to Infix conversion
  const generatePostfixToInfixSteps = (expression: string) => {
    const newSteps: Step[] = []
    const tokens = tokenize(expression)
    const stack: string[] = []

    newSteps.push({
      input: expression,
      stack: [],
      output: [],
      currentToken: "",
      description: "Initialize stack for postfix to infix conversion",
      code: `# Postfix to Infix Conversion
stack = []`,
      tokenIndex: -1,
    })

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i]

      if (!isOperator(token)) {
        // Operand
        stack.push(token)
        newSteps.push({
          input: expression,
          stack: stack.map((item, idx) => ({
            value: item,
            isActive: idx === stack.length - 1,
            isOperator: false,
          })),
          output: [],
          currentToken: token,
          description: `'${token}' is operand, push to stack`,
          code: `# Push operand to stack
if isOperand(token):
    stack.append(token)`,
          tokenIndex: i,
        })
      } else if (token !== '(' && token !== ')') {
        // Operator
        if (stack.length >= 2) {
          const operand2 = stack.pop()!
          const operand1 = stack.pop()!
          const infixExpr = `(${operand1}${token}${operand2})`
          stack.push(infixExpr)
          
          newSteps.push({
            input: expression,
            stack: stack.map((item, idx) => ({
              value: item,
              isActive: idx === stack.length - 1,
              isOperator: false,
            })),
            output: [],
            currentToken: token,
            description: `Pop ${operand2}, ${operand1}, create (${operand1}${token}${operand2})`,
            code: `# Process operator
operand2 = stack.pop()
operand1 = stack.pop()
infix_expr = f"({operand1}{token}{operand2})"
stack.append(infix_expr)`,
            tokenIndex: i,
          })
        }
      }
    }

    const finalResult = stack.length > 0 ? stack[0] : ""
    newSteps.push({
      input: expression,
      stack: stack.map((item, idx) => ({
        value: item,
        isActive: false,
        isOperator: false,
      })),
      output: [finalResult],
      currentToken: "",
      description: `Conversion complete! Infix: ${finalResult}`,
      code: `# Return final infix expression
return stack[0]`,
      tokenIndex: -1,
    })

    return { steps: newSteps, result: finalResult }
  }

  // Prefix to Infix conversion
  const generatePrefixToInfixSteps = (expression: string) => {
    const newSteps: Step[] = []
    const tokens = tokenize(expression)
    const stack: string[] = []

    newSteps.push({
      input: expression,
      stack: [],
      output: [],
      currentToken: "",
      description: "Initialize stack for prefix to infix conversion (process right to left)",
      code: `# Prefix to Infix Conversion
stack = []
# Process from right to left`,
      tokenIndex: -1,
    })

    // Process from right to left
    for (let i = tokens.length - 1; i >= 0; i--) {
      const token = tokens[i]

      if (!isOperator(token)) {
        // Operand
        stack.push(token)
        newSteps.push({
          input: expression,
          stack: stack.map((item, idx) => ({
            value: item,
            isActive: idx === stack.length - 1,
            isOperator: false,
          })),
          output: [],
          currentToken: token,
          description: `'${token}' is operand, push to stack`,
          code: `# Push operand to stack
if isOperand(token):
    stack.append(token)`,
          tokenIndex: i,
        })
      } else if (token !== '(' && token !== ')') {
        // Operator
        if (stack.length >= 2) {
          const operand1 = stack.pop()!
          const operand2 = stack.pop()!
          const infixExpr = `(${operand1}${token}${operand2})`
          stack.push(infixExpr)
          
          newSteps.push({
            input: expression,
            stack: stack.map((item, idx) => ({
              value: item,
              isActive: idx === stack.length - 1,
              isOperator: false,
            })),
            output: [],
            currentToken: token,
            description: `Pop ${operand1}, ${operand2}, create (${operand1}${token}${operand2})`,
            code: `# Process operator (right to left)
operand1 = stack.pop()
operand2 = stack.pop()
infix_expr = f"({operand1}{token}{operand2})"
stack.append(infix_expr)`,
            tokenIndex: i,
          })
        }
      }
    }

    const finalResult = stack.length > 0 ? stack[0] : ""
    newSteps.push({
      input: expression,
      stack: stack.map((item, idx) => ({
        value: item,
        isActive: false,
        isOperator: false,
      })),
      output: [finalResult],
      currentToken: "",
      description: `Conversion complete! Infix: ${finalResult}`,
      code: `# Return final infix expression
return stack[0]`,
      tokenIndex: -1,
    })

    return { steps: newSteps, result: finalResult }
  }

  // Postfix to Prefix conversion
  const generatePostfixToPrefixSteps = (expression: string) => {
    // Convert postfix to infix first, then infix to prefix
    const { result: infixResult } = generatePostfixToInfixSteps(expression)
    const { result: prefixResult } = generateInfixToPrefixSteps(infixResult)
    
    const newSteps: Step[] = []
    newSteps.push({
      input: expression,
      stack: [],
      output: [],
      currentToken: "",
      description: `Converting postfix to prefix via infix intermediate: ${infixResult}`,
      code: `# Postfix to Prefix (via infix)
infix_result = postfix_to_infix("${expression}")
prefix_result = infix_to_prefix(infix_result)`,
      tokenIndex: -1,
    })

    return { steps: newSteps, result: prefixResult }
  }

  // Prefix to Postfix conversion
  const generatePrefixToPostfixSteps = (expression: string) => {
    // Convert prefix to infix first, then infix to postfix
    const { result: infixResult } = generatePrefixToInfixSteps(expression)
    const { result: postfixResult } = generateInfixToPostfixSteps(infixResult)
    
    const newSteps: Step[] = []
    newSteps.push({
      input: expression,
      stack: [],
      output: [],
      currentToken: "",
      description: `Converting prefix to postfix via infix intermediate: ${infixResult}`,
      code: `# Prefix to Postfix (via infix)
infix_result = prefix_to_infix("${expression}")
postfix_result = infix_to_postfix(infix_result)`,
      tokenIndex: -1,
    })

    return { steps: newSteps, result: postfixResult }
  }

  const handleVisualize = () => {
    try {
      if (!inputExpression.trim()) {
        throw new Error("Please enter an expression")
      }

      resetVisualization()
      setIsVisualizing(true)

      let conversionResult: { steps: Step[]; result: string }

      switch (conversionType) {
        case "infix-to-postfix":
          conversionResult = generateInfixToPostfixSteps(inputExpression)
          break
        case "infix-to-prefix":
          conversionResult = generateInfixToPrefixSteps(inputExpression)
          break
        case "postfix-to-infix":
          conversionResult = generatePostfixToInfixSteps(inputExpression)
          break
        case "prefix-to-infix":
          conversionResult = generatePrefixToInfixSteps(inputExpression)
          break
        case "postfix-to-prefix":
          conversionResult = generatePostfixToPrefixSteps(inputExpression)
          break
        case "prefix-to-postfix":
          conversionResult = generatePrefixToPostfixSteps(inputExpression)
          break
        default:
          throw new Error("Invalid conversion type")
      }

      setSteps(conversionResult.steps)
      setResult(conversionResult.result)
      setIsVisualizing(false)
    } catch (err) {
      alert(err instanceof Error ? err.message : "Please enter a valid expression")
      setIsVisualizing(false)
    }
  }

  const getFullCode = () => {
    switch (conversionType) {
      case "infix-to-postfix":
        return `def infix_to_postfix(expression):
    stack = []
    output = []
    
    for token in expression:
        if token.isalnum():  # Operand
            output.append(token)
        elif token == '(':
            stack.append(token)
        elif token == ')':
            while stack and stack[-1] != '(':
                output.append(stack.pop())
            stack.pop()  # Remove '('
        else:  # Operator
            while (stack and stack[-1] != '(' and
                   precedence(stack[-1]) >= precedence(token)):
                output.append(stack.pop())
            stack.append(token)
    
    while stack:
        output.append(stack.pop())
    
    return ''.join(output)`

      case "infix-to-prefix":
        return `def infix_to_prefix(expression):
    # Step 1: Reverse and swap parentheses
    reversed_expr = reverse_and_swap_parentheses(expression)
    
    # Step 2: Convert to postfix
    postfix = infix_to_postfix(reversed_expr)
    
    # Step 3: Reverse the result
    prefix = reverse(postfix)
    
    return prefix`

      case "postfix-to-infix":
        return `def postfix_to_infix(expression):
    stack = []
    
    for token in expression:
        if token.isalnum():  # Operand
            stack.append(token)
        else:  # Operator
            operand2 = stack.pop()
            operand1 = stack.pop()
            infix_expr = f"({operand1}{token}{operand2})"
            stack.append(infix_expr)
    
    return stack[0]`

      case "prefix-to-infix":
        return `def prefix_to_infix(expression):
    stack = []
    
    # Process from right to left
    for token in reversed(expression):
        if token.isalnum():  # Operand
            stack.append(token)
        else:  # Operator
            operand1 = stack.pop()
            operand2 = stack.pop()
            infix_expr = f"({operand1}{token}{operand2})"
            stack.append(infix_expr)
    
    return stack[0]`

      case "postfix-to-prefix":
        return `def postfix_to_prefix(expression):
    # Convert via infix intermediate
    infix = postfix_to_infix(expression)
    prefix = infix_to_prefix(infix)
    return prefix`

      case "prefix-to-postfix":
        return `def prefix_to_postfix(expression):
    # Convert via infix intermediate
    infix = prefix_to_infix(expression)
    postfix = infix_to_postfix(infix)
    return postfix`

      default:
        return ""
    }
  }

  const conversionOptions = [
    { value: "infix-to-postfix", label: "Infix → Postfix", example: "A + B * C" },
    { value: "infix-to-prefix", label: "Infix → Prefix", example: "A + B * C" },
    { value: "postfix-to-infix", label: "Postfix → Infix", example: "A B C * +" },
    { value: "prefix-to-infix", label: "Prefix → Infix", example: "+ A * B C" },
    { value: "postfix-to-prefix", label: "Postfix → Prefix", example: "A B C * +" },
    { value: "prefix-to-postfix", label: "Prefix → Postfix", example: "+ A * B C" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <header className="bg-white dark:bg-slate-800 shadow-sm border-b dark:border-slate-700">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link to="/" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              </Link>
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Expression Converter
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Algorithm Info */}
        <div className="mb-8 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Expression Notation Converter</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Convert mathematical expressions between infix, prefix, and postfix notations with step-by-step visualization.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="font-semibold text-blue-800">Infix</div>
              <div className="text-blue-700 text-sm">A + B * C (operators between operands)</div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="font-semibold text-purple-800">Prefix</div>
              <div className="text-purple-700 text-sm">+ A * B C (operators before operands)</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="font-semibold text-green-800">Postfix</div>
              <div className="text-green-700 text-sm">A B C * + (operators after operands)</div>
            </div>
          </div>
        </div>

        {/* Conversion Type Selection */}
        <div className="mb-8 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Select Conversion Type</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {conversionOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  setConversionType(option.value as ConversionType)
                  setInputExpression(option.example)
                  resetVisualization()
                }}
                className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                  conversionType === option.value
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 dark:border-slate-700 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className="font-semibold">{option.label}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">Example: {option.example}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Input Section */}
        <div className="mb-8 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Input Expression</h2>
          <div className="flex flex-col gap-4">
            <div>
              <label htmlFor="expression-input" className="block text-sm font-medium text-gray-700 mb-2">
                Expression
              </label>
              <input
                id="expression-input"
                type="text"
                value={inputExpression}
                onChange={(e) => setInputExpression(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter expression (e.g., A + B * C)"
              />
              <p className="text-sm text-gray-500 mt-1">
                Use letters for operands and +, -, *, /, ^ for operators. Parentheses are supported.
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleVisualize}
                disabled={isVisualizing}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isVisualizing ? "Converting..." : "Convert"}
              </button>
              {result && (
                <div className="flex items-center space-x-2 px-4 py-3 bg-green-50 rounded-lg">
                  <span className="text-green-800 font-semibold">Result:</span>
                  <span className="text-green-700 font-mono">{result}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Visualization Section */}
        {steps.length > 0 && (
          <div className="space-y-8">
            {/* Expression Visualization */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700 p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Expression Processing</h2>
              <div className="space-y-4">
                {/* Input Expression */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Input Expression</h3>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {tokenize(steps[currentStep].input).map((token, index) => (
                      <div
                        key={index}
                        className={`w-12 h-12 flex items-center justify-center rounded-lg text-lg font-semibold transition-all duration-200 ${
                          index === steps[currentStep].tokenIndex
                            ? "bg-blue-500 text-white shadow-lg"
                            : isOperator(token)
                              ? "bg-orange-100 text-orange-700"
                              : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {token}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Current Token */}
                {steps[currentStep].currentToken && (
                  <div className="text-center">
                    <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-100 rounded-lg">
                      <span className="text-blue-800 font-semibold">Current Token:</span>
                      <span className="text-blue-700 font-mono text-lg">{steps[currentStep].currentToken}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Stack Visualization */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700 p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Stack State</h2>
              <div className="flex flex-col-reverse items-center gap-2 min-h-[100px]">
                {steps[currentStep].stack.length === 0 ? (
                  <div className="text-gray-500 italic">Stack is empty</div>
                ) : (
                  steps[currentStep].stack.map((element, index) => (
                    <div
                      key={index}
                      className={`min-w-[80px] h-12 flex items-center justify-center rounded-lg border-2 transition-all duration-200 px-2 ${
                        element.isActive
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : element.isOperator
                            ? "border-orange-300 bg-orange-50 text-orange-700"
                            : "border-gray-300 bg-gray-50 text-gray-700"
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-sm font-semibold truncate">{element.value}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Output Visualization */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700 p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Output</h2>
              <div className="flex flex-wrap gap-2 justify-center min-h-[60px] items-center">
                {steps[currentStep].output.length === 0 ? (
                  <div className="text-gray-500 italic">Output is empty</div>
                ) : (
                  steps[currentStep].output.map((token, index) => (
                    <div
                      key={index}
                      className="min-w-[40px] h-12 flex items-center justify-center rounded-lg bg-green-100 text-green-700 border border-green-300 font-semibold px-2"
                    >
                      {token}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Step Information */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700 p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Step Information</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-700">{steps[currentStep].description}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
                      disabled={currentStep === 0}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                    </button>
                    <span className="text-gray-600 dark:text-gray-300">
                      Step {currentStep + 1} of {steps.length}
                    </span>
                    <button
                      onClick={() => setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1))}
                      disabled={currentStep === steps.length - 1}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Code Section */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Code</h2>
                <button
                  onClick={() => setShowFullCode(!showFullCode)}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                >
                  <Code className="w-5 h-5" />
                  <span>{showFullCode ? "Show Current Step" : "Show Full Code"}</span>
                </button>
              </div>
              <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                <code className="text-sm text-gray-800">{showFullCode ? getFullCode() : steps[currentStep]?.code}</code>
              </pre>
            </div>

            {/* Algorithm Insights */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700 p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Algorithm Insights</h2>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="font-semibold text-blue-800">Stack Usage:</div>
                  <div className="text-blue-700">
                    Stack is used to temporarily store operators and manage precedence during conversion
                  </div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="font-semibold text-purple-800">Precedence Rules:</div>
                  <div className="text-purple-700">
                    ^ (highest) → *, / → +, - (lowest). Higher precedence operators are processed first
                  </div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="font-semibold text-green-800">Applications:</div>
                  <div className="text-green-700">
                    Compilers, calculators, and expression evaluators use these conversions for parsing
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default ExpressionConverterPage


