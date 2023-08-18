import { useState, useContext, useEffect, useRef } from 'react'
import { Navigate, Route, useNavigate } from 'react-router-dom'
import { Button, Input, Message } from '../components'
import style from './Login.module.css'
import Home from './Home'
import { AvailableGameSize } from '../constants'


export default function Login() {
  const usernameInput = useRef<HTMLInputElement | null>(null)
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [selectedSize, setSelectedSize] = useState('')

  const handleLogin = async () => {
    setErrorMessage('')
    if (username === "admin" && password === "admin") {
      window.confirm('Login Success')   
      navigate('../home')
    } else {
      setErrorMessage("Wrong Username Password")
    }
  }

  const handleSignup = async () => {
    setErrorMessage('')
    navigate("/signup")
  }

  useEffect(() => {
    if (usernameInput.current) {
      usernameInput.current.focus()
    }
  }, [])

  return (
    <form
      className={style.container}
      onSubmit={(e) => {
        e.preventDefault()
        handleLogin()
      }}
    >
      {errorMessage && <Message variant="error" message={errorMessage} />}
      <Input
        ref={usernameInput}
        name="username"
        placeholder="Username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value)
          setErrorMessage('')
        }}
      />
      <Input
        name="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value)
          setErrorMessage('')
        }}
      />
      <Button type="submit" disabled={!username || !password}>
        Login
      </Button>

      <Button
      onClick={(e) => {
        e.preventDefault()
        handleSignup()
      }}
       >
        Sign up
      </Button>
    </form>
  )
}

