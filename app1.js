const mockData = {
    items: ['csadad', 'dksajvdk', 'UVABI'],
    addItem(item) {
        this.items.push(item);
    },
    removeItem(index) {
        this.items.splice(index, 1);
    },
    updateItem(index, newItem) {
        this.items[index] = newItem;
    }
}

d3.select('ul')
    .selectAll('li')
    .data(mockData.items, data => data)
    .enter() // missing li items
    .append('li') // renderAll missing li
    .text(data => data) // string data; if object, data => data.value

setTimeout(() => {
    mockData.addItem("oihiyt")
    d3.select('ul') // only render the new changes
        .selectAll('li')
        .data(mockData.items, data => data)
        .enter()
        .append('li')
        .text(data => data)
}, 2000)

setTimeout(() => {
    mockData.removeItem(0)
    d3.select('ul')
        .selectAll('li')
        .data(mockData.items, data => data)
        .exit()
        .remove()
}, 4000)

setTimeout(() => {
    mockData.updateItem(1)
    d3.select('ul')
        .selectAll('li')
        .data(mockData.items, data => data)
        .exit()
        .text("nbcuyewgggg")
}, 6000)