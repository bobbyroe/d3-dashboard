import * as d3 from "d3";
d3.select("#root")
    .append("h1")
    .append("text")
    .text(`D3 version: ${d3.version}`);

// Loading external data
const weather_promise = d3.json("./351_weather.json");
weather_promise.then( (data) => {
    console.log(data);
}, (reason) => {
    console.log(reason);
});