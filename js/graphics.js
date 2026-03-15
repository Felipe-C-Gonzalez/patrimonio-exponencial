import { Chart, registerables } from "https://cdn.jsdelivr.net/npm/chart.js/+esm";
Chart.register(...registerables)

let currentChart;

function renderChart(data, containerId) {
    const labels = data.map(item => `Mês ${item.month}`);
    const values = data.map(item => item.value);
    const investedData = data.map(item => item.invested)

    if (currentChart) {
        currentChart.destroy()
    }

    const ctx = document.getElementById(containerId).getContext('2d');
    currentChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Total com Juros",
                    data: values,
                    borderColor: 'red',
                    tension: 0.3,
                    fll: true,
                    backgroundColor: 'rgba(255, 0, 0, 0.2)'
                },
                {
                    label: "Dinheiro investido",
                    data: investedData,
                    borderColor: 'blue'
                }
            ]
        }
    });
}

export default renderChart;