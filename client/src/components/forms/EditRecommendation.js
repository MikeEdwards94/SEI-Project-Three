import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import { getTokenFromLocalStorage } from '../../helpers/auth'
import RecommendationForm from './RecommendationForm'


const EditRecommendation = () => {
  const history = useHistory()
  const params = useParams()

  const [formData, setFormData] = useState({
    parkName: '',
    activity: '',
    text: '',
    image: ''
  })

  const { id, recommendationId } = params

  const handleDelete = async () => {
    await axios.delete(`/api/parks/${id}/recommendations/${recommendationId}`, {
      headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage()}`
      }
    })
    history.push(`/parks/${params.id}`)
  }

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`/api/parks/${id}/recommendations/${recommendationId}`)
      setFormData(response.data)
    }
    getData()
  }, [])





  const handleChange = event => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    await axios.put(
      `/api/parks/${id}/recommendations/${recommendationId}`,
      formData,
      {
        headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` }
      }
    )
    history.push(`/parks/${params.id}`)
    
  }

  if (!formData) return ''


  return (
    
  
  
    <>
      <div className="ui container">
        <h1 className="header-recc-top">Edit your Recommendation</h1>
        <RecommendationForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          formData={formData}
        />
        <p className="header-recc">  <button onClick={handleDelete} className="ui basic red button"> <i className="trash alternate icon"/>Delete Your Reccomendation</button> </p>
        <div className="buttons">
          
        </div>
  

      </div>
    </>



  )
}

export default EditRecommendation