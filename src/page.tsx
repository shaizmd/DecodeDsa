import { Link } from "react-router-dom"
import { ArrowUpDown, Search, Database, Play, BookOpen, Zap, ChevronRight, Code2, Brain, Target } from "lucide-react"

export default function Page() {
  const categories = [
    {
      title: "Sorting Algorithms",
      description: "Visualize how different sorting algorithms work step by step",
      icon: ArrowUpDown,
      color: "from-blue-500 to-cyan-500",
      algorithms: [
        {
          name: "Interactive Sorting Visualizer",
          path: "/sorting",
          description: "Bubble, Selection, Insertion, Merge, Quick & Heap Sort",
        },
      ],
    },
    {
      title: "Searching Algorithms",
      description: "Explore various search techniques and their implementations",
      icon: Search,
      color: "from-green-500 to-emerald-500",
      algorithms: [
        {
          name: "Interactive Searching Visualizer",
          path: "/searching",
          description: "Linear and Binary Search with step-by-step visualization",
        },
      ],
    },
    {
      title: "Array Algorithms",
      description: "Visualize two pointer, three pointer, and sliding window techniques",
      icon: Target,
      color: "from-orange-500 to-yellow-500",
      algorithms: [
        {
          name: "Array Algorithms Visualizer",
          path: "/array-algorithms",
          description: "Two Pointer, Three Pointer, Sliding Window step-by-step visualization",
        },
      ],
    },
    {
      title: "Data Structures",
      description: "Learn fundamental data structures with interactive examples",
      icon: Database,
      color: "from-purple-500 to-pink-500",
      algorithms: [
        { name: "Linked List", path: "/data-structures/linked-list", description: "Dynamic linear data structure" },
        { name: "Binary Tree", path: "/data-structures/binary-tree", description: "Hierarchical tree structure" },
        { name: "Stack", path: "/data-structures/stack", description: "LIFO data structure" },
        { name: "Queue", path: "/data-structures/queue", description: "FIFO data structure" },
      ],
    },
    {
      title: "Operations",
      description: "Convert between infix, prefix, and postfix expressions",
      icon: BookOpen,
      color: "from-teal-500 to-lime-500",
      algorithms: [
        {
          name: "Expression Converter",
          path: "/operations/expression-converter",
          description: "Convert infix, prefix, and postfix expressions",
        },
      ],
    },
  ]

  const features = [
    {
      icon: Play,
      title: "Interactive Visualizations",
      description: "Step-by-step animations showing how algorithms work",
    },
    {
      icon: Code2,
      title: "Code Examples",
      description: "Complete implementations with detailed explanations",
    },
    {
      icon: Brain,
      title: "Learn by Doing",
      description: "Hands-on approach to understanding complex concepts",
    },
    {
      icon: Target,
      title: "Complexity Analysis",
      description: "Time and space complexity for each algorithm",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4 mr-2" />
              Interactive Learning Platform
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Master{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Data Structures
              </span>{" "}
              &{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Algorithms
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              Visualize, understand, and master fundamental computer science concepts through interactive animations and
              step-by-step explanations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/sorting"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Visualizing
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>

              <button className="inline-flex items-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-200">
                <BookOpen className="w-5 h-5 mr-2" />
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Platform?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the most intuitive way to learn algorithms and data structures
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-200">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-16 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Categories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from our comprehensive collection of algorithms and data structures
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div key={category.title} className="group">
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 transform hover:-translate-y-2">
                  {/* Category Header */}
                  <div className={`h-32 bg-gradient-to-r ${category.color} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative h-full flex items-center justify-center">
                      <category.icon className="w-12 h-12 text-white" />
                    </div>
                  </div>

                  {/* Category Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{category.title}</h3>
                    <p className="text-gray-600 text-sm mb-6">{category.description}</p>

                    <div className="space-y-3">
                      {category.algorithms.map((algorithm) => (
                        <Link
                          key={algorithm.name}
                          to={algorithm.path}
                          className="block p-4 bg-gray-50 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-xl transition-all duration-200 group/item border border-transparent hover:border-blue-200"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 group-hover/item:text-blue-700 transition-colors">
                                {algorithm.name}
                              </h4>
                              <p className="text-sm text-gray-500 mt-1">{algorithm.description}</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-400 group-hover/item:text-blue-600 transform group-hover/item:translate-x-1 transition-all" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Learning?</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of students and professionals who have mastered algorithms through visualization
          </p>

          <Link
            to="/sorting"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <Play className="w-5 h-5 mr-2" />
            Begin Your Journey
            <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  )
}
