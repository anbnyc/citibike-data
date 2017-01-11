import React, { Component } from 'react';
import './App.css';
import Pie from './Pie.js';
import * as _ from 'lodash';

class Station extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  render() {
    const data = this.props.data;
    return <div className={"station-border"}>
        {[
          <h6 key={"station-header"}>{data.name}</h6>,
          <p className="capacity-label">{data.capacity} total spots</p>,
          <Pie
            key={"station-pie"}
            color={this.props.color}
            r={.5* this.props.height || 100}
            height={this.props.height || 200}
            width={this.props.height || 200}
            data={[
              {
                status: "availableBike",
                value: data.num_bikes_available
              },
              {
                status: "disabledBike",
                value: data.num_bikes_disabled
              },
              {
                status: "availableDock",
                value: data.num_docks_available
              },
              {
                status: "disabledDock",
                value: data.num_docks_disabled
              }
            ]}
            parent={"#svg"+data.station_id}
          />
        ]}
      </div>
  }
}

export default Station;