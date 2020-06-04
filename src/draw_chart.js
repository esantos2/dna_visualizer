import * as d3 from "d3";

const drawChart = (baseCounts, box) => {

    //setup chart data
    let baseArr = [
        { "base": "A", "count": baseCounts["A"] },
        { "base": "T", "count": baseCounts["T"] },
        { "base": "C", "count": baseCounts["C"] },
        { "base": "G", "count": baseCounts["G"] },
    ]
    
    //display graph
    let barChartBox = d3.select(box);
    barChartBox.selectAll("*").remove();
    barChartBox.append("svg");
    
    const svg = d3.select(`${box} > svg`)
        .attr("width", 320)
        .attr("height", 320)
    
    const margin = 100;
    const width = svg.attr("width") - margin;
    const height = svg.attr("height") - margin;
    
    const chartName = (box === ".current-seq-box") ? "Current Selection Frequencies" : "Total Strand Frequencies"
    //title
    svg.append("text")
        .attr("transform", "translate(50,0)")
        .attr("x", 10)
        .attr("y", 15)
        .attr("font-size", "14px") //20px
        .text(chartName)
    
    //set graph location
    const g = svg.append("g")
        .attr("transform", "translate(" + 50 + "," + 50 + ")");

    //setup axes
    const xScale = d3.scaleBand()
        .domain(Object.keys(baseCounts).map((k) => { return k; }))
        .range([0, width])
        .padding(0.4);
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(Object.values(baseCounts), (v) => { return v; })])
        .range([height, 0]);
    //draw x-axis
    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale))
        .append("text")
        .attr("y", height - 190) //- 265
        .attr("x", width - 80)   //- 100
        .attr("text-anchor", "end")
        .attr("stroke", "black")
        .text("Nucleotide Base");
    //draw y-axis
    g.append("g")
        .call(d3.axisLeft(yScale).tickFormat((d) => {return d;})
            .ticks(10))
        .append("text")
        .attr("y", 40)
        .attr("dy", "-5.1em")
        .attr("text-anchor", "end")
        .attr("stroke", "black")
        .text("Count");
    
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
        .attr("width", xScale.bandwidth())
        .attr("y", (d) => { return height; })
        .attr("height", (d) => { return 0; })
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut)
        .transition()
        .ease(d3.easeLinear)
        .duration(400)
        .delay((d, i) => { return i * 50; });

    //animate bar heights
    g.selectAll("rect")
        .transition()
        .duration(700)
        .attr("y", (d) => { return yScale(d.count); })
        .attr("height", (d) => { return height - yScale(d.count); })
        .delay((d, i) => { return i * 100; });

}

export default drawChart;