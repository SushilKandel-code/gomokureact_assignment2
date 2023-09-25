import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components'
import { AvailableGameSize, API_HOST } from '../constants'
import style from './Home.module.css'
import {post} from '../utils/http'
import React from 'react'



export default function Home() {
  const navigate = useNavigate()
  const [size, setSize] = useState(10)


  //post request to create new game
  const handleStartClick = async ()=>{
    await post(`${API_HOST}/api/games`, {
      userId:"",
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
        Selecte a Game size
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
