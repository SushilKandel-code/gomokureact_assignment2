import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useContext, useState} from 'react'
import { useLocalStorage } from '../hooks'
import { Board, Button, Message } from '../components'
import type { GameData } from '../types'
import { UserContext } from '../context'
import style from './GameLog.module.css'
import React from 'react'
import { get } from '../utils/http'

export default function GameLog() {
  const { user } = useContext(UserContext)
  const { gameId = '' } = useParams()
  const navigate = useNavigate()
  const [gamesById, setGameById] = useState<GameData[]>([])
  const [showMessage, setShowMessage] = useState(true)
  let message = "Please wait for few seconds to load the game"

  //if user is not logged in, redirect to login page
  if(!user) return <Navigate to="/login" replace/>

  //timeout to remove loading message after 5 sec
  setTimeout(() => {
    setShowMessage(false) 
  }, 5000)

  //display message for game loading
  const displayLoadingMessage = ()=>{
    if(showMessage){
      return(
        <>
        <Message variant="info" message={message}></Message>
        </>
      )
    }
    else{
      return(
        <>
        console.log(message);
        </>
      )
    }
  }

  const getGameById = async () => {
    const getDetails = await get<GameData[]>('../api/games')
    for(var i = 0; i < getDetails.length; i++){
      if((getDetails[i]._id === gameId) && (getDetails[i].date !== "")){
        gamesById.push(getDetails[i])
      }
    }
    setGameById(gamesById)
  }

  getGameById()
  const game = gamesById.find(
    (i) => i._id === gameId
  )

  if (!game)
    return (
      <div>
        {displayLoadingMessage()}
        <p className={style.text}> Select an option:</p>
        <div className={style.button}>
          <Button onClick={()=> navigate(`/game-log/${gameId}`)}>View Game Board</Button>
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
