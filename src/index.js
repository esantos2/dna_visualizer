import * as d3 from "d3";
import {testSeq} from '../datasets/test';

document.addEventListener("DOMContentLoaded", () => {

    //read file
    let data = [];
    let baseCounts = {
        "A": 0,
        "T": 0,
        "C": 0,
        "G": 0
    }
    
    let str = testSeq;
    for(let i=0; i < str.length; i++){
        baseCounts[str[i]]++;
        data.push(str[i]);
    }

    let baseArr = [
        {"base": "A", "count": baseCounts["A"]},
        {"base": "T", "count": baseCounts["T"]},
        {"base": "C", "count": baseCounts["C"]},
        {"base": "G", "count": baseCounts["G"]},
    ]

    console.log(data.slice(0, 100));
    console.log("A", baseCounts["A"]);
    console.log("T", baseCounts["T"]);
    console.log("C", baseCounts["C"]);
    console.log("G", baseCounts["G"]);

    //display graph
    
    //get svg element dimensions
    const svg = d3.select("svg");
    const margin = 200;
    const width = svg.attr("width") - margin;
    const height = svg.attr("height") - margin;

    //title
    svg.append("text")
        .attr("transform", "translate(100,0)")
        .attr("x", 50)
        .attr("y", 50)
        .attr("font-size", "24px")
        .text("Nucleotide Frequencies")

    //set axes
    const xScale = d3.scaleBand()
        .domain(Object.keys(baseCounts).map(function (k) { return k; }))
        .range([0, width])
        .padding(0.4);
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(Object.values(baseCounts), function (v) { return v; })])    
        .range([height, 0]);

    const g = svg.append("g")
        .attr("transform", "translate(" + 100 + "," + 100 + ")");

    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale))
        .append("text")
        .attr("y", height - 250)
        .attr("x", width - 100)
        .attr("text-anchor", "end")
        .attr("stroke", "black")
        .text("Nucleotide Base");

    g.append("g")
        .call(d3.axisLeft(yScale).tickFormat(function (d) {
            return d;
        })
        .ticks(12))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "-5.1em")
        .attr("text-anchor", "end")
        .attr("stroke", "black")
        .text("Frequency");


    g.selectAll(".bar")
        .data(baseArr)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) { return xScale(d.base); })
        .attr("y", function (d) { return yScale(d.count); })
        .attr("width", xScale.bandwidth())
        .attr("height", function (d) { return height - yScale(d.count); });
})