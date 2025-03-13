let listaDeNumerosSorteados = [];
let numeroLimite = 500; //define o valor máximo do número secreto
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
let textoNegrito = document.querySelector('span')
console.log(numeroSecreto);

// exibe os textos na tela e narra cada texto escrito.
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', `Ajude o Tails a descobrir o número secreto!`);
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroLimite}`);
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

exibirMensagemInicial();

// a função Verificar Chute serve para verificar se o número que foi digitado no campo 'input' é igual, maior ou menor que o numeroSecreto
function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Parabéns! Você acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!
        Clique em novo jogo para jogar novamente`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled'); //ativa o botão 'NOVO JOGO'
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', `O número secreto é menor que ${chute}`);
        } else {
            exibirTextoNaTela('p', `O número secreto é maior que ${chute}`);
        }
        tentativas++;
        limparCampo();
    }
}

// Esta é a função que gera o número secreto.
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados)
        return numeroEscolhido;
    }
}
// a função que limpa o 'input' quando clicar em "Chute" se você errar o valor do número secreto.
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

// essa função faz com que o botão "NOVO JOGO" reinicie o jogo e desative o botão depois de clicado nele.
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}






