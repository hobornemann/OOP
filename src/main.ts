import { initiateColorApp } from './modules/color'
import { initiatePokerApp } from './modules/poker-controller'



//----------------------------------------------------------------
// ONLOAD - FOR BOTH ASSIGNMENTS 
//----------------------------------------------------------------

window.addEventListener("DOMContentLoaded", () => {
    // COLOR
    initiateColorApp();
    // POKER
    initiatePokerApp();
})

