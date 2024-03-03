import React, { useEffect, useState } from 'react'
import { getPhoto } from '../../data/data'
import PhotoLoading from './PhotoLoading'
import PhotoInfo from './PhotoInfo'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Grid from '../grid/Grid'
import { NavLink } from 'react-router-dom'

function PhotoLayout({id}) {
  const [photo,setPhoto] = useState(null)
  useEffect(()=>{
    window.scrollTo({top:0})
    setPhoto(null)
    getPhoto(id)
    .then(res=>{
      setPhoto(res)
    })
  },[id])
  return (

    <>
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