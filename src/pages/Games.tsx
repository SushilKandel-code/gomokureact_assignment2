import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect, useState} from 'react'
import {Message} from '../components'
import {UserContext} from '../context'
import type { GameData } from '../types'
import style from './Games.module.css'
import React from 'react'
import {get} from '../utils/http'

export default function Games() {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  const [userGames, setUserGames] = useState<GameData[]>([])
  const [gamesById, setGameById] = useState<GameData[]>([])
  const [showMessage, setShowMessage] = useState(true)
  let message = "Please wait few seconds lo load past games"

  const getGameById = async () => {
    const getDetails = await get<GameData[]>('../api/games')
    console.log(getDetails)
    setGameById(getDetails)
  }

  useEffect(() => {
    getGameById()
    
  }, [])
  
  return ( <div> {gamesById.map((game, index)=>
    <div className={style.list} key={`userGame-${index}`}>
            <p className={style.title}>
              Game #{index + 1}
            </p>
            <button
              className={style.button}
              onClick={() => navigate(`/game-log/${game._id}`)} // use timestamp as id
            >
              View game log
            </button>
          </div>
    )}</div>)
}



