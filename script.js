console.log("The JS is completely fine.")
let turn = "X"
let isgameover=false
let turnAudio = new Audio("resources/ting.mp3")
let winAudio = new Audio("resources/winsoundeffect.mp3")
let player1 = "X";
let player2 = "O";
// function to change turn
const changeTurn= () => {
    return turn === "X" ? "O" : "X"
}

//function to check for a win
const checkWin = () => {
    let boxtext = document.getElementsByClassName("boxtext")
    let wins = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ]
    wins.forEach(e =>{
        if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[0]].innerText === boxtext[e[2]].innerText) && (boxtext[e[0]].innerText !== ""))
        {
            let winner = "#hehehe";
            if (boxtext[e[0]].innerText === "X")
            {
                winner = player1;
            }
            else{
                winner = player2;
            }
            document.querySelector('.info').innerText = winner + " has WON !!   Click on RESET -";
            isgameover = true;
            winAudio.play();
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "200px";
        }
    })
}
// fn to check for draw
const checkDraw = () => {
    let pos = [0,1,2,3,4,5,6,7,8];
    let boxtext = document.getElementsByClassName("boxtext");
    let isDraw = true;
    pos.forEach(p => {
        if (boxtext[p].innerText === "")
        {
            isDraw = false;
        }
    })
    if (isDraw){
        isgameover=true;
        winAudio.play();
        document.querySelector('.info').innerText = " It's a DRAW !!  Click on RESET -";
    }
}
// gameLogic

//additional name info
let playBtn = document.querySelector('.play-btn');
playBtn.addEventListener('click', () => {
    player1 = document.querySelector('.p1').value;
    player2 = document.querySelector('.p2').value;

})

// box functionality
let boxes=document.getElementsByClassName("box");

Array.from(boxes).forEach(element =>{
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        if (boxtext.innerText === '' && !isgameover){
            boxtext.innerText = turn;
            turn = changeTurn();            
            checkWin();
            if (!isgameover){
                turnAudio.play()
                document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
                checkDraw();
            }
            
        }
    })
})

//reset button functionality
reset.addEventListener('click', () => {
    let boxtext = document.querySelectorAll('.boxtext');
    Array.from(boxtext).forEach(element => {
        element.innerText = "";
    })
    turn = "X";
    isgameover=false;
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px";
    document.querySelector('.p1').value = "";
    document.querySelector('.p2').value = "";
    player1="X";
    player2 = "O";

})