//       ***********************
//            INSTRUCTIONS
//       ***********************

// 1. Read the code below and figure out the data flow
// 2. Add in your code from the terminal app (check for win logic)
// 3. Look for the @TODO, to fix
// next to each @TODO you will find tasks that need to be finished
// 4. GET THIS GAME WORKING!!
let chosenAISquare
let currentMarker = 'X'
let board = [
  ['','',''],
  ['','',''],
  ['','','']
];

let squareIndex
let gameOver = false
let playerScore = 0
let computerScore = 0

const tds = document.getElementsByTagName("td")
console.log(tds)



// is called when a square is clicked. "this" = element here
const handleClick = (element) => {
  // check to see if the square clicked has anything in it, if not continue
  // this prevents an X being changed to an O
  if(!document.getElementById(element.id).innerHTML){
    addMarker(element.id)
    updateBoard(element.id)
    checkForWin()
  }
}

const addMarker = (id) => {
  // console.log(`We'll place a mark on square: ${id}`)
  // @TODO, Mix & Match. 
  // You will need the following pieces:
  
  // = currentMarker
  // .getElementById(id)
  // document
  // .innerHTML 
  document.getElementById(id).innerHTML = currentMarker
  // Arrange the above pieces into one a single line of code
  // to add an X or O to the board to the DOM so it can be scene on the screen.
}

// passes the element's id attribute from HTML to be used
const updateBoard = (id) => {
  // parses the id string into a number then captures the first and last part the newly create number as row & column
  const row = parseInt(id.charAt(0))
  const column = parseInt(id.charAt(2)) 

  // console.log(`you clicked the sq at ${row} and ${column}`)
  

  // @TODO, Your code here: use the above information to change the board variable(array of arrays)
  board[row][column] = currentMarker
  
  // HINT: in your browser open up the dev tools -> console
}

const checkForWin = () => {
  //checking for tie
  let boardState = "filled"
  for(let i = 0; i < tds.length ; i++) {
    if(tds[i].innerHTML === ""){
      boardState = "unfilled"
      
    }
  }

  if(boardState === "unfilled" && (horizontalWin() || verticalWin() || diagonalWin())) {
    // **BONUS** you could make the dismissal of this alert window reset the board...
    window.alert(`Player ${currentMarker} won!`)
    console.log("winstate event")
    if(currentMarker === "X") {
      playerScore ++
      console.log(playerScore)
    }
    else {
      computerScore ++
      console.log(computerScore)
    }
    gameOver = true
    resetBoard()
    gameOver = false
  } 
  else {
    // if no win, change the marker from X to O, or O to X for the next player.
    changeMarker()
  }
  if(boardState === "filled") {
    if(horizontalWin() || verticalWin() || diagonalWin()) {
      // **BONUS** you could make the dismissal of this alert window reset the board...
      window.alert(`Player ${currentMarker} won!`)
      if(currentMarker === "X") {
        playerScore ++
        console.log(playerScore)
      }
      else {
        computerScore ++
        console.log(computerScore)
      }
      console.log("winstate event")
      gameOver = true
    resetBoard()
    gameOver = false
      
    } 
    else {
      // if no win, change the marker from X to O, or O to X for the next player.
      window.alert("Tie!")
      console.log("winstate event")
      gameOver = true
    resetBoard()
    gameOver = false
      
    }
  }
  // calls each checkForWin possibility and if any are true gives a page alert,
  
}

const horizontalWin = () => {
  // Your code here to check for horizontal wins
  //if (xxx,---,--- or ---,xxx,--- or ---,---,xxx) or (ooo,---,--- or ---,ooo,--- or ---,---,ooo) 
  //then return true 

  for(let i = 0; i < 3; i ++) {
      
      if (board[i][0]===currentMarker && board[i][1]===currentMarker && board[i][2]===currentMarker){
      return true
    }
    
  }
  // if((board[0][0]===currentMarker && board[0][1] ===currentMarker && board[0][2] ===currentMarker) || (board[1][0]===currentMarker && board[1][1] ===currentMarker && board[1][2]===currentMarker) || (board[2][0]===currentMarker && board[2][1]===currentMarker && board[2][2]===currentMarker)) {
  //   return true
  // }
}

const verticalWin = () => {
  // Your code here to check for vertical wins
  //if (x--,x--,x-- or -x-,-x-,-x- or --x,--x,--x) or (o--,o--,o-- or -o-,-o-,-o- or --o,--o,--o)
  //then return true
  for(let i = 0; i < 3; i ++) {
    if(board[0][i]===currentMarker && board[1][i] ===currentMarker && board[2][i] ===currentMarker) {
      return true
    }
  }
}

const diagonalWin = () => {
  // Your code here to check for diagonal wins
  //if (x--,-x-,--x or --x,-x-,x--) or (o--,-o-,--o or --o,-o-,o--)
  //then return true
  if((board[0][0]===currentMarker && board[1][1] ===currentMarker && board[2][2] ===currentMarker) || (board[0][2]===currentMarker && board[1][1] ===currentMarker && board[2][0]===currentMarker)) {
    return true
  }
}

const changeMarker = () => {
  // ternary operator: if it's an X make it an O, if O make it an X
  currentMarker = currentMarker === "X" ? "O" : "X"
  if(currentMarker === "O"){
    aiTurn()
  }
}

const resetBoard = () => {
  // sanity check: this tells us the function is being called
  board = [
    ['','',''],
    ['','',''],
    ['','','']
  ];
  currentMarker = "X"
  // collects all of the "td"s into an HTML Collection: https://www.w3schools.com/jsref/dom_obj_htmlcollection.asp  
  
  
  // loops over the HTML Collections and clears out the Xs and Os
  for (i=0; i<tds.length; i++) {
    tds[i].innerHTML = null
  }
  
  // @TODO, Your code here: make sure to reset the array of arrays to empty for a new game
}

// **BONUSES**

// 1. Display the current player's turn
// 2. Count number of wins for each player and display them
// 3. Reset the number of wins
// 4. Clear the board on alert window dismissal
// 5. Add players names and display who wins, i.e. "Congrats Emily, you won with 0s!"

const aiTurn = () => {
  if(gameOver === false) {
    console.log("its the ai turn")
  
  squareIndex = "badmove"
  for(let i = 0; i < tds.length ; i++) {
    console.log(tds[i].innerHTML)
    if(tds[i].innerHTML === ""){
      squareIndex = "goodmove"
      break
    }
  }

  if(squareIndex === "goodmove") {

//CONDITIONALS
//FOR O WINS

//HORIZONTAL WINS

//ROW 1
if(squareIndex === "goodmove" && board[0][0] === "O" && board[0][1] === "O" && board[0][2] === "") {
  chosenAISquare = tds[2]
  handleClick(chosenAISquare);
  console.log(board)
  squareIndex = "badmove"
  
}

if(squareIndex === "goodmove" && board[0][1] === "O" && board[0][2] === "O" && board[0][0] === "") {
  chosenAISquare = tds[0]
  handleClick(chosenAISquare);
  console.log(board)
  squareIndex = "badmove"
  
}

if(squareIndex === "goodmove" && board[0][0] === "O" && board[0][2] === "O" && board[0][1] === "") {
  chosenAISquare = tds[1]
  handleClick(chosenAISquare);
  console.log(board)
  squareIndex = "badmove"
  
}


//ROW 2
if(squareIndex === "goodmove" && board[1][0] === "O" && board[1][1] === "O" && board[1][2] === "") {
  chosenAISquare = tds[5]
  handleClick(chosenAISquare);
  console.log(board)
  squareIndex = "badmove"
  
}

if(squareIndex === "goodmove" && board[1][1] === "O" && board[1][2] === "O" && board[1][0] === "") {
  chosenAISquare = tds[3]
  handleClick(chosenAISquare);
  console.log(board)
  squareIndex = "badmove"
  
}

if(squareIndex === "goodmove" && board[1][0] === "O" && board[1][2] === "O" && board[1][1] === "") {
  chosenAISquare = tds[4]
  handleClick(chosenAISquare);
  console.log(board)
  squareIndex = "badmove"
  
}

//ROW 3

if(squareIndex === "goodmove" && board[2][0] === "O" && board[2][1] === "O" && board[2][2] === "") {
  chosenAISquare = tds[8]
  handleClick(chosenAISquare);
  console.log(board)
  squareIndex = "badmove"
}

if(squareIndex === "goodmove" && board[2][1] === "O" && board[2][2] === "O" && board[2][0] === "") {
  chosenAISquare = tds[6]
  handleClick(chosenAISquare);
  console.log(board)
  squareIndex = "badmove"
}

if(squareIndex === "goodmove" && board[2][0] === "O" && board[2][2] === "O" && board[2][1] === "") {
  chosenAISquare = tds[7]
  handleClick(chosenAISquare);
  console.log(board)
  squareIndex = "badmove"
}

//VERTICAL WINS

//COLUMN 1
if(squareIndex === "goodmove" && board[0][0] === "O" && board[1][0] === "O" && board[2][0] === "") {
  chosenAISquare = tds[6]
  handleClick(chosenAISquare);
  console.log(board)
  squareIndex = "badmove"
}

if(squareIndex === "goodmove" && board[1][0] === "O" && board[2][0] === "O" && board[0][0] === "") {
  chosenAISquare = tds[0]
  handleClick(chosenAISquare);
  console.log(board)
  squareIndex = "badmove"
}

if(squareIndex === "goodmove" && board[0][0] === "O" && board[2][0] === "O" && board[1][0] === "") {
  chosenAISquare = tds[3]
  handleClick(chosenAISquare);
  console.log(board)
  squareIndex = "badmove"
}

//COLUMN 2
if(squareIndex === "goodmove" && board[0][1] === "O" && board[1][1] === "O" && board[2][1] === "") {
  chosenAISquare = tds[7]
  handleClick(chosenAISquare);
  console.log(board)
  squareIndex = "badmove"
}

if(squareIndex === "goodmove" && board[0][1] === "O" && board[2][1] === "O" && board[1][1] === "") {
  chosenAISquare = tds[4]
  handleClick(chosenAISquare);
  console.log(board)
  squareIndex = "badmove"
}

if(squareIndex === "goodmove" && board[1][1] === "O" && board[2][1] === "O" && board[0][1] === "") {
  chosenAISquare = tds[1]
  handleClick(chosenAISquare);
  console.log(board)
  squareIndex = "badmove"
}
//COLUMN 3
if(squareIndex === "goodmove" && board[0][2] === "O" && board[1][2] === "O" && board[2][2] === "") {
  chosenAISquare = tds[8]
  handleClick(chosenAISquare);
  console.log(board)
  squareIndex = "badmove"
}

if(squareIndex === "goodmove" && board[1][2] === "O" && board[2][2] === "O" && board[0][2] === "") {
  chosenAISquare = tds[2]
  handleClick(chosenAISquare);
  console.log(board)
  squareIndex = "badmove"
}

if(squareIndex === "goodmove" && board[0][2] === "O" && board[2][2] === "O" && board[1][2] === "") {
  chosenAISquare = tds[5]
  handleClick(chosenAISquare);
  console.log(board)
  squareIndex = "badmove"
}

//DIAGONAL WINS

//LEFT TO RIGHT
if(squareIndex === "goodmove" && board[0][0] === "O" && board[1][1] === "O" && board[2][2] === "") {
  chosenAISquare = tds[8]
  handleClick(chosenAISquare);
  console.log(board)
  squareIndex = "badmove"
}

if(squareIndex === "goodmove" && board[0][0] === "O" && board[2][2] === "O" && board[1][1] === "") {
  chosenAISquare = tds[4]
  handleClick(chosenAISquare);
  console.log(board)
  squareIndex = "badmove"
}

if(squareIndex === "goodmove" && board[1][1] === "O" && board[2][2] === "O" && board[0][0] === "") {
  chosenAISquare = tds[0]
  handleClick(chosenAISquare);
  console.log(board)
  squareIndex = "badmove"
}
//RIGHT TO LEFT
if(squareIndex === "goodmove" && board[0][2] === "O" && board[1][1] === "O" && board[2][0] === "") {
  chosenAISquare = tds[6]
  handleClick(chosenAISquare);
  console.log(board)
  squareIndex = "badmove"
}

if(squareIndex === "goodmove" && board[1][1] === "O" && board[2][0] === "O" && board[0][2] === "") {
  chosenAISquare = tds[2]
  handleClick(chosenAISquare);
  console.log(board)
  squareIndex = "badmove"
}

if(squareIndex === "goodmove" && board[0][2] === "O" && board[2][0] === "O" && board[1][1] === "") {
  chosenAISquare = tds[4]
  handleClick(chosenAISquare);
  console.log(board)
  squareIndex = "badmove"
}


//FOR BLOCKS

//HORIZONTAL BLOCKS

//ROW 1
if(squareIndex === "goodmove" && board[0][0] === "X" && board[0][1] === "X" && board[0][2] === "") {
  chosenAISquare = tds[2]
  handleClick(chosenAISquare);
  console.log("I'm blocking a row!")
  console.log(board)
  squareIndex = "badmove"
}

if(squareIndex === "goodmove" && board[0][1] === "X" && board[0][2] === "X" && board[0][0] === "") {
  chosenAISquare = tds[0]
  handleClick(chosenAISquare);
  console.log("I'm blocking a row!")
  console.log(board)
  squareIndex = "badmove"
}

if(squareIndex === "goodmove" && board[0][0] === "X" && board[0][2] === "X" && board[0][1] === "") {
  chosenAISquare = tds[1]
  handleClick(chosenAISquare);
  console.log("I'm blocking a row!")
  console.log(board)
  squareIndex = "badmove"
}


//ROW 2
if(squareIndex === "goodmove" && board[1][0] === "X" && board[1][1] === "X" && board[1][2] === "") {
  chosenAISquare = tds[5]
  handleClick(chosenAISquare);
  console.log("I'm blocking a row!")
  console.log(board)
  squareIndex = "badmove"
}

if(squareIndex === "goodmove" && board[1][1] === "X" && board[1][2] === "X" && board[1][0] === "") {
  chosenAISquare = tds[3]
  handleClick(chosenAISquare);
  console.log("I'm blocking a row!")
  console.log(board)
  squareIndex = "badmove"
}

if(squareIndex === "goodmove" && board[1][0] === "X" && board[1][2] === "X" && board[1][1] === "") {
  chosenAISquare = tds[4]
  handleClick(chosenAISquare);
  console.log("I'm blocking a row!")
  console.log(board)
  squareIndex = "badmove"
}

//ROW 3

if(squareIndex === "goodmove" && board[2][0] === "X" && board[2][1] === "X" && board[2][2] === "") {
  chosenAISquare = tds[8]
  handleClick(chosenAISquare);
  console.log("I'm blocking a row!")
  console.log(board)
  squareIndex = "badmove"
}

if(squareIndex === "goodmove" && board[2][1] === "X" && board[2][2] === "X" && board[2][0] === "") {
  chosenAISquare = tds[6]
  handleClick(chosenAISquare);
  console.log("I'm blocking a row!")
  console.log(board)
  squareIndex = "badmove"
}

if(squareIndex === "goodmove" && board[2][0] === "X" && board[2][2] === "X" && board[2][1] === "") {
  chosenAISquare = tds[7]
  handleClick(chosenAISquare);
  console.log("I'm blocking a row!")
  console.log(board)
  squareIndex = "badmove"
}


//VERTICAL BLOCKS

//COLUMN 1
if(squareIndex === "goodmove" && board[0][0] === "X" && board[1][0] === "X" && board[2][0] === "") {
  chosenAISquare = tds[6]
  handleClick(chosenAISquare);
  console.log("I'm blocking a column!")
  console.log(board)
  squareIndex = "badmove"
}

if(squareIndex === "goodmove" && board[1][0] === "X" && board[2][0] === "X" && board[0][0] === "") {
  chosenAISquare = tds[0]
  handleClick(chosenAISquare);
  console.log("I'm blocking a column!")
  console.log(board)
  squareIndex = "badmove"
}

if(squareIndex === "goodmove" && board[0][0] === "X" && board[2][0] === "X" && board[1][0] === "") {
  chosenAISquare = tds[3]
  handleClick(chosenAISquare);
  console.log("I'm blocking a column!")
  console.log(board)
  squareIndex = "badmove"
}

//COLUMN 2
if(squareIndex === "goodmove" && board[0][1] === "X" && board[1][1] === "X" && board[2][1] === "") {
  chosenAISquare = tds[7]
  handleClick(chosenAISquare);
  console.log("I'm blocking a column!")
  console.log(board)
  squareIndex = "badmove"
}

if(squareIndex === "goodmove" && board[0][1] === "X" && board[2][1] === "X" && board[1][1] === "") {
  chosenAISquare = tds[4]
  handleClick(chosenAISquare);
  console.log("I'm blocking a column!")
  console.log(board)
  squareIndex = "badmove"
}

if(squareIndex === "goodmove" && board[1][1] === "X" && board[2][1] === "X" && board[0][1] === "") {
  chosenAISquare = tds[1]
  handleClick(chosenAISquare);
  console.log("I'm blocking a column!")
  console.log(board)
  squareIndex = "badmove"
}
//COLUMN 3
if(squareIndex === "goodmove" && board[0][2] === "X" && board[1][2] === "X" && board[2][2] === "") {
  chosenAISquare = tds[8]
  handleClick(chosenAISquare);
  console.log("I'm blocking a column!")
  console.log(board)
  squareIndex = "badmove"
}

if(squareIndex === "goodmove" && board[1][2] === "X" && board[2][2] === "X" && board[0][2] === "") {
  chosenAISquare = tds[2]
  handleClick(chosenAISquare);
  console.log("I'm blocking a column!")
  console.log(board)
  squareIndex = "badmove"
}

if(squareIndex === "goodmove" && board[0][2] === "X" && board[2][2] === "X" && board[1][2] === "") {
  chosenAISquare = tds[5]
  handleClick(chosenAISquare);
  console.log("I'm blocking a column!")
  console.log(board)
  squareIndex = "badmove"
}

//DIAGONAL BLOCKS

//LEFT TO RIGHT
if(squareIndex === "goodmove" && board[0][0] === "X" && board[1][1] === "X" && board[2][2] === "") {
  chosenAISquare = tds[8]
  handleClick(chosenAISquare);
  console.log("I'm blocking diagonally!")
  console.log(board)
  squareIndex = "badmove"
}

if(squareIndex === "goodmove" && board[0][0] === "X" && board[2][2] === "X" && board[1][1] === "") {
  chosenAISquare = tds[4]
  handleClick(chosenAISquare);
  console.log("I'm blocking diagonally!")
  console.log(board)
  squareIndex = "badmove"
}

if(squareIndex === "goodmove" && board[1][1] === "X" && board[2][2] === "X" && board[0][0] === "") {
  chosenAISquare = tds[0]
  handleClick(chosenAISquare);
  console.log("I'm blocking diagonally!")
  console.log(board)
  squareIndex = "badmove"
}
//RIGHT TO LEFT
if(squareIndex === "goodmove" && board[0][2] === "X" && board[1][1] === "X" && board[2][0] === "") {
  chosenAISquare = tds[6]
  handleClick(chosenAISquare);
  console.log("I'm blocking diagonally!")
  console.log(board)
  squareIndex = "badmove"
}

if(squareIndex === "goodmove" && board[1][1] === "X" && board[2][0] === "X" && board[0][2] === "") {
  chosenAISquare = tds[2]
  handleClick(chosenAISquare);
  console.log("I'm blocking diagonally!")
  console.log(board)
  squareIndex = "badmove"
}

if(squareIndex === "goodmove" && board[0][2] === "X" && board[2][0] === "X" && board[1][1] === "") {
  chosenAISquare = tds[4]
  handleClick(chosenAISquare);
  console.log("I'm blocking diagonally!")
  console.log(board)
  squareIndex = "badmove"
}
    while (currentMarker === "O") {
      squareIndex = Math.floor(Math.random() * tds.length);
      chosenAISquare = tds[squareIndex]
      handleClick(chosenAISquare)
      console.log("I'm picking a random square!")
      console.log(board)
      squareIndex = "badmove"
      
    }
  }
  
}
  }
  
