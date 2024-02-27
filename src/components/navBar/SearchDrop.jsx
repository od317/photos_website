import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

function SearchDrop({prevSearch,handleLinkClick}) {
    const data = prevSearch.filter((v,i)=>v[0].length>0)
    return (
    <div className='p-[2%] flex flex-col w-full'>

            <label className='w-full text-[100%]' htmlFor="">ideas for you</label>
     
                 <div className=' grid-cols-2 grid md:grid-cols-3 gap-x-[1%] gap-y-[2%] w-full'>
                      {data.map((v,i)=>{
                            return(<button onClick={()=>handleLinkClick(v[0])} className='w-[100%] cursor-pointer group flex flex-row mt-[5%]  items-center' key={v+" "+i}>
                                    <div style={{backgroundImage:`url(${v[1]})`}} className='w-[40%] cursor-pointer bg-hov group-hover:bg-hov2 bg-cover bg-center relative pb-[40%] rounded-l-xl'>
                                    </div>
                                    <label className='p-[2%] cursor-pointer bg-hov group-hover:bg-hov2 w-[60%] rounded-r-xl h-full flex items-center' htmlFor="">{v[0]}</label>
                            </button>)
                      })}
                 </div>


    </div>
  )
}

export default SearchDrop