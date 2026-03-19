const URL = "https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados/ultimos/1?formato=json";


export const INVESTIMENT_LIMITS = {
    MAX_INITIAL_VALUE: 1000000000,
    MAX_MONTHLY_DEPOSIT: 1000000000,
    MAX_PERIOD_MONTHS: 600,
}

export async function getSelic() {
    try {
        const response = await fetch(URL);
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        const data = await response.json();
        if (data && data.length > 0 && data[0].valor) {
            return Number(data[0].valor);
        } else {
            throw new Error('Formato de dados inválido da API');
        }
    } catch (error) {
        console.error("Error fetching SELIC rate " + error);
        return 10.75;
    }
}

