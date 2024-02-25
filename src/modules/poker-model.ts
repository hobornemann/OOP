/* MODEL
Model: This component represents the data and business logic of the application. 
Classes that define the structure and behavior of the data should be placed in 
the Model. These classes typically include data models, database access classes, 
business logic components, and any other classes related to managing the application's data. 
*/

import {} from './poker-controller'
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


    getNewDeck(game: Game){
        game.dealer.deck.mainDeck = game.dealer.deck.getNewDeck()
        let newDeck: Card[] = game.dealer.deck.mainDeck.map(card => ({...card})) 
        return newDeck
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

    announceTheWinner(game: Game){
        const playerWithHighestScore: Player = game.players.reduce((prevPlayer, currentPlayer) => {
            return (currentPlayer.points > (prevPlayer ? prevPlayer.points : -Infinity)) ? currentPlayer : prevPlayer;
        }, game.players[0]);
        const highestScore = playerWithHighestScore.points
        const winningPlayers = game.players.filter(player => player.points === highestScore)
        if(winningPlayers.length === 1){
            console.log(`Congratulations! With ${winningPlayers[0].points} points, ${winningPlayers[0].name} is the winner of this round!`);
        } else {
            console.log(`Congratulations! The following players have won the round:`);
            for (const player of winningPlayers){
                console.log(`${player.name}`);
            }       
        }
        console.log("Here are the points for all players:");
        for (const player of game.players){
            console.log(`${player.name} had ${player.points} points.`)
        }
    }

    moveTrashDeckIntoMainDeck(){
        this.deck.mainDeck.push(...this.deck.trashDeck)
        console.log("this.deck.mainDeck after trashDeck added",this.deck.mainDeck.map(card => ({card})))
        this.deck.trashDeck = []
    }


    promptForCardsToThrow(playerName: string): Promise<number[]> {
        return new Promise((resolve, reject) => {
            const input = prompt(`${playerName}, enter the index numbers (0-4) of the two cards you want to throw away, SEPARATED by a SPACE:`);
            if (!input) {
                reject(new Error("Input is required."));
                return;
            }
            const indices = input.split(" ").map(index => parseInt(index));
            
            if (indices.length !== 2 || indices.some(isNaN) || indices.some(index => index < 0 || index > 4)) {
                reject(new Error("Invalid input. Please enter two valid index numbers between 0 and 4 SEPARATED by a SPACE."));
                return;
            }
            resolve(indices);
        });
    }
    

    playerTurn(playerName: string): Promise<number[]> {
        return new Promise<number[]>(async (resolve, reject) => {
            try {
                const indices: number[] = await this.promptForCardsToThrow(playerName);
                console.log(`${playerName} wants to throw away cards at index ${indices[0]} and ${indices[1]}.`);
                indices.sort((a, b) => b - a);  // desc order
                resolve(indices);
            } catch (error) {
                console.error("An error occurred:", error);
                reject(error);
            }
        });
    }


    async askPlayersToThrowAwayTwoCards(game: Game) {
        console.log("Players throwing away 2 cards each:");
        for (const player of game.players) {
            const indices = await this.playerTurn(player.name);
            console.log("indices", indices);
            if (indices) {
                for (const index of indices) {
                    const cardToTrash: Card = player.currentHand.splice(index, 1)[0];
                    game.dealer.deck.trashDeck.push(cardToTrash);
                }
            }
        }
    }
}


export class Game {
    
    players: Player[];
    dealer: Dealer;
    roundNumber: number;

    constructor(){
        this.players = [];
        this.dealer = this.addDealer();
        this.roundNumber = 0;
    }

    async startGame(game: Game){

        try {
            await this.addPlayers(game)

            if(game.players.length > 0){               
                console.log("Get new deck:");
                const deck1 = new Deck();  
                const newDeck = deck1.getNewDeck();
                game.dealer.deck.mainDeck = newDeck.map(card => ({ ...card }));  
                MiscMethods.reportStatusOfTheGame(game);
                console.log("Shuffled mainDeck:");
                const shuffledDeck = game.dealer.shuffleDeck(game.dealer.deck.mainDeck);
                game.dealer.deck.mainDeck = shuffledDeck.map(card => ({ ...card }));  
                MiscMethods.reportStatusOfTheGame(game);
                console.log("this.players.length * 7: ",this.players.length * 7)
                console.log("this.dealer.deck.mainDeck.length:",this.dealer.deck.mainDeck.length);
                while(this.players.length * 7 < this.dealer.deck.mainDeck.length){
                    await this.playAnotherRound(game)       // HEJ SANDRA! VID DEADLINE HADE JAG MISSAT ATT LÄGGA TILL 'AWAIT' PÅ DENNA RAD. FIXADE DET NU EFTER DEADLINE.
                } 
                console.log("Moving trashDeck into mainDeck:");
                game.dealer.moveTrashDeckIntoMainDeck()    
                MiscMethods.reportStatusOfTheGame(game);
                return
                
            } else {
                console.log("Please register your players first.");
                //alert("Please register your players first.");
            }
        } catch (error) {
            console.error("An error occurred:", error); 
        }
    }


    async playAnotherRound(game: Game){
        this.roundNumber = this.roundNumber + 1
        console.log(`Round No: ${this.roundNumber}`);
        console.log("Distributing 5 cards to each player:");
        game.dealer.distributeXCardsToEachPlayer(game, 5);
        MiscMethods.reportStatusOfTheGame(game);
        await this.dealer.askPlayersToThrowAwayTwoCards(game)
        MiscMethods.reportStatusOfTheGame(game);
        console.log("Distributing 2 new cards to each player:");
        game.dealer.distributeXCardsToEachPlayer(game, 2);
        MiscMethods.reportStatusOfTheGame(game);
        console.log("Determining and announcing the winner:");
        game.dealer.announceTheWinner(game)
        console.log("Players throwing away all their cards (to trashDeck):");
        for (const player of game.players){
            player.throwAwayAllCards(game)
        }
        MiscMethods.reportStatusOfTheGame(game);
        return
    }


    getPlayerNames(numPlayers: number): Promise<string[]> {
        return new Promise((resolve, reject) => {
            const playerNames: string[] = [];
            for (let i = 1; i <= numPlayers; i++) {
                const playerName = prompt(`Enter name for Player ${i}:`);
                if (!playerName) {
                    reject(new Error("Player name is required."));
                    return;
                }
                playerNames.push(playerName);
            }
            resolve(playerNames);
        });
    }


    async addPlayers(game: Game){
        // skapar motsvarande antal instanser av Player-klassen
        const numPlayersStr = prompt("Enter number of players (2-7):");
        if (!numPlayersStr) {
            //throw new Error("Number of players is required.");
            return
        }
        const numPlayers = parseInt(numPlayersStr, 10);
        if (isNaN(numPlayers) || numPlayers < 2 || numPlayers > 7) {
            throw new Error("Invalid number of players.");
        }
        const playerNames = await game.getPlayerNames(numPlayers);
        console.log("Player names:", playerNames);
        for (const playerName of playerNames){
            // instantiera players
            const player = new Player(playerName)
            game.addPlayer(player)
        }
    }

    
    addPlayer(newPlayer: Player): Player[]{
        // skapar motsvarande antal instanser av Player-klassen
        this.players.push(newPlayer)
        return this.players
    }


    addDealer(): Dealer{
        let dealer: Dealer = new Dealer()
        return dealer
    }

}



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


    static calculatePointsOnHand(cards: Card[]): number{
        let arrayOfPoints: number[] = cards.map(card => {
            return card.value
        })
        const points: number = arrayOfPoints.reduce((acc, curr)=>(acc + curr),0)
        return points
    }


    static  reportStatusOfTheGame(game: Game){
        // Log the current deck, players' hands and trashdeck
        console.log("MainDeck: ", game.dealer.deck.mainDeck.map(card => ({...card})));
        console.log("TrashDeck: ", game.dealer.deck.trashDeck.map(card => ({...card})));
        game.players.forEach(player => {
            console.log(`Player: ${player.name}`)
            player.currentHand.map(card => {
                console.log(`${card.name} - ${card.value}`);
            })
            player.points = MiscMethods.calculatePointsOnHand(player.currentHand)
            console.log(`Points: ${player.points}`);
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





