import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

function SearchDrop({prevSearch,handleLinkClick}) {
    const data = prevSearch.filter((v,i)=>v[0].length>0).slice(-6)
    return (
    <div className='p-[2%] flex flex-col w-full'>

            <label className='w-full text-[100%]' htmlFor="">ideas for you</label>
     
                 <div className=' grid-cols-2 grid md:grid-cols-3 gap-x-[1%] gap-y-[2%] w-full'>
                      {data.map((v,i)=>{
                            return(<button onClick={()=>handleLinkClick(v[0])} className='w-[100%] cursor-pointer group flex flex-row mt-[5%]  items-center' key={v+" "+i}>
                                    <div className=' w-full md:w-[40%] cursor-pointer bg-hov group-hover:bg-hov2 bg-cover bg-center relative pb-[42%] rounded-l-xl rounded-r-xl md:rounded-r-[0]'>
                                        <img className=' absolute  h-full rounded-l-xl' src={v[1]} alt="" />
                                    </div>
                                    <label className='p-[2%] hidden cursor-pointer bg-hov group-hover:bg-hov2 w-[60%] rounded-r-xl h-full md:flex items-center' htmlFor="">{v[0]}</label>
                            </button>)
                      })}
                 </div>


    </div>
  )
}

export default SearchDrop