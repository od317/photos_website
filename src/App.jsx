import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Search from './pages/Search'
import Home from './pages/Home'
import NavBar from './components/navBar/NavBar'

function App() {
  
  return (
    <>
      <NavBar></NavBar>
      <div className='px-[2%]'>
          <Routes>
                <Route element={<Home/>} path='/'/>
                <Route element={<Search/>} path='/search'/>
          </Routes>
      </div>
    </>
  
  )
}

export default App