import { Link, useNavigate } from 'react-router-dom'

import style from './Header.module.css'
import React from 'react'

export default function Header() {
  const navigate = useNavigate()
  return (
    <header className={style.header}>
      <div className={style.container}>
        <text>Gomoku</text>
        <div className={style.actions}>
          <button className={style.action} onClick={() => navigate('/games')}>
            Previous Games
          </button>
        </div>
      </div>
    </header>
  )
}
