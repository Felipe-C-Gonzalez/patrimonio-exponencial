import { Chart, registerables } from "https://cdn.jsdelivr.net/npm/chart.js/+esm";
Chart.register(...registerables)

let currentChart;

const moneyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
})

function renderChart(data, containerId) {
    const labels = data.map(item => `Mês ${item.month}`);
    const values = data.map(item => item.value);
    const investedData = data.map(item => item.invested)

    const isDarkMode = document.documentElement.classList.contains('dark-mode')
    const textColor = isDarkMode ? '#94A3B8' : '#64748B'
    const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';

    if (currentChart) {
        currentChart.destroy()
    }

    const gridOptions = {
        color: gridColor,
        drawBorder: false,
    }

    const ctx = document.getElementById(containerId).getContext('2d');
    currentChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Total Acumulado",
                    data: values,
                    borderColor: '#0A9E5A',
                    backgroundColor: 'rgba(10, 158, 90, 0.1)',
                    fill: true,
                    tension: 0.5,
                    borderWidth: 3,
                    pointRadius: (context) => {
                        const count = context.chart.data.labels.length;
                        return count <= 12 ? 4 : 0;
                    },
                    pointHoverRadius: 6,

                },
                {
                    label: "Total Investido",
                    data: investedData,
                    borderColor: '#3B82F6',
                    backgroundColor: 'transparent',
                    fill: false,
                    tension: 0.4,
                    borderWidth: 2,
                    borderDash: [5, 5],
                    pointRadius: 0,
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                        font: { family: 'Inter', size: 12, weight: '600' }
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: (context) => {
                            const value = context.raw;
                            return `${context.dataset.label}: ${moneyFormatter.format(value)}`
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: {
                        color: textColor,
                    }
                },
                y: {
                    beginAtZero: false,
                    grace: '5%',
                    grid: gridOptions,
                    ticks: {
                        color: textColor,
                        maxTicksLimit: 6,
                        callback: (value) => {
                            return value.toLocaleString('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                                maximumFractionDigits: 0
                            })
                        }
                    }
                }
            }
        }
    });
}

export default renderChart;