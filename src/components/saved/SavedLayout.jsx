import React, { useEffect, useState } from 'react'
import { getSavedPhotos } from '../../data/data'
import Grid from '../grid/Grid'
import Masonry from '../grid/Masonry'

function SavedLayout() {

  const [data,setData] = useState(getSavedPhotos())

  const handleDataChange = (photo)=>{
        setData(data.filter((v,i)=>{
                return v.id !== photo.id
        }))
  }

  useEffect(()=>{
       window.scrollTo({top:0})
  },[])
  return (
    <>
    { data.length > 0 ? 
    <>
    <div className='flex items-center justify-center text-[150%] font-semibold'>Saved Photos</div>
    <div className='px-[2%] sm:px-[0%]'>
      <Masonry handleDataChange={handleDataChange} data={data} />
    </div>
    </>
    :
    <div className='flex flex-row items-center justify-center w-full font-semibold text-[120%]'>no saved photos</div>
    }
    </>
  )
}

export default SavedLayout