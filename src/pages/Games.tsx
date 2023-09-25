import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useContext, useState} from 'react'
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
  const [showMessage, setShowMessage] = useState(true)
  let message = "Please wait few seconds lo load past games"

  setTimeout(()=>{
    setShowMessage(false)
  }, 5000)

  //display message 
  const displayLoadingMessage = () => {
    if(showMessage)
    return(
    <>
    <Message variant='info' message={message}></Message>
    </>
    )
  }


  const getUserGames = async ()=>{
    //get request to get game details
    const getDetails = await get<GameData[]>('api/games')
    const thisUser = user?._id
    for(var i = 0; i < getDetails.length; i++){
      if((getDetails[i].userId===thisUser) && (getDetails[i].date !=="")){
        userGames.push(getDetails[i])
      }
    }
    setUserGames(userGames)
  }

  //if user is not logged in, navigate to login
  if(!user) return <Navigate to="/login" replace/>
  getUserGames()

  if(!userGames){
    return(
      <div className={style.title}>
        {displayLoadingMessage()}
      </div>
    )
  }

  return (
    <>
      <h1 className={style.header}>Previous Games</h1>
      {displayLoadingMessage()}
      {userGames.map(({ date, result, _id }, index) => {
        const d = new Date(date)
        return (
          <div className={style.list} key={`userGame-${index}`}>
            <p className={style.title}>
              Game #{index + 1} @{d.toLocaleDateString()} - {result}
            </p>
            <button
              className={style.button}
              onClick={() => navigate(`/game-log/${d.getTime()}`)} // use timestamp as id
            >
              View game log
            </button>
          </div>
        )
      })}    
    </>
  )
}
