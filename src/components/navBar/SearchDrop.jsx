import React from 'react'
import { fetchFormPhotos } from '../../data/data'

function SearchDrop({prevSearch}) {
    const data = prevSearch.slice(0,6)
    fetchFormPhotos(prevSearch)
    return (
    <div className='p-[2%] flex flex-col w-full'>

            <label className='w-full text-[100%]' htmlFor="">ideas for you</label>
     
                 <div className=' grid grid-cols-3 gap-x-[1%] gap-y-[2%] w-full'>
                      {data.map((v,i)=>{
                            return(<div className='w-[100%] flex flex-row mt-[5%]  items-center' key={v}>
                                    <div className='w-[40%] relative pb-[40%] rounded-l-xl bg-red-500'></div>
                                    <label className='p-[2%] bg-hov w-[60%] rounded-r-xl h-full flex items-center' htmlFor="">{v}</label>
                            </div>)
                      })}
                 </div>


    </div>
  )
}

export default SearchDrop