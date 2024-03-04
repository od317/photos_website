import React, { useEffect, useState } from 'react'
import { getPhoto } from '../../data/data'
import PhotoLoading from './PhotoLoading'
import PhotoInfo from './PhotoInfo'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Grid from '../grid/Grid'
import { NavLink, useNavigate } from 'react-router-dom'

function PhotoLayout({id}) {
  const [photo,setPhoto] = useState(null)
  const navigate = useNavigate()
  useEffect(()=>{
    window.scrollTo({top:0})
    setPhoto(null)
    getPhoto(id)
    .then(res=>{
      if(res.errors){
        navigate('/notFound')
        return
      }
      setPhoto(res)
    })
  },[id])
  return (
    <>
    <button
     onClick={()=>{
      navigate(-1)
     }}
     className=' hidden sm:block p-[1%] rounded-full shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-main mt-[1%] fixed z-20'>
    <svg
      viewBox="0 0 512 512"
      fill="currentColor"
      height="1em"
      width="1em"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="square"
        strokeMiterlimit={10}
        strokeWidth={48}
        d="M328 112L184 256l144 144"
      />
    </svg>
    </button>
    { photo ?<> 
    <div className='flex flex-row overflow-x-hidden w-full sm:px-[6%] md:px-[12%] pb-[5%] sm:pt-[1%]'>
         <div className=' w-full bg-main flex sm:flex-row flex-col rounded-[2.5rem] sm:shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]'>
              <div
              style={{backgroundColor:photo.color}} 
              className='sm:w-[50%]  w-full sm:rounded-l-[2.5rem]'
              >
              <LazyLoadImage 
              width={photo.width}
              height={photo.height}
              style={{backgorundColor:photo.color}} 
              className='w-full sm:rounded-l-[2.5rem]' 
              src={photo.urls.regular} />
              </div>
              <PhotoInfo photo={photo}/>
         </div>
    </div>
    <Grid query2={photo.tags[0].title}/>
    </>:
    <PhotoLoading/>
    }
    </>
  )
}

export default PhotoLayout