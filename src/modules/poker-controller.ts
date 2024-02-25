/*  CONTROLLER
Controller: This component acts as an intermediary between the Model and the View. 
Classes that handle user input, update the Model based on user actions, and update the 
View based on changes in the Model should be placed in the Controller. These classes
 typically include route handlers, event listeners, form handlers, and any other classes 
 related to coordinating interactions between the Model and the View.
*/


import {MiscMethods, Player, Deck} from './poker-model'
import {} from './poker-view'
import {game} from '../main'
import {Card} from '../types/poker'




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

const task1Button = document.querySelector(".task-1");
const task2Button = document.querySelector(".task-2");
const task3Button = document.querySelector(".task-3");
const task4Button = document.querySelector(".task-4");
const task5Button = document.querySelector(".task-5");
const task6Button = document.querySelector(".task-6");
const task7Button = document.querySelector(".task-7");
const task8Button = document.querySelector(".task-8");

const mainDeckElement = document.querySelector(".current-deck") as HTMLElement




/* console.log("typeof game.dealer.deck.mainDeck:",typeof game.dealer.deck.mainDeck);
console.log("game.dealer.deck.mainDeck.length:",game.dealer.deck.mainDeck.length);
console.log("game.dealer.deck.mainDeck", game.dealer.deck.mainDeck);
 */
/* let mainDeck: Card[] = game.dealer.deck.mainDeck;
console.log("mainDeck::",mainDeck);

let trashDeck: Card[] = game.dealer.deck.trashDeck; 
console.log("mainDeck::",trashDeck); */







task1Button?.addEventListener('click', () => {
    console.log(">> TASK 1:");
    console.log("New deck:");
    const deck1 = new Deck();  
    const newDeck = deck1.getNewDeck();
    MiscMethods.printOutCards(newDeck, mainDeckElement);
    game.dealer.deck.mainDeck = newDeck.map(card => ({ ...card }));   
    console.log("Shuffled mainDeck:");
    game.dealer.deck.mainDeck = game.dealer.shuffleDeck(game.dealer.deck.mainDeck);
    MiscMethods.printOutCards(game.dealer.deck.mainDeck.map(card => ({...card})), mainDeckElement);
});



task2Button?.addEventListener('click', () => {
    console.log(">> TASK 2:");
    const slim = new Player("Slim")
    const luke = new Player("Luke")
    game.addPlayer(slim)
    game.addPlayer(luke)
   /*  console.log("Slim: ", slim);
    console.log("Luke:", luke); */
    // Dela ut fem kort till varje spelare
    game.dealer.distributeXCardsToEachPlayer(game, 5);
    MiscMethods.reportStatusOfDecksAndPlayerHands(game);
})



task3Button?.addEventListener('click', () => {
    console.log(">> TASK 3:");
    game.players.map(player => {
        player.throwAwayTheTwoLowestCards(game)
    })
    game.dealer.distributeXCardsToEachPlayer(game, 2);
    MiscMethods.reportStatusOfDecksAndPlayerHands(game);
})


task4Button?.addEventListener('click', () => {
    console.log(">> TASK 4:");
    // låt spelarna slänga alla sina kort i kasthögen
    game.players.map(player => {
        player.throwAwayAllCards(game)
    })
    console.log("Status after players have thrown away all cards to trashDeck (TASK 4a):");
    MiscMethods.reportStatusOfDecksAndPlayerHands(game);
    // flytta alla kort från kasthögen till kortleken
    game.dealer.moveTrashDeckIntoMainDeck()
    // rapportera status
    console.log("Status after trashDeck moved into mainDeck (Task 4b):");
    MiscMethods.reportStatusOfDecksAndPlayerHands(game);
    // blanda korthögen igen
    const shuffledDeck: Card[] = game.dealer.shuffleDeck(game.dealer.deck.mainDeck)
    game.dealer.deck.mainDeck = shuffledDeck.map(card => ({...card}))
    console.log("Status after mainDeck has been shuffled (Task 4c):");
    // rapportera status igen
    MiscMethods.reportStatusOfDecksAndPlayerHands(game);
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
