import React from 'react'
import { NavLink,Navigate, useNavigate} from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
function PhotoCard({photo}) {
  const navigate = useNavigate()
  const userPhoto = photo.user.profile_image.small 
  const userName =  photo.user.username
  const navigateToPhotoPage = (id)=>{
        navigate(`/photo/${id}`)
  }
  return (
    <div style={{height:`100%`}} className='w-full p-[1%]'>
        <div className='relative min-h-[90%] rounded-2xl' style={{backgroundColor:photo.color}}>
        <div className=' absolute cursor-pointer text-white w-full h-full z-[3] bg-black sm:opacity-[0%] bg-opacity-[0%] transition-all duration-200
        sm:hover:bg-opacity-[50%] sm:hover:opacity-[100%]  p-[2%] rounded-2xl'>
            <div className=' relative flex flex-col h-full pb-[1%] justify-between '>
                <div className='flex flex-row justify-between z-[3] items-center'>
                    <LazyLoadImage
                     className='rounded-full'
                     src={userPhoto}/>
                    <button onClick={()=>{
                      console.log('save')
                    }} className='bg-theme rounded-3xl cursor-pointer w-[30%]  self-end py-[4%] px-[5%]'>save</button>
                </div>
               
                <label className=' hidden md:block cursor-pointer z-[2]' htmlFor="">{userName}</label>

                 <button onClick={()=>{navigateToPhotoPage(photo.id)}} className='w-full h-full absolute z-[1]'>
                 </button>

            </div>
        </div>
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