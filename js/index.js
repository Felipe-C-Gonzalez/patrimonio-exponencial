import renderChart from './graphics.js';
import { getSelic, INVESTIMENT_LIMITS } from './services.js';

const investimentForm = document.getElementById('investiment-form');
const initialValue = document.getElementById('initial-value');
const contribution = document.getElementById('contribution');
const rate = document.getElementById('rate');
const time = document.getElementById('time');
const themeSun = document.getElementById('theme-sun');
const themeMoon = document.getElementById('theme-moon')
const btnCalculate = document.getElementById('btn-calculate');
const btnClear = document.getElementById('btn-clear');
const msgError = document.getElementById('msg-error');
const resultsSection = document.getElementById('results')
const resultsTextContainer = document.getElementById('results-text')

const moneyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
})

let globalRate = '10.75';

async function loadApiData() {
    const rateFromApi = await getSelic();
    globalRate = rateFromApi.toString();

    if (rate) {
        rate.value = `${globalRate}%`
    }
}
loadApiData();

async function setup() {
    const selicRate = await getSelic();
    rate.value = selicRate + '%';
    const rateTooltip = document.querySelector('.rate .tooltip-icon')
    if (rateTooltip) {
        rateTooltip.setAttribute('data-tooltip', `Taxa SELIC atualizada via Banco Central: ${selicRate}% ao ano.`)
    }
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
    let isBasicInvalid = isNaN(initial) || isNaN(monthly) || isNaN(rate) || isNaN(time) || initial <= 0 || monthly <= 0 || rate <= 0 || time <= 0;
    if (isBasicInvalid) {
        return {
            valid: false,
            message: 'Por favor, preencha todos os campos com valores maiores que zero.'
        };
    }
    if (initial > INVESTIMENT_LIMITS.MAX_INITIAL_VALUE) {
        return {
            valid: false,
            message: "O valor inicial não pode passar de 1 Bilhão."
        }
    }
    if (monthly > INVESTIMENT_LIMITS.MAX_MONTHLY_DEPOSIT) {
        return {
            valid: false,
            message: "O aporte mensal ultrapassa o limite permitido."
        }
    }
    if (time > INVESTIMENT_LIMITS.MAX_PERIOD_MONTHS) {
        return {
            valid: false,
            message: "O período máximo permitido é de 50 anos (600 meses)."
        }
    }
    return { valid: true }
};

function displayResults(results) {
    const totalFormatted = moneyFormatter.format(results.totalValue)
    const totalInvested = moneyFormatter.format(results.totalInvested)
    const profit = moneyFormatter.format(results.totalValue - results.totalInvested)

    resultsTextContainer.innerHTML = `
        <div class="result-card">
            <span>Total Acumulador</span>
            <strong class="highlight-primary">${totalFormatted}</strong>
        </div>
        <div class="result-card">
            <span>Total Investido</span>
            <strong>${totalInvested}</strong>
        </div>
        <div class="result-card">
            <span>Total em Juros</span>
            <strong class="highlight-secondary">${profit}</strong>
        </div>
    `;
    renderChart(results.calculationData, "chart-container");
}

investimentForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const initialValueNumber = Number(initialValue.value);
    const contributionValue = Number(contribution.value);
    let rateValue = Number(rate.value.replace('%', '').replace(',', '.'));
    const timeValue = Number(time.value);

    btnCalculate.disabled = true;
    btnCalculate.innerText = 'Calculando...';

    const validation = isFormValid(initialValueNumber, contributionValue, rateValue, timeValue);

    if (!validation.valid) {
        msgError.innerText = validation.message;
        msgError.classList.add('show');
        resultsSection.classList.remove('is-visible')

        btnCalculate.disabled = false;
        btnCalculate.innerText = 'Calcular';
        return;
    } else {
        msgError.classList.remove('show');
    }
    setTimeout(() => {
        const totalResults = calculateInvestment(initialValueNumber, contributionValue, rateValue, timeValue);
        displayResults(totalResults);
        resultsSection.classList.add('is-visible')

        btnCalculate.disabled = false;
        btnCalculate.innerText = 'Calcular';
    }, 1000);
})

btnClear.addEventListener('click', () => {
    resultsSection.classList.remove('is-visible');
    msgError.classList.remove('show')

    setTimeout(() => {
        if (rate) {
            rate.value = `${globalRate}%`
        }
    }, 0)
});

const setupNavigation = () => {
    const navHome = document.getElementById('nav-home');
    const aboutlink = document.querySelector('a[href="#about"]');
    const header = document.querySelector('.header');

    if (navHome) {
        navHome.addEventListener('click', (e) => {
            e.preventDefault()
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        })
    }

    if (aboutlink) {
        aboutlink.addEventListener('click', (e) => {
            e.preventDefault()
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                })
            }
        });
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled')
        }
    })
}
setupNavigation()

function updateActiveButton(theme) {
    if (theme === 'dark') {
        themeMoon.classList.add('active');
        themeSun.classList.remove('active');
    } else {
        themeSun.classList.add('active');
        themeMoon.classList.remove('active')
    }
}

themeSun.addEventListener('click', () => {
    document.documentElement.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
    updateActiveButton('light')
})

themeMoon.addEventListener('click', () => {
    document.documentElement.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
    updateActiveButton('dark')
})