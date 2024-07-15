import readXlsxFile from 'read-excel-file'
import React, { useState } from 'react';
import './App.css';
import { Extinguisher, ProcessRow } from './ProcessSpreadSheet';
import { RowDisplays } from './RowDisplays';

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<string[]>([])
  const [extinguishers, setExtingishers] = useState<Extinguisher[]>([])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (file) {
      
      let newErrors: string[] = []
      let newExtinguishers: Extinguisher[] = []
      
      await readXlsxFile(file).then((rows) => {
        rows.forEach((row) => {
          const [error, extinguisher] = ProcessRow(row);
          newErrors.push(error as string);
          newExtinguishers.push(extinguisher as Extinguisher)
        })
      })

      setErrors(newErrors);
      setExtingishers(newExtinguishers);
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
        <RowDisplays errors={errors} extinguishers={extinguishers}></RowDisplays>
      </header>
    </div>
  );
}

export default App;
