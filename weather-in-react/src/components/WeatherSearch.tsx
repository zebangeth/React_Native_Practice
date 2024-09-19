import React, { useState } from 'react';

interface WeatherSearchProps {
  onSearch: (zipCode: string) => void;
}

const WeatherSearch: React.FC<WeatherSearchProps> = ({ onSearch }) => {
  const [inputZipCode, setInputZipCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputZipCode.trim()) {
      onSearch(inputZipCode.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputZipCode}
        onChange={(e) => setInputZipCode(e.target.value)}
        placeholder="Enter ZIP code"
      />
      <button type="submit">Get Forecast</button>
    </form>
  );
};

export default WeatherSearch;
