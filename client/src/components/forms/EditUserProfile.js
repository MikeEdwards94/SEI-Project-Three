import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import { getTokenFromLocalStorage } from '../../helpers/auth'

import EditUserForm from './EditUserForm'

const EditUser = () => {

  const history = useHistory()
  const params = useParams()

  const { id, username } = params

  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    profilePic: '',
    password: '',
    passwordConfirmation: ''
  })

  const [errors, setErrors] = useState({
    email: '',
    fullName: '',
    password: '',
    username: '',
    passwordConfirmation: ''
  })
  console.log(errors, setErrors)

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`/api/profile/${id}`)
      setFormData(response.data)
    }
    getData()
  }, [])
  console.log('DATA>>>', formData)

  const handleImageUrl = url =>{
    setFormData({ ...formData, profilePic: url })
  }

  const handleChange = event => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    await axios.put(
      `/api/profile/${id}/${username}`,
      formData,
      {
        headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` }
      }
    )
    history.push(`/profile/${id}`)
    
  }
  
  return (
    <div>
      <EditUserForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formData={formData}
        handleImageUrl={handleImageUrl}
      />
    </div>
  )  
}

export default EditUser