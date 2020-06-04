// fetch('./raw.json').then(response => response.json().then(data => mockData.push.apply(mockData, data)))
const mockData = [
    {
        "quadrat": 1,
        "name": "Nodilittorina trochoides",
        "type": "Littorinids",
        "form": "mobile",
        "cnt": 2
    },
    {
        "quadrat": 1,
        "name": "Gelidium pusilum",
        "type": "Algae",
        "form": "sessile",
        "cnt": 7
    },
    {
        "quadrat": 1,
        "name": "Lunella coronata",
        "type": "Coiled gastropods",
        "form": "mobile",
        "cnt": 6
    },
    {
        "quadrat": 1,
        "name": "Kyrtuthrix maculans",
        "type": "Cyanobacteria",
        "form": "sessile",
        "cnt": 7
    },
    {
        "quadrat": 1,
        "name": "Hildenbrandia rubra",
        "type": "Algae",
        "form": "sessile",
        "cnt": 9
    },
    {
        "quadrat": 1,
        "name": "Encrusting coralline algae",
        "type": "Algae",
        "form": "sessile",
        "cnt": 6
    },
    {
        "quadrat": 1,
        "name": "Saccostrea cucullata",
        "type": "Bivalves",
        "form": "sessile",
        "cnt": 36
    },
    {
        "quadrat": 1,
        "name": "Planaxis sulcatus",
        "type": "Coiled gastropods",
        "form": "mobile",
        "cnt": 4
    },
    {
        "quadrat": 1,
        "name": "Patelloida pygmaea",
        "type": "Limpets",
        "form": "mobile",
        "cnt": 13
    },
    {
        "quadrat": 1,
        "name": "Morula musiva",
        "type": "Whelks",
        "form": "mobile",
        "cnt": 1
    },
    {
        "quadrat": 1,
        "name": "Monodonta labio",
        "type": "Coiled gastropods",
        "form": "mobile",
        "cnt": 41
    },
    {
        "quadrat": 1,
        "name": "Barbatia sp.",
        "type": "Bivalves",
        "form": "sessile",
        "cnt": 8
    }
]

const MARGINS = { top: 20, bottom: 10 }
const CHART_WIDTH = 800
const CHART_HEIGHT = 400 - MARGINS.top - MARGINS.bottom

let selectedData = mockData

const xScale = d3
    .scaleBand()
    .domain(mockData.map(d => d.name))
    .rangeRound([0, CHART_WIDTH])
    .padding(0.1)

const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(mockData, d => d.cnt) + 3])
    .range([CHART_HEIGHT, 0])

const chartContainer = d3
    .select('svg')
    .attr("width", CHART_WIDTH)
    .attr("height", CHART_HEIGHT + MARGINS.top + MARGINS.bottom)

const chart = chartContainer.append('g')

chart
    .append('g')
    .attr('transform', `translate(0, ${CHART_HEIGHT})`)
    .call(d3.axisBottom(xScale).tickSizeOuter(0)) // remove axis ticks
    .selectAll("text")
    .attr("font-style", "italic")

function renderChart() {
    chart
        .selectAll('.bar')
        .data(selectedData, data => data.name)
        .enter()
        .append('rect')
        .classed('bar', true)
        .attr('width', xScale.bandwidth())
        .attr('height', data => CHART_HEIGHT - yScale(data.cnt))
        .attr('x', data => xScale(data.name))
        .attr('y', data => yScale(data.cnt))

    chart
        .selectAll('.bar')
        .data(selectedData, data => data.name)
        .exit()
        .remove()

    chart
        .selectAll('.label')
        .data(selectedData, data => data.name)
        .enter()
        .append('text')
        .text(data => data.cnt)
        .attr('x', data => xScale(data.name) + xScale.bandwidth() / 2)
        .attr('y', data => yScale(data.cnt) - 20)
        .attr('text-anchor', 'middle')

    chart
        .selectAll('.label')
        .data(selectedData, data => data.name)
        .exit()
        .remove()
}

renderChart()

let unselectedIds = []

const listItems = d3
    .select('#data')
    .select('ul')
    .selectAll('li')
    .data(mockData)
    .enter()
    .append('li')

listItems
    .append('span')
    .text(data => data.name)

listItems
    .append('input')
    .attr('type', 'checkbox')
    .attr('checked', true)
    .on('change', data => {
        // console.log(data)
        if (unselectedIds.indexOf(data.name) === -1) {
            unselectedIds.push(data.name)
        } else {
            unselectedIds = unselectedIds.filter(id => id !== data.name)
        }
        selectedData = mockData.filter(
            data => unselectedIds
                .indexOf(data.name) === -1)
        renderChart()
    })