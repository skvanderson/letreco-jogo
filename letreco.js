const tiles = document.querySelector(".tile-container");
const backspaceAndEnterRow = document.querySelector("#backspaceAndEnterRow");
const keyboardFirstRow = document.querySelector("#keyboardFirstRow");
const keyboardSecondRow = document.querySelector("#keyboardSecondRow");
const keyboardThirdRow = document.querySelector("#keyboardThirdRow");

const keysFirstRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const keysSecondRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const keysThirdRow = ["Z", "X", "C", "V", "B", "N", "M"];
const keysNotAllowed = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];


const rows = 6;
const columns = 5;
let currentRow = 0;
let currentColumn = 0;
let letreco = "FILME";
let letrecoMap = {};
for (let index = 0; index < letreco.length; index++) {
  letrecoMap[letreco[index]] = index;
}
const guesses = [];

for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
  guesses[rowIndex] = new Array(columns);

  const tileRow = document.createElement("div");
  tileRow.setAttribute("id", "row" + rowIndex);
  tileRow.setAttribute("class", "tile-row");
  for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
    const tileColumn = document.createElement("div");
    tileColumn.setAttribute("id", "row" + rowIndex + "column" + columnIndex);
    tileColumn.setAttribute(
      "class",
      rowIndex === 0 ? "tile-column typing" : "tile-column disabled"
    );
    tileRow.append(tileColumn);
    guesses[rowIndex][columnIndex] = "";
  }
  tiles.append(tileRow)
  console.log(tileRow)
}

const observer = new MutationObserver(function(mutations){

  if (tiles == keysNotAllowed[mutations]){
    observer.observe(tiles, observerConfig);
  

mutations.forEach(function(mutations){
alert("Apenas letras são permitidas na entrada.");
console.log("chegou aqui")

    })
}
})

const observerConfig = {childList: true, subtree: true};





const checkGuess = () => {
  const guess = guesses[currentRow].join("");
  if (guess.length !== columns) {
    return;
  }

  const currentColumns = document.querySelectorAll(".typing");
  for (let index = 0; index < columns; index++) {
    const letter = guess[index];
    console.log(letter)
    if (!/^[a-zA-Z]+$/.test(letter)) {
      alert("Apenas letras são permitidas na entrada.");
      return;
    }
    if (letrecoMap[letter] === undefined) {
      currentColumns[index].classList.add("wrong");
    } else {
      if (letrecoMap[letter] === index) {
        currentColumns[index].classList.add("right");
      } else {
        currentColumns[index].classList.add("displaced");
      }
    }
  }

  if (guess === letreco) {
    window.alert("Acertou Miseravil!");
    endGame();
  } else {
    if (currentRow === rows - 1) {
      window.alert("Ganhou EXPERIENCIA PRA PRÓXIMA!");
      endGame();
    } else {
      moveToNextRow();
    }
  }
};

const moveToNextRow = () => {
  const typingColumns = document.querySelectorAll(".typing");
  typingColumns.forEach((column) => {
    column.classList.remove("typing");
    column.classList.add("disabled");
  });
  currentRow++;
  currentColumn = 0;

  const currentRowEl = document.querySelector("#row" + currentRow);
  const currentColumns = currentRowEl.querySelectorAll(".tile-column");
  currentColumns.forEach((column) => {
    column.classList.remove("disabled");
    column.classList.add("typing");
  });
};

const handleKeyboardOnClick = (key) => {
  if (currentColumn === columns) {
    return;
  }
  const currentTile = document.querySelector(
    "#row" + currentRow + "column" + currentColumn
  );
  currentTile.textContent = key;
  guesses[currentRow][currentColumn] = key;
  currentColumn++;
};

const createKeyboardRow = (keys, keyboardRow) => {
  keys.forEach((key) => {
    const buttonElement = document.createElement("button");
    buttonElement.textContent = key;
    buttonElement.setAttribute("id", key);
    buttonElement.addEventListener("click", () => handleKeyboardOnClick(key));
    keyboardRow.append(buttonElement);
  });
};

createKeyboardRow(keysFirstRow, keyboardFirstRow);
createKeyboardRow(keysSecondRow, keyboardSecondRow);
createKeyboardRow(keysThirdRow, keyboardThirdRow);

const handleBackspace = () => {
  if (currentColumn === 0) {
    return;
  }
  currentColumn--;
  guesses[currentRow][currentColumn] = "";
  const tile = document.querySelector(
    "#row" + currentRow + "column" + currentColumn
  );
  tile.textContent = "";
};

const backspaceButton = document.createElement("button");
backspaceButton.addEventListener("click", handleBackspace);
backspaceButton.textContent = "<";
backspaceAndEnterRow.append(backspaceButton);

const enterButton = document.createElement("button");
enterButton.addEventListener("click", checkGuess);
enterButton.textContent = "ENTER";
backspaceAndEnterRow.append(enterButton);

function endGame() {
  window.alert("FIM DE JOGO");
}

document.onkeydown = function (evt) {
  evt = evt || window.evt;
  if (evt.key === "Enter") {
    checkGuess();
  } else if (evt.key === "Backspace") {
    handleBackspace();
  } else {
    handleKeyboardOnClick(evt.key.toUpperCase());
  }
};

