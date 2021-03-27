import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import { getTokenFromLocalStorage } from '../../helpers/auth'
import CommentsForm from './CommentsForm'


const EditComment = () => {
  const history = useHistory()
  const params = useParams()
  const { id, commentId } = params

  const [formData, setFormData] = useState({
    text: '',
    rating: ''
  })

  const handleDelete = async () => {
    await axios.delete(`/api/parks/${id}/comments/${commentId}`, {
      headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage()}`
      }
    })
    history.push(`/parks/${params.id}`)
  }


  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`/api/parks/${id}/comments/${commentId}`)
      setFormData(response.data)
    }
    getData()
  }, [])

  const handleChange = event => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    
    setFormData(newFormData)
    console.log(event.target)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    await axios.put(
      `/api/parks/${id}/comments/${commentId}`,
      formData,
      {
        headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` }
      }
    )
    history.push(`/api/parks/${id}`)
  }

  if (!formData) return ''
  console.log('FORM DATA>>>>>>>', formData)

  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <CommentsForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            formData={formData}
          />
          <hr/>
          <br/>
          <div className="buttons">
            <button onClick={handleDelete} className="button is-danger">Delete</button>
          </div>

         
        </div>
      </div>
    </section>
  )
}

export default EditComment