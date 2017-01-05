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
    const bikesOrDocks = this.props.unit ? this.props.unit : this.state.bikesOrDocks;
    const data = this.props.data;
    return <div>
        {[
          <h2>{bikesOrDocks}</h2>,
          <Pie 
            r={.5* this.props.height || 100}
            height={this.props.height || 200}
            width={this.props.height || 200}
            data={[
              {
                status: "available",
                value: data["num_"+bikesOrDocks+"_available"]
              },
              {
                status: "disabled",
                value: data["num_"+bikesOrDocks+"_disabled"]
              }
            ]}
            parent={"#svg"+data.station_id}
          />
        ]}
      </div>
  }
}

export default Station;