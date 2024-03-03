import React from 'react'
import PhotoLayout from '../components/photo/PhotoLayout'
import { useParams } from 'react-router-dom'
function Photo() {
  let {id} = useParams()
  return (
    <div>
        <PhotoLayout id={id}></PhotoLayout>
    </div>
  )
}

export default Photo