/* MODEL
Model: This component represents the data and business logic of the application. 
Classes that define the structure and behavior of the data should be placed in 
the Model. These classes typically include data models, database access classes, 
business logic components, and any other classes related to managing the application's data. 
*/

import {} from './poker-controller'
import {} from './poker-view'
import {Card, Color, Face, Value} from '../types/poker'

//----------------------------------------------------------------
// CLASSES 
//----------------------------------------------------------------

export class Deck {
    
    currentDeck: Card[];

    constructor() {
        this.currentDeck = this.getNewDeck();
    }

    getNewDeck() {
        const colorArray: Color[] = ['Clubs', 'Spades', 'Hearts', 'Diamonds'];
        const faceArray: Face[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        const valueArray: Value[] = [2 , 3 , 4 , 5 , 6 , 7 , 8 , 9 , 10 , 11 , 12 , 13 , 14 ];
        let faceValueArray = [];
        let newDeck: Card[] = [];

        for (let i = 0; i < faceArray.length; i++) {
            faceValueArray.push({ face: faceArray[i], value: valueArray[i] });
        }

        for (const color of colorArray) {
            for (const faceValue of faceValueArray) {
                let i = 0;
                newDeck.push({name: `${color}_${faceValue.face}`, value: faceValue.value, color: color, face: faceValue.face, sortValue: i}); 
                i++;
            }
        }
        this.currentDeck = newDeck;
        return newDeck
    }   
}



export class Dealer {

    deck: Deck;
    trashDeck: Card[];
    dealerProcess: string[];

    constructor() {
        this.deck = new Deck();
        this.trashDeck = [];
        this.dealerProcess = [
            "shuffleDeck",
            "isThereAreEnoughCardsInTheDeckForARound",
            "distributeFiveCardsToEachPlayer",
            "calculateAndShowTheScoreOfEachPlayersHand",
            "distributeTwoCardsToEachPlayer",
            "calculateAndShowTheScoreOfEachPlayersHand",
            "determineAndCommunicateWhichPlayerWonTheRound",
            "askPlayersThrowAllTheirCardsToTrashDeck",
            "transferAllCardsInTrashDeckToCurrentDeck"
        ];
    }





    shuffleDeck(cards: Card[]) {
        cards.map(card => {
            card.sortValue = Math.random()
        })
        const shuffledDeck: Card[]  = cards.sort((a, b) => a.sortValue - b.sortValue)
        console.log("shuffledDeck",shuffledDeck);
        return shuffledDeck
    }
    

    isThereAreEnoughCardsInTheDeckForARound(){

    }
    

    distributeFiveCardsToEachPlayer(){

    }

    calculateAndShowTheScoreOfEachPlayersHand(){

    }

    askPlayersToThrowAwayTwoCardsEachToTrashDeck(){

    }

    distributeTwoCardsToEachPlayer(){

    }


    determineAndCommunicateWhichPlayerWonTheRound(){

    }

    askPlayersThrowAllTheirCardsToTrashDeck(){

    }

    transferAllCardsInTrashDeckToCurrentDeck(){

    }
    
}




export class Game {
    
    players: Player[];
    dealer: Dealer;
    gameProcess: string[];

    constructor(){
        this.players = [];
        this.dealer = this.addDealer();
        this.gameProcess = [
            "checkWhoWantsToPlay",
            "registerThePlayers"
        ]
    }

    startGame(){

        // 
        // game-loop
        // I varje runda ska spelarna kunna välja vilka kort de vill slänga  (indexplats)

    }

    addPlayer(newPlayer: Player): Player[]{
        this.players.push(newPlayer)
        return this.players
    }

    addPlayers(newPlayers: Player[]){
        // uppmana användaren att skriva in antalet spelare (minst 2) och deras namn
        // skapar motsvarande antal instanser av Player-klassen

        return this.players
    }

    addDealer(): Dealer{
        let dealer: Dealer = new Dealer()
        return dealer
    }

}


/* export class PokerGame {
    constructor(players: Player[], deck: Deck, ){

    }

    giveCardsToEachPlayer(){

    }
} */


export class Player {
    name: string;
    currentHand: Card[];
    points: number

    constructor(playerName: string){
        this.name = playerName;
        this.currentHand = [];
        this.points = 0;
    }

    throwAwayTwoCards(){

    }

}

export class MiscMethods{

    /*  static evaluatePlayersHands(players: Player[]){
        //TODO:

    } */


    static printOutCards(cards: Card[], htmlElement?: HTMLElement): void {
        

        for (const card of cards) {
            console.log(`${card.name}, ${card.value}`);  
            // console.log(card);     // Uncomment, if you rather would likt print out the full card object.
        }

        let html: string = "";
        if(htmlElement){
            for (const card of cards) {   
                html += `<p>${card.name}, ${card.value}</p>`;
            }
            htmlElement.innerHTML = html;
        } else{
            console.error(`Cannot find the HTML-Element ${htmlElement}`)
            throw new Error
        }
    }


    static calculatePointsOnHand(cards: Card[]): Number{
        let arrayOfPoints: number[] = cards.map(card => {
            return card.value
        })
        const points: number = arrayOfPoints.reduce((acc, curr)=>(acc + curr),0)
        return points
    }


    static addPlayerHtmlCard(player: Player){

        const playerCardsElement = document.querySelector(".player-cards")
        if(playerCardsElement){
            let html = playerCardsElement.innerHTML
            html += `
                <div class="player-card">
                    <h4 class="player-name">${player.name}</h4>
                    <div class="player-hand">
                    </div>
                    <div class="player-points-total">
                        <h5>Points:</h5>
                        <p class="player-points">                    
                        </p>
                    </div>
                </div>
            `;
        }
    }


}


/* export class Rounds {

} */




//----------------------------------------------------------------
// FUNCTIONS
//----------------------------------------------------------------
