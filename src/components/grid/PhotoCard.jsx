import React, { useState } from 'react'
import { NavLink,Navigate, useNavigate} from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { savePhoto ,checkPhotoSaved, removePhoto} from '../../data/data'
function PhotoCard({photo,handleDataChange,h}) {
  const [saved,setSaved] = useState(checkPhotoSaved(photo))
  const navigate = useNavigate()
  const userPhoto = photo.user.profile_image.medium
  const userName =  photo.user.username
  const navigateToPhotoPage = (id)=>{
        navigate(`/photo/${id}`)
  }
  return (
    <div  className='w-full p-[1%]'>
        <div className='relative min-h-[90%] rounded-2xl' style={{backgroundColor:photo.color}}>
        <div className=' absolute cursor-pointer text-white w-full h-full z-[3] bg-black sm:opacity-[0%] bg-opacity-[0%] transition-all duration-200
        sm:hover:bg-opacity-[50%] sm:hover:opacity-[100%]  p-[2%] rounded-2xl'>
            <div className=' relative flex flex-col h-full pb-[1%] justify-between '>
                <div className='flex flex-row justify-between z-[3] items-center'>
                    <LazyLoadImage
                     className='rounded-full w-[18%]'
                     src={userPhoto}/>
                    {!saved ? 
                    <button onClick={()=>{
                      savePhoto(photo)
                      setSaved(true)
                    }} className={`rounded-3xl cursor-pointer w-[30%] flex items-start justify-end self-end `}>
                            <svg
                              fill="#e60023"
                              viewBox="0 0 16 16"
                              height="2em"
                              width="2em"
                            >
                              <path d="M8 6.236l-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 01-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 01.596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z" />
                            </svg>
                    </button>
                    :
                    <button onClick={()=>{
                       removePhoto(photo)
                       setSaved(false)
                       if(handleDataChange){
                          handleDataChange(photo)
                       }
                    }} className={`  rounded-3xl cursor-pointer w-[30%] flex items-start justify-end self-end`}>
                                <svg
                                  fill="#e60023"
                                  viewBox="0 0 16 16"
                                  height="2em"
                                  width="2em"
                                >
                                <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 01-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
                                </svg>
                    </button>
                    }
                </div>
               
                <label className=' hidden md:block cursor-pointer z-[2]' htmlFor="">{userName}</label>

                 <button onClick={()=>{navigateToPhotoPage(photo.id)}} className='w-full h-full absolute z-[1]'>
                 </button>

            </div>
        </div>
        <LazyLoadImage
            className='rounded-2xl z-[2]'
            alt={photo.alt}
            height={photo.height}
            width={photo.width}
            src={photo.urls.small} 
            />
        </div>
    </div>
  )
}

export default PhotoCard