/*----------------- Constants -----------------*/


/*------------- Variables (state) -------------*/

let deck = []
let dominosPicked = []
let playerHand = []
let opponentHand = []

/*--------- Cached Element References ---------*/

let resetBtn = document.getElementById('reset-btn')
let drawBtn = document.getElementById('draw-btn')
let board = document.querySelector('#board')
let opponent = document.querySelector('#opponent')
let player = document.querySelector('#player')
let deal = document.querySelector('#deal')


/*-------------- Event Listeners --------------*/

resetBtn.addEventListener('click',handleClick)

/*----------------- Functions -----------------*/

init()

function init(){
  deck = ['0_0','0_1','0_2','0_3','0_4','0_5','0_6','1_1','1_2','1_3','1_4','1_5','1_6','2_2','2_3','2_4','2_5','2_6','3_3','3_4','3_5','3_6','4_4','4_5','4_6','5_5','5_6','6_6'] 
}

function handleClick(){
  resetBtn.innerText = "Reset Game"
  if (deck.length > 0){
    for (let i=0;i<14;i++){
      let randIdx = Math.floor(Math.random()*deck.length)
      let shuffle = deck.splice(randIdx,1)
      dominosPicked.push(shuffle)
      // console.log(dominosPicked)
    }
    // let opponentDominos = deck.splice(randIdx,7)
    // playerHand.push(playerDominos)
    // opponentHand.push(opponentDominos)
    render(dominosPicked)
  }
}

function render(dominosPicked){
  playerHand = dominosPicked.splice(0,7)
  opponentHand = dominosPicked.splice(0,7)
}