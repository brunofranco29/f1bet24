let saldo = 100;
const larguraPista = 700; // Largura da pista
let corrida; // Variável para armazenar o intervalo de corrida
let pilotoVencedor; // Variável para armazenar o piloto vencedor

function moverCarros() {
    const velocidadeMaxima = 5; // Defina a velocidade máxima dos carros aqui
    const carros = document.querySelectorAll('.car');

    carros.forEach(carro => {
        // Obtém a posição atual do carro
        let posicaoAtual = parseInt(carro.style.left) || 0;

        // Calcula um valor aleatório para a velocidade do carro
        let velocidade = Math.ceil(Math.random() * velocidadeMaxima);

        // Atualiza a posição do carro
        posicaoAtual += velocidade;

        // Define um limite para o movimento dos carros
        if (posicaoAtual > larguraPista - 100) {
            posicaoAtual = larguraPista - 100; // Define a posição atual como o limite da pista
        }

        // Define a nova posição do carro
        carro.style.left = posicaoAtual + 'px';

        // Verifica se o carro ultrapassou a linha de chegada
        if (posicaoAtual >= larguraPista - 100) {
            clearInterval(corrida);
            pilotoVencedor = carro.getAttribute('data-piloto');
            verificarVencedor();
        }
    });
}

function apostar() {
    const valorAposta = parseInt(document.getElementById('valorAposta').value);
    const pilotoSelecionado = parseInt(document.getElementById('pilotos').value);
    
    if (valorAposta <= saldo && valorAposta >= 5) {
        saldo -= valorAposta;
        document.getElementById('saldo').textContent = 'Saldo: R$' + saldo;
        
        // Inicia o movimento dos carros somente após a aposta ser feita
        corrida = setInterval(moverCarros, 50);
    } else {
        alert('Aposta inválida. O valor mínimo é R$5 e não pode exceder o saldo.');
    }
}

function verificarVencedor() {
    if (pilotoVencedor !== undefined) {
        const pilotoSelecionado = parseInt(document.getElementById('pilotos').value);
        if (pilotoVencedor == pilotoSelecionado) {
            const valorAposta = parseInt(document.getElementById('valorAposta').value);
            saldo += valorAposta * 2;
            document.getElementById('saldo').textContent = 'Saldo: R$' + saldo;
            alert('Parabéns! Seu piloto venceu a corrida.');
        } else {
            alert('Seu piloto não venceu a corrida.');
        }
    }
}

function correrNovamente() {
    clearInterval(corrida); // Para a corrida
    pilotoVencedor = undefined; // Reseta o piloto vencedor
    const carros = document.querySelectorAll('.car');
    carros.forEach(carro => {
        carro.style.left = '0px';
    });
}