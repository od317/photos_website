import React from 'react'
import { NavLink } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
function PhotoCard({photo}) {
  return (
    <div style={{height:`100%`}} className='w-full p-[1%]'>
        <div className='relative min-h-[90%] rounded-2xl' style={{backgroundColor:photo.color}}>
        <NavLink to={`/photo/${photo.id}`} className=' absolute cursor-pointer text-white w-full h-full z-[3] bg-black opacity-[0%] bg-opacity-[0%] transition-all duration-200
        hover:bg-opacity-[50%] hover:opacity-[100%] flex flex-col p-[2%] rounded-2xl'>
            <div className='flex flex-row justify-between items-center'>
                <label htmlFor="">{'name'}</label>
                <button className='bg-theme rounded-3xl w-[30%] self-end py-[4%] px-[5%]'>save</button>
            </div>
            <label  htmlFor="">{'s'}</label>
        </NavLink>
        <LazyLoadImage
            className='rounded-2xl z-[2]'
            alt={photo.alt}
            src={photo.urls.small} 
            />
        </div>
    </div>
  )
}

export default PhotoCard