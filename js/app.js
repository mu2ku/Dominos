/*----------------- Constants -----------------*/

// let dominos = [
//   {type:'0_0', image:'d0_0', left:0, right:0},
//   {type:'0_1', image:'d0_1', left:0, right:1},
//   {type:'0_2', image:'d0_2', left:0, right:2},
//   {type:'0_3', image:'d0_3', left:0, right:3},
//   {type:'0_4', image:'d0_4', left:0, right:4},
//   {type:'0_5', image:'d0_5', left:0, right:5},
//   {type:'0_6', image:'d0_6', left:0, right:6},
//   {type:'1_1', image:'d1_1', left:1, right:1},
//   {type:'1_2', image:'d1_2', left:1, right:2},
//   {type:'1_3', image:'d1_3', left:1, right:3},
//   {type:'1_4', image:'d1_4', left:1, right:4},
//   {type:'1_5', image:'d1_5', left:1, right:5},
//   {type:'1_6', image:'d1_6', left:1, right:6},
//   {type:'2_2', image:'d2_2', left:2, right:2},
//   {type:'2_3', image:'d2_3', left:2, right:3},
//   {type:'2_4', image:'d2_4', left:2, right:4},
//   {type:'2_5', image:'d2_5', left:2, right:5},
//   {type:'2_6', image:'d2_6', left:2, right:6},
//   {type:'3_3', image:'d3_3', left:3, right:3},
//   {type:'3_4', image:'d3_4', left:3, right:4},
//   {type:'3_5', image:'d3_5', left:3, right:5},
//   {type:'3_6', image:'d3_6', left:3, right:6},
//   {type:'4_4', image:'d4_4', left:4, right:4},
//   {type:'4_5', image:'d4_5', left:4, right:5},
//   {type:'4_6', image:'d4_6', left:4, right:6},
//   {type:'5_5', image:'d5_5', left:5, right:5},
//   {type:'5_6', image:'d5_6', left:5, right:6},
//   {type:'6_6', image:'d6_6', left:6, right:6}
// ]


/*------------- Variables (state) -------------*/

let deck = []
let dominosPicked = []
let playerHand = []
let opponentHand = []
let isWinner = null
let turn

/*--------- Cached Element References ---------*/

let startBtn = document.getElementById('start-btn')
let resetBtn = document.getElementById('reset-btn')
let drawBtn = document.getElementById('draw-btn')
let board = document.querySelector('.board')
let opponent = document.querySelector('.opponent')
let player = document.querySelectorAll('.player')
let playerBoard = document.querySelector('#player')
let opponentBoard = document.querySelector('#opponent')
let deal = document.querySelector('.deal')


/*-------------- Event Listeners --------------*/

startBtn.addEventListener('click',handleClick)
player.forEach((element,idx)=>{player[idx].addEventListener('click',test)})

/*----------------- Functions -----------------*/

init()

function init(){
  deck = ['d0_0','d0_1','d0_2','d0_3','d0_4','d0_5','d0_6','d1_1','d1_2','d1_3','d1_4','d1_5','d1_6','d2_2','d2_3','d2_4','d2_5','d2_6','d3_3','d3_4','d3_5','d3_6','d4_4','d4_5','d4_6','d5_5','d5_6','d6_6']
  startBtn.innerText = "Start Game"
}

function handleClick(){
  startBtn.innerText = 'Reset Game'
  if (deck.length > 14){
    for (let i=0;i<14;i++){
      let randIdx = Math.floor(Math.random()*deck.length)
      let shuffle = deck.splice(randIdx,1)
      dominosPicked.push(shuffle.toString())
    }
    render(dominosPicked)
  }
}

function render(dominosPicked){
  //render player hand to board
  if (playerHand.length === 0){
  playerHand = dominosPicked.splice(0,7)
  for(let i=0;i<playerHand.length;i++){
    let playerImg = document.createElement("img")
    playerImg.setAttribute("id",`p${[i]}`)
    playerImg.classList.add('player',`_${playerHand[i].slice(1,2)}`,`_${playerHand[i].slice(3)}`)
    playerImg.setAttribute("src",`/images/${playerHand[i]}.png`)
    playerBoard.append(playerImg)
  }
}
  //render opponent hand to board
  if (opponentHand.length === 0){
    opponentHand = dominosPicked.splice(0,7)
    for (let i=0;i<opponentHand.length;i++){
      let opponentImg = document.createElement("img")
      opponentImg.setAttribute('id',`o${[i]}`)
      opponentImg.setAttribute('class','opponent')
      opponentImg.setAttribute('src',`/images/${opponentHand[i]}.png`)
      opponentBoard.append(opponentImg)
    }
  }
}

function test(evt){
  //When board is empty
  if (board.childElementCount == 0){
    if(evt.target.id !== "player"){
      let boardImg = document.createElement("img")
      let source = evt.target.src.slice(21)
      let id = evt.target.src.slice(29,33)
      boardImg.setAttribute('id',`${id}`)
      boardImg.setAttribute('src',`${source}`)
      boardImg.classList.add('rotate',`_${id.slice(1,2)}`,`_${id.slice(3)}`)
      board.append(boardImg)
      evt.target.removeAttribute('src')
    }
  } 
  
  //When putting down the first domino
  else if(board.childElementCount == 1){
    if (evt.target.id !== "player"){
      let boardImg = document.createElement("img")
      let source = evt.target.src.slice(21)
      let id = evt.target.src.slice(29,33)
      boardImg.setAttribute('id',`${id}`)
      boardImg.setAttribute('src',`${source}`)
      boardImg.classList.add('rotate',`_${id.slice(1,2)}`,`_${id.slice(3)}`)
      let classes = evt.target.className.split(' ')
      let boardImgClasses = board.firstElementChild.className.split(' ')
        if (boardImgClasses[1] == classes[1]){
          boardImg.style.transform = 'rotate(90deg)'
          board.prepend(boardImg)
          evt.target.removeAttribute('src')
        } else if (boardImgClasses[2] == classes[2]){
          boardImg.style.transform = 'rotate(90deg)'
          board.append(boardImg)
          evt.target.removeAttribute('src')
        } else if (boardImgClasses[1] == classes[2]){
          board.prepend(boardImg)
          evt.target.removeAttribute('src')
        } else if (boardImgClasses[2] == classes[1]){
          board.append(boardImg)
          evt.target.removeAttribute('src')
        }
      }
    }
  
  //When putting down subsequent dominos
  else if (board.childElementCount > 1) {
    if(evt.target.id !== "player"){
      let boardImg = document.createElement("img")
      let source = evt.target.src.slice(21)
      let id = evt.target.src.slice(29,33)
      boardImg.setAttribute('id',`${id}`)
      boardImg.setAttribute('src',`${source}`)
      boardImg.classList.add('rotate',`_${id.slice(1,2)}`,`_${id.slice(3)}`)
      let classes = evt.target.className.split(' ').shift()
      let firstBoardImgClasses = board.firstElementChild.className.split(' ').shift()
      let lastBoardImgClasses = board.lastElementChild.className.split(' ').shift()
      //For dominos with double values :(
      if (firstBoardImgClasses[1] == null){
        if(firstBoardImgClasses[0] == classes[0]){
          boardImg.style.transform = 'rotate(90deg)'
          board.prepend(boardImg)
          evt.target.removeAttribute('src')
        } else if (firstBoardImgClasses[0] == classes[1]){
          board.prepend(boardImg)
          evt.target.removeAttribute('src')
        }
      } else if (firstBoardImgClasses[1] !== null){
          if (firstBoardImgClasses[0] == classes[0]){
            boardImg.style.transform = 'rotate(90deg)'
            board.prepend(boardImg)
            evt.target.removeAttribute('src')
          } else if (firstBoardImgClasses[0] == classes[1]){
            board.prepend(boardImg)
            evt.target.removeAttribute('src')
          } else if (lastBoardImgClasses[1] == classes[0]){
            board.append(boardImg)
            evt.target.removeAttribute('src')
          } else if (lastBoardImgClasses[1] == classes[1]){
            boardImg.style.transform = 'rotate(-90deg)'
            board.append(boardImg)
            evt.target.removeAttribute('src')
          } else {console.log('not included')}
      }
    }
  }
}
