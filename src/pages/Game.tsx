import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useLocalStorage } from '../hooks'
import { Board, Button } from '../components'
import { isGameEnded } from '../utils'
import { AvailableGameSize, GameStatus } from '../constants'
import type { Position, GameData } from '../types'
import style from './Game.module.css'
import React from 'react'

const isGameOver = (gameStatus: GameStatus) =>
  [GameStatus.Draw, GameStatus.Player1_Win, GameStatus.Player2_Win].includes(
    gameStatus
  )

export default function Game() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [games, setGames] = useLocalStorage<GameData[]>('games', [])
  const size = parseInt(searchParams.get('size') || '0')
  const [gameStatus, setGameStatus] = useState(GameStatus.PlayerOne_Move)
  const [moves, setMoves] = useState<Position[]>([])

  if (!AvailableGameSize.includes(size)) {
    return (
      <p className={style.message}>
        Invalid game size, please go back to home page and start the game
        again...
      </p>
    )
  }

  const updateGameStatus = (move: Position) => {
    if (isGameOver(gameStatus)) return
    const updatedMoves = [...moves, move]
    if (isGameEnded(size, updatedMoves)) {
      if (updatedMoves.length === size * size) {
        setGameStatus(GameStatus.Draw)
      } else if (updatedMoves.length % 2) {
        setGameStatus(GameStatus.Player1_Win)
      } else {
        setGameStatus(GameStatus.Player2_Win)
      }
    } else {
      setGameStatus(
        updatedMoves.length % 2
          ? GameStatus.PlayerOne_Move
          : GameStatus.PlayerTwo_Move
      )
    }
    setMoves(updatedMoves)
  }

  const restart = () => {
    if (
      !isGameOver(gameStatus) &&
      !window.confirm('The game is still in progress, are you sure to restart?')
    )
      return
    setMoves([])
    setGameStatus(GameStatus.PlayerOne_Move)
  }

  const leave = () => {
    if (
      !isGameOver(gameStatus) &&
      !window.confirm('The game is still in progress, are you sure to leave?')
    )
      return
    if (isGameOver(gameStatus)) {
      setGames([
        ...games,
        { size, moves, date: new Date().toString(), result: gameStatus },
      ])
      navigate('/games')
    } else {
      navigate('/home')
    }
  }

  return (
    <>
      <p className={style.message}>{gameStatus}</p>
      <Board
        size={size}
        updateGameStatus={updateGameStatus}
        moves={moves}
        readonly={isGameOver(gameStatus)}
      />
      <div className={style.buttons}>
        <Button type="button" onClick={restart}>
          Restart
        </Button>
        <Button type="button" onClick={leave}>
          Leave
        </Button>
      </div>
    </>
  )
}
