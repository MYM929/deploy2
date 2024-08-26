import React from 'react';
import './arrow.css';  // Assuming the CSS is in this file

const Arrow = ({ color }) => {
  return (
    <div id="mouse-scroll" style={{ '--primary-color': color }}>
      <div className="mouse">
        <div className="mouse-in"></div>
      </div>
      <div>
        <span className="down-arrow-1"></span>
        <span className="down-arrow-2"></span>
        <span className="down-arrow-3"></span>
      </div>
    </div>
  );
};

export default Arrow;
