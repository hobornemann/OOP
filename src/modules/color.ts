//-----------------------------------------------------------
// COLOR CLASS - OLD STYLE with separate Prototype functions
//----------------------------------------------------------


export function Color(this: any, r: number, g: number, b: number, a?: number){
    
   /*  if (!this.isRGBInputValid(r, g, b, this.a)) {
        throw new Error("One of the r-, g-, b-parameters is either missing, higher than 255, or lower than 0. Alternatively, the optional a-parameter may be lower than 0 or higher than 1. Please try again.");
    } */
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = (typeof a !== 'undefined') ? a : 1;
} 

export function addPrototypeMethodsToColorClass(): void {

/*     Color.prototype.isRGBInputValid = function(this: any, r: number, g: number, b: number, a: number): boolean {
        r = Math.round(r)
        b = Math.round(g)
        g = Math.round(b)
        let isValid: boolean;
        ( r < 0 || g < 0 || b < 0 || r > 255 || g > 255 || b > 255 || (a !== undefined && (a < 0 || a > 1)))? isValid = false : isValid = true;
        return isValid
     }*/
    
    
    Color.prototype.rgb = function(this:any): string {
        return `rgb(${this.r}, ${this.g}, ${this.b})`;
    }
    
    
    Color.prototype.rgba = function(this: any): string {
        return `rgb(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    }   
    
    
    Color.prototype.hex = function(this: any): string {
        const redHex = this.r.toString(16).padStart(2, '0');
        const greenHex = this.g.toString(16).padStart(2, '0');
        const blueHex = this.b.toString(16).padStart(2, '0');
        return `#${redHex}${greenHex}${blueHex}`;
    }    
}    



    /*  import  Color from './modules/interfaces/color'  */
/* 
interface Color {
    r: number;
    g: number;
    b: number;
    a: number;
}
 */