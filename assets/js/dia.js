
const diaNota = document.getElementById('dia');

// Obtém a data atual
const dataAtual = new Date();

// Formata a data como uma string legível (ex: "25/08/2024")
const dataFormatada = dataAtual.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
});

// Insere a data formatada na div
diaNota.innerText = dataFormatada;

