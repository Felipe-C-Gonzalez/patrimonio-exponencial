const investimentForm = document.getElementById('investiment-form');
const initialValue = document.getElementById('initial-value');
const contribution = document.getElementById('contribution');
const rate = document.getElementById('rate');
const time = document.getElementById('time');
const themeSun = document.getElementById('theme-sun');
const themeMoon = document.getElementById('theme-moon')
const btnCalculate = document.getElementById('btn-calculate');

const resultsSection = document.getElementById('results')

investimentForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const initialValueNumber = Number(initialValue.value);
    const contributionValue = Number(contribution.value);
    const rateValue = Number(rate.value) / 100;
    const timeValue = Number(time.value);

    let totalValue = initialValueNumber;
    for (let i = 1; i <= timeValue; i++) {
        totalValue = (totalValue + contributionValue) * (1 + rateValue);
        console.log(totalValue)
    }

    const totalFormatted = totalValue.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })
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