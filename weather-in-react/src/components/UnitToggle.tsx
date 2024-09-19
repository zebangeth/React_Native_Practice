import React from 'react';

interface UnitToggleProps {
  isMetric: boolean;
  onToggle: () => void;
}

const UnitToggle: React.FC<UnitToggleProps> = ({ isMetric, onToggle }) => {
  return (
    <button onClick={onToggle} className="unit-toggle">
      Switch to {isMetric ? 'Imperial' : 'Metric'}
    </button>
  );
};

export default UnitToggle;
