import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input, Message } from '../components'
import style from './Login.module.css'

export default function SignUp() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSignUp = async () => {
    setErrorMessage('')
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match')
      return
    }
    if (username === "admin" && password === "admin") {
      navigate('/Home')
    } else {
      setErrorMessage("Invalid username/password")
    }
  }

  return (
    <form
      className={style.container}
      onSubmit={(e) => {
        e.preventDefault()
        handleSignUp()
      }}
    >
      {errorMessage && <Message variant="error" message={errorMessage} />}
      <Input
        name="username"
        placeholder="Username"
        value={username}
        onChange={(e) => {
          setErrorMessage('')
          setUsername(e.target.value)
        }}
      />
      <Input
        name="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setErrorMessage('')
          setPassword(e.target.value)
        }}
      />

      <Input
        name="confirmPassword"
        type="password"
        placeholder="Confirm password"
        value={confirmPassword}
        onChange={(e) => {
          setErrorMessage('')
          setConfirmPassword(e.target.value)
        }}
      />
      <Button
        type="submit"
        disabled={!username || !password || !confirmPassword}
      >
        Sign Up
      </Button>

      <Button
        onClick={(e) => {
          e.preventDefault()
          navigate('../login')
        }}
      >
        Login
      </Button>
    </form>
  )
}
