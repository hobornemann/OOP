
export interface Card {
    name: string,
    value: number,
    color: Color,
    face: Face,
    sortValue: number
}

export type Color = 'Clubs'|'Spades' | 'Hearts' | 'Diamonds'

export type Face = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';

export type Value = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;  



