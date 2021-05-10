import React, { useState } from 'react'
import axios from 'axios'
import { useParams, useHistory } from 'react-router-dom'
import { getTokenFromLocalStorage } from '../../helpers/auth'
import CommentsForm from './CommentsForm'

const AddParkCommentForm = () => {
  // const token = getTokenFromLocalStorage
  const params = useParams()
  const history = useHistory()

 

  const [formData, setFormData] = useState({
    text: '',
    rating: ''
  })

  const handleChange = event => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    
    await axios.post(
      `/api/parks/${params.id}/comments`,
      formData,
      {
        headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` }
      }
    )
    console.log(params.id)
    history.push('/')
    history.push(`/parks/${params.id}`)
  }

  return (
    <>
      <CommentsForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formData={formData}
      />
      <br/>
      <br/>
      <br/>
    </>
  )
}

export default AddParkCommentForm
