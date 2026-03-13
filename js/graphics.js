function renderChart(data, containerId) {
    const labels = data.map(item => `Mês ${item.month}`);
    const values = data.map(item => item.value);
}

export default renderChart;