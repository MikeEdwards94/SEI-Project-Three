
import React from 'react'
import axios from 'axios'

const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
const uploadURL = process.env.REACT_APP_CLOUDINARY_URL

export const ImageUploadField = ({ handleImageUrl, value }) => {

  const handleUpload = async (event) =>{
    const data = new FormData()
    data.append('file', event.target.files[0])
    data.append('upload_preset', uploadPreset)
    console.log('data', data)
    const res = await axios.post(uploadURL, data)
    console.log('response',res)
    handleImageUrl(res.data.url)
  }
  

  console.log('VALUE>>>>>>>',value)
  return (
    <>
      {value ?
        <div>
          <img className="image-upload-image" src={value} alt="your upload"/>
        </div>  
        :
        <>
          <input
            className="input" 
            type="file"
            onChange={handleUpload}
          />
        </>
      }
    </>
  )
}


