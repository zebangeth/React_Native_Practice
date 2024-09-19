import React from 'react';

interface ForecastItemProps {
  data: any;
  isMetric: boolean;
}

const ForecastItem: React.FC<ForecastItemProps> = ({ data, isMetric }) => {
  const highTemp = isMetric ? data.day.maxtemp_c : data.day.maxtemp_f;
  const lowTemp = isMetric ? data.day.mintemp_c : data.day.mintemp_f;
  const unit = isMetric ? 'C' : 'F';

  return (
    <div className="forecast-item">
      <p>{new Date(data.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
      <p>H: {highTemp}° {unit}</p>
      <p>L: {lowTemp}° {unit}</p>
      <img src={data.day.condition.icon} alt={data.day.condition.text} />
    </div>
  );
};

interface ForecastListProps {
  forecast: any[] | undefined;
  isMetric: boolean;
}

const ForecastList: React.FC<ForecastListProps> = ({ forecast, isMetric }) => {
  if (!forecast) {
    return (
      <div className="forecast-list">
        <h3>3 Day Forecast</h3>
        <div className="forecast-items">
          <p>No forecast data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="forecast-list">
      <h3>3 Day Forecast</h3>
      <div className="forecast-items">
        {forecast.map((day, index) => (
          <ForecastItem key={index} data={day} isMetric={isMetric} />
        ))}
      </div>
    </div>
  );
};

export default ForecastList;
