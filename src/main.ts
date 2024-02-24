import { initiateColorApp } from './modules/color'
import { Game } from './modules/poker-model'
import {} from './modules/poker-controller'



//----------------------------------------------------------------
// ONLOAD - FOR BOTH ASSIGNMENTS 
//----------------------------------------------------------------

window.addEventListener("DOMContentLoaded", () => {
    // COLOR
    initiateColorApp();
    // POKER
    const myGame = new Game()
    myGame.startGame();
})

