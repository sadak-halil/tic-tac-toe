'use strict'
//TODO make sure that functions are public only when needed
const gameBoard = (() =>{
    let _board = [[null,null,null],[null,null,null],[null,null,null]];
    const board = () =>{return _board};
    const row = (r) =>{return [_board[r][0],_board[r][1],_board[r][2]]}; 
    const column = (c) => {return [_board[0][c],_board[1][c],_board[2][c]]};
    const cell = (r,c) => {return _board[r][c]};
    const diagonal0 = () => {return [_board[0][0],_board[1][1],_board[2][2]]};
    const diagonal1 = () => {return [_board[0][2],_board[1][1],_board[2][0]]};
    const reset = () => {
        _board.forEach((row)=>{row.fill(null)})
        displayController.update();
    };
    const addMark = (row, column, mark) => {
        if(_board[row][column] === null){
            _board[row][column] = mark
        };
        displayController.update();
    }
    const check = () => {
        let status = false;
        //function that check arrat members for equality
        const _allEqual = arr => arr.every(value => value === arr[0]);
        //loop to check all rows and columns
        for (let i = 0; i<3; i++){
            if ( status != true){ //ensures that we do not run the loop for the whole board but we stop at the first time we get a true value
                if (row(i)[0] != null){
                    if (_allEqual(row(i)) === true){ status = true};
                };
                if (column(i)[0] != null){
                    if (_allEqual(column(i)) === true){ status = true};
                };
            }
        //check the diagonals
        if (diagonal0()[0] != null){
            if (_allEqual(diagonal0()) === true){ status = true};
        };
        if (diagonal1()[0] != null){
            if (_allEqual(diagonal1()) === true){ status = true};
        };
        }
        return status;
    }
    return {board, row, column, cell, diagonal0, diagonal1, reset, addMark, check};
})();

const player = (name) =>{
    const getName = () => {return name}
    return {getName};
};

let playerX = player('Player1');
let playerO = player('Player2');

const displayController = (() =>{
    const update = () =>{
        // Gets the content of the array and updates the display
        for (let i=0; i<3; i++){
            let displayRow = document.getElementsByClassName(`row${i}`)
            for (let j=0; j<3; j++){
                displayRow[j].innerHTML = gameBoard.row(i)[j];
            }
        }
    };
    const alertWinner = () => {
        window.alert(`${game.winner()} wins!`)
    }
    return {update, alertWinner};
})(); 


const game = (() =>{

    let _turn = 'X';
    let _gameOver = false;

    const playRound = (row,column) => {
        gameBoard.addMark(row, column, _turn);
        _turn === 'X' ? _turn = 'O' : _turn = 'X';
    }

    const isGameOver = () => {
        if (gameBoard.check() === true){_gameOver = true}
        return _gameOver
    }

    const winner = () => {
        return _turn === 'X' ? playerO.getName() : playerX.getName();
    }

    return{isGameOver, playRound, winner}
})();

document.getElementById('game-board').childNodes.forEach(item => {
    if(item.nodeName === 'DIV'){
        item.addEventListener('click', (e) =>{
            const _column = e.target.dataset.column
            const _row = e.target.className.substr(e.target.className.length - 1)
            game.playRound(_row, _column);
            if (game.isGameOver()){displayController.alertWinner()};
            //TODO if game is over, display the winner(done), reset the game(game.reset() needs to be written)
        })
    }
});