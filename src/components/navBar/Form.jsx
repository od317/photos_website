import React, { useState,useRef ,useEffect} from 'react'
import {useSearchParams,NavLink,useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import { editCookie } from '../../data/data'

function Form({logoSection,savedIconSection}) {
  const [searchparams,setSearchparams] = useSearchParams()
  const [query,setQuery] = useState(searchparams.get('query')||'')
  const [show,setShow] = useState(false)
  const [prevSearch,setPreavSearch] = useState(Cookies.get('prevSearch') ? Cookies.get('prevSearch').split(',') :[])
  const navigate = useNavigate()
  const dropDownref = useRef(null)
  const inputRef = useRef(null)

  const handleSubmit = (e)=>{
      e.preventDefault()
      if(inputRef.current)
      inputRef.current.blur()
      setShow(false)
      navigate(`/search?query=${query}`)
      let ps = editCookie(query)
      if(ps.length>0)
      setPreavSearch(ps)
  }

  const handleLinkClick = (v)=>{
        if(inputRef.current)
        inputRef.current.blur()
        setShow(false)
        setQuery(v)
        navigate(`/search?query=${v}`)
  }

  useEffect(()=>{
      const handleClickOutSideDropDown = (event)=>{
            if(dropDownref.current&&!dropDownref.current.contains(event.target)){
              setShow(false)
            }
      }
      document.addEventListener("mousedown", handleClickOutSideDropDown);
      return () => {
        document.removeEventListener("mousedown", handleClickOutSideDropDown);
      }
  },[])

  return (<>
    <div className=' relative'>
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
                <div className='flex flex-row items-center justify-center w-full absolute z-[10]'> 
                  <ul className='flex flex-col bg-main rounded-b-xl space-y-[.2%] z-[2]  py-[1%] w-[90%]'>
                           {  prevSearch.length>0 ? 
                              <>
                               {prevSearch.map((v,i)=>{
                                if(v.length)
                                return(
                                  <button onClick={()=>handleLinkClick(v)} key={v} className='w-full flex flex-row hover:bg-hov items-center px-[2%] py-[1%]'>
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
                                  <label className='ml-[1%]' htmlFor="">{v}</label>
                                  </button>
                                )
                                return
                               })}
                              </>:
                              <>
                              <li className='w-full flex flex-row hover:bg-hov items-center px-[2%] py-[1%]'>
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
                                    <label className='ml-[1%]' htmlFor="">item1</label>
                              </li>

                              <li className='w-full flex flex-row items-center '>
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
                                    <label className='ml-[1%]' htmlFor="">item1</label>
                              </li>

                              <li className='w-full flex flex-row items-center '>
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
                                    <label className='ml-[1%]' htmlFor="">item1</label>
                              </li>
                              </>}
                  </ul>
                </div>
                }
            </div>
            {savedIconSection}
        </div>
        {show && <div className='bg-black z-[1] flex flex-row justify-center bg-opacity-40 absolute h-[100vh] w-[100%]'>

                 </div>}
    </div>


    </>
  )
}

export default Form