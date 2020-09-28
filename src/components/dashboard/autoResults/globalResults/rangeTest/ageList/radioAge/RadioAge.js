import React from 'react';
import './RadioAge.css';

const RadioAge = ({
  title,
  total,
  color,
  percentage,
  handleSelect,
  isSelected,
  name,
  showSimptoms,
  withSimp
}) => {
  
  return(
  <div className="item-tab">
    <div className="item-tab-label w-100 row m-0">
      <label className="radio-container d-flex col-2 p-0">
        <input
          type="radio"
          name="levelRisk"
          className="risk-radio"
          checked={isSelected}
          onChange={() => handleSelect(title)}
        />
        <span className="checkmark"></span>
      </label>
      <div className="tab-cases d-flex col-2 p-0">
        <div className="tab-color" style={{ backgroundColor: color }}></div>
      </div>
      <div className="tablinks d-flex justify-content-center col-4 p-0">{name}</div>
      <div className="tablinks d-flex justify-content-center col-2 p-0 font-weight-bold">{total}</div>
      {!showSimptoms && <div className="tablinks d-flex justify-content-end font-weight-bold col-2 p-0">{percentage + '%'}</div>}
      {showSimptoms && <div className="tablinks d-flex justify-content-center font-weight-bold col p-0 red">{withSimp > 0 ? ((withSimp*100)/total).toFixed(2) + '%' : withSimp + '%'}</div>}
    </div>
  </div>
)};

export default RadioAge;
