import React from 'react';
import SearchingVisualizer from './SearchingVisualizer';

// This is the "rulebook" for the props. We are telling TypeScript
// that this component MUST receive an inputArray and a targetValue.
interface ParallelSearchingVisualizerProps {
  inputArray: string;
  targetValue: number;
}

const ParallelSearchingVisualizer: React.FC<ParallelSearchingVisualizerProps> = ({ inputArray, targetValue }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      {/* Left Panel: Always shows Linear Search */}
      <div className="bg-gray-50 rounded-lg p-4 border">
        <h3 className="text-lg font-bold text-center mb-4 text-gray-800">Linear Search</h3>
        <SearchingVisualizer
          algorithm="Linear Search"
          inputArray={inputArray}
          targetValue={targetValue}
        />
      </div>

      {/* Right Panel: Always shows Binary Search */}
      <div className="bg-gray-50 rounded-lg p-4 border">
        <h3 className="text-lg font-bold text-center mb-4 text-gray-800">Binary Search</h3>
        <SearchingVisualizer
          algorithm="Binary Search"
          inputArray={inputArray}
          targetValue={targetValue}
        />
      </div>

    </div>
  );
};

export default ParallelSearchingVisualizer;