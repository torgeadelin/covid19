import React, { Component } from "react";
import * as d3 from "d3";

export default class LineChart extends Component {
  constructor(props) {
    super(props);
    this.ID = Math.random().toString(36).substr(2, 9);
  }

  createLineChart() {
    var margin = { top: 1, right: 0, bottom: 1, left: 0 },
      width = this.props.width - margin.left - margin.right,
      height = this.props.height - margin.top - margin.bottom;

    var svg = d3
      .select("#line_" + this.ID)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // every 7 days
    var data = this.props.data.filter((v, i) => i % 7 ===0).sort((a, b) => new Date(b.key) - new Date(a.key))


    // Add X axis --> it is a date format
    var x = d3.scaleTime().domain([0, data.length]).range([0, width]);
    // Add Y axis
    var y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, d => {
          if(this.props.cases === true) return +d.totalCases
          if(this.props.deaths === true) return +d.totalDeaths
        }),
      ])
      .range([0, height]);

    // Add the line
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", this.props.color)
      .attr("stroke-width", 1)
      .attr(
        "d",
        d3
          .line()
          .x(function (d, i) {
            return x(i);
          })
          .y(d => {
            if(this.props.cases === true) return y(d.totalCases)
            if(this.props.deaths === true) return y(d.totalDeaths)
          })
          .curve(d3.curveMonotoneX)
      );

    var areaGradient = svg
      .append("defs")
      .append("linearGradient")
      .attr("id", "areaGradient_" + this.ID)
      .attr("x1", "60%")
      .attr("y1", "10%")
      .attr("x2", "100%")
      .attr("y2", "100%");
    areaGradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", this.props.color)
      .attr("stop-opacity", 0.5);
    areaGradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "white")
      .attr("stop-opacity", 0);
    svg
      .append("path")
      .datum(data)
      .attr(
        "d",
        d3
          .area()
          .x(function (d, i) {
            return x(i);
          })
          .y0(height)
          .y1(d => {
            if(this.props.cases === true) return y(d.totalCases)
            if(this.props.deaths === true) return y(d.totalDeaths)
          })
          .curve(d3.curveMonotoneX)
      )
      .style("fill", "url(#areaGradient_" + this.ID +")")

  }

  componentDidMount() {
    this.createLineChart();
  }

  render() {
    return <div id={"line_" + this.ID}></div>;
  }
}
