import { GameStatus } from './constants'

export type Position = [number, number]

export type GameData = {
  size: number
  moves: Position[]
  date: string
  result: GameStatus
}
