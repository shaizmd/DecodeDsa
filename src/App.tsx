import { Routes, Route } from "react-router-dom"
import HomePage from "./page"
import SortingAlgorithmsPage from "./pages/SortingAlgorithmsPage"
import SearchingAlgorithmsPage from "./pages/SearchingAlgorithmsPage"
import StackVisualizerPage from "./pages/StackVisualizerPage"
import QueueVisualizerPage from "./pages/QueueVisualizerPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sorting" element={<SortingAlgorithmsPage />} />
      <Route path="/searching" element={<SearchingAlgorithmsPage />} />
      <Route path="/data-structures/stack" element={<StackVisualizerPage />} />
      <Route path="/data-structures/queue" element={<QueueVisualizerPage />} />
    </Routes>
  )
}

export default App
