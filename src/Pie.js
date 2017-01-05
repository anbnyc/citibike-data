import React, { Component } from 'react';
import './App.css';
import * as d3 from 'd3';

class Pie extends Component {
  componentDidMount(){
    initialPie(this.props);
  }
  componentDidUpdate(){
    updatePie(this.props);
  }
  render() {
    const {height, width} = this.props;
    const id = this.props.parent.replace("#","");
    return <svg id={id} height={height} width={width} />
  }
}

function initialPie({r,data,parent,width,height}){
  const pie = d3.pie().value((d)=>d.value)(data);
  const arc = d3.arc().outerRadius(r - 5).innerRadius(0);
  const color = d3.scaleOrdinal()
    .domain(["available","disabled"])
    .range(["#008000","#FF0000"]);
  const svg = d3.select("body").select(parent)
    .append("g")
    .attr("class","arcHolder")
    .attr("transform","translate("+width/2+","+height/2+")");
  const g = svg.selectAll("arc")
    .data(pie)
    .enter().append("g")
    .attr("class","arc");
  g.append("path")
    .attr("d",arc)
    .style("fill",d=>color(d.data.status));
}

function updatePie({r,data,parent}){
  const pie = d3.pie().value((d)=>d.value)(data);
  const arc = d3.arc().outerRadius(r - 5).innerRadius(0);
  const svg = d3.select("body")
    .select(parent)
    .select("g.arcHolder");
  const g = svg.selectAll("g.arc")
    .data(pie);
  g.select("path")
    .attr("d",arc);
}

export default Pie;