import React, { Component } from "react";
import * as d3 from "d3";
import * as d3_cloud from "d3-cloud";

const limit = 40

export default class CountryCloud extends Component {
  draw = (words, svg, layout) => {
    let max = d3.max(this.state.data, function (d) {
      return d.totalCases;
    })

    let min = d3.min(this.state.data, d => {
      return d.totalCases
    })

    var size = d3.scaleSqrt()
    .domain([min, max])
    .range([15, 90]);

    svg
      .append("g")
      .attr(
        "transform",
        "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")"
      )
      .selectAll("text")
      .data(words)
      .enter()
      .append("g")
      .append("text")
      .style("font-size", function (d) {
        return size(d.amount);
      })
      .attr("text-anchor", "middle")
      .attr("transform", function (d) {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
      })
      .text(function (d) {
        return d.text;
      }).append("title")
      .text(d => d.totalCases);
  };

  createCloud() {
    let margin = { top: 5, right: 5, bottom: 5, left: 5 },
      width = 430 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;
   
    var svg = d3
      .select("#cloud")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var layout = d3_cloud()
      .size([width, height])
      .words(
        this.state.data.map(function (d) {
          if(d.key === "UK") {d.key = "GB"}
          return {
            text: d.key
              .toUpperCase()
              .replace(/./g, (char) =>
                String.fromCodePoint(char.charCodeAt(0) + 127397)
              ),
            amount: d.totalCases,
          };
        })
      )
      .padding(40)
      .fontSize(50)
      .rotate(0)
      .on("end", (d) => this.draw(d, svg, layout));

    layout.start();
  }

  componentDidMount() {
    this.setState({
      data: this.props.data.sort((a, b) => b.totalCases - a.totalCases).slice(0, limit)
    }, () => {
      this.createCloud();
    })

    
  }

  render() {
    return <div id="cloud"></div>;
  }
}
