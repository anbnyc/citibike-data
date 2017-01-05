import React, { Component } from 'react';
import { request } from 'd3-request';
import './App.css';
import StationMaster from './StationMaster.js';
import Station from './Station.js';
import Switch from './Switch.js';
import Finder from './Finder.js';

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
        data: JSON.parse(data.response).data.stations
      });
    })
  }
  render() {
    const data = this.state.data ? this.state.data : [];
    return (
      <div className="App" >
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
          <StationMaster 
            style={{ display: "flex", flexGrow: "1"}}
            data={this.state.data ? this.state.data : []} />
          <Switch
            style={{ display: "flex", flexGrow: "1"}}
            unit={this.state.unit}
            update={(d) => this.setState({unit: d})}
          />
          <Finder
            style={{ display: "flex", flexGrow: "1"}}
          />
        </div>
        <div style={{display: "flex", flexWrap: "wrap"}}>
          {data.map(d => 
            <Station 
              data={d ? d : {}}
              height={100}
              key={d.station_id}
              unit={this.state.unit}
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;
