import React from 'react';
import './RadioChart.css'

const RadioChart = ({ title, total, color, handleSelect, isSelected }) => (
  <div className='item-tab'>
    <div className="item-tab-label">
      <label className="radio-container">
        <input
          type="radio"
          name="levelRiskChart"
          className="risk-radio"
          defaultChecked={isSelected}
          onChange={() => handleSelect(title)}
        />
        <span className="checkmark"></span>
      </label>
      <div className="tablinks">
        {title}
      </div>
    </div>
    <div className="tab-cases">
      <div>{total}</div>
      <div className="tab-color" style={{ backgroundColor: color }}></div>
    </div>
  </div>
);

export default RadioChart