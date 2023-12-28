/*-------------------------------- Constants --------------------------------*/
import {computerChoice} from "./word-list.js"

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


const deleteKey = document.querySelector('#delete')
const enterKey = document.querySelector('#enter')

let l = [tileListR0, tileListR1, tileListR2, tileListR3, tileListR4, tileListR5]
/*----------------------------- Event Listeners -----------------------------*/
keysList.forEach((key) => {
    key.addEventListener('click',addLetter)
})

deleteKey.addEventListener("click", deleteLetter)
enterKey.addEventListener("click", compareWords)

/*-------------------------------- Functions --------------------------------*/

function addLetter(evt){
    console.log(activeCol)
    let letterChosen = evt.target.textContent
    let list = l[activeRow]
    for (let i=0; i < list.length; i++){
        if(list[i].textContent === ''){
            list[i].textContent = letterChosen
            activeCol += 1
            return
        } else if (list[i].textContent != ''){
            continue
        }
    }
}


function deleteLetter(){
    document.querySelector(`#R${activeRow}C${activeCol-1}`).textContent = ''
    if (activeCol <= 0){
    }   else {activeCol -= 1}
console.log(activeCol)
}


// take the letters in each tile and add it to an object
// function playerGuess(){
//     let letterList = []
//     l[activeRow].forEach((letter) => letterList.push(letter.textContent))
//     compareWords(letterList)
// }

// let compWordList = computerChoice()

function rowComplete(){
    let row = l[activeRow]
    console.log(row[1])
    for (let i=0; i < 5; i++){
        if (row[i].textContent === ''){
            document.querySelector(`#row${activeRow}`).classList.add('animate__animated', 'animate__shakeX')
            console.log("not shaking")
            return false
        }
    }
}

function compareWords(){
    rowComplete()
    if (rowComplete() === false){
        return
    }
    let compLetterList = ['a', 'p', 'p', 'l', 'e']
    let letterList = []
    l[activeRow].forEach((letter) => letterList.push(letter.textContent))
    for (let i=0; i < 5; i++){
        if (letterList [i] === compLetterList[i]){
            console.log("match", letterList[i])
            document.querySelector(`#R${activeRow}C${i}`).style.backgroundColor = "#29a329"
            document.querySelector(`#${letterList[i]}`).style.backgroundColor = "#29a329"
        } else if (letterList [i] !== compLetterList[i] && compLetterList.includes(letterList[i])) {
            document.querySelector(`#R${activeRow}C${[i]}`).style.backgroundColor = "#ffdb4d"
            document.querySelector(`#${letterList[i]}`).style.backgroundColor = "#ffdb4d"
        } else if (letterList [i] !== compLetterList[i] && compLetterList.includes(letterList[i]) === false) {
            document.querySelector(`#R${activeRow}C${[i]}`).style.backgroundColor = "#999999"
            document.querySelector(`#${letterList[i]}`).style.backgroundColor = "#999999"
        }
    }
activeRow += 1
activeCol = 0
console.log(`row: ${activeRow}, column: ${activeCol}`)
}

// function comparisonGameBoard = myGuessEle.forEach(letterGuess){
//     for (let i=0; i < 5 ; i++){
//       if letterGuess === letterDict[i]{
//           ** keyboard color green & board color green
//       } else {return}