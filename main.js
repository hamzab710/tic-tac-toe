function PlayerFactory(name, marker) {
    return {name, marker}
}

const playerOneInput = document.querySelector('.player1');
const playerTwoInput = document.querySelector('.player2');

player1 = PlayerFactory(`Player X`, 'X');
player2 = PlayerFactory(`Player O`, 'O');

const startButton = document.querySelector('.start');

startButton.addEventListener('click', () => {
    restart();
    startButton.textContent = 'Restart';
})

const playInfo = document.querySelector('.play-info');

const createGameBoard = function() {
    const gameboard = document.getElementById('gameboard');
    gameboard.style.display = 'grid';
    const grid = document.querySelector('.grid');
    if (grid) {
        gameboard.innerHTML = "";
        for (let i = 0; i < 9; i++) {
            const grid = document.createElement('div');
            grid.classList.add("grid");
            gameboard.appendChild(grid);
        }
    } else {
        for (let i = 0; i < 9; i++) {
            const grid = document.createElement('div');
            grid.classList.add("grid");
            gameboard.appendChild(grid);
        }
    }
};

function takeTurns() {
    let playerTurn = player1;
    playInfo.textContent = "Player X";
    const grids = document.querySelectorAll('.grid');
    grids.forEach((grid) => {
        grid.addEventListener('click', () => {
            if (playerTurn == player1) {
                playInfo.textContent = "Player O";
                if (grid.textContent == ''){
                    grid.textContent = `${player1.marker}`;
                    grid.style.color = 'blue';
                    playerTurn = player2;
                    checkRowsForWin();
                    checkCollumnsForWin();
                    checkForDiagonal1();
                    checkForDiagonal2();
                    checkForDraw();
                }
            } else if (playerTurn == player2) {
                playInfo.textContent = "Player X";
                if (grid.textContent == ''){
                    grid.textContent = `${player2.marker}`;
                    grid.style.color = 'red';
                    playerTurn = player1;
                    checkRowsForWin();
                    checkCollumnsForWin();
                    checkForDiagonal1();
                    checkForDiagonal2();
                    checkForDraw();
                }
            }
            if (playInfo.textContent.includes('has Won') || playInfo.textContent === 'Draw') {
                playerTurn = null;
            }
        })
    })
};

function checkRowsForWin() {
    const grids = document.querySelectorAll('.grid');

    // Check each row for a win
    for (let i = 0; i < 9; i += 3) {
        const row = [grids[i].textContent, grids[i + 1].textContent, grids[i + 2].textContent];
        if (row.every(cell => cell === 'X')) {
            playInfo.textContent = `${player1.name} has Won`;
        }
        if (row.every(cell => cell === 'O')) {
            playInfo.textContent = `${player2.name} has Won`;
        }
    }
}

function checkCollumnsForWin() {
    const grids = document.querySelectorAll('.grid');

    // Check each collumn for a win
    for (let i = 0; i < 3; i += 1) {
        const collumn = [grids[i].textContent, grids[i + 3].textContent, grids[i + 6].textContent];
        if (collumn.every(cell => cell === 'X')) {
            playInfo.textContent = `${player1.name} has Won`;
        }
        if (collumn.every(cell => cell === 'O')) {
            playInfo.textContent = `${player2.name} has Won`;
        }
    }

}

function checkForDiagonal1() {
    const grids = document.querySelectorAll('.grid');

    const diagonal1 = [grids[2].textContent, grids[4].textContent, grids[6].textContent];
    if (diagonal1.every(cell => cell === 'X')) {
        playInfo.textContent = `${player1.name} has Won`;
    }
    if (diagonal1.every(cell => cell === 'O')) {
        playInfo.textContent = `${player2.name} has Won`;
    }

}

function checkForDiagonal2() {
    const grids = document.querySelectorAll('.grid');

    const diagonal2 = [grids[0].textContent, grids[4].textContent, grids[8].textContent];
    if (diagonal2.every(cell => cell === 'X')) {
        playInfo.textContent = `${player1.name} has Won`;
    }
    if (diagonal2.every(cell => cell === 'O')) {
        playInfo.textContent = `${player2.name} has Won`;
    }

}

function checkForDraw() {
    const grids = document.querySelectorAll('.grid');
    const draw = [];

    for (let i = 0; i < 9; i++) {
        draw.push(grids[i].textContent);
    }
    if (draw.some(cell => cell === '')) {
        return
    } else {
        playInfo.textContent = 'Draw';
    }
}

function restart() {
    const gameboard = document.getElementById('gameboard');
    gameboard.innerHTML = "";
    gameboard.style.display = 'grid';
    createGameBoard();
    takeTurns();
}