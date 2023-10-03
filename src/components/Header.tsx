import { useContext } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { UserContext } from '../context'
import style from './Header.module.css'
import React from 'react'

export default function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useContext(UserContext)


  const getActions = () => {
    if (user) {
      return (
        <>
          <button className={style.action} onClick={() => navigate('/games')}>
            History
          </button>
          <button 
            className={style.action} 
            onClick={() => {
              window.confirm("Are you sure want to logout?")
              logout()
              navigate('/')
            }}
          >
            Logout
          </button>
        </>
      )
    }
    else {
      return location.pathname !== '/login' ? (
        <button className={style.action} onClick={() => navigate('/login')}>
          LOGIN
        </button>      
      ) : (
        <button className={style.action} onClick={() => navigate('/sign-up')}>
          REGISTER
        </button>
      )
    }
  }

  return (
    <header className={style.header}>
      <div className={style.container}>
        <Link className={style.title} to="/">Gomoku</Link>
        <div className={style.actions}>{getActions()}</div>
      </div>
    </header>
  )
}
