import React, { useState } from 'react';
import './DragNDrop.css';

function DragNdrop() {
  const [file, setFile] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="App">
      <h1>Drag and Drop File Interface</h1>
      <div
        className="drop-area"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {file ? (
          <div>
            <h2>File Uploaded:</h2>
            <p>{file.name}</p>
          </div>
        ) : (
          <p>Drag and drop a file here or click to select a file</p>
        )}
      </div>
    </div>
  );
}

export default DragNdrop;
