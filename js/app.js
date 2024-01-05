/*-------------------------------- Constants --------------------------------*/
import {computerChoice, dictionaryWords} from "./word-list.js"

/*----------------------- Citation: Animate.CSS function ----------------------*/
const animateCSS = (element, animation, prefix = 'animate__') =>
    
    new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);

    function handleAnimationEnd(event) {
        event.stopPropagation();
        node.classList.remove(`${prefix}animated`, animationName);
        resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
    });

/*-------------------------------- Variables --------------------------------*/
let activeRow = 0
let activeCol = 0
let computerWord = []
let instructionsOpen = false
let musicVolume = false
let listOfGuesses = []

/*------------------------ Cached Element References ------------------------*/
const keysList = document.querySelectorAll('.key')
const tileListR0 = document.querySelectorAll('.row0Tile')
const tileListR1 = document.querySelectorAll('.row1Tile') 
const tileListR2 = document.querySelectorAll('.row2Tile') 
const tileListR3 = document.querySelectorAll('.row3Tile') 
const tileListR4 = document.querySelectorAll('.row4Tile') 
const tileListR5 = document.querySelectorAll('.row5Tile') 
let resultDisplay = document.querySelector('#results')
const keyboardKeys = document.querySelectorAll('.key')

const deleteKey = document.querySelector('#delete')
const enterKey = document.querySelector('#enter')

const musicBtn = document.querySelector('#music')
const AlienBtn = document.querySelector('#alien')
const resetBtn = document.querySelector('#reset')

let boardRows = [tileListR0, tileListR1, tileListR2, tileListR3, tileListR4, tileListR5]

const backgroundMusic = new Audio("../music/cinematicbg.mp3")
const wrongGuessMusic = new Audio("../music/nextguess.wav")
const errorMusic = new Audio("../music/error4.wav")
const lostMusic = new Audio("../music/lostGame.wav")
const newWordMusic = new Audio ("../music/newWordMusic.wav")
const winMusic = new Audio ("../music/winMusic.wav")
const motivationAudio = new Audio("../music/AlienEncouragement.wav")
/*----------------------------- Event Listeners -----------------------------*/
keysList.forEach((key) => {
    key.addEventListener('click',addLetter)
})
deleteKey.addEventListener("click", deleteLetter)
enterKey.addEventListener("click", compareWords)
resetBtn.addEventListener('click',init)
musicBtn.addEventListener("click", playBGMusic)
AlienBtn.addEventListener("click", playAlien)

/*-------------------------------- Functions --------------------------------*/
function addLetter(evt){
    let letterChosen = evt.target.textContent
    if (activeRow === 6){
        lostGame()
    } else if (activeCol >= 5){
        document.querySelector(`#row${activeRow}`).classList.add('animate__animated', 'animate__shakeX')
        animateCSS(`#row${activeRow}`, 'shakeX')
        return
    } else if (activeCol < 5){
        document.querySelector(`#R${activeRow}C${activeCol}`).textContent = (letterChosen)
        activeCol += 1
    }
}

function deleteLetter(){
    if (activeCol > 5){
        return
    } else if (activeCol === 0){
        return
    } else {
        document.querySelector(`#R${activeRow}C${activeCol-1}`).textContent = ''
        activeCol -= 1
    }
}

function turnGreen(index){
    document.querySelector(`#R${activeRow}C${index}`).style.backgroundColor = "#40916c"
    animateCSS(`#R${activeRow}C${index}`, 'flipInX')
}

function turnYellow(index){
    document.querySelector(`#R${activeRow}C${[index]}`).style.backgroundColor = "#a68500"
    animateCSS(`#R${activeRow}C${index}`, 'flipInX')
}

function turnGray(index){
    document.querySelector(`#R${activeRow}C${[index]}`).style.backgroundColor = "gray"
    animateCSS(`#R${activeRow}C${index}`, 'flipInX')
}

function newWord(){
    computerWord = computerChoice()
}

newWord()
console.log(computerWord)

function compareWords(){
    if(activeCol === undefined){
        return}
    resultDisplay.textContent = ('')
    let letterList = []
    let row = boardRows[activeRow]
    row.forEach((letter) => letterList.push(letter.textContent.toLowerCase()))
    let guessWord = letterList.join('').toLowerCase()
    if(row[row.length-1].innerHTML === ''){
        animateCSS(`#row${activeRow}`, 'shakeX')
        resultDisplay.textContent = ("Your cosmic word must be 5 letters long 🌛")
        errorMusic.play()
        return}
    if (listOfGuesses.includes(guessWord) === true){
        resultDisplay.innerHTML = ("This word's been beamed up!<br> Pick another 5-letter galaxy")
        animateCSS(`#row${activeRow}`, 'shakeX')
        errorMusic.play()
        return}
    if (dictionaryWords.includes(guessWord) === false){
        resultDisplay.textContent = ("Error - recalibrate your space vocabulary and transmit again")
        errorMusic.play()
        return}
    if (computerWord.join('').toLowerCase() === guessWord) { 
        resultDisplay.innerHTML = ("Stellar performance!<br>Click the 🚀 to launch into another round!")
        for (let i=0; i < 5; i++){
            turnGreen(i)}
        winMusic.play()
        endGame()
        return
    } else {
        for (let i=0; i < 5; i++){
            if (letterList[i] === computerWord[i]){
                turnGreen(i)
                document.querySelector(`#${letterList[i]}`).style.backgroundColor = "#40916c"
            } else if (letterList[i] !== computerWord[i] && computerWord.includes(letterList[i])) {
                turnYellow(i)
                document.querySelector(`#${letterList[i]}`).style.backgroundColor = "#a68500"
            } else if ((letterList[i] !== computerWord[i]) && (computerWord.includes(letterList[i]) === false)) {
                turnGray(i)
                document.querySelector(`#${letterList[i]}`).style.backgroundColor = "gray"
            }
        resultDisplay.textContent = ("Almost there, galaxy traveler! 👩🏽‍🚀 Shift your course with another 5-letter word.")
        }
    wrongGuessMusic.play()
    listOfGuesses.push(guessWord)
    activeRow += 1
    activeCol = 0
    checkGameOver()
    }
}

function checkGameOver(){
    if (activeRow === 6){
        animateCSS(`#row5`, 'hinge')
        lostGame()
        lostMusic.play()
        return
    }
}

function clearKeyBoard(){
    for(let i=0; i<26; i++){
        keyboardKeys[i].style.backgroundColor = "#031d44"
    }
}

function clearTiles(){
    for (let r=0; r<6; r++){
        for(let i=0; i<5; i++){
            document.querySelector(`#R${r}C${i}`).textContent = ''
            document.querySelector(`#R${r}C${i}`).style.backgroundColor = "#031d44"
        }
    }
}

function init(){
    activeCol = 0
    activeRow = 0
    resultDisplay.textContent = ("")
    clearKeyBoard()
    clearTiles()
    newWord()
    newWordMusic.play()
    listOfGuesses = []
}

function playBGMusic(){
    backgroundMusic.loop = true
    backgroundMusic.volume = .04
    backgroundMusic.play()
    if (musicVolume === true){
        musicVolume = false
        backgroundMusic.pause()
        return
    } else if (musicVolume === false){
        musicVolume = true
        backgroundMusic.play()
        backgroundMusic.volume = .04
        return
    }
}

function playAlien(){
    motivationAudio.volume = .04
    motivationAudio.play()
}

function lostGame(){
    let compWordJoin = computerWord.join('').toUpperCase()
    resultDisplay.innerHTML = ("Game over 🤖 <br>The deciphered galactic term is " + compWordJoin + "<br>Click the rocket to launch a new game")
}

function endGame(){
    activeCol = null
    activeRow = null
}