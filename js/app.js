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
    if (activeRow >= 6){
    endGame() //need to exit out of function. Return doesn't do that
    }
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

// let compWordList = computerChoice()

function rowComplete(){
    if (activeRow >= 6){
        return
    }
    let row = l[activeRow]
    console.log(row[1])
    for (let i=0; i < 5; i++){
        if (row[i].textContent === ''){
            document.querySelector(`#row${activeRow}`).classList.add('animate__animated', 'animate__shakeX')
            console.log("not shaking", activeRow)
            return false
        }
    }
}

function compareWords(){
    rowComplete()
    if (rowComplete() === false){
        return
    }
    if (activeRow >= 6){
        return
    }
    let compLetterList = ['A', 'P', 'P', 'L', 'E']
    let letterList = []
    l[activeRow].forEach((letter) => letterList.push(letter.textContent))
    for (let i=0; i < 5; i++){
        console.log(letterList[i], compLetterList[i])
        if (letterList[i] === compLetterList[i]){
            console.log("match", letterList[i])
            document.querySelector(`#R${activeRow}C${i}`).style.backgroundColor = "#70a288"
            document.querySelector(`#${letterList[i]}`).style.backgroundColor = "#70a288"
        } else if (letterList[i] !== compLetterList[i] && compLetterList.includes(letterList[i])) {
            document.querySelector(`#R${activeRow}C${[i]}`).style.backgroundColor = "#dab785"
            document.querySelector(`#${letterList[i]}`).style.backgroundColor = "#dab785"
        } else if (letterList[i] !== compLetterList[i] && compLetterList.includes(letterList[i]) === false) {
            document.querySelector(`#R${activeRow}C${[i]}`).style.backgroundColor = "gray"
            document.querySelector(`#${letterList[i]}`).style.backgroundColor = "gray"
        }
    }
    if (compLetterList.join('') === letterList.join('')){
        console.log("you won!")
        endGame()
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

function endGame(){
    // activeRow = null
    // activeCol = null

}