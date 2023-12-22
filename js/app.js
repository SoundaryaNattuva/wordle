/*-------------------------------- Constants --------------------------------*/


/*-------------------------------- Variables --------------------------------*/
let activeRow = 0

/*------------------------ Cached Element References ------------------------*/
const keysList = document.querySelectorAll('.key')
const tileList = document.querySelectorAll('.tile') 
const tileListR1 = document.querySelectorAll('.row1Tile') 
const tileListR2 = document.querySelectorAll('.row2Tile') 
const tileListR3 = document.querySelectorAll('.row3Tile') 
const tileListR4 = document.querySelectorAll('.row4Tile') 
const tileListR5 = document.querySelectorAll('.row5Tile') 
const tileListR6 = document.querySelectorAll('.row6Tile')

/*----------------------------- Event Listeners -----------------------------*/
keysList.forEach((key) => {
    key.addEventListener('click',letterClick)
})

/*-------------------------------- Functions --------------------------------*/



function letterClick(evt){
    let letterChosen = evt.target.textContent
    updateBoardTile(letterChosen)
}

function updateBoardTile(letterChosen){
    if (activeRow === 0){
        checkRow(letterChosen, tileListR1 )
    } else if (activeRow === 1){
        checkRow(letterChosen, tileListR2)
    } else if (activeRow === 2){
        checkRow(letterChosen, tileListR3)
    } else if (activeRow === 3){
        checkRow(letterChosen, tileListR4)
    } else if (activeRow === 4){
        checkRow(letterChosen, tileListR5)
    } else if (activeRow === 5){
        checkRow(letterChosen, tileListR6)
    }
}

function checkRow(letterChosen, tileListRow){
    for (let i=0; i < tileListRow.length; i++){
        if(tileListR1[i].textContent === ''){
            tileListR1[i].textContent = letterChosen
            return
        } else if (tileListR1[i].textContent != ''){
            continue
        } 
    }
}

