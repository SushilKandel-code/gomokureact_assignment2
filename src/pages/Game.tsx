import { useContext, useState } from 'react'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { useLocalStorage } from '../hooks'
import { Board, Button } from '../components'
import { isGameEnded } from '../utils'
import { API_HOST, AvailableGameSize, GameStatus } from '../constants'
import type { Position, GameData } from '../types'
import style from './Game.module.css'
import { UserContext } from '../context'
import React from 'react'
import { get, put as putRequest, del } from '../utils/http'

const isGameOver = (gameStatus: GameStatus) =>
  [GameStatus.Draw, GameStatus.Player1_Win, GameStatus.Player2_Win].includes(
    gameStatus
  )

export default function Game() {
  const { user } = useContext(UserContext);
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [games, setGames] = useLocalStorage<GameData[]>('games', [])
  const size = parseInt(searchParams.get('size') || '0')
  const [gameStatus, setGameStatus] = useState(GameStatus.PlayerOne_Move)
  const [moves, setMoves] = useState<Position[]>([])

  //if user is not logged in, redirect to the login page
  if(!user) return <Navigate to="/login" replace/>
  console.log(user);
  const _id= "";
  const userId= "";
  const date= "";


  if (!AvailableGameSize.includes(size)) {
    return (
      <p className={style.message}>
        Invalid game size, please go back to home page and start the game
        again...
      </p>
    )
  }

  const updateGameStatus = async (move: Position) => {
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
    //get request to get game details
    const getDetails = await get<GameData[]>(`${API_HOST}api/games`)
    console.log(getDetails);
    const currentDetails = getDetails[getDetails.length-1]
    const thisId = currentDetails._id 

    // puting request to update game upon user making moves
    
    await putRequest(`${API_HOST}/api/games/${thisId}`,{
      userID:user._id,
      size,
      moves,
      date,
      result: gameStatus
    })
  }

  //restart game

  const restart = async () => {
    if (
      !isGameOver(gameStatus) &&
      !window.confirm('The game is still in progress, are you sure to restart?')
    )
      return
    setMoves([])
    setGameStatus(GameStatus.PlayerOne_Move)

    //getting request to get game details
    const getDetails = await get<GameData[]>('api/games')
    const currentDetails = getDetails[getDetails.length-1]
    const thisId = currentDetails._id 
    //putting request to update game upon restarting
    await put(`${API_HOST}/api/games/${thisId}`,{
      userId,
      size,
      moves:[[]],
      date,
      result:gameStatus
    })
  }

  const leave = async () => {
    if (
      !isGameOver(gameStatus) &&
      !window.confirm('The game is still in progress, are you sure to leave?')
    )
      return
    if (isGameOver(gameStatus)) {
      setGames([
        ...games,
        { _id, userId, size, moves, date: new Date().toString(), result: gameStatus },
      ])
      navigate('/games')
      navigate('/games')
      //  GET request to get game details.
      const getDetails = await get<GameData[]>('api/games')
      const currentDetails = getDetails[getDetails.length-1]
      const thisId = currentDetails._id
      // PUT request to update the game upon the user leaving the game with the game being finished.
      await putRequest(`${API_HOST}/api/games/${thisId}`, {
        userId,
        size,
        moves,
        date: new Date().toString(),
        result: gameStatus
      }) 

    } else {
      navigate('/')
      //get request to get game details
      const getDetails = await get<GameData[]>('api/games')
      const getId = getDetails[getDetails.length-1]
      const thisId = getId._id
      //  DELETE request to delete the game if the user leaves with the game not being finished.
      await del(`${API_HOST}/api/games/${thisId}`)
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
function put(arg0: string, arg1: { userId: string; size: number; moves: never[][]; date: string; result: GameStatus }) {
  throw new Error('Function not implemented.')
}

