import React from 'react';

interface CurrentWeatherProps {
  data: any;
  location: {
    name: string;
    region: string;
  } | null;
  isMetric: boolean;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data, location, isMetric }) => {
  if (!data || !location) {
    return (
      <div className="current-weather">
        <h2>-</h2>
        <p>Feels like -</p>
        <h3>-</h3>
      </div>
    );
  }

  const temperature = isMetric ? data.temp_c : data.temp_f;
  const feelsLike = isMetric ? data.feelslike_c : data.feelslike_f;
  const unit = isMetric ? 'C' : 'F';

  return (
    <div className="current-weather">
      <h2>{`${temperature}° ${unit}`}</h2>
      <p>{`Feels like ${feelsLike}° ${unit}`}</p>
      <h3>{location.name}, {location.region}</h3>
    </div>
  );
};

export default CurrentWeather;
