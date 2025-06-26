import { Routes, Route } from "react-router-dom"
import HomePage from "./page"
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

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sorting" element={<SortingAlgorithmsPage />} />
      <Route path="/searching" element={<SearchingAlgorithmsPage />} />
      <Route path="/data-structures/stack" element={<StackVisualizerPage />} />
      <Route path="/data-structures/queue" element={<QueueVisualizerPage />} />
      <Route path="/data-structures/linked-list" element={<LinkedListVisualizerPage />} />
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
    </Routes>
  )
}

export default App
