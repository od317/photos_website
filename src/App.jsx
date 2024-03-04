import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Search from './pages/Search'
import Home from './pages/Home'
import NavBar from './components/navBar/NavBar'
import Photo from './pages/Photo'
import SavedLayout from './components/saved/SavedLayout'
import NotFound from './components/noFound/NotFound'
function App() {
  
  return (
    <>
      <NavBar></NavBar>
      <div className='sm:px-[2%]'>
          <Routes>
                <Route element={<Home/>} path='/'/>
                <Route element={<Search/>} path='/search'/>
                <Route element={<Photo/>} path='/photo/:id'/>
                <Route element={<SavedLayout/>} path='/saved'/>
                <Route element={<NotFound/>} path='/*'/>
          </Routes>
      </div>
    </>
  
  )
}

export default App