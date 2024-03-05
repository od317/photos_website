import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { popularData } from '../../data/data'

function SearchDrop({prevSearch,handleLinkClick}) {
    const data = prevSearch.filter((v,i)=>v[0].length>0).slice(-6)
    const popular = popularData
    return (
     <div className='p-[2%]  w-full overflow-y-scroll sm:max-h-[28rem] drop'>
        <div className='w-full'>
     
          { data.length> 0 && <> 
            <label className='w-full text-[100%]' htmlFor="">ideas for you</label>
            <div className=' grid-cols-2 grid md:grid-cols-3 mb-[4%] sm:mb-[2%] gap-x-[1%] gap-y-[2%] w-full'>
                {data.map((v,i)=>{
                      return(<button onClick={()=>handleLinkClick(v[0])} className='w-[100%] cursor-pointer group flex flex-row mt-[5%]  items-center' key={v+" "+i}>
                              <div className=' w-full overflow-hidden pb-[60%] sm:w-[40%] cursor-pointer bg-hov group-hover:bg-hov2 bg-cover bg-center relative sm:pb-[42%] rounded-l-xl rounded-r-xl md:rounded-r-[0]'>
                                  <LazyLoadImage
                                    className='absolute w-full min-h-full rounded-l-xl rounded-r-xl sm:rounded-r-[0]'
                                    alt={v[0]}
                                    src={v[1]} 
                                  />
                                  <label className='text-white absolute flex items-center bg-black bg-opacity-30 justify-center w-full h-full sm:hidden' htmlFor="">{v[0]}</label>
                              </div>
                              <label className='p-[2%] hidden cursor-pointer bg-hov group-hover:bg-hov2 w-[60%] rounded-r-xl h-full sm:flex items-center' htmlFor="">{v[0]}</label>
                      </button>)
                })}
            </div>
            </>}

            <label className='w-full text-[100%] text-center sm:pt-[5%] ' htmlFor="">Popular on Pinterest</label>

            <div className=' grid-cols-2 grid md:grid-cols-3 mb-[2%] gap-x-[1%] gap-y-[2%] sm:pb-[0%] pb-[20%] w-full'>
                      {popular.map((v,i)=>{
                            return(<button onClick={()=>handleLinkClick(v.name)} className='w-[100%] cursor-pointer group flex flex-row mt-[5%]  items-center' key={v.name+" "+i}>
                                    <div className=' w-full pb-[60%] overflow-hidden sm:w-[40%] cursor-pointer bg-hov group-hover:bg-hov2 bg-cover bg-center relative sm:pb-[42%] rounded-l-xl rounded-r-xl md:rounded-r-[0]'>
                                        <LazyLoadImage
                                          className='absolute w-full min-h-full rounded-l-xl rounded-r-xl sm:rounded-r-[0px]'
                                          alt={v.name}
                                          src={v.photo} 
                                        />
                                        <label className='text-white absolute flex items-center bg-black bg-opacity-30 justify-center w-full h-full sm:hidden' htmlFor="">{v.name}</label>
                                    </div>
                                    <label className='p-[2%] hidden cursor-pointer bg-hov group-hover:bg-hov2 w-[60%] rounded-r-xl h-full sm:flex items-center' htmlFor="">{v.name}</label>
                            </button>)
                      })}
                 </div>

        </div>
    </div>
  )
}

export default SearchDrop