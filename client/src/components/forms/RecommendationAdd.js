import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import RecommendationForm from './RecommendationForm'
import { getTokenFromLocalStorage } from '../../helpers/auth'

const RecommendationAdd = () => {
  // *params will be needeed when we have the park pages up and running 
  const params = useParams()
  const [parkData, setParkData] = useState(null)
  console.log(parkData, setParkData)

  // *redirect once submit
  const history = useHistory()

  useEffect(() =>{
    const getData = async () => {
      const { data } = await axios.get(`/api/parks/${params.id}`)
      setParkData(data)
    }
    getData()
  }, [])
  
  

  // * setting the information for the request to state 
  const [formData, setFormData] = useState({
    // parkName: parkData.name,
    activity: '',
    text: '',
    image: ''
  })

 
  // * handling the change when imputting data 
  const handleChange = event =>{
    // console.log('EVENT>>', event.target.value)
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
    
  }

  // * handling the image upload 
  const handleImageUrl = url =>{
    setFormData({ ...formData, image: url })
  }

  // * handling the form submit 
  const handleSubmit = async event =>{
    console.log('Form data>>>>>>>>',formData)
    console.log('params.id', params.id)
    event.preventDefault()

    // * posting to the DB- need to link in the authentication and params
    await axios.post(
      `/api/parks/${params.id}/recommendations`,
      formData,
      {
        
        headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` }
      
      }
    )
    history.push(`/parks/${params.id}`)
  }
  
  // * this links to the form component page, could make this reusable 
  if (!FormData) return '' 
  return (
    <div>
      <RecommendationForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formData={formData}
        handleImageUrl={handleImageUrl}
      />
    </div>

    
  )
}

export default RecommendationAdd
