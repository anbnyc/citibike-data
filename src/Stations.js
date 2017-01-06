import React, { Component } from 'react';
import './App.css';
import Station from './Station.js';

class Stations extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  componentWillMount(){
    let myLoc;
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
    const data = this.props.data
      .filter(d=>{
        return d.name.indexOf(this.props.filterText) !== -1
          && (this.props.hasBikesInput ? d.num_bikes_available > 0 : true)
          && (this.props.hasDocksInput ? d.num_docks_available > 0 : true)
          && (this.state.myLoc ? distanceCalc({ lat: d.lat, lon: d.lon },this.state.myLoc,this.props.maxDistance) : true);
      });
    return <div className="App-body" style={{display: "flex", flexWrap: "wrap"}}>
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

export default Stations;