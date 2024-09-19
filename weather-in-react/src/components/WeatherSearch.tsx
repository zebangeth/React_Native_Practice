import React, { useState } from "react";

interface WeatherSearchProps {
  onSearch: (zipCode: string) => void;
}

const WeatherSearch: React.FC<WeatherSearchProps> = ({ onSearch }) => {
  const [inputZipCode, setInputZipCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputZipCode.trim()) {
      onSearch(inputZipCode.trim());
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <input
        type="text"
        value={inputZipCode}
        onChange={(e) => setInputZipCode(e.target.value)}
        placeholder="Enter ZIP code"
        className="zip-code-input"
        style={{ marginBottom: "10px", padding: "10px", width: "200px" }}
      />
      <button
        type="submit"
        disabled={!inputZipCode.trim()}
        className="get-forecast-button"
        style={{ padding: "10px 20px" }}
      >
        Get Forecast
      </button>
    </form>
  );
};

export default WeatherSearch;
