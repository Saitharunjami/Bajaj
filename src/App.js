import React, { useState } from 'react';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      const response = await fetch('https://your-backend-url.com/bfhl', {  // Replace with your backend URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsedInput)
      });
      const data = await response.json();
      setResponseData(data);
      setError('');
    } catch (err) {
      setError('Invalid JSON or server error');
      setResponseData(null);
    }
  };

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setSelectedFilters(
      selectedFilters.includes(value)
        ? selectedFilters.filter((filter) => filter !== value)
        : [...selectedFilters, value]
    );
  };

  const filteredData = () => {
    if (!responseData) return {};
    const filters = {};
    if (selectedFilters.includes('Numbers')) filters.numbers = responseData.numbers;
    if (selectedFilters.includes('Alphabets')) filters.alphabets = responseData.alphabets;
    if (selectedFilters.includes('Highest lowercase alphabet')) filters.highest_lowercase_alphabet = responseData.highest_lowercase_alphabet;
    return filters;
  };

  return (
    <div>
      <h1>{responseData ? responseData.roll_number : "BFHL Challenge"}</h1>
      <textarea
        rows="5"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder='Enter JSON data'
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {responseData && (
        <div>
          <div>
            <input type="checkbox" value="Numbers" onChange={handleFilterChange} /> Numbers
            <input type="checkbox" value="Alphabets" onChange={handleFilterChange} /> Alphabets
            <input type="checkbox" value="Highest lowercase alphabet" onChange={handleFilterChange} /> Highest lowercase alphabet
          </div>
          <pre>{JSON.stringify(filteredData(), null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
