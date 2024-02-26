import {Link, NavLink} from 'react-router-dom'
import React from 'react'
import Form from './Form'
function NavBar() {
  const logoSection = (<>
  <NavLink to={'/'} className='z-[10]'>
      <svg 
        height="24" width="24" viewBox="0 0 24 24" fill="#e60023"
          aria-hidden="true" aria-label="" role="img">
        <path d="M0 12a12 12 0 0 0 7.73 11.22 12 12 0 0 1 .03-3.57l1.4-5.94S8.8 13 8.8 11.94c0-1.66.96-2.9 2.16-2.9 1.02 0 1.51.77 1.51 1.68 0 1.03-.65 2.56-.99 3.98-.28 1.19.6 2.16 1.77 2.16 2.12 0 3.76-2.24 3.76-5.47 0-2.86-2.06-4.86-5-4.86a5.17 5.17 0 0 0-5.39 5.18c0 1.03.4 2.13.9 2.73q.12.17.08.34l-.34 1.36q-.06.31-.4.16c-1.49-.7-2.42-2.88-2.42-4.63 0-3.77 2.74-7.23 7.9-7.23 4.14 0 7.36 2.95 7.36 6.9 0 4.12-2.6 7.43-6.2 7.43-1.21 0-2.35-.63-2.74-1.37l-.74 2.84a14 14 0 0 1-1.55 3.23A12 12 0 1 0 0 12"></path>
      </svg>
  </NavLink>
  <NavLink to={'/'} className=' sm:w-[10%] hover:bg-hov py-[.5%]  md:w-[8%] lg:w-[6%]  mx-[1%]  rounded-full text-center  text-black'>Home</NavLink>
  </>
  )
  const savedIconSection = (<>
           <NavLink to={'/saved'} className='w-[5%]  flex items-center justify-center mx-[1%] rounded-full text-center py-[.9%] text-white'>
                <svg
                  fill="#e60023"
                  viewBox="0 0 16 16"
                  height="2em"
                  width="2em"
                >
                <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 01-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
               </svg>
           </NavLink>
  </>)
  return (<>
    <nav className=' hidden sm:block sticky top-0 z-[10] bg-white'>
         <Form logoSection={logoSection} savedIconSection={savedIconSection}></Form>
    </nav>
    <nav className='sm:hidden fixed bottom-0 w-full flex justify-evenly bg-secondary py-[1%] flex-row'>
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
        <button className=' w-[20%] flex items-center justify-center'>
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
    </>
  )
}

export default NavBar
