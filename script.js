// Constructs gameboard
const gameBoard = (function(doc) {

    let a = [];

    const tttArray = (() => {
        let b = " ";
        for (let i = 0; i <= 8; i++) {
            a.push(b);
        }
        return;
    })

    const createBox = (selector1, selector2) => {
        if (!!doc && "querySelector" in doc) {
            let container = doc.querySelector(selector1);
            let div = doc.createElement(selector2);
            div.className = "box";
            return container.appendChild(div);
        }
    };

    const multipleBoxes = (() => {
        for (let i = 1; i <= a.length; i++) {
            createBox("#container", "div");
        }
    })

    return {
        a,
        tttArray,
        multipleBoxes,
    }

})(document);

// Controls the game
const displayController = (function(doc) { 

    let footer = document.getElementById("footer");
    let playerX = prompt("Enter name for Player X:", "Firstname");
    let playerO = prompt("Enter name for Player O:", "Firstname");
    let winner;

    // Activates gameboard and starts game with player X making first move
    const startGame = () => { 
        winner = "no";
        gameBoard.tttArray();
        gameBoard.multipleBoxes();
        playerX;
        playerO;
        if (gameBoard.a === " ", " ", " ", " ", " ", " ", " ", " ", " ") {
            addSymbol(".box", "X");
        } 
        footer.innerHTML = "<b><i>" + playerX + "</i></b> select a square";
    }

    // Listens for box click; on click, changes gameboard array and box display; triggers next round
    const addSymbol = (selector, symbol) => {
        let box = document.querySelectorAll(selector);

        if (!!doc && "querySelector" in doc) {
            for (let i = 0; i <= 8; i++) {
                box[i].addEventListener("click", function() {
                    if ((winner === "yes") || (box[i].textContent === "X") || (box[i].textContent === "O")) {
                        return;
                    } else {
                        gameBoard.a[i] = symbol;
                        box[i].textContent = symbol;
                        playerDisplay(box[i], symbol);
                        console.log(symbol);
                
                        if (symbol === "X") {
                            console.log("play x");
                            winDeclared(symbol);
                            if (winner === "yes") {
                                winDisplay(symbol);
                                return gameBoard.a;
                            } else if (gameBoard.a.includes(" ") === false) {
                                drawDisplay();
                                return gameBoard.a;
                            } else {
                                symbol = "";
                                addSymbol(".box", "O");
                                return gameBoard.a;
                            }
                        } else if (symbol === "O") {
                            console.log("play o");
                            winDeclared(symbol);
                            if (winner === "yes") {
                                winDisplay(symbol);
                                return gameBoard.a;
                            } else if (gameBoard.a.includes(" ") === false) {
                                drawDisplay();
                                return gameBoard.a;
                            } else {
                                symbol = "";
                                addSymbol(".box", "X");
                                return gameBoard.a;
                            }
                        } else {
                            return;
                        }
                    }
                });
            }
        }
    }

    // Displays next player footer prompt
    const playerDisplay = (selector, mark) => {
        if (mark === "X") {
            selector.style.color = "deeppink";
            footer.innerHTML = "<b><i>" + playerO + "</i></b> select a square";
        } else if (mark === "O") {
            selector.style.color = "darkkhaki";
            footer.innerHTML = "<b><i>" + playerX + "</i></b> select a square";
        } 
    }

    // Declares if symbol is a winner
    const winDeclared = (mark) => {
        let box = document.querySelectorAll(".box");

        if ((box[0].textContent == mark && box[1].textContent == mark && box[2].textContent == mark) || 
        (box[3].textContent == mark && box[4].textContent == mark && box[5].textContent == mark) || 
        (box[6].textContent == mark && box[7].textContent == mark && box[8].textContent == mark) || 
        (box[0].textContent == mark && box[3].textContent == mark && box[6].textContent == mark) ||
        (box[1].textContent == mark && box[4].textContent == mark && box[7].textContent == mark) ||
        (box[2].textContent == mark && box[5].textContent == mark && box[8].textContent == mark) ||
        (box[0].textContent == mark && box[4].textContent == mark && box[8].textContent == mark) ||
        (box[2].textContent == mark && box[4].textContent == mark && box[6].textContent == mark)) {
            winner = "yes";
            return winner;
        }
    }

    //Displays winner footer and prompts next round
    const winDisplay = (name) => {
        if (name === "X") {
            footer.innerHTML = "<b><i>" + playerX + " wins!</i></b> Click here for a rematch.";
        } else {
            footer.innerHTML = "<b><i>" + playerO + " wins!</i></b> Click here for a rematch.";
        }
        footer.addEventListener("click", function() {
            document.querySelectorAll(".box").forEach(e => e.remove());
            document.querySelectorAll(".new-game").forEach(e => e.remove());
            gameBoard.a.splice(0, gameBoard.a.length)
            startGame();
        });

        let newGame = doc.createElement("div");
        newGame.className = "new-game";
        newGame.textContent = "Switching players? Click here."
        footer.after(newGame);
        newGame.addEventListener("click", function() {
            location.reload();
        });

        return;
    }

    //Displays draw and prompts next round
    const drawDisplay = () => {        
            footer.innerHTML = "<b><i>It's a DRAW!</i></b> Click here for a rematch.";
            footer.addEventListener("click", function() {
                document.querySelectorAll(".box").forEach(e => e.remove());
                document.querySelectorAll(".new-game").forEach(e => e.remove());
                gameBoard.a.splice(0, gameBoard.a.length)
                startGame();            
            });
    
            let newGame = doc.createElement("div");
            newGame.className = "new-game";
            newGame.textContent = "Switching players? Click here."
            footer.after(newGame);
            newGame.addEventListener("click", function() {
                location.reload();
            });
        return;
    }
    
    return {
        startGame,
    }

})(document);

displayController.startGame();