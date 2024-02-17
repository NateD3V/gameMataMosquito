const state = {
    palco: {
        altura:window.innerHeight,
        largura:window.innerWidth
    },
    posicao: {
        posicaoX: Math.random(), 
        posicaoY: Math.random() 
    },
    vidas:1,

    fx: new Audio('audio/splat.wav'),

    time:15,

    nivel: window.location.search,

    mosquitoTime: 1500

}

// Lógica da seleção de nível
if(state.nivel === '?normal'){
    state.mosquitoTime = 1500
} else if(state.nivel === '?dificil') {
    state.mosquitoTime = 1000
} else if (state.nivel === '?chucknorris') {
    state.mosquitoTime = 200
}

function ajustarPalcoJogo(){
    state.palco.altura = window.innerHeight;
    state.palco.largura = window.innerWidth;
    console.log(state.palco.altura, state.palco.largura);
}

let cronometro = setInterval(()=>{
    state.time -= 1
    if(state.time < 0){
        clearInterval(cronometro)
        clearInterval(criarMosquitos)
        window.location.href = 'vitoria.html'
    } else {
        // innerHTML permite inserir algo dentro das tags Html selecionada
        document.getElementById('cronometro').innerHTML = state.time
    }
    
    
},1000)

function posicaoRandomica(){
    // Atualiza as dimensões do palco
    ajustarPalcoJogo();

    // remover o mosquito anterior( caso exista )
    if(document.getElementById('mosquito')) {
        document.getElementById('mosquito').remove()
        if(state.vidas > 3){
            window.location.href = 'gameover.html'
        } else {
            document.getElementById('v' + state.vidas).src = 'img/coracao_vazio.png'
            state.vidas++
        }
        
    }
    
    // Calcula a posição máxima permitida para o mosquito respeitando as dimensões do palco
    const maxPosicaoX = state.palco.largura - 90;
    const maxPosicaoY = state.palco.altura - 90;

    // Define onde o mosquito pode aparecer no browser
    state.posicao.posicaoX = Math.floor(Math.random() * maxPosicaoX);
    state.posicao.posicaoY = Math.floor(Math.random() * maxPosicaoY);

    // Criar o elemento HTML
    let mosquito = document.createElement('img')
    mosquito.src = 'img/mosquito.png'
    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio()
    mosquito.style.left = state.posicao.posicaoX + 'px'
    mosquito.style.top = state.posicao.posicaoY + 'px'
    mosquito.style.position = 'absolute'
    mosquito.draggable = false
    mosquito.id = 'mosquito'
    mosquito.onclick = function(){
        this.remove()
        state.fx.playbackRate= 0.8
        state.fx.play()

    }
    document.body.appendChild(mosquito)
}

function tamanhoAleatorio(){
    let classe = Math.floor(Math.random() * 3)
    switch(classe) {
        case 0:
            return 'mosquito-1'

        case 1:
            return 'mosquito-2'

        case 2:
            return 'mosquito-3'
    }
}

function ladoAleatorio(){
    let classe = Math.floor(Math.random() * 2)
    switch(classe) {
        case 0:
            return 'ladoA'
        case 1:
            return 'ladoB'
    }
}
// Main
let criarMosquitos = setInterval(() =>{
    posicaoRandomica();
}, state.mosquitoTime);


// console.log(state.posicao.posicaoY,state.posicao.posicaoX);

