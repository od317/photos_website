import React, { useState,useRef ,useEffect} from 'react'
import {useSearchParams,NavLink,useNavigate} from 'react-router-dom'
function Form({logoSection,savedIconSection}) {
  const [searchparams,setSearchparams] = useSearchParams()
  const [query,setQuery] = useState(searchparams.get('query')||'')
  const [show,setShow] = useState(false)
  const navigate = useNavigate()
  const dropDownref = useRef(null)
  const inputRef = useRef(null)
 
  const handleSubmit = (e)=>{
      e.preventDefault()
      if(inputRef.current)
      inputRef.current.blur()
      setShow(false)
      navigate(`/search?query=${query}`)
  }

  useEffect(()=>{
      const handleClickOutSideDropDown = (event)=>{
            if(dropDownref.current&&!dropDownref.current.contains(event.target)){
              console.log('removed')
              setShow(false)
            }
      }
      document.addEventListener("mousedown", handleClickOutSideDropDown);
      return () => {
        document.removeEventListener("mousedown", handleClickOutSideDropDown);
      }
  })

  return (<>
    <div className=' relative'>
        <div className=' flex flex-row w-full items-center px-[2%] justify-evenly py-[1%] bg-white relative '>
            {logoSection}
            <div ref={dropDownref} className='  sm:w-[70%] lg:w-[80%] relative '>
                <form onSubmit={handleSubmit} className=' bg-gray-200 w-full flex flex-row  px-[2%] py-[1%] text-[110%] rounded-full' action="">
                    <input ref={inputRef} onFocus={()=>{
                      setShow(true)
                      }} 
                      value={query} onChange={(e)=>{
                      setQuery(e.target.value)
                      }} 
                      type="text" placeholder='search' className='text-gray w-full bg-transparent placeholder:text-gray-800' />
                    <button className='bg-gray-700' onClick={()=>{
                      setQuery('')
                    }} type='button'>x</button>          
                </form>
                {show &&
                <div className='flex flex-row items-center justify-center w-full absolute'> 
                  <ul className='flex flex-col z-[2] bg-red-500 p-[1%] w-[90%]'>
                              <li className='w-full bg-'>item1</li>
                              <li className='w-full bg-'>item1</li>
                              <li className='w-full bg-'>item1</li>
                              <li className='w-full bg-'>item1</li>
                              <li className='w-full bg-'>item1</li>
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