import React, { Component } from 'react';
import './App.css';
import Station from './Station.js';

class Stations extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  render() {
    const data = this.props.data;
    return <div style={{display: "flex", flexWrap: "wrap"}}>
          {data.map(d => 
            <Station 
              data={d ? d : {}}
              height={100}
              key={d.station_id}
              unit={this.props.unit}
            />
          )}
        </div>
  }
}

export default Stations;