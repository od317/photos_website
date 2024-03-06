import React, { useContext, useEffect, useState } from 'react'
import {useSearchParams} from 'react-router-dom'
import {fetchData,editCookie} from '../../data/data'
import {useInView} from 'react-intersection-observer'
import { prevSearchContextHandler } from '../../contexts/PrevSearchContext'
import Masonry from './Masonry'

let page = 0


function Grid({query2,src}) {
  const [searchparams,setSearchParams] = useSearchParams()
  const [fetching,setFetching] = useState(false)
  const [data,setData] = useState([])
  const [noDataFound,setNoDataFound] = useState(false)
  const { ref, inView, entry } = useInView({
    threshold: 0,
  })
  const query = searchparams.get('query') || query2 || ''
  const prevSearchContextHandlerFun = useContext(prevSearchContextHandler)
  useEffect(()=>{
    const abortController = new AbortController()
    const signal = abortController.signal
    if(inView&&!fetching){
      setNoDataFound(false)
      page+=1
      let newData = []
      setFetching(true)
      fetchData(query,page,src,signal).then(res=>{
        newData = res
        if(data.length ===0&&res.length===0){
          setNoDataFound(true)
        }
        setData(p=>[...p,...newData])
        setFetching(false)
    })
    }
    return()=>{
      abortController.abort()
    }
  },[inView])

useEffect(()=>{
  const abortController = new AbortController()
  const signal = abortController.signal
  page=0
  setNoDataFound(false)
  setFetching(true)
  setData([])
  fetchData(query,page,src,signal).then(res=>{
    let newData = res
    setData(p=>[...newData])
    if(res.length===0){
      setNoDataFound(true)
    }
    else{
      if(query.length>0){
        prevSearchContextHandlerFun(editCookie(query,newData[0]))
      }
    }
    setFetching(false)
  })
  page+=1 
  return()=>{
    abortController.abort()
  }
},[query])

  return (
    <>
      { !noDataFound ? 
        <div className='px-[2%] sm:px-[0%]'>

        <Masonry data={data}></Masonry>

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
        : <div className='flex flex-row items-center justify-center w-full font-semibold text-[120%]'> no results found </div>
      }
    </>
  )
}

export default Grid
