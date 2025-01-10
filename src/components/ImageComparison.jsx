import React from 'react';
import './ImageComparison.css';

function ImageComparison({ originalImage, sortedImage }) {
  return (
    <div className="image-comparison">
      <div className="image-container">
        <h2>Original</h2>
        <img src={originalImage} alt="Original" />
      </div>
      <div className="image-container">
        <h2>Sorted</h2>
        {sortedImage && <img src={sortedImage} alt="Sorted" />}
      </div>
    </div>
  );
}

export default ImageComparison; 