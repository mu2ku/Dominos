/*----------------- Constants -----------------*/


/*------------- Variables (state) -------------*/

let deck = []
let dominosPicked = []
let playerHand = []
let opponentHand = []
let isWinner = null
let turn, removeIdx

/*--------- Cached Element References ---------*/

let startBtn = document.getElementById('start-btn')
let drawBtn = document.getElementById('draw-btn')
let board = document.querySelector('.board')
let opponent = document.querySelector('.opponent')
let player = document.querySelectorAll('.player')
let playerBoard = document.querySelector('#player')
let opponentBoard = document.querySelector('#opponent')
let deal = document.querySelector('.deal')
let msg = document.querySelector('#message')


/*-------------- Event Listeners --------------*/

startBtn.addEventListener('click',handleClick)
drawBtn.addEventListener('click',drawTile)
player.forEach((element,idx)=>{player[idx].addEventListener('click',playerTurn)})

/*----------------- Functions -----------------*/

init()

function init(){
  deck = ['d0_0','d0_1','d0_2','d0_3','d0_4','d0_5','d0_6','d1_1','d1_2','d1_3','d1_4','d1_5','d1_6','d2_2','d2_3','d2_4','d2_5','d2_6','d3_3','d3_4','d3_5','d3_6','d4_4','d4_5','d4_6','d5_5','d5_6','d6_6']
  startBtn.innerText = "Start Game"
  drawBtn.style.pointerEvents = 'auto'
  turn = 1
  dominosPicked = []
  playerHand = []
  opponentHand = []
  isWinner = null
  msg.innerText = ''
  removeChilds(playerBoard)
  removeChilds(opponentBoard)
  removeChilds(board)
  startBtn.classList.remove('reset-btn')
}

function handleClick(){
  msg.removeAttribute('hidden')
  startBtn.innerText = 'Reset Game'
  startBtn.classList.add('reset-btn')  
  let resetBtn = document.querySelector('.reset-btn')
  resetBtn.addEventListener('click',init)
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
  if (playerHand.length === 0 && isWinner == null){
  playerHand = dominosPicked.splice(0,7)
  // console.log(playerHand)
  for(let i=0;i<playerHand.length;i++){
    let playerImg = document.createElement("img")
    playerImg.setAttribute("id",`d${playerHand[i].slice(1,2)}_${playerHand[i].slice(3)}`)
    playerImg.classList.add('player',`_${playerHand[i].slice(1,2)}`,`_${playerHand[i].slice(3)}`)
    // console.log(playerImg.classList)
    playerImg.setAttribute("src",`images/${playerHand[i]}.png`)
    // console.log(playerImg)
    playerBoard.append(playerImg)
  }
} else if (turn == 1 && playerHand.length > 0){
  playerHand.push(dominosPicked[0])
  // console.log(playerHand,'player hand')
  let playerImg = document.createElement("img")
  playerImg.classList.add('player',`_${dominosPicked[0].slice(1,2)}`,`_${dominosPicked[0].slice(3)}`)
  // console.log(playerImg.classList)
  playerImg.setAttribute("src",`images/${dominosPicked[0]}.png`)
  playerBoard.append(playerImg)
  dominosPicked.pop()
}
  //render opponent hand to board
  if (opponentHand.length === 0 && isWinner == null){
    opponentHand = dominosPicked.splice(0,7)
    // console.log(opponentHand)
    for (let i=0;i<opponentHand.length;i++){
      let opponentImg = document.createElement("img")
      opponentImg.setAttribute('id',`${opponentHand[i]}`)
      opponentImg.classList.add('opponent','opponentImg',`_${opponentHand[i].slice(1,2)}`,`_${opponentHand[i].slice(3)}`)
      opponentImg.setAttribute('src',`images/blank.png`)
      opponentBoard.appendChild(opponentImg)
    }
  } else if (opponentHand.length > 0 && turn == -1){
    opponentHand.push(dominosPicked[0])
    let opponentImg = document.createElement("img")
    opponentImg.setAttribute('id',`${dominosPicked[0]}`)
    opponentImg.classList.add('opponent','opponentImg',`_${dominosPicked[0].slice(1,2)}`,`_${dominosPicked[0].slice(3)}`)
    // opponentImg.setAttribute('src',`images/${dominosPicked[0]}.png`)
    opponentImg.setAttribute('src',`images/blank.png`)
    opponentBoard.appendChild(opponentImg)
    dominosPicked.pop()
    computerTurn()
  }
}

function playerTurn(evt){
  win()
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
      removeIdx = source.slice(8,12)
      let index = parseInt(playerHand.findIndex((el,idx) =>{return playerHand[idx] == `${removeIdx}`}))
      playerHand.splice(index,1)  
      turn = -1
      msg.innerText = `It's the computer's turn`
      win()
      computerTurn()
    }
  } 
  
  //When putting down subsequent dominos
  else if (board.childElementCount > 0) {
    if(evt.target.id !== "player"){
      let boardImg = document.createElement("img")
      let source = evt.target.src.slice(21)
      let id = evt.target.src.slice(29,33)
      boardImg.setAttribute('id',`${id}`)
      boardImg.setAttribute('src',`${source}`)
      boardImg.classList.add('rotate',`_${id.slice(1,2)}`,`_${id.slice(3)}`)
      let classes = evt.target.className.split(' ').splice(1,2)
      let firstBoardImgClasses = board.firstElementChild.className.split(' ').splice(1,2)
      let lastBoardImgClasses = board.lastElementChild.className.split(' ').splice(1,2)
      
      //For dominos with double values :(
      if (firstBoardImgClasses[1] == null){
        if(firstBoardImgClasses[0] == classes[0]){
          boardImg.style.transform = 'rotate(90deg)'
          boardImg.classList.remove(`_${id.slice(1,2)}`,`_${id.slice(3)}`)
          boardImg.classList.add(`_${id.slice(3)}`,`_${id.slice(1,2)}`)
          board.prepend(boardImg)
          evt.target.removeAttribute('src')
          removeIdx = source.slice(8,12)
          let index = parseInt(playerHand.findIndex((el,idx) =>{return playerHand[idx] == `${removeIdx}`}))
          playerHand.splice(index,1) 
          turn = -1
          msg.innerText = `It's the computer's turn`
          win()
          computerTurn()
        } else if (firstBoardImgClasses[0] == classes[1]){
          board.prepend(boardImg)
          evt.target.removeAttribute('src')
          removeIdx = source.slice(8,12)
          let index = parseInt(playerHand.findIndex((el,idx) =>{return playerHand[idx] == `${removeIdx}`}))
          playerHand.splice(index,1) 
          turn = -1
          msg.innerText = `It's the computer's turn`
          win()
          computerTurn()
        }
      }
      if (lastBoardImgClasses[1] == null){
        if(lastBoardImgClasses[0] == classes[0]){
          board.append(boardImg)
          evt.target.removeAttribute('src')
          removeIdx = source.slice(8,12)
          let index = parseInt(playerHand.findIndex((el,idx) =>{return playerHand[idx] == `${removeIdx}`}))
          playerHand.splice(index,1) 
          turn = -1
          msg.innerText = `It's the computer's turn`
          win()
          computerTurn()
        } else if (lastBoardImgClasses[0] == classes[1]){
          boardImg.style.transform = 'rotate(90deg)'
          boardImg.classList.remove(`_${id.slice(1,2)}`,`_${id.slice(3)}`)
          boardImg.classList.add(`_${id.slice(3)}`,`_${id.slice(1,2)}`)
          board.append(boardImg)
          evt.target.removeAttribute('src')
          removeIdx = source.slice(8,12)
          let index = parseInt(playerHand.findIndex((el,idx) =>{return playerHand[idx] == `${removeIdx}`}))
          playerHand.splice(index,1) 
          turn = -1
          msg.innerText = `It's the computer's turn`
          win()
          computerTurn()
        }
      }
          
        if (firstBoardImgClasses[1] !== null || lastBoardImgClasses[1] !== null){
          if (firstBoardImgClasses[0] == classes[0]){
            boardImg.style.transform = 'rotate(90deg)'
            boardImg.classList.remove(`_${id.slice(1,2)}`,`_${id.slice(3)}`)
            boardImg.classList.add(`_${id.slice(3)}`,`_${id.slice(1,2)}`)
            board.prepend(boardImg)
            evt.target.removeAttribute('src')
            removeIdx = source.slice(8,12)
            let index = parseInt(playerHand.findIndex((el,idx) =>{return playerHand[idx] == `${removeIdx}`}))
            playerHand.splice(index,1) 
            turn = -1
            msg.innerText = `It's the computer's turn`
            win()
            computerTurn()
          } else if (firstBoardImgClasses[0] == classes[1]){
            board.prepend(boardImg)
            evt.target.removeAttribute('src')
            removeIdx = source.slice(8,12)
            let index = parseInt(playerHand.findIndex((el,idx) =>{return playerHand[idx] == `${removeIdx}`}))
            playerHand.splice(index,1) 
            turn = -1
            msg.innerText = `It's the computer's turn`
            win()
            computerTurn()
          } else if (lastBoardImgClasses[1] == classes[0]){
            board.append(boardImg)
            evt.target.removeAttribute('src')
            removeIdx = source.slice(8,12)
            let index = parseInt(playerHand.findIndex((el,idx) =>{return playerHand[idx] == `${removeIdx}`}))
            playerHand.splice(index,1) 
            turn = -1
            msg.innerText = `It's the computer's turn`
            win()
            computerTurn()
          } else if (lastBoardImgClasses[1] == classes[1]){
            boardImg.style.transform = 'rotate(90deg)'
            boardImg.classList.remove(`_${id.slice(1,2)}`,`_${id.slice(3)}`)
            boardImg.classList.add(`_${id.slice(3)}`,`_${id.slice(1,2)}`)
            board.append(boardImg)
            evt.target.removeAttribute('src')
            removeIdx = source.slice(8,12)
            let index = parseInt(playerHand.findIndex((el,idx) =>{return playerHand[idx] == `${removeIdx}`}))
            playerHand.splice(index,1) 
            turn = -1
            msg.innerText = `It's the computer's turn`
            win()
            computerTurn()
          }
        }
    }
  }
}

function drawTile(){
  let randIdx = Math.floor(Math.random()*deck.length)
  let draw = deck.splice(randIdx,1)
  dominosPicked.push(draw.toString())
  render(dominosPicked)
  win()
}

function computerTurn(){
  if (turn == -1 && isWinner == null){  
    let right, left
    let firstChild = board.firstElementChild.className.split(' ').splice(1,2)
    console.log(firstChild,'first child')
    let lastChild = board.lastElementChild.className.split(' ').splice(1,2)
    console.log(lastChild,'last child')
    for (let i=0;i<opponentHand.length;i++){
      left = `_${opponentHand[i].slice(1,2)}`
      console.log(left,'left of opponent domino')
      right = opponentHand[i].slice(2)
      console.log(right,'right of opponent domino')
      if (right == firstChild[0] || left == lastChild[1] || left == firstChild[0] || right == lastChild[1]){
        if (right == firstChild[0]){
          let boardImg = document.createElement("img")
          boardImg.setAttribute('src',`images/d${left.slice(1)}${right}.png`)
          boardImg.classList.add('rotate',left,right)
          board.prepend(boardImg)
          let index = parseInt(opponentHand.findIndex((el,idx) =>{return opponentHand[idx] == `d${left.slice(1)}${right}`}))
          // console.log(index)
          let node = document.getElementById(`${opponentHand[index]}`)
          // console.log(node)
          node.removeAttribute('src')
          opponentHand.splice(index,1) 
          turn = 1
          msg.innerText = `It's the player's turn` 
          console.log('success')
          win()
          playerTurn()
        } else if (left == firstChild[0]){
          let boardImg = document.createElement("img")
          boardImg.style.transform = 'rotate(90deg)'
          boardImg.setAttribute('src',`images/d${left.slice(1)}${right}.png`)
          boardImg.classList.add('rotate',right,left)
          board.prepend(boardImg)
          let index = parseInt(opponentHand.findIndex((el,idx) =>{return opponentHand[idx] == `d${left.slice(1)}${right}`}))
          // console.log(index)
          let node = document.getElementById(`${opponentHand[index]}`)
          // console.log(node)
          node.removeAttribute('src')
          opponentHand.splice(index,1)  
          turn = 1
          msg.innerText = `It's the player's turn`
          console.log('success')  
          win()
          playerTurn()
        } else if (left == lastChild[1]){
          let boardImg = document.createElement("img")
          boardImg.setAttribute('src',`images/d${left.slice(1)}${right}.png`)
          boardImg.classList.add('rotate',left,right)
          board.append(boardImg)
          let index = parseInt(opponentHand.findIndex((el,idx) =>{return opponentHand[idx] == `d${left.slice(1)}${right}`}))
          // console.log(index)
          let node = document.getElementById(`${opponentHand[index]}`)
          // console.log(node)
          node.removeAttribute('src')
          opponentHand.splice(index,1)  
          turn = 1
          msg.innerText = `It's the player's turn`  
          console.log('success')
          win()
          playerTurn()
        } else if (right == lastChild[1]){
          let boardImg = document.createElement("img")
          boardImg.style.transform = 'rotate(90deg)'
          boardImg.setAttribute('src',`images/d${left.slice(1)}${right}.png`)
          boardImg.classList.add('rotate',right,left)
          board.append(boardImg)
          let index = parseInt(opponentHand.findIndex((el,idx) =>{return opponentHand[idx] == `d${left.slice(1)}${right}`}))
          // console.log(index)
          let node = document.getElementById(`${opponentHand[index]}`)
          // console.log(node)
          node.removeAttribute('src')
          opponentHand.splice(index,1)    
          turn = 1
          msg.innerText = `It's the player's turn`  
          console.log('success')
          win()
          playerTurn()
        }
      }
    }
    if (turn == -1){drawTile()}   
  }
}

function win(){
  if (opponentHand.length == 0 || playerHand.length == 0){
    isWinner = turn * -1
    turn = null
    if (isWinner == 1){
      msg.innerText = `Player Won!`
      drawBtn.style.pointerEvents = 'none'
      player.forEach((element,idx)=>{player[idx].style.pointerEvents = 'none'})
    } else if (isWinner == -1){
      msg.innerText = `Computer Won!`
      drawBtn.style.pointerEvents = 'none'
      player.forEach((element,idx)=>{player[idx].style.pointerEvents = 'none'})
    }
  } else if (deck.length == 0){
    msg.innerText= `Cat's Game!`
    turn = null
    drawBtn.style.pointerEvents = 'none'
    player.forEach((element,idx)=>{player[idx].style.pointerEvents = 'none'})
  }
}

function removeChilds(parent){
  while (parent.lastChild) {
      parent.removeChild(parent.lastChild);
  }
}


