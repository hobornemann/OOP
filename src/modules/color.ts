//-----------------------------------------------------------
// COLOR CLASS - OLD STYLE with separate Prototype functions
//----------------------------------------------------------

export interface Color {
    r: number;
    g: number;
    b: number;
    a?: number;
}


export function ColorClass(this: any, r: number, g: number, b: number, a?: number){
    
   /*  if (!this.isRGBInputValid(r, g, b, this.a)) {
        throw new Error("One of the r-, g-, b-parameters is either missing, higher than 255, or lower than 0. Alternatively, the optional a-parameter may be lower than 0 or higher than 1. Please try again.");
    } */
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = (typeof a !== 'undefined') ? a : 1;
} 

export function addPrototypeMethodsToColorClass(): void {

/*     ColorClass.prototype.isRGBInputValid = function(this: any, r: number, g: number, b: number, a: number): boolean {
        r = Math.round(r)
        b = Math.round(g)
        g = Math.round(b)
        let isValid: boolean;
        ( r < 0 || g < 0 || b < 0 || r > 255 || g > 255 || b > 255 || (a !== undefined && (a < 0 || a > 1)))? isValid = false : isValid = true;
        return isValid
     }*/
    
    
    ColorClass.prototype.rgb = function(): string {
        return `rgb(${this.r}, ${this.g}, ${this.b})`;
    }
    
    
    ColorClass.prototype.rgba = function(): string {
        return `rgb(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    }   
    

    ColorClass.prototype.hex = function(): string {
        this.a = (typeof this.a !== 'undefined') ? this.a : 1;
/*         this.a = Math.round(this.a * 255) */
        const toHex = (c: number) => {
            const hex = Math.round(c).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };

        const alphaHex = Math.round(this.a * 255); // Round alpha value to the nearest integer

        return `#${toHex(this.r)}${toHex(this.g)}${toHex(this.b)}${toHex(alphaHex)}`;

        /* return `#${toHex(this.r)}${toHex(this.g)}${toHex(this.b)}${Math.round(this.a * 255).toString(16)}`; */
    } 

}    



    
/*     ColorClass.prototype.hex = function(): string {
        const redHex = this.r.toString(16).padStart(2, '0');
        const greenHex = this.g.toString(16).padStart(2, '0');
        const blueHex = this.b.toString(16).padStart(2, '0');
        return `#${redHex}${greenHex}${blueHex}`;
    }     */

