let board = ["","","","","","","","",""];
let currentPlayer = "X";

let moveStack = []; // STACK

const boardDiv = document.getElementById("board");
const status = document.getElementById("status");
const historyList = document.getElementById("historyList");

createBoard();

function createBoard(){
    boardDiv.innerHTML="";
    for(let i=0;i<9;i++){
        let btn = document.createElement("button");
        btn.classList.add("cell");
        btn.innerText = board[i];
        btn.onclick = ()=> makeMove(i);
        boardDiv.appendChild(btn);
    }
}

function makeMove(index){
    if(board[index]!="") return;

    board[index] = currentPlayer;

    // PUSH operation
    moveStack.push({index,player:currentPlayer});
    updateHistory();

    if(checkWinner()){
        status.innerText = currentPlayer+" Wins! 🎉";
        disableBoard();
        return;
    }

    if(board.every(c=>c!="")){
        status.innerText="Draw 😐";
        return;
    }

    currentPlayer = currentPlayer=="X"?"O":"X";
    status.innerText="Player "+currentPlayer+"'s turn";
    createBoard();
}

function undoMove(){
    if(moveStack.length==0) return;

    // POP operation
    let lastMove = moveStack.pop();
    board[lastMove.index]="";
    currentPlayer = lastMove.player;

    updateHistory();
    status.innerText="Undo done! Player "+currentPlayer+"'s turn";
    createBoard();
}

function updateHistory(){
    historyList.innerHTML="";
    moveStack.forEach((m,i)=>{
        let li=document.createElement("li");
        li.innerText = `Move ${i+1}: Player ${m.player} -> Cell ${m.index+1}`;
        historyList.appendChild(li);
    })
}

function checkWinner(){
    let wins = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    return wins.some(p=>{
        let[a,b,c]=p;
        return board[a] &&
               board[a]==board[b] &&
               board[b]==board[c];
    });
}

function disableBoard(){
    document.querySelectorAll(".cell").forEach(b=>b.disabled=true);
}

function resetGame(){
    board=["","","","","","","","",""];
    moveStack=[];
    currentPlayer="X";
    status.innerText="New Game!";
    updateHistory();
    createBoard();
}
