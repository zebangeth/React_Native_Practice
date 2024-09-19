import React from "react";

interface UnitToggleProps {
  data: any;
  isMetric: boolean;
  onToggle: () => void;
}

const UnitToggle: React.FC<UnitToggleProps> = ({ data, isMetric, onToggle }) => {
  return (
    <button onClick={onToggle} disabled={!data} className="unit-toggle">
      Switch to {isMetric ? "Imperial" : "Metric"}
    </button>
  );
};

export default UnitToggle;
