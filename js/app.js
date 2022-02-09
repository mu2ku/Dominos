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
    }
    render(dominosPicked)
  }
}

function render(dominosPicked){
  //render player hand to board
  if (playerHand.length === 0 && isWinner == null){
  playerHand = dominosPicked.splice(0,7)
  for(let i=0;i<playerHand.length;i++){
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

function createImage_neg90(element){
  let boardImg = document.createElement("img")
  boardImg.setAttribute('id',`${element.name}`)
  boardImg.setAttribute('src',`${element.image}`)
  boardImg.setAttribute('src',`${element.image}`)
  boardImg.classList.add('rotate-neg-ninty',`left-${element.left}`,`right-${element.right}`)
  return boardImg
}

function createImage_pos90(element){
  boardImg.setAttribute('id',`${element.name}`)
  boardImg.setAttribute('src',`${element.image}`)
  boardImg.setAttribute('src',`${element.image}`)
  boardImg.classList.add('rotate-pos-ninty',`left-${element.left}`,`right-${element.right}`)
}

function playerTurn(evt){
  //When board is empty
  if (board.childElementCount === 0){
    if(evt.target.id !== "player"){
      let boardImg = document.createElement("img") //create image element
      let id = evt.target.id 
      let index = parseInt(playerHand.findIndex((el, idx) =>{ return playerHand[idx].name === id})) //find index of target in playerHand
      boardHand.push(playerHand[index]) //push object from playerHand to boardHand
      createImage_neg90(boardHand[0]) //set attributes and class of image
      board.append(boardImg) //append image to board
      playerHand.splice(index,1) //remove domino from hand using index
      document.getElementById(id).remove() //remove domino from render by removing element
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
      let source = evt.target.src.slice(29)
      let id = evt.target.src.slice(36,40)
      boardImg.setAttribute('id',`${id}`)
      boardImg.setAttribute('src',`${source}`)
      boardImg.classList.add('rotate',`_${id.slice(1,2)}`,`_${id.slice(3)}`)
      let classes = evt.target.className.split(' ').splice(1,2)
      let firstBoardImgClasses = board.firstElementChild.className.split(' ').splice(1,2)
      let lastBoardImgClasses = board.lastElementChild.className.split(' ').splice(1,2)
      
      //For dominos with double values
      if (firstBoardImgClasses[1] == null){
        if(firstBoardImgClasses[0] == classes[0]){
          boardImg.style.transform = 'rotate(90deg)'
          boardImg.classList.remove(`_${id.slice(1,2)}`,`_${id.slice(3)}`)
          boardImg.classList.add(`_${id.slice(3)}`,`_${id.slice(1,2)}`)
          board.prepend(boardImg)
          evt.target.removeAttribute('src')
          removeIdx = source.slice(7,11)
          let index = parseInt(playerHand.findIndex((el,idx) =>{return playerHand[idx] == `${removeIdx}`}))
          playerHand.splice(index,1) 
          turn = -1
          msg.innerText = `It's the computer's turn`
          win()
          computerTurn()
        } else if (firstBoardImgClasses[0] == classes[1]){
          board.prepend(boardImg)
          evt.target.removeAttribute('src')
          removeIdx = source.slice(7,11)
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
          removeIdx = source.slice(7,11)
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
          removeIdx = source.slice(7,11)
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
            removeIdx = source.slice(7,11)
            let index = parseInt(playerHand.findIndex((el,idx) =>{return playerHand[idx] == `${removeIdx}`}))
            playerHand.splice(index,1) 
            turn = -1
            msg.innerText = `It's the computer's turn`
            win()
            computerTurn()
          } else if (firstBoardImgClasses[0] == classes[1]){
            board.prepend(boardImg)
            evt.target.removeAttribute('src')
            removeIdx = source.slice(7,11)
            let index = parseInt(playerHand.findIndex((el,idx) =>{return playerHand[idx] == `${removeIdx}`}))
            playerHand.splice(index,1) 
            turn = -1
            msg.innerText = `It's the computer's turn`
            win()
            computerTurn()
          } else if (lastBoardImgClasses[1] == classes[0]){
            board.append(boardImg)
            evt.target.removeAttribute('src')
            removeIdx = source.slice(7,11)
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
            removeIdx = source.slice(7,11)
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
  dominosPicked.push(draw[0])
  render(dominosPicked)
  win()
}

function computerTurn(){
  if(turn === -1 && isWinner == null){
    opponentHand.forEach((el,idx) => {
      if(el.left === boardHand[0].left){
        let boardImg = document.createElement("img")
        boardImg.setAttribute('src',`${el.image}`)
        boardImg.setAttribute('id',`${el.name}`)
        boardImg.classList.add('rotate-pos-ninty', `${el.left}`, `${el.right}`)
        boardHand.unshift(el)
        board.prepend(boardImg)
        let node = document.getElementById(`${el.name}`)
        node.removeAttribute('src')
        opponentHand.splice(idx,1)
      }
    })
  }
}

// function computerTurn(){
//   if (turn == -1 && isWinner == null){  
//     let right, left
//     let firstChild = board.firstElementChild.className.split(' ').splice(1,2)
//     let lastChild = board.lastElementChild.className.split(' ').splice(1,2)
//     for (let i=0;i<opponentHand.length;i++){
//       left = `_${opponentHand[i].slice(1,2)}`
//       right = opponentHand[i].slice(2)
//       if (right == firstChild[0] || left == lastChild[1] || left == firstChild[0] || right == lastChild[1]){
//         if (right == firstChild[0]){
//           let boardImg = document.createElement("img")
//           boardImg.setAttribute('src',`/images/d${left.slice(1)}${right}.png`)
//           boardImg.classList.add('rotate',left,right)
//           board.prepend(boardImg)
//           let index = parseInt(opponentHand.findIndex((el,idx) =>{return opponentHand[idx] == `d${left.slice(1)}${right}`}))
//           let node = document.getElementById(`${opponentHand[index]}`)
//           node.removeAttribute('src')
//           opponentHand.splice(index,1) 
//           turn = 1
//           msg.innerText = `It's the player's turn` 
//           win()
//           playerTurn()
//         } else if (left == firstChild[0]){
//           let boardImg = document.createElement("img")
//           boardImg.style.transform = 'rotate(90deg)'
//           boardImg.setAttribute('src',`/images/d${left.slice(1)}${right}.png`)
//           boardImg.classList.add('rotate',right,left)
//           board.prepend(boardImg)
//           let index = parseInt(opponentHand.findIndex((el,idx) =>{return opponentHand[idx] == `d${left.slice(1)}${right}`}))
//           let node = document.getElementById(`${opponentHand[index]}`)
//           node.removeAttribute('src')
//           opponentHand.splice(index,1)  
//           turn = 1
//           msg.innerText = `It's the player's turn`
//           win()
//           playerTurn()
//         } else if (left == lastChild[1]){
//           let boardImg = document.createElement("img") 
//           boardImg.setAttribute('src',`/images/d${left.slice(1)}${right}.png`)
//           boardImg.classList.add('rotate',left,right)
//           board.append(boardImg)
//           let index = parseInt(opponentHand.findIndex((el,idx) =>{return opponentHand[idx] == `d${left.slice(1)}${right}`})) 
//           let node = document.getElementById(`${opponentHand[index]}`)
//           node.removeAttribute('src') 
//           opponentHand.splice(index,1)  
//           turn = 1
//           msg.innerText = `It's the player's turn`  
//           win()
//           playerTurn()
//         } else if (right == lastChild[1]){
//           let boardImg = document.createElement("img")
//           boardImg.style.transform = 'rotate(90deg)'
//           boardImg.setAttribute('src',`/images/d${left.slice(1)}${right}.png`)
//           boardImg.classList.add('rotate',right,left)
//           board.append(boardImg)
//           let index = parseInt(opponentHand.findIndex((el,idx) =>{return opponentHand[idx] == `d${left.slice(1)}${right}`}))
//           let node = document.getElementById(`${opponentHand[index]}`)
//           node.removeAttribute('src')
//           opponentHand.splice(index,1)     
//           turn = 1
//           msg.innerText = `It's the player's turn`  
//           win()
//           playerTurn()
//         }
//       }
//       else if (i == opponentHand.length-1){
//         win()
//         drawTile()
//       }   
//     }
//   }
// }

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


