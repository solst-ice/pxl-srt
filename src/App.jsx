import React, { useState } from 'react';
import DragDropBox from './components/DragDropBox';
import ImageComparison from './components/ImageComparison';
import { sortPixelsByColor } from './utils/imageProcessing';
import './App.css';

function App() {
  const [images, setImages] = useState([]);

  const handleImageDrop = async (file) => {
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = async () => {
          const sorted = await sortPixelsByColor(img);
          setImages(prevImages => [...prevImages, {
            id: Date.now(),
            original: e.target.result,
            sorted: sorted
          }]);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="App">
      <h1>PXL-SRT</h1>
      <div className="images-container">
        {images.map(image => (
          <ImageComparison 
            key={image.id}
            originalImage={image.original} 
            sortedImage={image.sorted}
          />
        ))}
      </div>
      <div className="drop-box-container">
        <DragDropBox onImageDrop={handleImageDrop} />
      </div>
    </div>
  );
}

export default App; 