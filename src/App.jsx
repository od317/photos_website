import React, { useState } from 'react'
import {Routes,Route} from 'react-router-dom'
import Search from './pages/Search'
import Home from './pages/Home'
import NavBar from './components/navBar/NavBar'
import Photo from './pages/Photo'
import SavedLayout from './components/saved/SavedLayout'
import Cookies from 'js-cookie'
import NotFound from './components/noFound/NotFound'
import { prevSearchContext,prevSearchContextHandler } from './contexts/PrevSearchContext'
import { formatCookies } from './data/data'
function App() {
  
  const [prevSearch,setPreavSearch] = useState(Cookies.get('prevSearch') ? formatCookies(Cookies.get('prevSearch')) :[])

  const handlePreavSearch = ()=>{
        const newPrev = formatCookies(Cookies.get('prevSearch'))
        setPreavSearch(newPrev)
  }

  return (
    <>
      <prevSearchContext.Provider value={prevSearch}>
        <prevSearchContextHandler.Provider value={handlePreavSearch}>
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
        </prevSearchContextHandler.Provider>
      </prevSearchContext.Provider>
      
    </>
  
  )
}

export default App