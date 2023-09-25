export const AvailableGameSize = [5,6,7,8,9,10,11,12,13,14,15]

export enum STATUS {
    //  empty is used to represent squares on the game board that are empty.
    empty = 'Empty',
    //  SELECTED is used to represent squares on the game board that have been selected by player one.
    Player1_Selected = 'Player1 Selected', 
    //  SELECTEDTWO is used to represent squares on the game board that have been selected by player two.
    Player2_Selected = 'Player2 Selected',
    //  OCCUPIED is used to represent squares on the game board that are occupied or non empty.
    OCCUPIED = 'OCCUPIED',
}

export enum GameStatus{
    PlayerOne_Move = 'Current Player: Player 1',
    PlayerTwo_Move='Current Player: Player 2',
    Player1_Win = 'Player 1 wins',
    Player2_Win = 'Player 2 wins',
    Draw = 'Game Draw'
}

export const API_HOST = process.env.REACT_APP_API_HOST || ''