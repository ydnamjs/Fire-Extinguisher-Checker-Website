import React, { useState } from 'react';
import './App.css';

function App() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (file) {
      alert(`File ${file.name} successfully submitted.`);
    } else {
      alert('File submit failed');
    }
  };
  
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Upload Your Spreadsheet File
        </p>
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} />
          <button type="submit">Submit</button>
        </form>
      </header>
    </div>
  );
}

export default App;
