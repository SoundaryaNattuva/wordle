/*-------------------------------- Constants --------------------------------*/


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

/*----------------------------- Event Listeners -----------------------------*/
keysList.forEach((key) => {
    key.addEventListener('click',letterClick)
})

deleteKey.addEventListener("click", deleteLetter)


/*-------------------------------- Functions --------------------------------*/



function letterClick(evt){
    let letterChosen = evt.target.textContent
    updateBoardTile(letterChosen)
}

function updateBoardTile(letterChosen){
    if (activeRow === 0){
        checkRow(letterChosen, tileListR0)
    } else if (activeRow === 1){
        checkRow(letterChosen, tileListR1)
    } else if (activeRow === 2){
        checkRow(letterChosen, tileListR2)
    } else if (activeRow === 3){
        checkRow(letterChosen, tileListR3)
    } else if (activeRow === 4){
        checkRow(letterChosen, tileListR4)
    } else if (activeRow === 5){
        checkRow(letterChosen, tileListR5)
    }
}

function checkRow(letterChosen, tileListRow){
    for (let i=0; i < tileListRow.length; i++){
        if(tileListRow[i].textContent === ''){
            tileListRow[i].textContent = letterChosen
            activeCol += 1
            return
        } else if (tileListRow[i].textContent != ''){
            continue
        } 
    }
}

function deleteLetter(){
    document.querySelector(`#R${activeRow}C${activeCol-1}`).textContent = ''
    activeCol -= 1
}