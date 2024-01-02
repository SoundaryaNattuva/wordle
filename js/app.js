/*-------------------------------- Constants --------------------------------*/
import {computerChoice, dictionaryWords, spaceWords} from "./word-list.js"

/*-------------------------------- Variables --------------------------------*/
let activeRow = 0
let activeCol = 0

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

const deleteKey = document.querySelector('#delete')
const enterKey = document.querySelector('#enter')

let l = [tileListR0, tileListR1, tileListR2, tileListR3, tileListR4, tileListR5]
/*----------------------------- Event Listeners -----------------------------*/
keysList.forEach((key) => {
    key.addEventListener('click',addLetter)
})

deleteKey.addEventListener("click", deleteLetter)
enterKey.addEventListener("click", submitKey)

/*-------------------------------- Functions --------------------------------*/
function endGame(){
    console.log("game Over")
    resultDisplay.textContent = ("Game over!")
}

// function checkRowCol(){
//     if (activeRow > 5){
//         endGame()
//     } else if (activeCol )
// }

function addLetter(evt){
    let letterChosen = evt.target.textContent
    if (activeRow === 6){
        endGame()
    } else if (activeCol >= 5){
        document.querySelector(`#row${activeRow}`).classList.add('animate__animated', 'animate__shakeX')
        return
    } else if (activeCol < 5){
        document.querySelector(`#R${activeRow}C${activeCol}`).textContent = (letterChosen)
        activeCol += 1
    }
    console.log("active col is :" + activeCol + "\nActive Row is: " + activeRow)
}


function deleteLetter(){
    if (activeCol > 5){
        console.log("greater than 5")
        return
    } else if (activeCol === 0){
        console.log("equal to 0")
        return
    } else {
        console.log("delete letter")
        document.querySelector(`#R${activeRow}C${activeCol-1}`).textContent = ''
        console.log("active col is :" + activeCol + "\nActive Row is: " + activeRow)
        activeCol -= 1
    }
}

function submitKey(){
    isRowComplete()
    compareWords() 
}

function isRowComplete(){
    let row = l[activeRow]
    for (let i=0; i < 5; i++){
    if (row[i].textContent === ''){
        document.querySelector(`#row${activeRow}`).classList.add('animate__animated', 'animate__shakeX')
        console.log("incomplete row", activeRow)
        return
        }
    }
}

function turnGreen(index){
    document.querySelector(`#R${activeRow}C${index}`).style.backgroundColor = "#40916c"
    document.querySelector(`#R${activeRow}C${index}`).classList.add('animate__animated', 'animate__flipInX')
}

function turnYellow(index){
    document.querySelector(`#R${activeRow}C${[index]}`).style.backgroundColor = "#a68500"
    document.querySelector(`#R${activeRow}C${index}`).classList.add('animate__animated', 'animate__flipInX')
}

function turnGray(index){
    document.querySelector(`#R${activeRow}C${[index]}`).style.backgroundColor = "gray"
    document.querySelector(`#R${activeRow}C${index}`).classList.add('animate__animated', 'animate__flipInX')
}

function compareWords(){
    isRowComplete()
    let compLetterList = ['A', 'P', 'P', 'L', 'E']
    let letterList = []
    l[activeRow].forEach((letter) => letterList.push(letter.textContent))
    for (let i=0; i < 5; i++){
        console.log(letterList[i], compLetterList[i])
        if (letterList[i] === compLetterList[i]){
            console.log("match", letterList[i])
            turnGreen(i)
            document.querySelector(`#${letterList[i]}`).style.backgroundColor = "#40916c"
        } else if (letterList[i] !== compLetterList[i] && compLetterList.includes(letterList[i])) {
            turnYellow(i)
            document.querySelector(`#${letterList[i]}`).style.backgroundColor = "#a68500"
        // } else if (letterList[i] !== compLetterList[i] && compLetterList.includes(letterList[i]) && document.querySelector(`#${letterList[i]}`).style.backgroundColor === "#40916c") {
        //     document.querySelector(`#R${activeRow}C${[i]}`).style.backgroundColor = "#a68500"
        //     document.querySelector(`#R${activeRow}C${i}`).classList.add('animate__animated', 'animate__flipInX')
        //     document.querySelector(`#${letterList[i]}`).style.backgroundColor = "#40916c"
        } else if (letterList[i] !== compLetterList[i] && compLetterList.includes(letterList[i]) === false) {
            turnGray(i)
            document.querySelector(`#${letterList[i]}`).style.backgroundColor = "gray"
        }
    }
    if (compLetterList.join('').toLowerCase() === letterList.join('').toLowerCase()){
        console.log("you won!")
        resultDisplay.textContent = ("You Won!")
        return
    }
    activeRow += 1
    activeCol = 0
    console.log(`row: ${activeRow}, column: ${activeCol}`)
    checkGameOver()
}

function checkGameOver(){
    if (activeRow >=6){
        // CSS - inset game ended
        console.log("end")
    }
}

