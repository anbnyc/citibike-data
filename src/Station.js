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
    const stationId = data.station_id;
    return <div>
        {[
          <h2 key={"station-header"}>{stationId}</h2>,
          <Pie
            key={"station-pie"}
            r={.5* this.props.height || 100}
            height={this.props.height || 200}
            width={this.props.height || 200}
            data={[
              {
                status: "available",
                value: data["num_"+this.props.unit+"_available"]
              },
              {
                status: "disabled",
                value: data["num_"+this.props.unit+"_disabled"]
              }
            ]}
            parent={"#svg"+stationId}
          />
        ]}
      </div>
  }
}

export default Station;