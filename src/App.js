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
      bikesOrDocks: "bikes"
    };
  }
  componentWillMount(){
    request('https://gbfs.citibikenyc.com/gbfs/en/station_status.json', (error, data) => {
      if (error) {
        this.setState({loadError: true})
      }
      this.setState({
        data: JSON.parse(data.response).data.stations
      });
      // console.log(this.state);
    })
  }
  render() {
    // console.log(this.state);
    return (
      <div className="App" >
        <div style={{ display: "flex", flexDirection: "row" }}>
          <StationMaster data={this.state.data ? this.state.data : []} />
          <Switch
            bikesOrDocks={this.state.bikesOrDocks}
            update={(d) => this.setState({bikesOrDocks: d})}
          />
          <div id="findAStation">Find a Station</div>
        </div>
        <div>
          <Station data={this.state.data ? this.state.data[0] : []}/>
        </div>
      </div>
    );
  }
}

export default App;
