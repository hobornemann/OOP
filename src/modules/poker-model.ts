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
    
    newDeck: Card[];
    shuffledDeck: Card[];
    currentDeck: Card[];
    distributedDeck: Card[];

    constructor() {
        // Initialize properties
        this.newDeck = this.openNewDeck();
        this.shuffledDeck = [];
        this.currentDeck = [];
        this.distributedDeck = [];
    }

    openNewDeck() {
        const colorArray: Color[] = ['Clubs', 'Spades', 'Hearts', 'Diamonds'];
        const faceArray: Face[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
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


    showCurrentDeck() {
        for (const card of this.currentDeck) {
            console.log(card);
        }
    }


    showDeck(deck: Card[]) {
        for (const card of deck) {
            console.log(card);
        }
    }


    shuffleDeck(deck: Card[]) {
        deck.forEach(card => card.sortValue = Math.random())
        this.shuffledDeck = deck.sort()
        return this.shuffledDeck
    }
}


/* export class PokerGame {
    constructor(players: Player[], deck: Deck, ){

    }

    giveCardsToEachPlayer(){

    }
} */


export class Player {
    playerName: string;
    currentHand: Card[];
    points: number

    constructor(playerName: string){
        this.playerName = playerName;
        this.currentHand = [];
        this.points = 0;
    }

    throwAwayTwoCards(){

    }

}

export class Validation{
    private constructor(){}
    static evaluatePlayersHands(players: Player[]){
        players.


    }

}


/* export class Rounds {

} */




//----------------------------------------------------------------
// FUNCTIONS
//----------------------------------------------------------------
