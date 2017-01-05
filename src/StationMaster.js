import React, { Component } from 'react';
import './App.css';
import Station from './Station.js';
import * as _ from 'lodash';

class StationMaster extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  render() {
    const data = this.props.data;
    return <div>
            <h2>All Stations</h2>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Station 
                unit="bikes"
                height={200}
                data={{
                  station_id: 'all_bikes',
                  num_bikes_available: _.reduce(data,(t,v)=>t+v.num_bikes_available,0),
                  num_bikes_disabled: _.reduce(data,(t,v)=>t+v.num_bikes_disabled,0)
                }}/>
              <Station 
                unit="docks"
                height={100}
                data={{
                  station_id: 'all_docks',
                  num_docks_available: _.reduce(data,(t,v)=>t+v.num_docks_available,0),
                  num_docks_disabled: _.reduce(data,(t,v)=>t+v.num_docks_disabled,0)
                }}/>
            </div>
          </div>
  }
}

export default StationMaster;