/*-------------------------------- Constants --------------------------------*/
import {computerChoice, dictionaryWords, spaceWords} from "./word-list.js"

//cite this
const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
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
let musicVolume = true

/*------------------------ Cached Element References ------------------------*/
const keysList = document.querySelectorAll('.key')
const tileList = document.querySelectorAll('.tile')
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
const instructionsBtn = document.querySelector('#instructions')
const resetBtn = document.querySelector('#reset')

let boardRows = [tileListR0, tileListR1, tileListR2, tileListR3, tileListR4, tileListR5]

const backgroundMusic = new Audio("../music/cinematicbg.mp3")
const wrongGuessMusic = new Audio("../music/nextguess.wav")
/*----------------------------- Event Listeners -----------------------------*/
keysList.forEach((key) => {
    key.addEventListener('click',addLetter)
})

deleteKey.addEventListener("click", deleteLetter)
enterKey.addEventListener("click", compareWords)

resetBtn.addEventListener('click',init)
// instructionsBtn.addEventListener('click', instructionsMenu)

musicBtn.addEventListener("click", playBGMusic)

/*-------------------------------- Functions --------------------------------*/
function lostGame(){
    resultDisplay.textContent = ("Game over!")

}

function addLetter(evt){
    let letterChosen = evt.target.textContent
    if (activeRow === 6){
        lostGame()
    } else if (activeCol >= 5){
        // document.querySelector(`#row${activeRow}`).classList.add('animate__animated', 'animate__shakeX')
        animateCSS(`#row${activeRow}`, 'shakeX')
        return
    } else if (activeCol < 5){
        document.querySelector(`#R${activeRow}C${activeCol}`).textContent = (letterChosen)
        activeCol += 1
    }
    console.log("active col is :" + activeCol + "\nActive Row is: " + activeRow)
}

function deleteLetter(){
    if (activeCol > 5){
        return
    } else if (activeCol === 0){
        return
    } else {
        document.querySelector(`#R${activeRow}C${activeCol-1}`).textContent = ''
        console.log("active col is :" + activeCol + "\nActive Row is: " + activeRow)
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
    console.log(computerWord)
}

newWord()

function compareWords(){
    let letterList = []
    let row = boardRows[activeRow]
    row.forEach((letter) => letterList.push(letter.textContent.toLowerCase()))
    let guessWord = letterList.join('').toLowerCase()
    console.log(computerWord.join('').toLowerCase())
    console.log(guessWord)
    if(row[row.length-1].innerHTML === ''){
        animateCSS(`#row${activeRow}`, 'shakeX')
        return}
    if (dictionaryWords.includes(guessWord) === false){
        console.log("word not in dictionary")
        animateCSS(`#row${activeRow}`, 'shakeX')
        return}
    if (computerWord.join('').toLowerCase() === guessWord) { 
        resultDisplay.textContent = ("You Won!")
        for (let i=0; i < 5; i++){
            turnGreen(i)}
        endGame()
        return
    } else {
        for (let i=0; i < 5; i++){
            if (letterList[i] === computerWord[i]){
                console.log("match", letterList[i])
                turnGreen(i)
                document.querySelector(`#${letterList[i]}`).style.backgroundColor = "#40916c"
            } else if (letterList[i] !== computerWord[i] && computerWord.includes(letterList[i])) {
                turnYellow(i)
                document.querySelector(`#${letterList[i]}`).style.backgroundColor = "#a68500"
            } else if ((letterList[i] !== computerWord[i]) && (computerWord.includes(letterList[i]) === false)) {
                turnGray(i)
                document.querySelector(`#${letterList[i]}`).style.backgroundColor = "gray"
            }
        }
    wrongGuessMusic.play()
    console.log("activeRow before: " + activeRow)
    activeRow += 1
    activeCol = 0
    checkGameOver()
    console.log("activeRow after: " + activeRow)
    }
}

function checkGameOver(){
    if (activeRow === 6){
        console.log("hello I made it!")
        animateCSS(`#row5`, 'hinge')
        lostGame()
        return
    }
}

function clearKeyBoard(){
    for(let i=0; i<26; i++){
        keyboardKeys[i].style.backgroundColor = "#031d44"
    }
    console.log(keyboardKeys)
}

function clearTiles(){
    for (let r=0; r<6; r++){
        for(let i=0; i<5; i++){
            document.querySelector(`#R${r}C${i}`).textContent = ''
            document.querySelector(`#R${r}C${i}`).style.backgroundColor = "#031d44"
            console.log("clear tiles")
        }
    }
}

function init(){
    activeCol = 0
    activeRow = 0
    clearKeyBoard()
    clearTiles()
    newWord()

}

playBGMusic()

function playBGMusic(){
    backgroundMusic.volume = .04
    backgroundMusic.play()
    if (musicVolume === true){
        musicVolume = false
        backgroundMusic.pause()
        return
    } else if (musicVolume === false){
        musicVolume = true
        backgroundMusic.volume = .04
    }
}

// function instructionsMenu(){
//     console.log("instructions")
//     if (instructionsOpen === false){
//     document.querySelector('#popup').style.display = 'block';
//     instructionsOpen = true
//     } else if (instructionsOpen === true){
//         divContainer.style.display = 'none';
//         instructionsOpen = true
//     }
// }