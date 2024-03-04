import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { checkPhotoSaved,removePhoto,savePhoto,downloadImage} from '../../data/data'

function PhotoInfo({photo}) {
  const [saved,setSaved] = useState(checkPhotoSaved(photo))
  return (
       <>
            <div className='sm:w-[50%] p-[2%] h-full flex flex-col'>
                  
                  <div className='flex flex-row  justify-between'>
                  <button onClick={()=>{
                    downloadImage(photo.links.download)
                  }}>
                        <svg
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        height="2em"
                        width="2em"
                        >
                        <path
                          fillRule="evenodd"
                          d="M7.47 10.78a.75.75 0 001.06 0l3.75-3.75a.75.75 0 00-1.06-1.06L8.75 8.44V1.75a.75.75 0 00-1.5 0v6.69L4.78 5.97a.75.75 0 00-1.06 1.06l3.75 3.75zM3.75 13a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5z"
                        />
                        </svg>
                  </button>

                  {!saved ? 
                  <button onClick={()=>{
                    savePhoto(photo)
                    setSaved(true)
                   }} 
                   className='bg-theme rounded-3xl text-white cursor-pointer w-[20%]  self-end py-[3%] px-[2%]'>
                    save
                  </button>:
                  <button onClick={()=>{
                    removePhoto(photo)
                    setSaved(false)
                   }} 
                   className='bg-black rounded-3xl text-white cursor-pointer w-[20%]  self-end py-[3%] px-[2%]'>
                    saved
                  </button>
                  }
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