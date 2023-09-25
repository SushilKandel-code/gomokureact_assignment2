import { GameStatus } from './constants'

export type Position = [number, number]

export type GameData = {
  _id: string;
  userId: string;
  size: number
  moves: Position[]
  date: string
  result: GameStatus
}
