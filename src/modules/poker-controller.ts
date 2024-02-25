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







//----------------------------------------------------------------
// EVENT-LISTENERS 
//----------------------------------------------------------------

const task1Button = document.querySelector(".task-1");
const task2Button = document.querySelector(".task-2");
const task3Button = document.querySelector(".task-3");
const task4Button = document.querySelector(".task-4");
const task5Button = document.querySelector(".task-5");


const numberOfPlayersButton = document.querySelector(".number-of-players-button") as HTMLButtonElement
const numberOfPlayersInput = document.querySelector(".number-of-players-input") as HTMLInputElement
const addNewPlayersElement = document.querySelector(".add-new-players") as HTMLElement
const addNewPlayersButton = document.querySelector(".add-new-players-button") as HTMLButtonElement
//const dealerNextStepButton = document.querySelector(".dealer-next-step-button") as HTMLButtonElement

//const userInfoElement = document.querySelector(".user-info") as HTMLElement




task1Button?.addEventListener('click', () => {
    console.log(">> TASK 1:");
    console.log("New deck:");
    const deck1 = new Deck();  
    const newDeck = deck1.getNewDeck();
    game.dealer.deck.mainDeck = newDeck.map(card => ({ ...card }));  
    MiscMethods.reportStatusOfTheGame(game);
    console.log("Shuffled mainDeck:");
    const shuffledDeck = game.dealer.shuffleDeck(game.dealer.deck.mainDeck);
    game.dealer.deck.mainDeck = shuffledDeck.map(card => ({ ...card }));  
    MiscMethods.reportStatusOfTheGame(game);
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
    MiscMethods.reportStatusOfTheGame(game);
})



task3Button?.addEventListener('click', () => {
    console.log(">> TASK 3:");
    game.players.map(player => {
        player.throwAwayTheTwoLowestCards(game)
    })
    game.dealer.distributeXCardsToEachPlayer(game, 2);
    MiscMethods.reportStatusOfTheGame(game);
})


task4Button?.addEventListener('click', () => {
    console.log(">> TASK 4:");
    // låt spelarna slänga alla sina kort i kasthögen
    game.players.map(player => {
        player.throwAwayAllCards(game)
    })
    console.log("Status after players have thrown away all cards to trashDeck (TASK 4a):");
    MiscMethods.reportStatusOfTheGame(game);
    // flytta alla kort från kasthögen till kortleken
    game.dealer.moveTrashDeckIntoMainDeck()
    // rapportera status
    console.log("Status after trashDeck moved into mainDeck (Task 4b):");
    MiscMethods.reportStatusOfTheGame(game);
    // blanda korthögen igen
    const shuffledDeck: Card[] = game.dealer.shuffleDeck(game.dealer.deck.mainDeck)
    game.dealer.deck.mainDeck = shuffledDeck.map(card => ({...card}))
    console.log("Status after mainDeck has been shuffled (Task 4c):");
    // rapportera status igen
    MiscMethods.reportStatusOfTheGame(game);
})


task5Button?.addEventListener('click', () => {
    alert("Tasks 5 - 8 can be seen in the code and via the prompts.")
})





numberOfPlayersButton?.addEventListener('click', () => {

    if(numberOfPlayersButton && addNewPlayersElement){
        const numberOfNewPlayers: number = parseInt(numberOfPlayersInput.value)
        const existingNumberOfPlayers = game.players.length
        const newTotalNumberOfPlayers = existingNumberOfPlayers + numberOfNewPlayers
        if(newTotalNumberOfPlayers < 2 || newTotalNumberOfPlayers > 7){
            alert("You need to register between two and seven players. Please try again");
        } else {
            let html: string = ''
            if(numberOfNewPlayers){
                for (let i = 0; i < numberOfNewPlayers; i++) {
                    html += `
                    <input type="text" class="add-new-players-input input" placeholder="Write name of new player here">
                    `;
                }
                addNewPlayersElement.innerHTML = html
                addNewPlayersButton.classList.remove('hidden')
            } else {
                console.error("Error when adding input elements for adding players")
            }
        }
    }
    console.log("Number of existing players (before adding new players):", game.players.length);
    
})



addNewPlayersButton?.addEventListener('click', () => {
    const newPlayerNameInputs: NodeListOf<HTMLInputElement> = document.querySelectorAll(".add-new-players-input") 
    console.log("newPlayerNameInputs",newPlayerNameInputs);

    if(newPlayerNameInputs){
        for (const newPlayerNameInput of newPlayerNameInputs){
            console.log("newPlayerNameInput.value:",newPlayerNameInput.value);
            
            if(newPlayerNameInput.value){
                
                const player = new Player(newPlayerNameInput.value)
                game.addPlayer(player)
            }
            else {
                alert("You missed to provide a name. No worries, the player will be called Pokke.")
                const player = new Player("Pokke")
                game.addPlayer(player)
            }
        }
    }
    console.log("Registered players:")
    for(const player of game.players){
        console.log(player.name);
    }
    newPlayerNameInputs.forEach(element => element.remove())
    addNewPlayersButton.classList.add('hidden')
    numberOfPlayersInput.value = ""
})



/* document.getElementById("addPlayersForm")?.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form submission
    const numPlayersInput = document.getElementById("numPlayers") as HTMLInputElement;
    const numPlayers = parseInt(numPlayersInput.value, 10);
    if (isNaN(numPlayers) || numPlayers < 2 || numPlayers > 7) {
        alert("Please enter a valid number of players between 2 and 7.");
        return;
    }
    game.addPlayers(numPlayers);
});


document.getElementById("addPlayersForm")!.addEventListener("submit", game.validateNumPlayersInput);

document.getElementById("startGameButton")!.addEventListener("click", game.continueGame);
 */