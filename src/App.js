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
      myLoc: {},
      filterText: '',
      hasBikes: false,
      hasDocks: false,
      maxDistance: 0
    };

    this.handleUserInput = this.handleUserInput.bind(this);
  }

  handleUserInput(filterText,hasBikes,hasDocks,maxDistance){
    this.setState({
      filterText: filterText,
      hasBikes: hasBikes,
      hasDocks: hasDocks,
      maxDistance: maxDistance
    });
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

    navigator.geolocation.getCurrentPosition(p=>{
      this.setState({
        myLoc: {
          lat: p.coords.latitude,
          lon: p.coords.longitude
        }
      });
    });
  }

  render() {
    const maxDistance = parseFloat(this.state.maxDistance);
    let data = this.state.data ? this.state.data : [];
    data = data.filter(d=>{
      return (d.name.indexOf(this.state.filterText) !== -1)
        && (this.state.hasBikes ? d.num_bikes_available > 0 : true)
        && (this.state.hasDocks ? d.num_docks_available > 0 : true)
        && (this.state.myLoc ? distanceCalc({ lat: d.lat, lon: d.lon },this.state.myLoc,maxDistance) : true);
    });
    return (
      <div className="App" >
        <div className="App-header" style={{ display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
          <StationMaster 
            style={{ display: "flex", flexGrow: "1"}}
            data={data} />
          <div style={{ display: "flex", flexDirection: "column"}}>
            <Finder style={{ display: "flex", flexGrow: "1"}}
              onUserInput={this.handleUserInput}
              filterText={this.state.filterText}
              hasBikes={this.state.hasBikes}
              hasDocks={this.state.hasDocks}
              maxDistance={this.state.maxDistance}
            />
            <Switch
              style={{ display: "flex", flexGrow: "1"}}
              unit={this.state.unit}
              update={(d) => this.setState({unit: d})}
            />
          </div>
        </div>
        <Stations
          data={data} 
          unit={this.state.unit}
          filterText={this.state.filterText}
          hasBikes={this.state.hasBikes}
          hasDocks={this.state.hasDocks}
          maxDistance={this.state.maxDistance}
          />
      </div>
    );
  }
}

function distanceCalc(loc1,loc2,maxDistance){
  if(maxDistance === 0){
    return true;
  }
  let radlat1 = Math.PI * loc1.lat/180;
  let radlat2 = Math.PI * loc2.lat/180;
  let radlon1 = Math.PI * loc1.lon/180;
  let radlon2 = Math.PI * loc2.lon/180;
  let dlat = radlat2 - radlat1
  let dlon = radlon2 - radlon1
  var dist = 2 * 6372.8 * Math.asin(Math.sqrt(
    Math.pow(Math.sin(dlat/2),2) + Math.cos(radlat1)*Math.cos(radlat2)*Math.pow(Math.sin(dlon/2),2)
  ));
  return (dist*0.621371 <= maxDistance);
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