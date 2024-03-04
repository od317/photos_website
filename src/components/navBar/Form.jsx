import React, { useState,useRef ,useEffect} from 'react'
import {useSearchParams,NavLink,useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import { checkDuplicate, editCookie,formatCookies,removeItem } from '../../data/data'
import RecomendedSearch from './RecomendedSearch'
import SearchDrop from './SearchDrop'

function Form({logoSection,savedIconSection,y}) {
  const [searchparams,setSearchparams] = useSearchParams()
  const [query,setQuery] = useState(searchparams.get('query')||'')
  const [show,setShow] = useState(false)
  const [showSmall,setShowSmall] = useState(false)
  const [prevSearch,setPreavSearch] = useState(Cookies.get('prevSearch') ? formatCookies(Cookies.get('prevSearch')) :[])
  const [showSmallDrop,setShowSmallDrop] = useState(false)
  const navigate = useNavigate()
  const dropDownref = useRef(null)
  const sdropDownref = useRef(null)
  const inputRef = useRef(null)

const handleSubmit = (e)=>{
      e.preventDefault()
      if(inputRef.current)
      inputRef.current.blur()
      setShow(false)
      setShowSmall(false)
      setShowSmallDrop(false)
      navigate(`/search?query=${query}`)
      if(checkDuplicate(query,prevSearch))
         return
      if(prevSearch.length>7)
         setPreavSearch(p=>[...prevSearch.slice(1),[query,'']])
      
      else{
         setPreavSearch(p=>[...prevSearch,[query,'']])
      }
}

const handlePrevSearchChange = (v)=>{
      removeItem(v)
      setPreavSearch(formatCookies(Cookies.get('prevSearch')))
}

const handleLinkClick = (v)=>{
        if(inputRef.current)
        inputRef.current.blur()
        setShow(false)
        setShowSmall(false)
        setShowSmallDrop(false)
        setQuery(v)
        navigate(`/search?query=${v}`)
  }

  useEffect(()=>{
      const handleClickOutSideDropDown = (event)=>{
            if(dropDownref.current&&!dropDownref.current.contains(event.target)){
              setShow(false)
            }
      }
      document.addEventListener("mousedown", handleClickOutSideDropDown)
      return () => {
        document.removeEventListener("mousedown", handleClickOutSideDropDown)
      }
  },[])

  return (<>
  <div className={` ${y>40? 'shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]':''} hidden sm:block sticky top-0 z-[10] bg-white`}>
        <div className=' hidden sm:block relative'>
            <div className=' flex flex-row w-full items-center px-[2%] justify-evenly py-[1%]  relative '>
                {logoSection}
                <div ref={dropDownref} className='  sm:w-[70%] lg:w-[80%] relative '>
                    <form onSubmit={handleSubmit} className=' bg-secondary hover:bg-hov  w-full flex flex-row  px-[2%] py-[1%] text-[110%] rounded-full' action="">
                        <input ref={inputRef} onFocus={()=>{
                          setShow(true)
                          }} 
                          value={query} onChange={(e)=>{
                          setQuery(e.target.value)
                          }} 
                          type="text" placeholder='search' className='text-gray w-full bg-transparent placeholder:text-gray-800' />
                        <button className='hover:bg-gray-300 rounded-full p-[.5%]' onClick={()=>{
                          setQuery('')
                          }} type='button'>
                            <svg
                              viewBox="0 0 470 1000"
                              fill="currentColor"
                              height="1em"
                              width="1em"
                            >
                              <path d="M452 656c12 12 18 26.333 18 43s-6 31-18 43c-12 10.667-26.333 16-43 16s-31-5.333-43-16L234 590 102 742c-12 10.667-26.333 16-43 16s-31-5.333-43-16C5.333 730 0 715.667 0 699s5.333-31 16-43l138-156L16 342C5.333 330 0 315.667 0 299s5.333-31 16-43c12-10.667 26.333-16 43-16s31 5.333 43 16l132 152 132-152c12-10.667 26.333-16 43-16s31 5.333 43 16c12 12 18 26.333 18 43s-6 31-18 43L314 500l138 156" />
                            </svg>
                          </button>          
                    </form>
                    {show &&
                    <div className='flex justify-center  w-full absolute z-[10]'>
                      <div className='drop flex flex-row w-[95%] max-h-[40rem] overflow-y-scroll bg-main rounded-2xl'>
                      
                           { query.length > 0 ? 
                           <RecomendedSearch handlePrevSearchChange={handlePrevSearchChange} handleLinkClick={handleLinkClick} prevSearch={prevSearch}/>:
                           <SearchDrop handleLinkClick={handleLinkClick} prevSearch={prevSearch}/>}

                      </div>
                    </div>
                    }
                </div>
                {savedIconSection}
            </div>
            {show && <div className='bg-black z-[1] flex flex-row justify-center bg-opacity-40 absolute h-[100vh] w-[100%]'></div>}
        </div>
    </div>


    <nav className='sm:hidden z-[20] fixed bottom-0 w-full flex justify-evenly bg-secondary py-[1%] flex-row'>
    <button onClick={()=>{

      setShowSmall(p=>!p)
      document.body.style.overflowY = "hidden"
      if(showSmall)
      document.body.style.overflowY = "scroll"
      }} className=' w-[33.3%] sm:hidden flex items-center justify-center'>
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              viewBox="0 0 24 24"
              height="2em"
              width="2em"
            >
              <path d="M19 11 A8 8 0 0 1 11 19 A8 8 0 0 1 3 11 A8 8 0 0 1 19 11 z" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
    </button>
    <NavLink to={'/'} className=' w-[33.3%] flex items-center justify-center'>
      <svg fill="none" viewBox="0 0 24 24" height="2em" width="2em" >
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M21 8.772l-6.98-6.979a3 3 0 00-4.242 0L3 8.571v14.515h7v-6a2 2 0 114 0v6h7V8.772zm-9.808-5.565L5 9.4v11.686h3v-4a4 4 0 018 0v4h3V9.6l-6.393-6.394a1 1 0 00-1.415 0z"
          clipRule="evenodd"
        />
      </svg>
    </NavLink>
    <NavLink to={'/saved'} className='w-[33.3%]  flex items-center justify-center mx-[1%] rounded-full text-center py-[.9%] text-white'>
        <svg
          fill="#e60023"
          viewBox="0 0 16 16"
          height="2em"
          width="2em"
        >
        <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 01-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
        </svg>
    </NavLink>
    </nav>


     {showSmall&&<>
                    <div ref={sdropDownref} className='sm:hidden sticky top-0 h-screen overflow-y-scroll drop w-full  z-[10] bg-main flex flex-col'>
                 
                    <div className=' relative py-[1%]'>
                    <form onSubmit={handleSubmit} className='w-full flex flex-row  px-[2%] py-[1%] text-[110%] rounded-full' action="">
                        <input ref={inputRef} onFocus={()=>{
                          setShowSmallDrop(true)
                          }} 
                          value={query} onChange={(e)=>{
                          setQuery(e.target.value)
                          }} 
                          type="text" placeholder='search' className='text-gray border-[1px] border-gray-400 px-[2%] py-[1%] rounded-full w-full bg-transparent placeholder:text-gray-800' />
                          {showSmallDrop &&                      
                          <button className=' rounded-full p-[.5%]' onClick={()=>{
                          setQuery('')
                          setShowSmallDrop(false)
                          }} type='button'>
                             cancel
                          </button> }         
                    </form>
                    
                    { showSmallDrop && <div className=' absolute h-screen z-[9] bg-main w-full  '>
                                {  prevSearch.length>0 ? 
                                  <>
                                  {prevSearch.map((v,i)=>{
                                    if(v.length)
                                    return(

                                      <div key={v[0]} className='flex flex-row justify-between items-center pr-[2%] sm:hover:bg-hov rounded-2xl'>
                                      <button onClick={()=>handleLinkClick(v)}  className='w-full flex flex-row  items-center px-[4%] py-[1%]'>
                                      <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        viewBox="0 0 24 24"
                                        height="1em"
                                        width="1em"
                                      >
                                        <path d="M19 11 A8 8 0 0 1 11 19 A8 8 0 0 1 3 11 A8 8 0 0 1 19 11 z" />
                                        <path d="M21 21l-4.35-4.35" />
                                      </svg>
                                      <label className='ml-[1%]' htmlFor="">{v[0]}</label>
                                      </button>

                                      <button className='sm:hover:bg-hov2 p-[.5%] rounded-full w-fit h-fit' 
                                      onClick={()=>handlePrevSearchChange(v[0])}
                                      >
                                      <svg
                                      viewBox="0 0 1024 1024"
                                      fill="currentColor"
                                      height="1em"
                                      width="1em"
                                      >
                                      <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" />
                                      </svg>
                                      </button>
                                      </div>
                                    )
                                    return
                                  })}
                                  </>:
                                  <>
                                  <li className='w-full flex flex-row items-center px-[2%] py-[1%]'>
                                        <label className='ml-[1%]' htmlFor="">what's in your mind</label>
                                  </li>
                                  </>}
                      
                      </div>}

                    </div>

                    <div className='flex flex-col items-center  overflow-y-scroll drop z-3 justify-start w-full'>
              
                         <label className='flex items-center justify-center mt-[2%] mb-[5%]'>ideas for you</label>

                         <SearchDrop handleLinkClick={handleLinkClick} prevSearch={prevSearch}/>


                    </div>
               

     </div>



     </>
     }


    </>
  )
}

export default Form