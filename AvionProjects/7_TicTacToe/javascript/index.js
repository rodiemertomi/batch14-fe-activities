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
let pointer = -1
let isGameEnd

startGame()
restart.addEventListener('click', restartGame)
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
    pointer += 1
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
    endState()
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
}

function restartGame(){
    history = []
    pointer = -1
    boardState = []
    previousButton.classList.remove('show')
    nextButton.classList.remove('show')
    previousButton.classList.remove('disabled')
    nextButton.classList.remove('disabled')
    startGame()
}

function previous(){
    cells.forEach(cell=>{
        cell.classList.remove(darkSide)
        cell.classList.remove(lightSide)
    })
    pointer -= 1
    let nextMove = history[pointer]
    for(let i = nextMove.length; i>=0; i--){
        if(nextMove[i] === 'X'){
            cells[i].classList.add(darkSide)
        }else if(nextMove[i] === 'O'){
            cells[i].classList.add(lightSide)
        }
    }
    endState()
}

function next(){
    cells.forEach(cell=>{
        cell.classList.remove(darkSide)
        cell.classList.remove(lightSide)
    })
    pointer +=1
    let nextMove = history[pointer]
    for(let i = 0; i<=nextMove.length; i++){
        if(nextMove[i] === 'X'){
            cells[i].classList.add(darkSide)
        }else if(nextMove[i] === 'O'){
            cells[i].classList.add(lightSide)
        }
    }
    endState()
}

function endState(){
    previousButton.classList.add('show')
    nextButton.classList.add('show')
    if(pointer === 0){
        previousButton.disabled = true
        previousButton.style.cursor = 'not-allowed'
        previousButton.classList.add('disabled')
    }else if(pointer === history.length-1){
        nextButton.disabled = true
        nextButton.style.cursor = 'not-allowed'
        nextButton.classList.add('disabled')
    }else{
        previousButton.disabled = false
        previousButton.style.cursor = 'pointer'
        previousButton.classList.remove('disabled')
        nextButton.disabled = false
        nextButton.style.cursor = 'pointer'
        nextButton.classList.remove('disabled')
    }
}