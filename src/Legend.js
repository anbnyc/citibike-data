import React, { Component } from 'react';
import './App.css';

function Legend({color}) {
  return <div>
    <svg id="legend" height={100}>
    {color.range.map((d,i) =>
      <g className="legend" transform={"translate(0,"+i*20+")"}>
        <rect fill={d} height={16} width={16} />
        <text x={20} y={12} >{color.domain[i]}</text>
      </g>
    )}
    </svg>
  </div>
};

export default Legend;