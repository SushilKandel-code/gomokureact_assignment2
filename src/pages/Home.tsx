import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components'
import { AvailableGameSize, API_HOST } from '../constants'
import style from './Home.module.css'
import {post, setToken} from '../utils/http'
import React from 'react'
import { useLocalStorage } from '../hooks'
import { User } from './../types/User'



export default function Home() {
  const navigate = useNavigate()
  const [size, setSize] = useState(10)

  const [user] = useLocalStorage<User | undefined>('user', undefined)  
    

  //post request to create new game
  const handleStartClick = async ()=>{
    if (user) {
      setToken(user.token)
  }else{
    window.alert('Token Missing. Please Login first')
  }
    await post(`${API_HOST}/api/games`, {
      userID:user?._id,
      size: size,
      moves: [[]],
      date:"",
      result:""
    })
    navigate(`game?size=${size}`)
  }

  return (
    <>
      <label className={style.label}>
        Select a Game size
        <select
          className={style.select}
          value={size.toString()}
          onChange={(event) => setSize(parseInt(event.target.value))}
        >
          {AvailableGameSize.map((value) => (
            <option key={`size-${value}`} value={value.toString()}>
              {value}
            </option>
            
          ))}
        </select>
      </label>
      <Button type="button" onClick={handleStartClick}>Start Game</Button>
    </>
  )
}
