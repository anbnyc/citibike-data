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
    const datum = {
      name: "All "+this.props.unit,
      station_id: 'all',
      capacity: _.reduce(data,(t,v)=>t+v.capacity,0)
    };
    datum["num_"+this.props.unit+"_available"] = _.reduce(data,(t,v)=>t+v["num_"+this.props.unit+"_available"],0);
    datum["num_"+this.props.unit+"_disabled"] = _.reduce(data,(t,v)=>t+v["num_"+this.props.unit+"_disabled"],0);
    return <div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Station 
                color={this.props.color}
                height={200}
                data={datum}/>
            </div>
          </div>
  }
}

export default StationMaster;