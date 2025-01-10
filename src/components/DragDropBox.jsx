import React, { useState, useRef } from 'react';
import './DragDropBox.css';

function DragDropBox({ onImageDrop }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

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

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onImageDrop(files[0]);
    }
    // Reset the input value so the same file can be uploaded again
    e.target.value = '';
  };

  return (
    <>
      <div
        className={`drag-drop-box ${isDragging ? 'dragging' : ''}`}
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <div className="drag-drop-content">
          <i className="upload-icon">📁</i>
          <p>Drag and drop your image here</p>
          <p className="subtitle">Or click to select a file</p>
          <p className="subtitle">Supports JPG and PNG</p>
        </div>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png"
        style={{ display: 'none' }}
        onChange={handleFileSelect}
      />
    </>
  );
}

export default DragDropBox; 