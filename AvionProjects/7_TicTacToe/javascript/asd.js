const winningCombinations =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const darkSide = 'dark-side'
const lightSide = 'light-side'
const cells = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageText = document.querySelector('[data-winning-message-text]')
const winningMessage = document.getElementById('winningMessage')
const restart = document.getElementById('restartButton')
const side = document.getElementById('sides')
const darkSideButton = document.getElementById('darkSideButton')
const lightSideButton = document.getElementById('lightSideButton')
const previousButton = document.getElementById('previousButton')
const nextButton = document.getElementById('nextButton')
let boardState = new Array(9)
let history = []
let turn
let pointer = history.length


startGame()
restart.addEventListener('click', startGame)
darkSideButton.addEventListener('click', theDarkSide)
lightSideButton.addEventListener('click', theLightSide)
previousButton.addEventListener('click', previous)
nextButton.addEventListener('click', next)

function startGame(){
    side.classList.add('show')
    cells.forEach(cell=>{
        cell.classList.remove(lightSide)
        cell.classList.remove(darkSide)
        cell.classList.remove('disabled')
        cell.removeEventListener('click', clicked)
        cell.addEventListener('click', clicked, {once: true})
    })
    winningMessage.classList.remove('show')
}

function clicked(e){
    const cellTarget = e.target
    const currentClass = turn ? lightSide : darkSide
    placeMark(cellTarget, currentClass)
    checkState()
    if(checkWin(currentClass)){
        endGame(false)
    } else if(isDraw()){
        endGame(true)
    } else{
        switchTurns()
        setBoardHoverClass()
    }
}

function endGame(draw){
    if (draw){
        winningMessageText.innerText = "Draw!"
    }else{
        winningMessageText.innerText = `${turn ? "The Light Side" : "The Dark Side"} WINS!`
    }
    winningMessage.classList.add('show')
    cells.forEach(cell=>{
        cell.classList.add('disabled')
        cell.removeEventListener('click', clicked)
        cell.removeAttribute('hover')
    })
    previousButton.classList.add('show')
    nextButton.classList.add('show')
}

function isDraw(){
    return [...cells].every(cell => {
        return cell.classList.contains(darkSide) || cell.classList.contains(lightSide)
    })
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}

function switchTurns(){
    turn = !turn
}

function setBoardHoverClass(){
    board.classList.remove(darkSide)
    board.classList.remove(lightSide)
    if(turn){
        board.classList.add(lightSide)
    }else{
        board.classList.add(darkSide)
    }
}

function checkWin(currentClass){
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass)
        })
    })
}

function theDarkSide(){
    turn = false
    setBoardHoverClass()
    side.classList.remove('show')
}

function theLightSide(){
    turn = true
    setBoardHoverClass()
    side.classList.remove('show')
}

function checkState(){
    for(let i = 0; i<boardState.length; i++){
        if(cells[i].classList.contains(darkSide)){
            boardState[i] = 'X'
        }else if(cells[i].classList.contains(lightSide)){
            boardState[i] = 'O'
        }else{
            boardState[i] = ''
        }
    }
    let boardStateCopy = [...boardState]
    history.push(boardStateCopy)
    console.log(history)
}

function previous(){
    if(pointer === 0){
        previousButton.setAttribute('disabled')
    }else if(pointer > 0){
        previousButton.removeAttribute('disabled')
        pointer -= 1
    }
    
}

function next(){
    if(pointer === history.length){
        nextButton.setAttribute('disabled')
    }else if(pointer < history.length){
        nextButton.removeAttribute('disabled')
        pointer += 1
    }
    
}