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

        // Adicionando evento de clique para abrir o campo de entrada de nota
        diaDiv.addEventListener('click', () => {
            // Remover qualquer campo de entrada existente para evitar múltiplos campos
            const inputExistente = diaDiv.querySelector('input');

            diaDiv.addEventListener('dblclick', () => {
                window.location.href = `dia.html?data=${chaveData}`;
            });
            if (inputExistente) {
                return; // Evita a criação de vários campos de entrada
            }

            const notaExistente = notas[chaveData] || '';

            const inputNota = document.createElement('input');
            inputNota.type = 'text';
            inputNota.value = notaExistente;
            inputNota.placeholder = 'Digite uma nota';
            inputNota.classList.add('inputNota');

            // Adicionando evento de salvar a nota ao pressionar Enter
            inputNota.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    const novaNota = inputNota.value;
                    if (novaNota !== '') {
                        notas[chaveData] = novaNota; // Salva a nota
                    } else {
                        delete notas[chaveData]; // Remove a nota se estiver vazia
                    }
                    carregarCalendario(dataAtual); // Recarrega o calendário para atualizar a nota
                }
            });

            // Adiciona o campo de input ao diaDiv
            diaDiv.appendChild(inputNota);
            inputNota.focus(); // Foca no campo de entrada
        });

        diasContainer.appendChild(diaDiv);
    }
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
