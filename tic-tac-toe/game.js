/*
 *  Assignment: Homework Assignment #8: Events.
 *  Description:  Tic-tac-toe game - select three in a row.
 */

const elDIV = document.querySelector("div.tic-tac-toe");
const elTBL = document.getElementById("board");

elTBL.addEventListener("click", draw);

let count = 0;
const clicks = [];

function draw(e) {
    //Start with X.
    if (count  === 0) {
        setTD ("X", "red-x");
    }

    if(count >= 1 && !Boolean(e.target.innerText)) {
        const lastItem = clicks[clicks.length - 1];
        
        //Add X or O, based on last input.
        if (lastItem === "X") {
            setTD ("O", "black-o");
        } else {
            setTD ("X", "red-x");
        }
 
        //check for winning row.
        if( count > 4 ) {
            const winner = findWinner();
            
            if(winner === 'X') {
                setResult("X Won");
            }else if (winner === 'O'){
                setResult("O Won");
            } else {
                if (count === 9) {
                    setResult("Cat's Game");
                }
            }          
        }
    }

    //@desc - set table cell data.
    function setTD(data, className) {
        e.target.innerText = data;
        e.target.classList.add(className);
        clicks.push(e.target.innerText);
        count += 1;
    }

     //@desc - Set result.
    function setResult(result) {
        setTimeout(() => {
            alert(result);
            clearBoard();
        }, 10);    
    }
}

//@desc - Select three X or O in a single row.
function findWinner() {
    for(i = 0; i < elTBL.rows.length; i++ ) {
        let rowCells = elTBL.rows[i].cells;
        let xRowCount = 0;
        let oRowCount = 0;
        
        for( j = 0; j < rowCells.length; j++) {
            if(rowCells[j].innerText === 'X') {
                xRowCount += 1;
            } else if(rowCells[j].innerText === 'O') {
                oRowCount += 1;
            } else {

            }
        }
        
        if (xRowCount === 3) {
            elTBL.rows[i].classList.add("strikeout");
            return 'X';
        } else if (oRowCount === 3) {
            elTBL.rows[i].classList.add("strikeout");
            return 'O';
        } else {

        }
    }

    return false;
}

//@desc - Reset the board to beginning state.
function clearBoard() {
    for(i = 0; i < elTBL.rows.length; i++ ) {
        let rowCells = elTBL.rows[i].cells;

        for( j = 0; j < rowCells.length; j++) {
            rowCells[j].innerText = "";

            if(rowCells[j].className === "red-x") {
                rowCells[j].classList.remove("red-x");
            } else if(rowCells[j].className === "black-o") {
                rowCells[j].classList.remove("black-o");
            }else {

            }
        }

        if(elTBL.rows[i].className === "strikeout") {
            elTBL.rows[i].classList.remove("strikeout");
        }
    }

    count = 0;
    clicks.length = 0;
}