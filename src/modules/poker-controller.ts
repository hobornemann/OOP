/*  CONTROLLER
Controller: This component acts as an intermediary between the Model and the View. 
Classes that handle user input, update the Model based on user actions, and update the 
View based on changes in the Model should be placed in the Controller. These classes
 typically include route handlers, event listeners, form handlers, and any other classes 
 related to coordinating interactions between the Model and the View.
*/


import {Game, MiscMethods, Player} from './poker-model'
import {} from './poker-view'
import{Card} from '../types/poker'



export function initiatePokerGame(){


    //const myDeck = new Deck();
    //console.log("myDeck:",myDeck);
    //myDeck.getNewDeck();
    //myDeck.printOutCards(); 
    
}



//----------------------------------------------------------------
// CLASSES 
//----------------------------------------------------------------





//----------------------------------------------------------------
// EVENT-LISTENERS 
//----------------------------------------------------------------

const task1aButton = document.querySelector(".task-1a");
const task1bButton = document.querySelector(".task-1b");
const task2aButton = document.querySelector(".task-2a");
const task2bButton = document.querySelector(".task-2b");
const task3Button = document.querySelector(".task-3");
const task4Button = document.querySelector(".task-4");
const task5Button = document.querySelector(".task-5");
const task6Button = document.querySelector(".task-6");
const task7Button = document.querySelector(".task-7");
const task8Button = document.querySelector(".task-8");

const currentDeckElement = document.querySelector(".current-deck") as HTMLElement


const game = new Game();
let currentDeck: Card[] = game.dealer.deck.currentDeck;



task1aButton?.addEventListener('click', () => {
    MiscMethods.printOutCards(currentDeck, currentDeckElement)
})


task1bButton?.addEventListener('click', () => {
    const shuffledDeck = game.dealer.shuffleDeck(currentDeck)
    currentDeck = {...shuffledDeck}
    MiscMethods.printOutCards(shuffledDeck, currentDeckElement)
})


task2aButton?.addEventListener('click', () => {
    const slim = new Player("Slim")
    const luke = new Player("Luke")
    console.log("Slim: ",slim);
    console.log("Luke:", luke);
    game.addPlayer(slim)
    game.addPlayer(luke)
  /*   MiscMethods.addPlayerHtmlCard(slim)
    MiscMethods.addPlayerHtmlCard(luke) */
    let currentDeck: Card[] = game.dealer.deck.currentDeck;
    console.log("typeof currentDeck:",typeof currentDeck);
    console.log("currentDeck",currentDeck);


})



task2bButton?.addEventListener('click', () => {
    // Deal five cards to each player
    let currentDeck: Card[] = game.dealer.deck.currentDeck;
    console.log("typeof currentDeck:",typeof currentDeck);
    console.log("currentDeck",currentDeck);
    console.log("game.players",game.players);
      
    
    for (let i = 0; i < 5; i++) {
        // Check if currentDeck is empty
        if (currentDeck.length === 0) {
            console.error("Error: currentDeck is empty!");
            break; // Exit the loop if currentDeck is empty
        }
        // Distribute cards to each player
        game.players.forEach(player => {
            const card = game.dealer.deck.currentDeck.pop(); // Remove and get the last card from currentDeck
            if (card) {
                player.currentHand.push(card); // Add the card to the player's hand
            }
        });
    }

    // Log the remaining deck and players' hands
    console.log("currentDeck after distributing five cards to each player:", currentDeck);
    game.players.forEach(player => {
        console.log(`Player: ${player.name}`)
        player.currentHand.map(card => {
            console.log(`${card.name} - ${card.value}`);
        })
        console.log(`Points: ${MiscMethods.calculatePointsOnHand(player.currentHand)}`);
    });
})




task3Button?.addEventListener('click', () => {

})


task4Button?.addEventListener('click', () => {

})


task5Button?.addEventListener('click', () => {

})

task6Button?.addEventListener('click', () => {

})

task7Button?.addEventListener('click', () => {

})

task8Button?.addEventListener('click', () => {

})





//----------------------------------------------------------------
// FUNCTIONS
//----------------------------------------------------------------
