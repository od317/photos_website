import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Search from './pages/Search'
import Home from './pages/Home'

function App() {
  return (
    <>

      <Routes>
        <Route element={<Home/>} path='/'/>
        <Route element={<Search/>} path='/search'/>
      </Routes>

    </>
  
  )
}

export default App