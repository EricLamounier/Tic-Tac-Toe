let player = true // true = X | false = O
let jogadasX = []
let jogadasO = []
let cont = 0
let winX = false
let winO = false

const combinacao = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
]

let celula = document.querySelectorAll('.box')
celula.forEach((e) => {
    e.addEventListener('click', () =>{
        selecionaCelula(e)
    })
});

function selecionaCelula(item) {
    if(!item.classList.contains('selected')){
        if(player){
            if(!winX && !winO){
                //Jogada do X
                setPlayer()
                jogadorX(item)
                if(checkWinner(0)){
                    let countX = document.getElementById('countX')
                    countX.innerHTML = Number(countX.innerHTML) + 1
                    winX = true
                    showModal(0)
                    return
                }
                player = false
            }
    
            if(!winX && !winO){
                //jogador O
                setPlayer()
                setTimeout(()=>{
                     jogadorO()
                     if(checkWinner(1)){
                        let countO = document.getElementById('countO')
                        countO.innerHTML = Number(countO.innerHTML) + 1
                        winO = true
                        showModal(1)
                        return
                    }
                    player = true
                    console.log(player)
                }, 1000)
            }
        }
    }
}

function jogadorX(item) {
    let cel = item.getAttribute('data-i')
    
    //set image to cel
    
    item.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" xml:space="preserve" viewBox="1.41 1.41 252.9 252.9"><g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"><path d="M 13.4 88.492 L 1.508 76.6 c -2.011 -2.011 -2.011 -5.271 0 -7.282 L 69.318 1.508 c 2.011 -2.011 5.271 -2.011 7.282 0 L 88.492 13.4 c 2.011 2.011 2.011 5.271 0 7.282 L 20.682 88.492 C 18.671 90.503 15.411 90.503 13.4 88.492 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(42,199,190); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/><path d="M 69.318 88.492 L 1.508 20.682 c -2.011 -2.011 -2.011 -5.271 0 -7.282 L 13.4 1.508 c 2.011 -2.011 5.271 -2.011 7.282 0 l 67.809 67.809 c 2.011 2.011 2.011 5.271 0 7.282 L 76.6 88.492 C 74.589 90.503 71.329 90.503 69.318 88.492 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(42,199,190); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/></g></svg>'

    //set class selected
    item.classList.add('selected')
    item.classList.remove('empty')

    //set jogadasX
    jogadasX.push(parseInt(cel))
    cont++;
}

function jogadorO() {
    //jogada aleatoria
    if(cont == 9){
        let tie = document.getElementById('countTies')
        tie.innerHTML = Number(tie.innerHTML) + 1
        showModal(-1)
    }else{
        let jogadaO = -1
        let box = null

        do {

            jogadaO = randomIntFromInterval(1, 9)
            box = document.querySelector("[data-i='" + jogadaO + "']")
            
        }while(box.classList.contains('selected'))
        
        box.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="2 2 20 20"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm5 10c0 2.8-2.2 5-5 5s-5-2.2-5-5 2.2-5 5-5 5 2.2 5 5z" fill="#EFB235" class="color000000 svgShape"/></svg>'
        box.classList.add('selected')
        box.classList.remove('empty')
        jogadasO.push(jogadaO)
        cont++;
        player = !player
        setPlayer()
    }
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function checkWinner(jogador){
    let x = false
    let aux = false
    if(jogador){ //O
        x = combinacao.some( (vet) => {
            aux =  vet.every( (e)=> {
                return jogadasO.includes(e)
            })

            if(aux){
                colorWinner(vet)
            }
            return aux
        })
    }else{ //X
        x = combinacao.some( (vet) => {
            aux = vet.every( (e)=> {
                return jogadasX.includes(e)
            })

            if(aux){
                colorWinner(vet)
            }

            return aux
        })
    }
    return x
}

function colorWinner(vet) {
    let box
    for(let i = 0 ; i< 3 ;i++){
        box = document.querySelector('[data-i="' + vet[i] + '"]')
        console.log(vet[0])
        box.style.backgroundColor = '#31c4be'
        box.children[0].classList.add('svgWinner')
    }
}

function setPlayer() {
    let turno = document.getElementById('currentPlayer')
    if(player){ // X
        turno.innerHTML = 'X'
    }else{ // O
        turno.innerHTML = 'O'
    }
}

function restart(){
    player = true // true = X | false = O
    jogadasX = []
    jogadasO = []
    cont = 0
    winX = false
    winO = false
    celula.forEach( (e) => {
        e.classList.remove('selected')
        e.classList.add('empty')
        e.innerHTML = ''
        e.style.backgroundColor = '#1f3540'
    })
    document.getElementById('currentPlayer').innerHTML = 'X'
}

function quit() {
    window.location.reload()
}

function nextRound() {
    restart()
    hideModal()
}

function hideModal() {
    let modal = document.getElementById('modalWinner')
    let fade = document.getElementById('fade')

    modal.style.opacity = '0'
    modal.style.top = '-59%'
    modal.style.zIndex = '-10'

    fade.style.opacity = '0'
    fade.style.zIndex = '-10'
}

function showModal(winner) {
    let msg = document.getElementById('messageWon')
    let winPlayer = document.getElementById('winner')

    if(winner == 1){ //O
        msg.innerHTML = 'CPU Won'
        winPlayer.children[0].innerHTML = 'O'
        winPlayer.children[1].innerHTML = 'TAKES THE ROUND!'

    }else if(winner == 0){ // X
        msg.innerHTML = 'You Won'
        winPlayer.children[0].innerHTML = 'X'
        winPlayer.children[1].innerHTML = 'TAKES THE ROUND!'

    }else{ //tie
        msg.innerHTML = 'Tie'
        winPlayer.children[0].innerHTML = ''
        winPlayer.children[1].innerHTML = 'Tie Game!'
    }

    let modal = document.getElementById('modalWinner')
    let fade = document.getElementById('fade')

    modal.style.opacity = '1'
    modal.style.top = '35%'
    modal.style.zIndex = '10'

    fade.style.opacity = '1'
    fade.style.zIndex = '5'
}
