import React, { useEffect, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { calculateHeight } from '../../data/buildMasonry'

function Masonry({data}) {
  const [w,setW] = useState(window.innerWidth)
  let [height,arr] = calculateHeight(data)
  useEffect(()=>{
       const wChange = ()=>{
        setW(window.innerWidth)
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
                        <div key={v.id} style={{backgroundColor:v.color,transform:`translateX(${arr[i][0]*100}%) translateY(${arr[i][1]}px)`}} className=' bg-cover  absolute w-[49%] sm:w-[33%] transition-all duration-75 md:w-[25%] lg:w-[20%] overflow-hidden bg-center'>
                                  <LazyLoadImage
                                    alt={v.alt}
                                    src={v.urls.small} 
                                     />
                        </div>
                    )
            })}
    </div>
  )
}



export default Masonry