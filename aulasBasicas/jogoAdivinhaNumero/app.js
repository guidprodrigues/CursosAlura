let listaNumerosSecretos = [];
let numeroMaximo = 100;
let numeroMinimo = 1;
let numeroTentativa = 0;
let chute;
let tag;
let texto = 'Teste';
let numeroSecreto = geraNumeroAleatorio(numeroMaximo, numeroMinimo);



function geraNumeroAleatorio(max, min) {
    let numeroAleatorio = parseInt(Math.random() * max + min);
    let quantidadeMaximaNumerosSorteados = numeroMaximo - numeroMinimo;
    if(listaNumerosSecretos.length >= quantidadeMaximaNumerosSorteados){
        mudaCampo('h1', `Voce atingiu o numero maximo de jogos diferentes, ja foram sorteados ${listaNumerosSecretos.length}, recarregue a pagina para zerar a lista de possibilidades`)
    }
    if (listaNumerosSecretos.includes(numeroAleatorio)) {
        return geraNumeroAleatorio(numeroMaximo, numeroMinimo);
    } else {
        listaNumerosSecretos.push(numeroAleatorio);
        return numeroAleatorio;
    }
}

function mudaCampo(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto,'Brazilian Portuguese Female', {rate:1.2});
}

function limpoCampo(tag) {
    tag = document.querySelector('input');
    tag.value = '';
}

mudaCampo('h1', 'Jogo do numero secreto');
mudaCampo('paragrafo', `Escolha um numero entra ${numeroMinimo} e ${numeroMaximo}`)


function verificarChute() {
    chute = document.querySelector('input').value;
    limpoCampo();
    if (chute == numeroSecreto) {
        palavraTentativa = numeroTentativa > 1 ? 'tentativa' : 'tentativas';
        mudaCampo('h1', `Voce acertou o numero secreto ${numeroSecreto} com ${numeroTentativa} ${palavraTentativa}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        numeroTentativa++;
        if (chute < numeroSecreto) {
            mudaCampo('h1', `Voce errou o numero secreto, o numero que informou ${chute}, é menor do que o numero secreto, Tente novamente`);

        } else {
            mudaCampo('h1', `Voce errou o numero secreto, o numero que informou ${chute}, é maior do que o numero secreto, Tente novamente`);
        }
    }

    console.log(chute == numeroSecreto)
}

function reiniciarJogo() {
    geraNumeroAleatorio(numeroMaximo, numeroMinimo);
    mudaCampo('h1', 'Jogo do numero secreto');
    mudaCampo('paragrafo', `Escolha um numero entra ${numeroMinimo} e ${numeroMaximo}`)
}