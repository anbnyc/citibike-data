import React, { Component } from 'react';
import * as d3 from 'd3';
import './App.css';
import StationMaster from './StationMaster.js';
import Stations from './Stations.js';
import Switch from './Switch.js';
import Finder from './Finder.js';
import * as _ from 'lodash';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      unit: "bikes",
      filterText: '',
      hasBikes: false,
      hasDocks: false,
      maxDistance: 0
    };
  }
  componentWillMount(){
    d3.queue()
      .defer(d3.request, 'https://gbfs.citibikenyc.com/gbfs/en/station_status.json')
      .defer(d3.request, 'https://gbfs.citibikenyc.com/gbfs/en/station_information.json')
      .awaitAll((error, response) => {
        if (error) {
          this.setState({loadError: true})
        }
        this.setState({
          // [stationStatus, stationInfo]
          data: _.merge(
            JSON.parse(response[0].response).data.stations,
            JSON.parse(response[1].response).data.stations)
        });
      });
  }

  render() {
    const data = this.state.data ? this.state.data : [];
    return (
      <div className="App" >
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
          <StationMaster 
            style={{ display: "flex", flexGrow: "1"}}
            data={data} />
          <Switch
            style={{ display: "flex", flexGrow: "1"}}
            unit={this.state.unit}
            update={(d) => this.setState({unit: d})}
          />
          <Finder
            style={{ display: "flex", flexGrow: "1"}}
          />
        </div>
        <Stations data={data} unit={this.state.unit}/>
      </div>
    );
  }
}

export default App;

/*

{
   "station_id":"72",
   "num_bikes_available":4,
   "num_bikes_disabled":0,
   "num_docks_available":35,
   "num_docks_disabled":0,
   "is_installed":1,
   "is_renting":1,
   "is_returning":1,
   "last_reported":1483722965,
   "eightd_has_available_keys":false,
   "name":"W 52 St & 11 Ave",
   "short_name":"6926.01",
   "lat":40.76727216,
   "lon":-73.99392888,
   "region_id":71,
   "rental_methods":[
      "KEY",
      "CREDITCARD"
   ],
   "capacity":39,
   "eightd_has_key_dispenser":false
}

*/