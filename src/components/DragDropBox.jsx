import React, { useState } from 'react';
import './DragDropBox.css';

function DragDropBox({ onImageDrop }) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      onImageDrop(files[0]);
    }
  };

  return (
    <div
      className={`drag-drop-box ${isDragging ? 'dragging' : ''}`}
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <div className="drag-drop-content">
        <i className="upload-icon">📁</i>
        <p>Drag and drop your image here</p>
        <p className="subtitle">Supports JPG and PNG</p>
      </div>
    </div>
  );
}

export default DragDropBox; 