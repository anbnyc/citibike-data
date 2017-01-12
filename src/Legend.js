import React, { Component } from 'react';
import _ from 'lodash';
import './App.css';

function Legend({color}) {
  var factor = 40;
  return <div>
    <svg id="legend" height={4*factor}>
    {color.range.map((d,i) =>
      <g className="legend" transform={"translate(100,"+i*factor+")"}>
        <rect fill={d} height={.8*factor} width={.8*factor} />
        <text x={factor} y={.5*factor} >{_.startCase(color.domain[i])}</text>
      </g>
    )}
    </svg>
  </div>
};

export default Legend;