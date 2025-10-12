import { Link } from "react-router-dom";
import {
  ArrowUpDown,
  Search,
  Database,
  Play,
  BookOpen,
  Zap,
  ChevronRight,
  Code2,
  Brain,
  Target,
  Users,
  Award,
  Star,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";

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
          description: "Two Pointer, Three Pointer, Sliding Window techniques",
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
        { name: "Graph", path: "/data-structures/graph", description: "Graph data structure and algorithms" },
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
  ];

  const features = [
    {
      icon: Play,
      title: "Interactive Visualizations",
      description: "Step-by-step animations that make complex logic simple.",
    },
    {
      icon: Code2,
      title: "Code Examples",
      description: "Every algorithm explained with well-commented code.",
    },
    {
      icon: Brain,
      title: "Learn by Doing",
      description: "Experiment, tweak, and see how code reacts in real time.",
    },
    {
      icon: Target,
      title: "Complexity Analysis",
      description: "Time and space complexity made intuitive to understand.",
    },
  ];

  const stats = [
    { icon: Users, label: "Learners", value: "50K+" },
    { icon: Code2, label: "Algorithms", value: "120+" },
    { icon: Award, label: "Countries", value: "30+" },
    { icon: Brain, label: "Visualizations", value: "300+" },
  ];

  const testimonials = [
    {
      name: "Aarav Sharma",
      feedback:
        "This platform made DSA finally click for me! The visualizations are top-notch.",
      role: "Student, IIT Delhi",
    },
    {
      name: "Neha Patel",
      feedback:
        "Beautiful UI and interactive explanations — makes learning fun again!",
      role: "Software Engineer, Microsoft",
    },
    {
      name: "Rahul Mehta",
      feedback:
        "Perfect for interviews! I understood sorting and trees like never before.",
      role: "SDE, Amazon",
    },
  ];

  const faqs = [
    {
      q: "Is this platform free to use?",
      a: "Yes! You can access all visualizations and explanations for free.",
    },
    {
      q: "Do I need prior coding knowledge?",
      a: "Basic programming familiarity helps, but our visual guides make it beginner-friendly.",
    },
    {
      q: "Can I contribute algorithms?",
      a: "Yes! Visit our GitHub repo to contribute new algorithms or visualizations.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative container mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full mb-6 font-medium">
            <Zap className="w-4 h-4 mr-2" />
            Empower Your DSA Journey
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            Master{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Data Structures
            </span>{" "}
            &{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Algorithms
            </span>{" "}
            Visually
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Experience algorithm learning like never before — intuitive,
            interactive, and deeply visual.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/sorting"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
            >
              <Play className="w-5 h-5 mr-2" /> Start Visualizing
              <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
            <a
              href="#features"
              className="inline-flex items-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all"
            >
              <BookOpen className="w-5 h-5 mr-2" /> Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
 

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Why Choose Our Platform?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            A next-gen platform that transforms abstract concepts into
            interactive, visual stories.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl shadow-md hover:shadow-xl transition-all bg-gradient-to-br from-slate-50 to-white"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl mb-4">
                  <f.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {f.title}
                </h3>
                <p className="text-gray-600">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
           <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <div key={i}>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-md mb-4">
                <s.icon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">{s.value}</h3>
              <p className="text-gray-600">{s.label}</p>
            </div>
          ))}
        </div>
      </section>



         <section className="py-20 bg-gradient-to-br from-purple-700 via-indigo-600 to-blue-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-8">
            How It Works
          </h2>
          <p className="text-indigo-100 text-center max-w-3xl mx-auto mb-16">
            Learn data structures and algorithms visually — step-by-step,
            interactively, and with real-time feedback. Here’s how you can master DSA with us 👇
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Step 1 */}
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-4xl">
                  🎯
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3">1. Choose a Topic</h3>
              <p className="text-indigo-100">
                Select any algorithm or data structure — from sorting and searching
                to graphs and recursion — all in one place.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-4xl">
                  🧠
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3">2. Visualize & Interact</h3>
              <p className="text-indigo-100">
                Watch step-by-step visual animations, tweak input values, and
                explore how algorithms really work behind the scenes.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-4xl">
                  🚀
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3">3. Practice & Master</h3>
              <p className="text-indigo-100">
                Solve challenges, analyze time complexity, and track your progress
                as you grow from beginner to pro in data structures and algorithms.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/sorting"
              className="inline-flex items-center px-10 py-4 bg-white text-indigo-700 font-semibold rounded-xl hover:bg-indigo-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Start Learning Now
              <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Explore Categories
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            Dive deep into topics — from sorting and searching to advanced data
            structures.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <div
                key={cat.title}
                className="rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 overflow-hidden border border-gray-100"
              >
                <div
                  className={`h-32 bg-gradient-to-r ${cat.color} flex items-center justify-center`}
                >
                  <cat.icon className="w-12 h-12 text-white" />
                </div>
                <div className="p-6 text-left">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-6">
                    {cat.description}
                  </p>
                  <div className="space-y-3">
                    {cat.algorithms.map((algo) => (
                      <Link
                        key={algo.name}
                        to={algo.path}
                        className="block p-3 bg-gray-50 rounded-xl hover:bg-blue-50 border border-transparent hover:border-blue-200 transition-all"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {algo.name}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {algo.description}
                            </p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
       {/* How It Works Section */}
   


      {/* FAQ Section */}
    {/* FAQ Section */}
<section className="relative py-24 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-700 text-white overflow-hidden">
  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
  <div className="container mx-auto px-6 relative z-10">
    <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-6">
      Frequently Asked Questions
    </h2>
    <p className="text-indigo-100 text-center mb-16 max-w-2xl mx-auto">
      Everything you need to know about our platform, learning flow, and features.
    </p>

    <div className="max-w-3xl mx-auto space-y-6">
      {[
        {
          q: "What is AlgoVision?",
          a: "AlgoVision is an interactive platform that helps you learn algorithms and data structures visually. You can explore step-by-step animations, tweak inputs, and deeply understand each concept."
        },
        {
          q: "Is AlgoVision free to use?",
          a: "Yes! AlgoVision is completely free for learners. We believe education should be accessible, visual, and engaging for everyone."
        },
        {
          q: "Do I need prior coding knowledge?",
          a: "Not necessarily. We’ve designed visual guides that start from the basics — making it easy for beginners to understand algorithms without heavy math or code."
        },
        {
          q: "Can I practice problems here?",
          a: "Yes! You can solve interactive challenges after visualizing an algorithm. It’s the perfect blend of learning and doing."
        },
        {
          q: "Will new algorithms be added regularly?",
          a: "Absolutely! We’re constantly adding new visualizations, challenges, and topics to help you stay ahead in your DSA journey."
        }
      ].map((item, index) => (
        <details
          key={index}
          className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 transition-all duration-300 hover:bg-white/20 cursor-pointer"
        >
          <summary className="flex justify-between items-center text-xl font-semibold cursor-pointer list-none">
            <span>{item.q}</span>
            <span className="text-indigo-200 transition-transform duration-300 group-open:rotate-180">
              ▼
            </span>
          </summary>
          <p className="mt-4 text-indigo-100 leading-relaxed">{item.a}</p>
        </details>
      ))}
    </div>

    <div className="text-center mt-16">
      <Link
        to="/contact"
        className="inline-flex items-center px-8 py-4 bg-white text-indigo-700 font-semibold rounded-xl hover:bg-indigo-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
      >
        Still have questions? Contact us →
      </Link>
    </div>
  </div>
</section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-3">
              AlgoVisualizer
            </h3>
            <p className="text-sm text-gray-400">
              Interactive platform to master Data Structures & Algorithms
              through visualization.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/sorting" className="hover:text-white">
                  Sorting
                </Link>
              </li>
              <li>
                <Link to="/searching" className="hover:text-white">
                  Searching
                </Link>
              </li>
              <li>
                <Link to="/data-structures" className="hover:text-white">
                  Data Structures
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white">
                <Github className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-white">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-white">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-700 pt-6">
          © {new Date().getFullYear()} AlgoVisualizer. All rights reserved.
        </div>
      </footer>
    </div>
  );
}




/*  <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore Categories
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from our comprehensive visual algorithm categories.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {categories.map((category, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all"
              >
                <div className={`h-32 bg-gradient-to-r ${category.color} flex items-center justify-center`}>
                  <category.icon className="w-12 h-12 text-white drop-shadow-lg" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{category.title}</h3>
                  <p className="text-gray-600 text-sm mb-6">{category.description}</p>
                  <div className="space-y-3">
                    {category.algorithms.map((algo) => (
                      <Link
                        key={algo.name}
                        to={algo.path}
                        className="block p-4 bg-gray-50 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-xl transition-all border hover:border-blue-200"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-900">{algo.name}</h4>
                            <p className="text-sm text-gray-500">{algo.description}</p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
 */



      /* 
 */