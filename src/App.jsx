import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Search from './pages/Search'
import Home from './pages/Home'
import NavBar from './components/navBar/NavBar'

function App() {
  return (
    <>
      <NavBar></NavBar>
      <Routes>
        <Route element={<Home/>} path='/'/>
        <Route element={<Search/>} path='/search'/>
      </Routes>

    </>
  
  )
}

export default App