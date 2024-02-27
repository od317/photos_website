import React from 'react'

function RecomendedSearch({handleLinkClick,prevSearch}) {
  return (
    <div className='p-[1%] w-full'> 
    <ul className='flex flex-col w-full rounded-b-xl space-y-[.2%] z-[2]  py-[1%] '>
            {  prevSearch.length>0 ? 
                <>
                {prevSearch.map((v,i)=>{
                  if(v.length)
                  return(
                    <button onClick={()=>handleLinkClick(v)} key={v}  className='w-[100%] hover:bg-hov flex flex-row  items-center px-[2%] py-[1%]'>
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
                      <label className='ml-[1%] cursor-pointer' htmlFor="">{v}</label>
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
    </ul>
    </div>
  )
}

export default RecomendedSearch