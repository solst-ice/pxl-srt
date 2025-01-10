import React, { useState } from 'react';
import DragDropBox from './components/DragDropBox';
import ImageComparison from './components/ImageComparison';
import { sortPixelsByColor } from './utils/imageProcessing';
import './App.css';

function App() {
  const [originalImage, setOriginalImage] = useState(null);
  const [sortedImage, setSortedImage] = useState(null);

  const handleImageDrop = async (file) => {
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = async () => {
          setOriginalImage(e.target.result);
          const sorted = await sortPixelsByColor(img);
          setSortedImage(sorted);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="App">
      <h1>PXL-SRT</h1>
      {!originalImage ? (
        <DragDropBox onImageDrop={handleImageDrop} />
      ) : (
        <ImageComparison 
          originalImage={originalImage} 
          sortedImage={sortedImage} 
        />
      )}
    </div>
  );
}

export default App; 