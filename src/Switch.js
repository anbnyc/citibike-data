import React, { Component } from 'react';
import './App.css';

function Switch({bikesOrDocks, update}) {
  return <div className='switch__track'
    onClick={() => update(bikesOrDocks === 'bikes' ? 'docks' : 'bikes')}
    >
    <div className={'switch__thumb ' + bikesOrDocks} />
  </div>
};

export default Switch;