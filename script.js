document.addEventListener('DOMContentLoaded', () => {
    const celulas = document.querySelectorAll('.celula');
    const status = document.getElementById('status');
    const botaoReiniciar = document.getElementById('reiniciar-btn');
    
    let jogadorAtual = 'X';
    let estadoJogo = ['', '', '', '', '', '', '', '', ''];
    let jogoAtivo = true;
    
    const condicoesVitoria = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
        [0, 4, 8], [2, 4, 6]             // Diagonais
    ];
    
    function verificarVitoria() {
        for (const condicao of condicoesVitoria) {
            const [a, b, c] = condicao;
            
            if (
                estadoJogo[a] !== '' &&
                estadoJogo[a] === estadoJogo[b] &&
                estadoJogo[a] === estadoJogo[c]
            ) {
                return true;
            }
        }
        return false;
    }
    
    function verificarEmpate() {
        return !estadoJogo.includes('') && !verificarVitoria();
    }
    
    function atualizarStatus() {
        if (verificarVitoria()) {
            status.textContent = `Jogador ${jogadorAtual} venceu!`;
            jogoAtivo = false;
        } else if (verificarEmpate()) {
            status.textContent = 'Empate!';
            jogoAtivo = false;
        } else {
            jogadorAtual = jogadorAtual === 'X' ? 'O' : 'X';
            status.textContent = `Vez do Jogador ${jogadorAtual}`;
        }
    }
    
    function lidarCliqueCelula(event) {
        const celulaClicada = event.target;
        const indice = parseInt(celulaClicada.getAttribute('data-index'));
        
        if (estadoJogo[indice] !== '' || !jogoAtivo) return;
        
        estadoJogo[indice] = jogadorAtual;
        celulaClicada.textContent = jogadorAtual;
        celulaClicada.classList.add(jogadorAtual.toLowerCase());
        
        atualizarStatus();
    }
    
    function reiniciarJogo() {
        jogadorAtual = 'X';
        estadoJogo = ['', '', '', '', '', '', '', '', ''];
        jogoAtivo = true;
        status.textContent = `Vez do Jogador ${jogadorAtual}`;
        
        celulas.forEach(celula => {
            celula.textContent = '';
            celula.classList.remove('x', 'o');
        });
    }
    
    celulas.forEach(celula => {
        celula.addEventListener('click', lidarCliqueCelula);
    });
    
    botaoReiniciar.addEventListener('click', reiniciarJogo);
});