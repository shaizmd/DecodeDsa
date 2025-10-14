import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Lenis from "lenis";
import Sidebar from "./components/sidebar";
import Home from "./page";
import Placeholder from "./placeholder";
import SortingAlgorithmsPage from "./pages/SortingAlgorithmsPage"
import SearchingAlgorithmsPage from "./pages/SearchingAlgorithmsPage"
import StackVisualizerPage from "./pages/StackVisualizerPage"
import QueueVisualizerPage from "./pages/QueueVisualizerPage"
import ArrayAlgorithmsPage from "./pages/array-algorithms"
import TwoPointerPage from "./pages/array-algorithms/two-pointer"
import PrefixSumPage from "./pages/array-algorithms/prefix-sum"
import KadanesPage from "./pages/array-algorithms/kadanes"
import SlidingWindowPage from "./pages/array-algorithms/sliding-window"
import LinkedListVisualizerPage from "./pages/LinkedListVisualizerPage"
import HashingPage from "./pages/array-algorithms/hashing"
import MonotonicStackPage from "./pages/array-algorithms/monotonic-stack"
import BitManipulationPage from "./pages/array-algorithms/bit-manipulation"
import TwoDArraysPage from "./pages/array-algorithms/2d-arrays"
import TreeVisualizerPage from "./pages/TreeVisualizerPage"
import ExpressionConverterPage from "./pages/ExpressionConverterPage"
import GraphVisualizerPage from "./pages/GraphVisualizerPages"
import AboutUsPage from "./pages/AboutUsPage"
import ContactPage from "./pages/ContactPage"
function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 2.5,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.7,
    });

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      if (typeof lenis.destroy === "function") lenis.destroy();
    };
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 lg:ml-72">
        <Routes>
           <Route path="/sorting" element={<SortingAlgorithmsPage />} />
      <Route path="/searching" element={<SearchingAlgorithmsPage />} />
      <Route path="/data-structures/stack" element={<StackVisualizerPage />} />
      <Route path="/data-structures/queue" element={<QueueVisualizerPage />} />
      <Route path="/data-structures/linked-list" element={<LinkedListVisualizerPage />} />
      <Route path="/data-structures/graph" element={<GraphVisualizerPage />} />
      <Route path="/array-algorithms" element={<ArrayAlgorithmsPage />} />
      <Route path="/array-algorithms/two-pointer" element={<TwoPointerPage />} />
      <Route path="/array-algorithms/prefix-sum" element={<PrefixSumPage />} />
      <Route path="/array-algorithms/kadanes" element={<KadanesPage />} />
      <Route path="/array-algorithms/sliding-window" element={<SlidingWindowPage />} />
      <Route path="/array-algorithms/hashing" element={<HashingPage />} />
      <Route path="/array-algorithms/monotonic-stack" element={<MonotonicStackPage />} />
      <Route path="/array-algorithms/bit-manipulation" element={<BitManipulationPage />} />
      <Route path="/array-algorithms/2d-arrays" element={<TwoDArraysPage />} />
      <Route path="/data-structures/binary-tree" element={<TreeVisualizerPage />} />
      <Route path="/operations/expression-converter" element={<ExpressionConverterPage />} />
      <Route path="/about" element={<AboutUsPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Placeholder />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
