import { useState } from 'react'
import { Route, useNavigate } from 'react-router-dom'
import { Button } from '../components'
import { AvailableGameSize } from '../constants'
import style from './Home.module.css'
import React from 'react'
import Login from './Login'



export default function Home() {
  const navigate = useNavigate()
  const [size, setSize] = useState(10)


  return (
    <>
  
      <label className={style.label}>
        Game size
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
      <Button type="button" onClick={
        () => {
        navigate(`../game?size=${size}`)  
        }
        }
        >
        Start Game
      </Button>

      <Button type="button" onClick={
        () => {
        window.confirm("Are you sure want to log out?")
        navigate('/')  
        }
        }
        >
        Log out
      </Button>
    </>
  )
}
