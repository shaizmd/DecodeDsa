import { Routes, Route } from "react-router-dom"
import HomePage from "./page"
import SortingAlgorithmsPage from "./pages/SortingAlgorithmsPage"
import SearchingAlgorithmsPage from "./pages/SearchingAlgorithmsPage"
import StackVisualizerPage from "./pages/StackVisualizerPage"
import QueueVisualizerPage from "./pages/QueueVisualizerPage"
import ArrayAlgorithmsPage from "./pages/array-algorithms"
import TwoPointerPage from "./pages/array-algorithms/two-pointer"
import PrefixSumPage from "./pages/array-algorithms/prefix-sum"

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sorting" element={<SortingAlgorithmsPage />} />
      <Route path="/searching" element={<SearchingAlgorithmsPage />} />
      <Route path="/data-structures/stack" element={<StackVisualizerPage />} />
      <Route path="/data-structures/queue" element={<QueueVisualizerPage />} />
      <Route path="/array-algorithms" element={<ArrayAlgorithmsPage />} />
      <Route path="/array-algorithms/two-pointer" element={<TwoPointerPage />} />
      <Route path="/array-algorithms/prefix-sum" element={<PrefixSumPage />} />
    </Routes>
  )
}

export default App
