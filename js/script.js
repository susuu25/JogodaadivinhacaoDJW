let randomNumber = parseInt(Math.random()*100+1)

// constantes para manipular os elementos html

const submit = document.querySelector('#jogar')
const jogada = document.querySelector('#txtNumero')
const jogadaAnterior = document.querySelector('.vezes') //número de vezes que estou jogando
const jogadasRestantes = document.querySelector('.numChances')
const recomecar = document.querySelector('.resultados')
const avisos = document.querySelector('.avisos')

// criando um paragrafo usando o javascript
const p = document.createElement('p')

//criando vetor para receber numeros jogados
let numerosJogados = []
//criando um contador para as jogadas
let minhasJogadas = 1
//variavel que permite o usuario jogar
let playGame = true

// o "e" representa meu botão
if(playGame){
    submit.addEventListener('click', function(e){ 
        e.preventDefault()

        let tentativa = parseInt(jogada.value) //armazenando o conteúdo da caixa de texto em uma variável (transforma o número em forma de texto)
        validaChances(tentativa) //função que irá validar o conteúdo jogado
    })
}

function validaChances(tentativa){
    if(isNaN(tentativa)){
            alert('Atenção, isso não é um número, para jogar informe um valor numérico entre 1 e 100')
            jogada.value = '' //limpando o conteúdo da caixa de texto
            jogada.focus() //setando o foco na caixa de texto
    }

    else if(tentativa < 1 || tentativa > 100){
        alert('Por favor, informar um número entre 1 e 100')
        jogada.value = '' //limpando o conteúdo da caixa de texto
        jogada.focus() //setando o foco na caixa de texto
    }

    else if(numerosJogados.includes(tentativa)){ //includes verifica os números jogados anteriormente
        alert('Atenção!! o número informado já foi jogado.')
        jogada.value = ''
        jogada.focus()
    }

    else{
            numerosJogados.push(tentativa) // empurrando um elemento para o vetor
            if(minhasJogadas === 6 && tentativa !== randomNumber){
                    displayTentativas(tentativa) //função
                    msg(`Game Over !! <br> O número correto era ${randomNumber}`) //função
                    fimJogo() //função
            }
            else{
                displayTentativas(tentativa)
                checarTentativas(tentativa)
            }
    }
} 
function checarTentativas(tentativa){
    if(tentativa === randomNumber){
        msg('Parabens, você acertou o número')
        fimJogo()
    }
    else if(tentativa < randomNumber){
        msg('Palpite baixo, tente novamente')
    }
    else if(tentativa > randomNumber){
        msg('Palpite alto demais, tente novamente')
    }
}

/*
    vamos limpar a caixa para a próxima rodada
    Vamos inserir uma informação dentro de um elemento html
*/

function displayTentativas(tentativa){
    jogada.value = ''
    jogada.focus()
    jogadaAnterior.innerHTML += `${tentativa} ,`
    minhasJogadas++
    jogadasRestantes.innerHTML = `${7 - minhasJogadas}`
}

function msg(texto){
    avisos.innerHTML = `<h1>${texto}</h1>`
}

function fimJogo(){
    jogada.value = ''
    jogada.setAttribute('disabled','') //desabilita a ceixa de texto para que a pessoa não consiga jogar outra vez
    submit.setAttribute('disabled','') //desabilita o botão "jogar número"
    p.classList.add('button') //adicione um estilo para o button
    p.innerHTML = '<h1 id = "iniciarJogada">Iniciar o Jogo</h1>'
    recomecar.appendChild(p)
    playGame = false
    iniciarJogo()
} 

function iniciarJogo() {
    const botaoIniciar = document.querySelector('#iniciarJogada')
    botaoIniciar.addEventListener('click',function(){
        randomNumber = parseInt(Math.random()*100+1)
        numerosJogados= []
        minhasJogadas = 1
        jogadaAnterior.innerHTML = ''
        avisos.innerHTML = '' // InnerHTML vai pegar algo do html e trazer para esse código
        jogadasRestantes.innerHTML = `${7 - minhasJogadas}`
        jogada.removeAttribute('disabled', '')
        submit.removeAttribute('disabled', '')
        recomecar.removeChild(p)
        playGame = true
    })
}