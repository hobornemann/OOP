import { initiateColorApp } from './modules/color'
import { Game } from './modules/poker-model'
import {} from './modules/poker-controller'



//----------------------------------------------------------------
// ONLOAD - FOR BOTH ASSIGNMENTS 
//----------------------------------------------------------------

// COLOR
initiateColorApp();

// POKER
export const game = new Game()
game.startGame(game)