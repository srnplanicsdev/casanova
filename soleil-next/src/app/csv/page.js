'use client'
import React, { useState } from "react";
import Papa from "papaparse";

export default function CSV() {
  const [jsonData, setJsonData] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true, 
      skipEmptyLines: true,
      complete: function (results) {
        setJsonData(results.data); 
      },
      error: function (error) {
        console.error("Error parsing CSV:", error);
      }
    });
  };

  return (
    <div>
      <h2>CSV to JSON Converter</h2>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      <pre>{JSON.stringify(jsonData, null, 2)}</pre>
    </div>
  );
}