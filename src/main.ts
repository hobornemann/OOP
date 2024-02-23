//----------------------------------------------------------------
// COLOR - ASSIGNMENT 
//----------------------------------------------------------------
import { ColorClass, addPrototypeMethodsToColorClass } from './modules/color'



window.addEventListener("DOMContentLoaded", () => {
    const changeBackgroundColorButton = document.querySelector(".change-background-color-button") as HTMLElement
    if(changeBackgroundColorButton){
        changeBackgroundColorButton?.addEventListener('click', changeBackgroundColor);
        addPrototypeMethodsToColorClass()
    } else {
        const errorMsg = "Could not find the change-background-color-button."
        const error = new Error
        console.error(errorMsg, error)    
    }   
})



function changeBackgroundColor(event: Event): void {

    try{
        event.preventDefault();
        const redValueFloat = parseFloat((document.getElementById('redInput') as HTMLInputElement).value);
        const greenValueFloat = parseFloat((document.getElementById('greenInput') as HTMLInputElement).value);
        const blueValueFloat = parseFloat((document.getElementById('blueInput') as HTMLInputElement).value);
        const opacityInputString = document.getElementById('opacityInput') as HTMLInputElement;
        const opacityValueFloat = opacityInputString.value ? parseFloat(opacityInputString.value) : 1;
        const errorMessageElement = document.getElementById('errorMessage');
        const mainContainerElement = document.querySelector(".main-container") as HTMLElement;
        const rgbMethodPElement = document.querySelector(".rgb-method-p") as HTMLParagraphElement;
        const rgbaMethodPElement = document.querySelector(".rgba-method-p") as HTMLParagraphElement;
        const hexMethodPElement = document.querySelector(".hex-method-p") as HTMLParagraphElement;
    
        if(errorMessageElement && mainContainerElement){
            if (redValueFloat < 0 || redValueFloat > 255 || greenValueFloat < 0 || greenValueFloat > 255 || blueValueFloat < 0 || blueValueFloat > 255 || (opacityValueFloat !== undefined && (opacityValueFloat < 0 || opacityValueFloat > 1))) {
                mainContainerElement.style.backgroundColor = "white"
                rgbMethodPElement.style.color ="black"
                rgbaMethodPElement.style.color ="black"
                hexMethodPElement.style.color ="black"
                errorMessageElement.innerText = 'Ouups! One or more input values are out of bounds. Please try again!';
                errorMessageElement.style.display = 'block';
            } else {
                errorMessageElement.style.display = 'none';
                processInputs(redValueFloat, greenValueFloat, blueValueFloat, opacityValueFloat);
            }
        }
    } 
    catch(error: unknown){
        console.error("Error: ", error)
        throw error
    }
}



function processInputs(redInput: number, greenInput: number, blueInput: number, opacityInput: number) {
    try {
        const bodyContainerElement = document.querySelector(".main-container") as HTMLElement;
        const rgbMethodPElement = document.querySelector(".rgb-method-p") as HTMLParagraphElement;
        const rgbaMethodPElement = document.querySelector(".rgba-method-p") as HTMLParagraphElement;
        const hexMethodPElement = document.querySelector(".hex-method-p") as HTMLParagraphElement;
    
        const myColor = new (ColorClass as any)(redInput, greenInput, blueInput, opacityInput);
        bodyContainerElement.style.backgroundColor = myColor.rgba();
    
        const rgbMethodString = myColor.rgb();
        const rgbaMethodString = myColor.rgba();
        const hexMethodString = myColor.hex();
    
        rgbMethodPElement.style.color = rgbMethodString;
        rgbaMethodPElement.style.color = rgbaMethodString;
        hexMethodPElement.style.color = hexMethodString;
    
        rgbMethodPElement.textContent = `This font-color was generated by the rgb()-method. The color styling string used was: ${rgbMethodString}`;  
        rgbaMethodPElement.textContent = `This font-color was generated by the rgba()-method. The color styling string used was: ${rgbaMethodString}`; 
        hexMethodPElement.textContent = `This font-color was generated by the hex()-method. The color styling string used was: ${hexMethodString}`; 
    }
    catch(error: unknown) {
        console.error("Error: ", error);
        throw error;
    }
}



/* 
const color1 =  new (Color as any)(100, 100, 100, 1);
console.log(color1);

let color1RGBFunctionString = color1.rgb();
let color1HEXString = color1.hex();




try {
    const myColor = new (Color as any)(255, 128, 0);
    console.log(myColor);
} catch (error: unknown) {
    console.error("Error: ", error);
}

 */
/* 
// Usage example
const myColor = new (Color as any)(255, 128, 0);
console.log(myColor.rgb()); // Output: rgb(255, 128, 0)
console.log(myColor.hex()); // Output: #ff8000


 */


//----------------------------------------------------------------
// POKER - ASSIGNMENT 
//----------------------------------------------------------------
