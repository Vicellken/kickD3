const mockData = [
    { id: 'dsad', value: 30, region: "dsa" },
    { id: 'daFAS', value: 10, region: "DAS" },
    { id: 'dsFASDSAad', value: 90, region: "CXZC" },
];

// d3.select("div")
//     .selectAll("p")
//     .data(mockData)
//     .enter()
//     .append("p")
//     .text(data => data.region)

const xScale = d3.scaleBand()
    .domain(mockData.map(d => d.region))
    .rangeRound([0, 500])
    .padding(0.1)

const yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([300, 0])

const container = d3.select("svg") // change div to svg
    .classed("container", true)
// .style("border", "2px solid red");

const bars = container
    .selectAll(".bar")
    .data(mockData) // data is not binded to container, but .bar
    .enter()
    .append("rect")
    .classed("bar", true)
    // .style("width", "100px")
    // .style("height", data => data.value * 3 + "px")
    .attr("width", xScale.bandwidth())
    .attr("height", data => 300 - yScale(data.value))
    .attr("x", data => xScale(data.region))
    .attr("y", data => yScale(data.value))

setTimeout(() => {
    bars.data(mockData.slice(0, 2)).exit().remove()
}, 2000)