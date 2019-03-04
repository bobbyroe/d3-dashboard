import * as d3 from "d3";
d3.select("#root")
    .append("h1")
    .append("text")
    .text(`D3 version: ${d3.version}`);

// Loading external data
d3.json("./351_weather.json").then( (data) => {
    processWeatherData(data.hourly.data);
}, (reason) => { console.log(reason); });


function processWeatherData (hourly) {
    render(hourly);
}

function render (data) {

    // console.log(data);

    const arcs = d3.pie()
        .sort(null)
        .value((d) => { return d.time; });
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
        .attr("fill", (d) => { color(d.data.icon); })

}

// helper fn
function color(prop_name) {
    const prop_colors = {
        "clear-day": "#C0C0C0",
        "clear-night": "#BBDD00",
        "partly-cloudy-day": "#8899CC",
        "partly-cloudy-night": "#77BBDD"
    };
    return prop_colors[prop_name];
}