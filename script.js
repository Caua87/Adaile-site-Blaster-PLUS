const themeToggle = document.getElementById('themeToggle');
const currentTheme = localStorage.getItem('theme') || 'light';

// Aplicar tema salvo
document.documentElement.setAttribute('data-theme', currentTheme);
themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';

// Alternar tema
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
});

const eventos = [
    { 
        data: '2026-08-18', 
        titulo: '🎭 Dia da Fantasia', 
        horario: '07:30 - 11:50',
        local: 'Pátio da Escola',
        descricao: 'Venha fantasiado e participe do concurso de fantasias!',
        publico: 'Todos os alunos',
        emoji: '🎭'
    },
    { 
        data: '2026-08-20', 
        titulo: '⚽ Interclasse', 
        horario: '10:20 - 12:30',
        local: 'Quadra Esportiva',
        descricao: 'Campeonato de futebol entre as turmas. Forme seu time!',
        publico: 'Alunos do 6º ao 9º ano',
        emoji: '⚽'
    },
    { 
        data: '2026-09-12', 
        titulo: '🏆 Gincadaile', 
        horario: '08:00 - 12:00',
        local: 'Escola toda',
        descricao: 'Gincana com diversas atividades e provas divertidas.',
        publico: 'Todos os alunos',
        emoji: '🏆'
    },
    { 
        data: '2026-09-22', 
        titulo: '🚌 Passeio Escolar', 
        horario: 'Saída às 07:00',
        local: 'Parque Ecológico',
        descricao: 'Passeio ao Parque Ecológico com atividades ao ar livre.',
        publico: 'Alunos do 3º ao 5º ano',
        emoji: '🚌'
    },
    { 
        data: '2026-06-15', 
        titulo: '🌽 Festa Junina', 
        horario: '18:00 - 22:00',
        local: 'Ginásio da Escola',
        descricao: 'Festa junina com comidas típicas, quadrilha e brincadeiras.',
        publico: 'Todos os alunos e familiares',
        emoji: '🌽'
    }
];

let mesAtual = new Date().getMonth();
let anoAtual = new Date().getFullYear();

function gerarCalendario(mes, ano) {
    const grid = document.getElementById('calendarioGrid');
    const mesAno = document.getElementById('mesAnoAtual');
    
    // Limpar dias (manter cabeçalho)
    const diasSemana = grid.querySelectorAll('.dia-semana');
    grid.innerHTML = '';
    diasSemana.forEach(d => grid.appendChild(d));
    
    // Atualizar título
    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
                   'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    mesAno.textContent = `${meses[mes]} ${ano}`;
    
    // Primeiro dia do mês
    const primeiroDia = new Date(ano, mes, 1).getDay();
    const diasNoMes = new Date(ano, mes + 1, 0).getDate();
    const diasMesAnterior = new Date(ano, mes, 0).getDate();
    
    // Dias do mês anterior
    for (let i = primeiroDia - 1; i >= 0; i--) {
        const dia = document.createElement('div');
        dia.className = 'dia outro-mes';
        dia.textContent = diasMesAnterior - i;
        grid.appendChild(dia);
    }
    
    // Dias do mês atual
    for (let dia = 1; dia <= diasNoMes; dia++) {
        const diaElement = document.createElement('div');
        diaElement.className = 'dia';
        diaElement.textContent = dia;
        
        const dataString = `${ano}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
        const evento = eventos.find(e => e.data === dataString);
        
        if (evento) {
            diaElement.classList.add('tem-evento');
            diaElement.dataset.evento = JSON.stringify(evento);
            diaElement.addEventListener('click', () => abrirModal(evento));
        }
        
        grid.appendChild(diaElement);
    }
    
    // Completar com dias do próximo mês
    const totalDias = grid.children.length;
    const diasRestantes = 42 - totalDias;
    for (let dia = 1; dia <= diasRestantes; dia++) {
        const diaElement = document.createElement('div');
        diaElement.className = 'dia outro-mes';
        diaElement.textContent = dia;
        grid.appendChild(diaElement);
    }
}

function abrirModal(evento) {
    const modal = document.getElementById('modalEvento');
    document.getElementById('modalImagem').textContent = evento.emoji || '📌';
    document.getElementById('modalTitulo').textContent = evento.titulo;
    document.getElementById('modalDetalhes').innerHTML = `
        <p>📅 <strong>Data:</strong> ${evento.data}</p>
        <p>⏰ <strong>Horário:</strong> ${evento.horario}</p>
        <p>📍 <strong>Local:</strong> ${evento.local}</p>
        <p>📝 <strong>Descrição:</strong> ${evento.descricao}</p>
        <p>👥 <strong>Público:</strong> ${evento.publico}</p>
    `;
    modal.classList.add('active');
}

// Navegação do calendário
document.getElementById('mesAnterior').addEventListener('click', () => {
    mesAtual--;
    if (mesAtual < 0) {
        mesAtual = 11;
        anoAtual--;
    }
    gerarCalendario(mesAtual, anoAtual);
});

document.getElementById('mesProximo').addEventListener('click', () => {
    mesAtual++;
    if (mesAtual > 11) {
        mesAtual = 0;
        anoAtual++;
    }
    gerarCalendario(mesAtual, anoAtual);
});

// Fechar modal
document.getElementById('modalClose').addEventListener('click', () => {
    document.getElementById('modalEvento').classList.remove('active');
});

document.getElementById('modalEvento').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
        document.getElementById('modalEvento').classList.remove('active');
    }
});

// Inicializar calendário
gerarCalendario(mesAtual, anoAtual);