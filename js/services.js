const URL = "https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados/ultimos/1?formato=json";

async function getSelic() {
    try {
        const response = await fetch(URL);
        const data = await response.json();
        return Number(data[0].valor);
    } catch (error) {
        console.error("Error fetching SELIC rate " + error);
    }
}

export default getSelic;