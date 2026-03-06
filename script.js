let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset");
let newGameBtn = document.querySelector(".new-game");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let scoreX = document.querySelector("#score-x");
let scoreO = document.querySelector("#score-o");
let scoredraw = document.querySelector("#score-draw");
let turnIndicator = document.querySelector("#turn-indicator");

let turnX = true;

const winPatterns= [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const newGame = () =>{
    turnX = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    turnIndicator.innerText = "X's Turn";
}

const resetGame = () =>{
    turnX = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    turnIndicator.innerText = "X's Turn";
    scoreX.innerText = 0;
    scoreO.innerText = 0;
    scoredraw.innerText = 0;
}

boxes.forEach((box) => {
    box.addEventListener("click", () =>{
    if(turnX){
        turnIndicator.innerText = "O's Turn";
        box.innerText = "X";
        box.classList.add("x-turn");
        turnX = false;
    }else{
        turnIndicator.innerText = "X's Turn";
        box.innerText = "O";
        box.classList.add("O-turn");
        turnX = true;
    }
    box.disabled = true;
    checkWinner();
    })
})


const disableBoxes = () =>{
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) =>{
    msg.innerText = `Congratulations!! ${winner} is the winner`;
    msgContainer.classList.remove("hide");
}

const draw =() =>{
    let draw = true;
    for(let box of boxes){
        if(box.innerText === ""){
            draw = false;
            break;
        }
    }
    if(draw){
        msg.innerText = "It's a draw!!";
        msgContainer.classList.remove("hide");
        scoredraw.innerText = parseInt(scoredraw.innerText) + 1;
    }
}

const countscore = (winner) =>{
    if(winner === "X"){
        scoreX.innerText = parseInt(scoreX.innerText) + 1;
    }
    else if(winner === "O"){
        scoreO.innerText = parseInt(scoreO.innerText) + 1;
    }
}


const checkWinner = () =>{
    let winnerFound = false;

    for(let pattern of winPatterns){
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if(pos1 != "" && pos2 != "" && pos3 != ""){
            if(pos1 === pos2 && pos2 === pos3){
                console.log("Winner", pos1);
                disableBoxes();
                showWinner(pos1);
                countscore(pos1);
                winnerFound = true;
                break;
            }
        
        }
    }
    if(!winnerFound){
            draw();
        }
};

newGameBtn.addEventListener("click", newGame);
resetBtn.addEventListener("click", resetGame);