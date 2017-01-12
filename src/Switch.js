import React, { Component } from 'react';
import './App.css';

function Switch({unit, update}) {
  return <div style={{ display: "flex", flexDirection: "row"}}>
    <h6>{"Showing "+unit}</h6>
    <div className='switch__track'
      onClick={() => update(unit === 'bikes' ? 'docks' : 'bikes')}
      >
      <div className={'switch__thumb ' + unit} />
    </div>
  </div>
};

export default Switch;