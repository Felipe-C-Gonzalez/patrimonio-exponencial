const investimentForm = document.getElementById('investiment-form');
const initialValue = document.getElementById('initial-value');
const contribution = document.getElementById('contribution');
const rate = document.getElementById('rate');
const time = document.getElementById('time');
const themeSun = document.getElementById('theme-sun');
const themeMoon = document.getElementById('theme-moon')
const btnCalculate = document.getElementById('btn-calculate');

const msgError = document.getElementById('msg-error');

const resultsSection = document.getElementById('results')

const moneyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
})

investimentForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const initialValueNumber = Number(initialValue.value);
    const contributionValue = Number(contribution.value);
    const rateValue = Number(rate.value) / 100;
    const timeValue = Number(time.value);

    let isValidElement = isNaN(initialValueNumber) || isNaN(contributionValue) || isNaN(rateValue) || isNaN(timeValue) || initialValueNumber <= 0 || contributionValue <= 0 || rateValue <= 0 || timeValue <= 0;

    if (isValidElement) {
        msgError.style.display = 'block';
        resultsSection.innerHTML = '';
        return;
    } else {
        msgError.style.display = 'none';
    }

    let totalValue = initialValueNumber;
    for (let i = 1; i <= timeValue; i++) {
        totalValue = (totalValue + contributionValue) * (1 + rateValue);
    }

    const totalFormatted = moneyFormatter.format(totalValue);
    resultsSection.innerHTML = `O valor total é ${totalFormatted}`
})

themeSun.addEventListener('click', () => {
    document.documentElement.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
})

themeMoon.addEventListener('click', () => {
    document.documentElement.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
})