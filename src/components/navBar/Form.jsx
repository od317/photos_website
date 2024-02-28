import React, { useState,useRef ,useEffect} from 'react'
import {useSearchParams,NavLink,useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import { checkDuplicate, editCookie,formatCookies,removeItem } from '../../data/data'
import RecomendedSearch from './RecomendedSearch'
import SearchDrop from './SearchDrop'

function Form({logoSection,savedIconSection}) {
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

      const handleClickOutSideSmall = (event)=>{
        if(sdropDownref.current&&!sdropDownref.current.contains(event.target)){
             setShowSmall(false)
             setShowSmallDrop(false)
        }
  }

      document.addEventListener("mousedown", handleClickOutSideDropDown)
      document.addEventListener("mousedown", handleClickOutSideSmall)

      return () => {
        document.removeEventListener("mousedown", handleClickOutSideDropDown)
        document.removeEventListener("mousedown", handleClickOutSideSmall)

      }
  },[])

  return (<>
  <div className=' hidden sm:block sticky top-0 z-[10] bg-white'>
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
                           <RecomendedSearch handleLinkClick={handleLinkClick} prevSearch={prevSearch}/>:
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
    <NavLink to={'/'} className=' w-[20%] flex items-center justify-center'>
      <svg fill="none" viewBox="0 0 24 24" height="2em" width="2em" >
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M21 8.772l-6.98-6.979a3 3 0 00-4.242 0L3 8.571v14.515h7v-6a2 2 0 114 0v6h7V8.772zm-9.808-5.565L5 9.4v11.686h3v-4a4 4 0 018 0v4h3V9.6l-6.393-6.394a1 1 0 00-1.415 0z"
          clipRule="evenodd"
        />
      </svg>
    </NavLink>
    <button onClick={()=>{ 
      setShowSmall(p=>!p)
      }} className=' w-[20%] sm:hidden flex items-center justify-center'>
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
    <button className='w-[20%]'>1</button>
    <button className='w-[20%]'>1</button>
    </nav>


     {showSmall&&<>
     <div ref={sdropDownref} className='sm:hidden fixed w-full pb-[50%] top-0 z-[10] bg-main flex flex-col'>
                 
                    <div className=' relative py-[1%]'>
                    <form onSubmit={handleSubmit} className='    w-full flex flex-row  px-[2%] py-[1%] text-[110%] rounded-full' action="">
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
                    
                    { showSmallDrop && <div className=' absolute h-screen z-4 bg-main w-full  '>
                                {  prevSearch.length>0 ? 
                                  <>
                                  {prevSearch.map((v,i)=>{
                                    if(v.length)
                                    return(
                                      <button onClick={()=>handleLinkClick(v)} key={v} className='w-full flex flex-row hover:bg-hov items-center px-[4%] py-[1%]'>
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

                    <div className='flex flex-col items-center z-3 justify-center w-full'>
              
                         <label className='flex items-center justify-center mt-[2%] mb-[5%]'>ideas for you</label>

                         <SearchDrop handleLinkClick={handleLinkClick} prevSearch={prevSearch}/>


                    </div>
               

     </div>

     <div className='bg-black z-[5] fixed top-0 flex flex-row justify-center bg-opacity-40  h-[100vh] w-[100%]'>

     </div>

     </>
     }


    </>
  )
}

export default Form