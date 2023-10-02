import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect, useState} from 'react'
import { Board, Button } from '../components'
import type { GameData } from '../types'
import { UserContext } from '../context'
import style from './GameLog.module.css'
import React from 'react'
import { get } from '../utils/http'
import { API_HOST } from '../constants'

export default function GameLog() {
  const { user } = useContext(UserContext)
  const { gameId = '' } = useParams()
  const navigate = useNavigate()
  const [gamesById, setGameById] = useState<GameData[]>([])

  //if user is not logged in, redirect to login page
  if(!user) return <Navigate to="/login" replace/>

  const getGameById = async () => {
    const getDetails = await get<GameData[]>(`${API_HOST}/api/games`)
    setGameById(getDetails)
  }

  useEffect(() => {
    getGameById()
  }, [])
  
  const game = gamesById.find(
    (i) => i._id === gameId
  )

  if (!game)
    return (
      <div>
        <p className={style.text}> Select an option:</p>
        <div className={style.button}>
          
        </div>
        <div className={style.button}>
          <Button onClick={()=> navigate(`/games`)}>Back</Button>
        </div>
      </div>
    )

  const { size, moves, result } = game

  return (
    <>
      <p className={style.message}>{result}</p>
      <Board size={size} moves={moves} readonly />
      <div className={style.button}>
        <Button onClick={() => navigate('/games')}>Back</Button>
      </div>
    </>
  )
}

