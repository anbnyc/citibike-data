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

function initialPie({r,data,parent,width,height,color}){
  const pie = d3.pie().value((d)=>d.value)(data);
  const arc = d3.arc().outerRadius(r - 5).innerRadius(0);
  const labelArc = d3.arc().outerRadius(.6 * r).innerRadius(.6 * r)
  const colorScale = d3.scaleOrdinal()
    .domain(color.domain)
    .range(color.range);
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
    .style("fill",d=>colorScale(d.data.status));
  g.append("text")
    .attr("class","pie-label")
    .attr("transform",d=>"translate("+labelArc.centroid(d)+")")
    .attr("x",-4)
    .text(d=>d.data.value === 0 ? "" : d.data.value);
}

function updatePie({r,data,parent}){
  const pie = d3.pie().value((d)=>d.value)(data);
  const arc = d3.arc().outerRadius(r - 5).innerRadius(0);
  const labelArc = d3.arc().outerRadius(.6 * r).innerRadius(.6 * r)
  const svg = d3.select("body")
    .select(parent)
    .select("g.arcHolder");
  const g = svg.selectAll("g.arc")
    .data(pie);
  g.select("path")
    .attr("d",arc);
  g.select("text")
    .attr("transform",d=>"translate("+labelArc.centroid(d)+")")
    .text(d=>d.data.value === 0 ? "" : d.data.value);
}

export default Pie;