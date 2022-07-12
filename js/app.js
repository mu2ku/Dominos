/*----------------- Constants -----------------*/


/*------------- Variables (state) -------------*/

let deck = []
let dominosPicked = []
let playerHand = []
let opponentHand = []
let boardHand = []
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
  startBtn.innerText = "Start Game"
  drawBtn.style.pointerEvents = 'auto'
  turn = 1
  dominosPicked = []
  playerHand = []
  opponentHand = []
  boardHand = []
  isWinner = null
  msg.innerText = ''
  deck =
    [
      {name: "d0_0", left: 0, right: 0, image: "/images/d0_0.png", blank: "images/blank.png"},
      {name: "d0_1", left: 0, right: 1, image: "/images/d0_1.png", blank: "images/blank.png"},
      {name: "d0_2", left: 0, right: 2, image: "/images/d0_2.png", blank: "images/blank.png"},
      {name: "d0_3", left: 0, right: 3, image: "/images/d0_3.png", blank: "images/blank.png"},
      {name: "d0_4", left: 0, right: 4, image: "/images/d0_4.png", blank: "images/blank.png"},
      {name: "d0_5", left: 0, right: 5, image: "/images/d0_5.png", blank: "images/blank.png"},
      {name: "d0_6", left: 0, right: 6, image: "/images/d0_6.png", blank: "images/blank.png"},
      {name: "d1_1", left: 1, right: 1, image: "/images/d1_1.png", blank: "images/blank.png"},
      {name: "d1_2", left: 1, right: 2, image: "/images/d1_2.png", blank: "images/blank.png"},
      {name: "d1_3", left: 1, right: 3, image: "/images/d1_3.png", blank: "images/blank.png"},
      {name: "d1_4", left: 1, right: 4, image: "/images/d1_4.png", blank: "images/blank.png"},
      {name: "d1_5", left: 1, right: 5, image: "/images/d1_5.png", blank: "images/blank.png"},
      {name: "d1_6", left: 1, right: 6, image: "/images/d1_6.png", blank: "images/blank.png"},
      {name: "d2_2", left: 2, right: 2, image: "/images/d2_2.png", blank: "images/blank.png"},
      {name: "d2_3", left: 2, right: 3, image: "/images/d2_3.png", blank: "images/blank.png"},
      {name: "d2_4", left: 2, right: 4, image: "/images/d2_4.png", blank: "images/blank.png"},
      {name: "d2_5", left: 2, right: 5, image: "/images/d2_5.png", blank: "images/blank.png"},
      {name: "d2_6", left: 2, right: 6, image: "/images/d2_6.png", blank: "images/blank.png"},
      {name: "d3_3", left: 3, right: 3, image: "/images/d3_3.png", blank: "images/blank.png"},
      {name: "d3_4", left: 3, right: 4, image: "/images/d3_4.png", blank: "images/blank.png"},
      {name: "d3_5", left: 3, right: 5, image: "/images/d3_5.png", blank: "images/blank.png"},
      {name: "d3_6", left: 3, right: 6, image: "/images/d3_6.png", blank: "images/blank.png"},
      {name: "d4_4", left: 4, right: 4, image: "/images/d4_4.png", blank: "images/blank.png"},
      {name: "d4_5", left: 4, right: 5, image: "/images/d4_5.png", blank: "images/blank.png"},
      {name: "d4_6", left: 4, right: 6, image: "/images/d4_6.png", blank: "images/blank.png"},
      {name: "d5_5", left: 5, right: 5, image: "/images/d5_5.png", blank: "images/blank.png"},
      {name: "d5_6", left: 5, right: 6, image: "/images/d5_6.png", blank: "images/blank.png"},
      {name: "d6_6", left: 6, right: 6, image: "/images/d6_6.png", blank: "images/blank.png"
      }
    ]
}

function handleClick(){
  if (deck.length > 14){
    for (let i=0; i<14; i++) {
      let randIdx = Math.floor(Math.random()*deck.length)
      let shuffle = deck.splice(randIdx,1)
      dominosPicked.push(shuffle[0])
      startBtn.innerText = "Restart Game"
    }
    render(dominosPicked)
  } else {
    init()
    while (board.firstChild) {
      board.removeChild(board.lastChild);
    }
    while (playerBoard.firstChild) {
      playerBoard.removeChild(playerBoard.lastChild);
    }
    while (opponentBoard.firstChild) {
      opponentBoard.removeChild(opponentBoard.lastChild);
    }
  }
}


function render(dominosPicked){
  //render player hand to board
  if (playerHand.length === 0 && isWinner == null) {
    playerHand = dominosPicked.splice(0,7)
    for(let i=0;i<playerHand.length;i++) {
      let playerImg = document.createElement("img")
      playerImg.setAttribute("id",`${playerHand[i].name}`)
      playerImg.classList.add('player',`left-${playerHand[i].left}`,`right-${playerHand[i].right}`)
      playerImg.setAttribute("src",`${playerHand[i].image}`)
      playerBoard.append(playerImg)
    }
  } else if (turn == 1 && playerHand.length > 0){
    playerHand.push(dominosPicked[0])
    let playerImg = document.createElement("img")
    playerImg.setAttribute('id',`${dominosPicked[0].name}`)
    playerImg.classList.add('player',`left-${dominosPicked[0].left}`,`right-${dominosPicked[0].right}`)
    playerImg.setAttribute("src",`${dominosPicked[0].image}`)
    playerBoard.append(playerImg)
    dominosPicked.pop()
  }
  //render opponent hand to board
  if (opponentHand.length === 0 && isWinner == null){
    opponentHand = dominosPicked.splice(0,7)
    for (let i=0;i<opponentHand.length;i++){
      let opponentImg = document.createElement("img")
      opponentImg.setAttribute('id',`${opponentHand[i].name}`)
      opponentImg.classList.add('opponent','opponentImg',`left-${opponentHand[i].left}`,`right-${opponentHand[i].right}`)
      opponentImg.setAttribute('src',`${opponentHand[i].blank}`)
      opponentBoard.appendChild(opponentImg)
    }
  } else if (opponentHand.length > 0 && turn == -1){
    opponentHand.push(dominosPicked[0])
    let opponentImg = document.createElement("img")
    opponentImg.setAttribute('id',`${dominosPicked[0].name}`)
    opponentImg.classList.add('opponent','opponentImg',`left-${dominosPicked[0].left}`,`right-${dominosPicked[0].right}`)
    opponentImg.setAttribute('src',`${dominosPicked[0].blank}`)
    opponentBoard.appendChild(opponentImg)
    dominosPicked.pop()
    computerTurn()
  }
}

class boardTile {
  constructor(id,image,left,right){
    this.id = id;
    this.image = image;
    this.left = left;
    this.right = right;
  }

  createImage(){
    let boardImg = document.createElement("img")
    boardImg.setAttribute('id',`${this.id}`)
    boardImg.setAttribute('src',`${this.image}`)
    return boardImg
  }

  neg90(boardImg){
    boardImg.classList.add('rotate-neg-ninty',`left-${this.left}`,`right-${this.right}`)
    return boardImg
  }

  pos90(boardImg){
    boardImg.classList.add('rotate-pos-ninty',`left-${this.left}`,`right-${this.right}`);
    return boardImg
  }
}

function playerTurn(evt){
  //When board is empty
  if (board.childElementCount === 0){
    if(evt.target.id !== "player"){
      let id = evt.target.id 
      let index = parseInt(playerHand.findIndex((el, idx) =>{ return playerHand[idx].name === id})) //find index of target in playerHand
      boardHand.push(playerHand[index]) //push object from playerHand to boardHand
      let boardImg = new boardTile(id, playerHand[index].image, playerHand[index].left, playerHand[index].right) //create new boardTile object
      board.append(boardImg.neg90(boardImg.createImage())) //append image to board
      playerHand.splice(index,1) //remove domino from player hand using index
      document.getElementById(id).remove() //remove domino from render by removing element
      turn = -1
      msg.innerText = `It's the computer's turn`
      win()
      computerTurn()
    }
  } 
  
  //When putting down subsequent dominos
  else if(board.childElementCount > 0){
    if(evt.target.id !== "player"){
      let id = evt.target.id
      let index = parseInt(playerHand.findIndex((el, idx) =>{ return playerHand[idx].name === id})) //find index of target in playerHand
      if(playerHand[index].left == boardHand[0].left){
        let tempTile = playerHand[index];
        let tempLeft = tempTile.left
        tempTile.left = tempTile.right
        tempTile.right = tempLeft
        boardHand.unshift(tempTile) //unshift object from playerHand to boardHand
        let boardImg = new boardTile(id, playerHand[index].image, playerHand[index].left, playerHand[index].right) //create new boardTile object
        board.prepend(boardImg.pos90(boardImg.createImage())) //prepend image to board
        playerHand.splice(index,1) //remove domino from player hand using index
        document.getElementById(id).remove() //remove domino from render by removing element
        turn = -1
        msg.innerText = `It's the computer's turn`
        win()
        computerTurn()
      }
      if(playerHand[index].right == boardHand[0].left){
        boardHand.unshift(playerHand[index]) //unshift object from playerHand to boardHand
        let boardImg = new boardTile(id, playerHand[index].image, playerHand[index].left, playerHand[index].right) //create new boardTile object
        board.prepend(boardImg.neg90(boardImg.createImage())) //prepend image to board
        playerHand.splice(index,1) //remove domino from player hand using index
        document.getElementById(id).remove() //remove domino from render by removing element
        turn = -1
        msg.innerText = `It's the computer's turn`
        win()
        computerTurn()
      }
      if(playerHand[index].left == boardHand[boardHand.length-1].right){
        boardHand.push(playerHand[index]) //push object from playerHand to boardHand
        let boardImg = new boardTile(id, playerHand[index].image, playerHand[index].left, playerHand[index].right) //create new boardTile object
        board.append(boardImg.neg90(boardImg.createImage())) //append image to board
        playerHand.splice(index,1) //remove domino from player hand using index
        document.getElementById(id).remove() //remove domino from render by removing element
        turn = -1
        msg.innerText = `It's the computer's turn`
        win()
        computerTurn()
      }
      if(playerHand[index].right == boardHand[boardHand.length-1].right){
        let tempTile = playerHand[index];
        let tempLeft = tempTile.left
        tempTile.left = tempTile.right
        tempTile.right = tempLeft
        boardHand.push(tempTile) //unshift object from playerHand to boardHand
        let boardImg = new boardTile(id, playerHand[index].image, playerHand[index].left, playerHand[index].right) //create new boardTile object
        board.append(boardImg.pos90(boardImg.createImage())) //append image to board
        playerHand.splice(index,1) //remove domino from player hand using index
        document.getElementById(id).remove() //remove domino from render by removing element
        turn = -1
        msg.innerText = `It's the computer's turn`
        win()
        computerTurn()
      }
    }
  }
}

function drawTile(){
  let randIdx = Math.floor(Math.random()*deck.length)
  let draw = deck.splice(randIdx,1)
  dominosPicked.push(draw[0])
  render(dominosPicked)
  win()
}

function computerTurn(){
  if(turn === -1 && isWinner == null){
    opponentHand.forEach((el,idx) => {
      let boardImg = new boardTile(el.name, el.image, el.left, el.right) //create new boardTile object
      if(el.left === boardHand[0].left){
        board.prepend(boardImg.pos90(boardImg.createImage())) //append image to board
        let tempTile = el;
        let tempLeft = el.left
        tempTile.left = el.right
        tempTile.right = tempLeft
        boardHand.unshift(tempTile) //add new object to beginning of boardHand array
        turn = 1;
      }
      else if(el.right === boardHand[0].left){
        board.prepend(boardImg.neg90(boardImg.createImage())) //append image to board
        boardHand.unshift(el) //add new object to beginning of boardHand array
        turn = 1;
      }
      else if(el.left === boardHand[boardHand.length-1].right){
        board.append(boardImg.neg90(boardImg.createImage())) //append image to board
        boardHand.push(el) //add new object to end of boardHand array
        turn = 1;
      }
      else if(el.right === boardHand[boardHand.length-1].right){
        board.append(boardImg.pos90(boardImg.createImage())) //append image to board
        let tempTile = el;
        let tempLeft = el.left;
        tempTile.left = el.right;
        tempTile.right = tempLeft;
        boardHand.push(tempTile); //add new object to end of boardHand array
        turn = 1;
      }
      if(turn == 1){
        document.getElementById(`${el.name}`).remove() //remove el from render of opponent hand
        opponentHand.splice(idx,1) //remove el from opponentHand array
        msg.innerText = `It's the player's turn`
        win()
        playerTurn()
      }
    })
  }
  win()
  drawTile()
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


