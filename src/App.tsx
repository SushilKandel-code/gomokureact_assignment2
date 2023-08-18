import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import { Header } from './components'
import { Home, Game, Games, GameLog, Login, SignUp } from './pages'
import style from './App.module.css'
import { hot } from 'react-hot-loader'


function App() {
  return (
    <>
    <Header/>
      <main className={style.main}>
        <div className={style.container}>
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="login" element={<Login/>} />
            <Route path="home" element={<Home/>} />
            <Route path="signup" element={<SignUp/>} />
            <Route path="game" element={<Game />} />
            <Route path="games" element={<Games />} />
            <Route path="game-log/:gameId" element={<GameLog />} />
            {/* <Route path="*" element={<Navigate to="home" replace />} /> */}
          </Routes>
        </div>
      </main>

      <footer>
        <div className={style.footer}>
          <text> Gomoku © 2023</text>
        </div>
      </footer>
    </>
    
    
    
  );
}

export default App;
