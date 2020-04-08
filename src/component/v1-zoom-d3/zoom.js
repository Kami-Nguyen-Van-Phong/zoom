import React, { Component } from 'react';
import './zoom.css';

export class zoom extends Component {
    constructor(props) {
        super(props);

    }

    var margin = { top: -5, right: -5, bottom: -5, left: -5 },
    width = 460 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

var zoom = d3.zoom()
    .scaleExtent([1, 10])
    .on("zoom", zoomed);

console.log(zoom.scaleExtent()[0], zoom.scaleExtent()[1]);

var drag = d3.drag()
    .subject(function (d) { return d; })
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended);

var slider = d3.select("body").append("p").append("input")
    .datum({})
    .attr("type", "range")
    .attr("value", zoom.scaleExtent()[0])
    .attr("min", zoom.scaleExtent()[0])
    .attr("max", zoom.scaleExtent()[1])
    .attr("step", (zoom.scaleExtent()[1] - zoom.scaleExtent()[0]) / 100)
    .on("input", slided);

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.right + ")")
    .call(zoom);

var rect = svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .style("fill", "none")
    .style("pointer-events", "all");

var container = svg.append("g");

container.append("g")
    .attr("class", "x axis")
    .selectAll("line")
    .data(d3.range(0, width, 10))
    .enter().append("line")
    .attr("x1", function (d) { return d; })
    .attr("y1", 0)
    .attr("x2", function (d) { return d; })
    .attr("y2", height);

container.append("g")
    .attr("class", "y axis")
    .selectAll("line")
    .data(d3.range(0, height, 10))
    .enter().append("line")
    .attr("x1", 0)
    .attr("y1", function (d) { return d; })
    .attr("x2", width)
    .attr("y2", function (d) { return d; });

d3.tsv("dots.tsv", dottype, function (error, dots) {
    dot = container.append("g")
        .attr("class", "dot")
        .selectAll("circle")
        .data(dots)
        .enter().append("circle")
        .attr("r", 5)
        .attr("cx", function (d) { return d.x; })
        .attr("cy", function (d) { return d.y; })
        .call(drag);
});

dottype = (d) => {
    d.x = +d.x;
    d.y = +d.y;
    return d;
}

zoomed=()=> {
    const currentTransform = d3.event.transform;
    container.attr("transform", currentTransform);
    slider.property("value", currentTransform.k);
}

dragstarted=(d)=> {
    d3.event.sourceEvent.stopPropagation();
    d3.select(this).classed("dragging", true);
}

dragged=(d)=> {
    d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
}

dragended=(d)=> {
    d3.select(this).classed("dragging", false);
}

slided=(d)=> {
    zoom.scaleTo(svg, d3.select(this).property("value"));
}

render() {
    return (
        <div>

        </div>
    )
}
}

export default zoom
