// Variáveis globais
const calendario = document.getElementById('calendario');
const mesDisplay = document.getElementById('mes');
const diasContainer = document.getElementById('dias');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const addNoteButton = document.getElementById('addNote');
const noteInput = document.getElementById('noteInput');

const diasDaSemana = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
let dataAtual = new Date();
const notas = {}; 

// Função para carregar o calendário
function carregarCalendario(data) {
    const mesAtual = data.getMonth();
    const anoAtual = data.getFullYear();

    mesDisplay.innerText = `${data.toLocaleDateString('pt-BR', { month: 'long' })}, ${anoAtual}`;

    diasContainer.innerHTML = '';

    const primeiroDiaDoMes = new Date(anoAtual, mesAtual, 1);
    const primeiroDiaDaSemana = primeiroDiaDoMes.getDay();

    const diasDoMes = new Date(anoAtual, mesAtual + 1, 0).getDate();

    for (let i = 0; i < primeiroDiaDaSemana; i++) {
        const divVazia = document.createElement('div');
        diasContainer.appendChild(divVazia);
    }

    for (let dia = 1; dia <= diasDoMes; dia++) {
        const diaDiv = document.createElement('div');
        diaDiv.innerText = dia;

        const chaveData = `${anoAtual}-${String(mesAtual + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;

        if (chaveData in notas) {
            const notaDiv = document.createElement('div');
            notaDiv.innerText = notas[chaveData];
            notaDiv.classList.add('note');
            diaDiv.appendChild(notaDiv);
        }

        if (dia === new Date().getDate() && mesAtual === new Date().getMonth() && anoAtual === new Date().getFullYear()) {
            diaDiv.style.backgroundColor = '#ffeb3b';
        }

        diaDiv.addEventListener('click', () => {
            const notaExistente = notas[chaveData] || '';
            const novaNota = prompt('Digite a nota para esse dia', notaExistente);
            if (novaNota !== null) {
                notas[chaveData] = novaNota;
                carregarCalendario(dataAtual);
            }
        });

        diasContainer.appendChild(diaDiv);
    }
}
function diaPage(){
        const diaNav = '../pages/dia.html';
        window.location.href = diaNav;
    }

// Carregar o calendário inicial
carregarCalendario(dataAtual);

// Navegação entre meses
prevButton.addEventListener('click', () => {
    dataAtual.setMonth(dataAtual.getMonth() - 1);
    carregarCalendario(dataAtual);
});

nextButton.addEventListener('click', () => {
    dataAtual.setMonth(dataAtual.getMonth() + 1);
    carregarCalendario(dataAtual);
});

// Adicionar notas
addNoteButton.addEventListener('click', () => {
    const dataSelecionada = prompt('Digite a data para adicionar a nota (formato: yyyy-mm-dd)');
    const nota = prompt('Digite a nota para esse dia');

    if (dataSelecionada && nota) {
        notas[dataSelecionada] = nota; // Armazena a nota
        carregarCalendario(dataAtual); // Recarrega o calendário para mostrar a nota
    }
});
