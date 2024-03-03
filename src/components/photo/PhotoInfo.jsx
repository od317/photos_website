import React from 'react'
import { NavLink } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'

function PhotoInfo({photo}) {
  return (
       <>
            <div className='sm:w-[50%] p-[2%] h-full flex flex-col'>
                  
                  <div className='flex flex-row  justify-between'>
                       <button>^</button>
                       <button onClick={()=>{
                         console.log('save')
                        }} 
                        className='bg-theme rounded-3xl text-white cursor-pointer w-[20%]  self-end py-[3%] px-[2%]'>
                         save
                       </button>
                  </div>
               
                  <NavLink target={'_blank'} className={'border-b-[1px] border-b-black max-w-[40%] truncate whitespace-nowrap'} to={`${photo.links.html}`}>{photo.links.html}</NavLink>
                  
                    <div className='w-full mt-[5%] flex flex-row items-center '>
                        <LazyLoadImage src={photo.user.profile_image.medium} className='w-[10%] rounded-full'/>
                        <div className='flex flex-col  ml-[2%] justify-center' htmlFor="">
                             <label className=' font-semibold' htmlFor="">{photo.user.username}</label>
                             <label htmlFor="">{photo.user.total_photos} followers</label>
                        </div>
                    </div>

                    <label className='w-full flex justify-end items-center' htmlFor="">
                        {photo.likes}
                        <svg
                            fill="#e60023"
                            viewBox="0 0 16 16"
                            height="1em"
                            width="1em"
                            >
                            <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 01-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
                        </svg>
                    </label>

             </div>
       </>
    )
}

export default PhotoInfo