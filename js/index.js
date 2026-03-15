import renderChart from './graphics.js';
import getSelic from './services.js';

const investimentForm = document.getElementById('investiment-form');
const initialValue = document.getElementById('initial-value');
const contribution = document.getElementById('contribution');
const rate = document.getElementById('rate');
const time = document.getElementById('time');
const themeSun = document.getElementById('theme-sun');
const themeMoon = document.getElementById('theme-moon')
const btnCalculate = document.getElementById('btn-calculate');
const msgError = document.getElementById('msg-error');
const resultsSection = document.getElementById('results-text')

const moneyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
})

async function setup() {
    const selicRate = await getSelic();
    rate.value = selicRate + '%';
    rate.readOnly = true;
}
setup()

function calculateInvestment(initial, monthly, yearlyRate, months) {
    let totalValue = initial;
    let totalInvested = initial;
    const calculationData = [];
    let mesCounter = 0;
    const monthlyRate = (1 + (yearlyRate / 100)) ** (1 / 12) - 1;

    for (let i = 1; i <= months; i++) {
        totalValue = (totalValue + monthly) * (1 + monthlyRate);
        mesCounter++;
        totalInvested += monthly;
        if (mesCounter === 12 || i === months) {
            calculationData.push({ month: i, value: totalValue, invested: totalInvested });
        }
        mesCounter = mesCounter === 12 ? 0 : mesCounter;
    }
    return { totalValue, totalInvested, calculationData }
}

function isFormValid(initial, monthly, rate, time) {
    let isValid = isNaN(initial) || isNaN(monthly) || isNaN(rate) || isNaN(time) || initial <= 0 || monthly <= 0 || rate <= 0 || time <= 0;
    if (isValid) {
        return false;
    } else {
        return true;
    };
};

function displayResults(results) {
    const totalFormatted = moneyFormatter.format(results.totalValue)
    const totalInvested = moneyFormatter.format(results.totalInvested)
    const profit = moneyFormatter.format(results.totalValue - results.totalInvested)

    resultsSection.innerHTML = `
        O valor total é: ${totalFormatted}
        O valor investido é: ${totalInvested}
        Total de juros é: ${profit}
    `
    renderChart(results.calculationData, "chart-container");
}

investimentForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const initialValueNumber = Number(initialValue.value);
    const contributionValue = Number(contribution.value);
    let rateValue = Number(rate.value.replace('%', ''));
    const timeValue = Number(time.value);

    btnCalculate.disabled = true;
    btnCalculate.innerText = 'Calculando...';

    if (!isFormValid(initialValueNumber, contributionValue, rateValue, timeValue)) {
        msgError.classList.add('is-visible');
        resultsSection.innerHTML = '';
        btnCalculate.disabled = false;
        btnCalculate.innerText = 'Calcular';
        return;
    } else {
        msgError.classList.remove('is-visible');
    }
    setTimeout(() => {
        const totalResults = calculateInvestment(initialValueNumber, contributionValue, rateValue, timeValue);
        displayResults(totalResults);
        btnCalculate.disabled = false;
        btnCalculate.innerText = 'Calcular';
    }, 1000);
})

themeSun.addEventListener('click', () => {
    document.documentElement.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
})

themeMoon.addEventListener('click', () => {
    document.documentElement.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
})