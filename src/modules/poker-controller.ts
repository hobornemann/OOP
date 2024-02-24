/*  CONTROLLER
Controller: This component acts as an intermediary between the Model and the View. 
Classes that handle user input, update the Model based on user actions, and update the 
View based on changes in the Model should be placed in the Controller. These classes
 typically include route handlers, event listeners, form handlers, and any other classes 
 related to coordinating interactions between the Model and the View.
*/

import {Deck} from './poker-model'
import {} from './poker-view'


export function initiatePokerApp(){

    const myDeck = new Deck();
    console.log("myDeck:",myDeck);
    myDeck.createNewDeck();
    myDeck.showCurrentDeck(); 
    
}



//----------------------------------------------------------------
// CLASSES 
//----------------------------------------------------------------


//----------------------------------------------------------------
// FUNCTIONS
//----------------------------------------------------------------
