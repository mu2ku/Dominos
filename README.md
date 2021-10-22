<h1>Dominoes</h1></br>

<h1>Description:</h1>

- This is a web browser-based game of dominoes versus a computer.</br></br>
  
<h1>Getting Started:</h1>

Click [here](https://sei-dominos.surge.sh/) to play game.</br>
- Once the game has loaded, press "Start Game" to start the game</br>
- Click on the domino tiles shown on the bottom of the browser to play them to the board</br>
- Click on the "Draw Tile" button to draw additional tiles if you cannot play a tile to the board</br>
- Refresh the page to restart the game and play again! :)</br></br>

<h1>Screenshots:</h1>

- Below is the initial wireframe for the dominoes game:</br>
  ![Wireframe](https://github.com/mu2ku/Dominos/blob/0d61d7f2814717702b5a44cc5f03e01eec3c8ee0/assets/Dominos%20-%20Window@2x.png)</br>

- Below is a screenshot of the game upon loading:</br>
  ![Initial Game](https://github.com/mu2ku/Dominos/blob/0d61d7f2814717702b5a44cc5f03e01eec3c8ee0/assets/empty%20game%20board.png)</br>

- Below is a screenshot of the game in play:</br>
  ![Game in play](https://github.com/mu2ku/Dominos/blob/0d61d7f2814717702b5a44cc5f03e01eec3c8ee0/assets/game%20board%20in%20play.png)</br></br>

<h1>Pseudocode</h1>

1) Define the required variables used to track the state of the game:</br>
  1.1) Variable to track turn (computer or player)</br>
  1.2) Variable to track win state (whether the game is ongoing, won, tied, or lost)</br>
  1.3) Variable to track whether a tile needs to be drawn</br>

2) Store cached element references:</br>
  2.1) Ability to draw a new tile if user can’t make move</br>
  2.2) Ability to select own domino</br>

3) Upon loading, the app should:</br> 
  3.1) Include “Start Game” button, which calls an initialize function to initialize the state variables</br>
  3.2) Render those values to the page</br>

4) Handle a player clicking a domino</br>

5) Handle the domino moving to the board if numbers match</br>

6) Handle the computer's domino plays

<h1>Technologies Used:</h1>

* JavaScript </br>
* HTML </br>
* CSS </br>
* Git </br></br>

<h1>Next Steps:</h1>

* Update the CSS to have the dominoes wrap around the board </br>
* Calculate and keep track of the score for both the computer and player </br>
* Update and clean up JavaScript code to use objects instead of arrays </br>
* Get the "Restart Game" button to work</br>