import React from 'react'
import { removeItem,formatCookies} from '../../data/data'
import Cookies from 'js-cookie'

function RecomendedSearch({handleLinkClick,prevSearch,handlePrevSearchChange}) {
  return (
    <div className='p-[1%] w-full'> 
    <ul className='flex flex-col w-full rounded-b-xl space-y-[.2%] z-[2]  py-[1%] '>
            {  prevSearch.length>1 ? 
                <>
                {prevSearch.map((v,i)=>{
                  if(v[0].length)
                  return(
                    <div key={v[0]} className='flex flex-row justify-between items-center pr-[2%] sm:hover:bg-hov rounded-2xl'>
                  
                      <button onClick={()=>handleLinkClick(v[0])}   className='w-[100%]  flex flex-row  items-center px-[2%] py-[1%]'>
                        <svg
                          fill="none"
                          className='cursor-pointer'
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
                        <label className='ml-[1%] cursor-pointer' htmlFor="">{v[0]}</label>
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
    </ul>
    </div>
  )
}

export default RecomendedSearch