/*----------------- Constants -----------------*/


/*------------- Variables (state) -------------*/

let deck = []
let dominosPicked = []
let playerHand = []
let opponentHand = []

/*--------- Cached Element References ---------*/

let resetBtn = document.getElementById('reset-btn')
let drawBtn = document.getElementById('draw-btn')
let board = document.querySelector('.board')
let opponent = document.querySelector('.opponent')
let player = document.querySelector('.player')
let deal = document.querySelector('.deal')


/*-------------- Event Listeners --------------*/

resetBtn.addEventListener('click',handleClick)

/*----------------- Functions -----------------*/

init()

function init(){
  deck = ['d0_0','d0_1','d0_2','d0_3','d0_4','d0_5','d0_6','d1_1','d1_2','d1_3','d1_4','d1_5','d1_6','d2_2','d2_3','d2_4','d2_5','d2_6','d3_3','d3_4','d3_5','d3_6','d4_4','d4_5','d4_6','d5_5','d5_6','d6_6'] 
}

function handleClick(){
  resetBtn.innerText = "Reset Game"
  if (deck.length > 0){
    for (let i=0;i<14;i++){
      let randIdx = Math.floor(Math.random()*deck.length)
      let shuffle = deck.splice(randIdx,1)
      dominosPicked.push(shuffle.toString())
    }
    render(dominosPicked)
  }
}

function render(dominosPicked){
  playerHand = dominosPicked.splice(0,7)
  opponentHand = dominosPicked.splice(0,7)
  // for (let i=0;i<playerHand.length;i++){
  //   player.classList.add(playerHand[i])
  // }
}