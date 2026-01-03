export class GameState {
    constructor(player1, player2) {
        this.currentPlayer = 0;
        this.gameOver = false;
        this.playingField = { 0: [], 1: [] };
        this.playerSymbols = [player1, player2];
    }
    getCurrentPlayerSymbol() {
        return this.playerSymbols[this.currentPlayer];
    }
    playField(newIndex) {
        const playerIndexArray = this.playingField[this.currentPlayer];
        playerIndexArray.push(newIndex);
        if (playerIndexArray.length >= 3) {
            this.checkPlayerGameOver(playerIndexArray);
        }
        if (!this.gameOver) {
            this.currentPlayer++;
            this.currentPlayer = this.currentPlayer % 2;
        }
    }
    checkPlayerGameOver(array) {
        array.sort();
        const diagonalObenUnten = array.filter((el) => el % 4 == 0).length == 3;
        const diagonalUntenOben = array.includes(2) && array.includes(4) && array.includes(6);
        if (diagonalObenUnten || diagonalUntenOben) {
            this.gameOver = true;
            return;
        }
        //check for column
        let subsequent = 0;
        for (let i = 0; i <= array.length; i++) {
            const previous = array[i - 1];
            const current = array[i];
            if (current - previous == 1) {
                if (previous % 3 - current % 3 != 2) {
                    subsequent++;
                    console.log(subsequent);
                    if (subsequent == 2) {
                        this.gameOver = true;
                        return;
                    }
                }
            }
            else {
                subsequent = 0;
            }
        }
        //check for row
        const moduloArray = array.map((e) => e % 3);
        const firstRow = moduloArray.filter((e) => e == 0).length == 3;
        const secondRow = moduloArray.filter((e) => e == 1).length == 3;
        const thirdRow = moduloArray.filter((e) => e == 2).length == 3;
        if (firstRow || secondRow || thirdRow) {
            this.gameOver = true;
        }
    }
    gameIsOver() {
        return this.gameOver;
    }
    getPlayingField() {
        return this.playingField;
    }
}
