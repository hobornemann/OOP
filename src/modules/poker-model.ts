/* MODEL
Model: This component represents the data and business logic of the application. 
Classes that define the structure and behavior of the data should be placed in 
the Model. These classes typically include data models, database access classes, 
business logic components, and any other classes related to managing the application's data. 
*/

import {} from './poker-controller'
import {} from './poker-view'
import {Card, Color, Face, Value} from '../types/poker'
//import { mainDeck, trashDeck } from './poker-controller';

//----------------------------------------------------------------
// CLASSES 
//----------------------------------------------------------------


export class Deck {
    mainDeck: Card[];
    trashDeck: Card[];

    constructor() {
        this.mainDeck = this.getNewDeck();
        this.trashDeck = [];
    }


     getNewDeck(): Card[] {
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
                
                newDeck.push({
                    name: `${color}_${faceValue.face}`, 
                    value: faceValue.value, color: color, 
                    face: faceValue.face, 
                    sortValue: 0
                }); 
            }
        }

        for (let i = 0; i < newDeck.length; i++) {
            newDeck[i].sortValue = i 
        };

        this.mainDeck = newDeck;
        return newDeck
    }        
}


export class Dealer {

    deck: Deck;

    constructor() {
        this.deck = new Deck();
    }

    shuffleDeck(cards: Card[]) {
        cards.map(card => {
            card.sortValue = Math.random()
        })
        const shuffledCards: Card[]  = cards.sort((a, b) => a.sortValue - b.sortValue)
        cards = shuffledCards.map(card => ({...card})) 
        return cards
    }
    
    
    distributeXCardsToEachPlayer(game: Game, numberOfCards: number) {
        
        const requiredNumberOfCards = numberOfCards * game.players.length       
        if (this.deck.mainDeck.length >= requiredNumberOfCards){
            for (let i = 0; i < numberOfCards; i++) {
                for(const player of game.players){
                    const card = this.deck.mainDeck.pop() as Card;
                    player.currentHand.push(card);
                }
            }
        } else {
            console.error("Error: not enough cards in the current deck")
        }
    }


    moveTrashDeckIntoMainDeck(){
        this.deck.mainDeck.push(...this.deck.trashDeck)
        this.deck.trashDeck = []
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
/* 
    addPlayers(newPlayers: Player[]){
        // uppmana användaren att skriva in antalet spelare (minst 2) och deras namn
        // skapar motsvarande antal instanser av Player-klassen

        return this.players
    } */

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

 
    throwAwayTheTwoLowestCards(game: Game){
        if(this.currentHand){
            const sortedHandDescending = this.currentHand.sort((a,b)=> (b.value - a.value))
            const firstCardToTrash = sortedHandDescending.pop()
            const secondCardToTrash = sortedHandDescending.pop()
            if(firstCardToTrash && secondCardToTrash){
                game.dealer.deck.trashDeck.push(firstCardToTrash, secondCardToTrash);
            }
            this.currentHand = sortedHandDescending.map(card => ({...card}))
        }
    }

    throwAwayAllCards(game: Game){
        if(this.currentHand){
            game.dealer.deck.trashDeck.push(...this.currentHand)
        }
        this.currentHand = []
    }
}



export class MiscMethods{

    static printOutCards(cards: Card[], htmlElement?: HTMLElement): void {
        console.log(cards)

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


    static  reportStatusOfDecksAndPlayerHands(game: Game){
        // Log the current deck, players' hands and trashdeck
        console.log("MainDeck: ", game.dealer.deck.mainDeck.map(card => ({...card})));
        console.log("TrashDeck: ", game.dealer.deck.trashDeck.map(card => ({...card})));
        game.players.forEach(player => {
        console.log(`Player: ${player.name}`)
        player.currentHand.map(card => {
            console.log(`${card.name} - ${card.value}`);
        })
        console.log(`Points: ${MiscMethods.calculatePointsOnHand(player.currentHand)}`);
    });
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
