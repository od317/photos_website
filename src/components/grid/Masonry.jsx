import React, { useEffect, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { calculateHeight, getVals } from '../../data/buildMasonry'

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
                        <div key={v.id} style={{transform:`translateX(${arr[i][0]*100}%) translateY(${arr[i][1]}px)`}} 
                        className=' bg-cover p-[.5%] absolute transition-all duration-75 w-[50%] sm:w-[33%] md:w-[25%] lg:w-[20%] overflow-hidden bg-center'>
                                  <div className='h-full' style={{backgroundColor:v.color}}>
                                        <LazyLoadImage
                                            alt={v.alt}
                                            src={v.urls.small} 
                                            />
                                   </div>
                        </div>
                    )
            })}
    </div>
  )
}



export default Masonry