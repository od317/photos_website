import React from 'react'

function PhotoLoading() {
  return (
    <>
    <div className='flex flex-row w-full sm:px-[6%] md:px-[12%] pb-[5%] sm:pt-[1%]'>
      <div className=' w-full bg-main flex sm:flex-row flex-col rounded-[2.5rem] sm:shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]'>
          <div className='w-full pb-[50%]'>
          </div>
      </div>
    </div>

    <div className='w-full flex items-center z-[1] col-span-5 mb-[15%] sm:mb-[5%] mt-[5%] justify-center relative ' >
                <span  className='bg-gray-600 p-[2%] sm:p-[.8%]  animate-spin rounded-full'>
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

    </>
  )
}

export default PhotoLoading