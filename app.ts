import {GameState} from "./GameState.js";

const gs = new GameState("X", "O")

function updateInfo() {
    let infoHeader = document.querySelector("#infoheader")!
    if (!gs.gameIsOver()) {
         infoHeader.textContent = gs.getCurrentPlayerSymbol() + " ist dran!"
    } else infoHeader.textContent = gs.getCurrentPlayerSymbol() + " hat gewonnen!"
}

document.querySelectorAll("button").forEach((button, index) => {
    button.addEventListener("click", () => {
        if (!gs.gameIsOver()) {
            button.textContent = gs.getCurrentPlayerSymbol()
            gs.playField(index)
            button.disabled = true
        } else window.alert(gs.getCurrentPlayerSymbol() + " hat gewonnen")
        console.log(gs.getPlayingField())
        updateInfo()
    })
})

const column = [3,6,7,8]
const column2 = [3,4,5]
const row = [1,4,7]
const row2 = [0,3,6]
const row3 = [0,1,4,7,8]

const test = column.map((el)=> el % 3)