"use strict";
import * as d3 from "d3";
d3.select("#root")
    .append("h1")
    .append("text")
    .text(`D3 version: ${d3.version}`);

// Loading external data
// TODO - fetch weather data in real time from
// dark-sky
d3.json("./TMO-weather.json").then( (data) => {
    processWeatherData(data.hourly.data);
}, (reason) => { console.log(reason); });


function processWeatherData (hourly) {
    // console.log(hourly);
    const weather = [];
    const wtable = {};
    hourly.forEach( (h) => {
        if (wtable[h.icon] !== undefined) {
            wtable[h.icon] += 1;
        } else {
            wtable[h.icon] = 1;
        }
    });
    Object.keys(wtable).forEach( (w) => {
        weather.push({
            name: w,
            value: wtable[w]
        });
    });
    weather.reverse();
    render(weather);
}

function render (data) {

    // console.log(data);

    const arcs = d3.pie()
        .sort(null)
        .value((d) => { return d.value; });
    const svg = d3.select("svg");
    const width = +svg.attr("width");
    const height = +svg.attr("height");
    const radius = 150;
    const pos = {
        x: width * 0.5,
        y: height * 0.5
    };
    const path = d3.arc()
        .innerRadius(0)
        .outerRadius(radius - 10);
    const g = svg.append("g")
        .attr("transform", `translate(${pos.x},${pos.y})`);

    const arc = g.selectAll(".arc")
        .data(arcs(data))
        .enter().append("g")
        .attr("class", "arc");

    arc.append("path")
        .attr("d", path)
        .attr("fill", d => color(d.data.name) );

}

// helper fn
function color(prop_name) {

    console.log(prop_name);
    const prop_colors = {
        "clear-day": "#77BBDD",
        "clear-night": "#223355",
        "cloudy": "#E0E0E0",
        "partly-cloudy-day": "#C0C0C0",
        "partly-cloudy-night": "#606060"
    };
    let col = prop_colors[prop_name] !== undefined
        ? prop_colors[prop_name]
        : "#FF0000"; 
    
    return col;
}