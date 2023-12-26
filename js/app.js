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
enterKey.addEventListener("click", playerGuess)

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
function playerGuess(){
    let playerGuessList = []
    l[activeRow].forEach((letter) => playerGuessList.push(letter.textContent))
    console.log(playerGuessList)
}

let compWordList = computerChoice()


function compareWords(compWord){
    console.log(compWordList)
}