const linhas = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

//variaveis
var gameInicializado = false;
var vencedor = null;
var resultados = [];
var jogador = 'x';
var posicoes = Array(9).fill('');


//elementos
var body = document.querySelector('body');
var tabuleiro = document.createElement("div");
var painelDeAcoes = document.createElement('div');
var resultadosDepartidas = document.createElement('div');
var mensagem = document.createElement('h1');

//botoes
var botaoStartGame = document.createElement('button');
var botaoLimparHistoricoPartida = document.createElement('button');


botaoLimparHistoricoPartida.innerHTML = 'Limpar Historico';
botaoLimparHistoricoPartida.addEventListener('click', limparHistorico, false);

painelDeAcoes.className = 'painel';
mensagem.innerText = 'Seja bem vindo!';
botaoStartGame.innerText = 'Começar';
botaoStartGame.addEventListener('click', startGame, false);

painelDeAcoes.appendChild(mensagem);
painelDeAcoes.appendChild(botaoStartGame);
painelDeAcoes.appendChild(botaoLimparHistoricoPartida);


resultadosDepartidas.className = 'historico-partida';


body.appendChild(painelDeAcoes);
body.appendChild(resultadosDepartidas);

tabuleiro.className = 'tabuleiro';

function limparHistorico() {
    localStorage.setItem('jogo', []);
    listarResultado();
}

function listarResultado() {

    let resumoResultado = document.createElement('H3');
    let X = O = V = 0;
    if (localStorage.getItem('jogo')) {
        resultados = JSON.parse(localStorage.getItem('jogo'));
        let ul = document.createElement('ul');
        resultados.forEach(function (value, index) {
            switch (value.jogador) {
                case 'O':
                    O++;
                    break;
                case 'X':
                    X++;
                    break;
                default:
                    V++;
                    break;

            }
            let li = document.createElement('li');
            li.innerText = value.resultado + ' - ' + value.jogador;
            ul.appendChild(li);
        });

        resultadosDepartidas.innerHTML = "";
        resumoResultado.innerText = `X = ${X} | O = ${O} | V = ${V} `;
        resultadosDepartidas.appendChild(resumoResultado);
        resultadosDepartidas.appendChild(ul);

    } else {
        resumoResultado.innerText = 'X = 0 | O = 0 | V = 0 ';
        resultados = [];
        resultadosDepartidas.innerHTML = "";
        resultadosDepartidas.appendChild(resumoResultado);
    }
}

function mostrarVez() {
    mensagem.innerText = 'Vez do jogador ' + jogador;
}

function proximoJogador() {
    mostrarVez();
    jogador = jogador == 'X' ? 'O' : 'X';

}

function verficaVencedor() {

    for (let i = 0; i < linhas.length; i++) {
        const [a, b, c] = linhas[i];
        if (posicoes[a] && posicoes[a] === posicoes[b] && posicoes[a] === posicoes[c]) {
            return [a, b, c];
        }
    }
    return null;

}

function marcarQuadrado() {

    if (vencedor) {
        alert("Reinicie o jogo!");
        return;
    }

    if (!gameInicializado) {
        alert("Inicie o jogo!");
        return;
    }

    if (posicoes[this.id] != '') {
        alert("Não é possivel jogar nesta posição!");
        return;
    }


    proximoJogador();
    posicoes[this.id] = jogador;

    vencedor = verficaVencedor();
    gerarQuadrados();


    if (posicoes.indexOf('') == -1) {
        resultados.push({resultado: 'Velha', jogador: '-'})
        localStorage.setItem('jogo', JSON.stringify(resultados));
        mensagem.innerText = "Deu velha :(";
        return;
    }

    if (vencedor) {
        resultados.push({resultado: 'vitoria', jogador: jogador})
        localStorage.setItem('jogo', JSON.stringify(resultados));
        mensagem.innerText = "Jogador " + jogador + " Venceu :D";
        return;
    }

    listarResultado();
}

function gerarQuadrados() {

    listarResultado();
    tabuleiro.innerHTML = "";
    for (var i = 0; i < posicoes.length; i++) {
        let campo = document.createElement('div');
        if (vencedor) {
            if (vencedor.indexOf(i) != -1) {
                campo.className = 'quadrado vencedor';
            } else {
                campo.className = 'quadrado';
            }
        } else {
            campo.className = 'quadrado';
        }
        campo.id = i;
        campo.innerText = posicoes[i];
        campo.addEventListener('click', marcarQuadrado, false);
        tabuleiro.appendChild(campo);
    }


    body.append(tabuleiro);
}

function startGame() {

    gameInicializado = true;
    vencedor = null;
    jogador = 'x';
    mostrarVez();
    posicoes.fill('');
    gerarQuadrados();
}

gerarQuadrados();


