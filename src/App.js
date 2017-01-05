import React, { Component } from 'react';
import { request } from 'd3-request';
import './App.css';
import StationMaster from './StationMaster.js';
import Station from './Station.js';
import Switch from './Switch.js';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      unit: "bikes"
    };
  }
  componentWillMount(){
    request('https://gbfs.citibikenyc.com/gbfs/en/station_status.json', (error, data) => {
      if (error) {
        this.setState({loadError: true})
      }
      this.setState({
        data: JSON.parse(data.response).data.stations,
        unit: this.state.unit
      });
    })
  }
  render() {
    return (
      <div className="App" >
        <div style={{ display: "flex", flexDirection: "row" }}>
          <StationMaster data={this.state.data ? this.state.data : []} />
          <Switch
            unit={this.state.unit}
            update={(d) => this.setState({unit: d})}
          />
          <div id="findAStation">Find a Station</div>
        </div>
        <div>
          <Station 
            data={this.state.data ? this.state.data[0] : {}}
            unit={this.state.unit}
            />
        </div>
      </div>
    );
  }
}

export default App;
