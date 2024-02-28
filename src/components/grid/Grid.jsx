import React, { useEffect, useState } from 'react'
import {useSearchParams} from 'react-router-dom'
import {fetchData} from '../../data/data'
import {useInView} from 'react-intersection-observer'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import 'react-lazy-load-image-component/src/effects/blur.css';

let page = 0

function Grid() {
  const [searchparams,setSearchParams] = useSearchParams()
  const [fetching,setFetching] = useState(false)
  const [data,setData] = useState([])
  const { ref, inView, entry } = useInView({
    threshold: 0,
  })

  const query = searchparams.get('query') || ''
  
  useEffect(()=>{
    if(inView&&!fetching){
      page+=1
      console.log('fetching')
      let newData = []
      setFetching(true)
      fetchData(query,page).then(res=>{
        newData = res
        setData(p=>[...p,...newData])
        setFetching(false)
    })
    }
  },[inView])

  // useEffect(()=>{
  //   page=0
  //   setFetching(true)
  //   setData([])
  //   fetchData(query,page).then(res=>{
  //     let newData = res
  //     setData(p=>[...newData])
  //     setFetching(false)
  //   })
  //   page+=1 
  // },[query])

  return (
    <>
      { true ? 
        <div className=' mt-[2%] sm:mt-[0%] flex flex-wrap gap-x-[1%] gap-y-[1rem]'>
            {data.map((v,i)=>{
                    return(
                        <div key={v.id} style={{backgroundColor:v.color}} className=' bg-cover w-[49%] overflow-hidden pb-[100%] relative bg-center'>
                                  <LazyLoadImage
                                    className='absolute max-[200rem] h-full'
                                    alt={v.alt}
                                    src={v.urls.small} 
                                     />
                        </div>
                    )
            })}

        <div className='w-full flex items-center z-[1] col-span-5 mb-[15%] sm:mb-[5%] mt-[5%] justify-center relative ' >
                <span ref={ref} className='bg-gray-600 p-[2%] sm:p-[.8%]  animate-spin rounded-full'>
                <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" version="1.0" enableBackground="new 0 0 64 64">
                <g>
                    <path stroke="null" id="svg_4" d="m44.47308,30.52692c-3.05355,0 -5.52692,-2.47337 -5.52692,-5.52692c0,-3.05355 2.47337,-5.52692 5.52692,-5.52692c3.05355,0 5.52692,2.47337 5.52692,5.52692c0,3.05355 -2.47337,5.52692 -5.52692,5.52692z" opacity="undefined" fill="#ffffff"/>
                    <path stroke="null" id="svg_6" d="m25,50c-3.05355,0 -5.52692,-2.47338 -5.52692,-5.52692c0,-3.05355 2.47337,-5.52692 5.52692,-5.52692c3.05354,0 5.52692,2.47337 5.52692,5.52692c0,3.05354 -2.47338,5.52692 -5.52692,5.52692z" opacity="undefined" fill="#ffffff"/>
                    <ellipse stroke="null" ry="2.76422" rx="2.76422" id="svg_11" cy="17.23578" cx="10" fill="#ffffff"/>
                    <ellipse stroke="null" ry="2.76422" rx="2.76422" id="svg_14" cy="2.76422" cx="10" fill="#ffffff"/>
                    <ellipse stroke="null" ry="2.76422" rx="2.76422" id="svg_15" cy="10" cx="17.23578" fill="#ffffff"/>
                    <ellipse stroke="null" ry="2.76422" rx="2.76422" id="svg_16" cy="10" cx="2.76422" fill="#ffffff"/>
                </g>
                </svg>
                </span>
        </div>
        </div>
        : <div> no results found </div>
      }
    </>
  )
}

export default Grid
