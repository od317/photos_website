import React, { useEffect, useState } from 'react'
import { getPhoto } from '../../data/data'
import PhotoLoading from './PhotoLoading'
import { LazyLoadImage } from 'react-lazy-load-image-component'

function PhotoLayout({id}) {
  const [photo,setPhoto] = useState(null)
  useEffect(()=>{
    getPhoto(id)
    .then(res=>{
      setPhoto(res)
    })
  },[])
  return (

    <>
    { photo ? 
    <div className='flex flex-row w-full sm:px-[12%] sm:pt-[1%]'>
         <div className=' w-full bg-blue-500 flex flex-row rounded-[2.5rem] sm:shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]'>
              <LazyLoadImage className='sm:w-[50%] w-full sm:rounded-l-[2.5rem]' src={photo.urls.regular} />
         </div>
    </div>:
    <PhotoLoading/>
    }
    </>
  )
}

export default PhotoLayout