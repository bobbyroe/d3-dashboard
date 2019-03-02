import * as d3 from "d3";

d3.select("#root")
    .append("h1")
    .append("text")
    .text(`D3 version: ${d3.version}`);