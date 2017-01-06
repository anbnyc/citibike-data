import React, { Component } from 'react';
import './App.css';

class Finder extends Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(){
    this.props.onUserInput(
      this.filterTextInput.value,
      this.hasBikesInput.checked,
      this.hasDocksInput.checked,
      this.maxDistanceInput.value
    );
  }

  render(){
    return <div>
      <h2>Filter Stations</h2>
      <div>Station Name:
        <input
          type="text"
          placeholder="Type a name..."
          value={this.props.filterText}
          ref={(input) => this.filterTextInput = input}
          onChange={this.handleChange}
          />
      </div>
      <div>Has Bikes Available:
        <input 
          type="checkbox"
          checked={this.props.hasBikes}
          ref={(input)=>this.hasBikesInput = input}
          onChange={this.handleChange}
          />
      </div>
      <div>Has Docks Available:
        <input 
          type="checkbox"
          checked={this.props.hasDocks}
          ref={(input)=>this.hasDocksInput = input}
          onChange={this.handleChange}
          />
      </div>
      <div>Location: Less than or equal to 
        <input
          type="number"
          value={this.props.maxDistance}
          ref={(input)=>this.maxDistanceInput = input}
          onChange={this.handleChange}
          />
      </div>
    </div>
  }
}

export default Finder;