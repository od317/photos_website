import React, { useEffect, useState } from 'react'
import { calculateHeight, getVals } from '../../data/buildMasonry'
import PhotoCard from './PhotoCard'

function Masonry({data}) {
  const [w,setW] = useState(window.innerWidth)
  let [per,setPer] = useState(20)
  let [height,arr] = calculateHeight(data)
  useEffect(()=>{
       const wChange = ()=>{
        setW(window.innerWidth)
        setPer(getVals(window.innerWidth))
    }
       window.addEventListener('resize',wChange)
       return()=>{
        window.removeEventListener('resize',wChange)
       }
  },[w])
  return (
    <div style={{height:`${height}px`}} className=' overflow-hidden  relative'>
                  {data.map((v,i)=>{
                    return(
                        // ,height:`${(v.height*((((w*96/100)*per/100)/v.width)*100))/100}px`
                        <div key={v.id} style={{height:`${((v.height*((((w*96/100)*per/100)/v.width)*100))/100)}px`,transform:`translateX(${arr[i][0]*100}%) translateY(${arr[i][1]}px)`}} 
                        className=' absolute transition-all duration-75 w-[50%] sm:w-[33%] md:w-[25%] lg:w-[20%]  bg-center'>
                                <PhotoCard photo={v}></PhotoCard>
                        </div>
                    )
            })}
    </div>
  )
}



export default Masonry