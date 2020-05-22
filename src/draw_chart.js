import * as d3 from "d3";

const drawChart = (baseCounts) => {

    //setup chart data
    let baseArr = [
        { "base": "A", "count": baseCounts["A"] },
        { "base": "T", "count": baseCounts["T"] },
        { "base": "C", "count": baseCounts["C"] },
        { "base": "G", "count": baseCounts["G"] },
    ]
    
    //display graph
    let barChartBox = d3.select(".bar-chart-box");
    barChartBox.selectAll("*").remove();
    barChartBox.append("svg");
    
    const svg = d3.select("svg")
        .attr("width", 500)
        .attr("height", 500);
    
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
        .domain(Object.keys(baseCounts).map((k) => { return k; }))
        .range([0, width])
        .padding(0.4);
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(Object.values(baseCounts), (v) => { return v; })])
        .range([height, 0]);
    const g = svg.append("g")
        .attr("transform", "translate(" + 100 + "," + 100 + ")");
    //draw x-axis
    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale))
        .append("text")
        .attr("y", height - 250)
        .attr("x", width - 100)
        .attr("text-anchor", "end")
        .attr("stroke", "black")
        .text("Nucleotide Base");
    //draw y-axis
    g.append("g")
        .call(d3.axisLeft(yScale).tickFormat((d) => { return d; })
            .ticks(12))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "-5.1em")
        .attr("text-anchor", "end")
        .attr("stroke", "black")
        .text("Frequency");
    
    function handleMouseOver(d, i) {
        d3.select(this).attr('class', 'highlight');
        d3.select(this)
            .transition()
            .duration(200)
            .attr('width', xScale.bandwidth() + 5)
            .attr("y", (d) => { return yScale(d.count) - 10; })
            .attr("height", (d) => { return height - yScale(d.count) + 10; });
    
        g.append("text")
            .attr('class', 'mouse')
            .attr('x', () => { return xScale(d.base) + Math.floor(xScale.bandwidth() / 2); })
            .attr('y', () => { return yScale(d.count) - 15; })
            .text(() => { return [d.count]; })
            .attr("text-anchor", "middle");
    }
    
    function handleMouseOut(d, i) {
        d3.select(this).attr('class', 'bar');
        d3.select(this)
            .transition()
            .duration(200)
            .attr('width', xScale.bandwidth())
            .attr("y", (d) => { return yScale(d.count); })
            .attr("height", (d) => { return height - yScale(d.count); });
        d3.selectAll('.mouse')
            .remove()
    }
    
    //draw bars
    g.selectAll(".bar")
        .data(baseArr)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", (d) => { return xScale(d.base); })
        .attr("y", (d) => { return yScale(d.count); })
        .attr("width", xScale.bandwidth())
        .attr("height", (d) => { return height - yScale(d.count); })
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut)
        .transition()
        .ease(d3.easeLinear)
        .duration(400)
        .delay((d, i) => { return i * 50; });

}

export default drawChart;