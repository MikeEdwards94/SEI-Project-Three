import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { ImageUploadField } from '../components/forms/ImageUploadField'

const Register = () => {


  const [confirmMessage, setConfirmMessage] = useState('')

  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    profilePic: '',
    email: '',
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

  const handleImageUrl = url =>{
    setFormData({ ...formData, profilePic: url })
  }
  const history = useHistory()

  const handleChange = (event) => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    console.log(event.target.value)
    setFormData(newFormData)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post('/api/register', formData)
      window.localStorage.setItem('token', response.data.token)
      setTimeout(() => {
        history.push('/login')
      }, 3000)
      
    } catch (err) {
      console.log(err.response)
      setErrors(err.response.data.errors)
    }
  }

  const handleRegisterConfirmation = (event) => {
    const confirm = event.target.value
    setConfirmMessage(confirm)
  }

  return (

    <>

      <h1 className="register-form-header">Register for an Account</h1>
      <div className="ui container raised  segment registerFrom">
        <div className="register-component">
          <form onSubmit={handleSubmit} className="ui form">
            <div className="field">
              <label>Full Name</label>
              <input
                className={`input ${errors.fullName ? 'is-danger' : ''}`}
                placeholder="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
              { errors.fullName && <p className="help is-danger">{errors.fullName.message}</p> }
            </div>
            <div className="field">
              <label>Email</label>
              <input
                className={`input ${errors.email ? 'is-danger' : ''}`}
                type="email"
                placeholder="email@example.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              { errors.email && <p className="help is-danger">{errors.email.message}</p> }
            </div>
            <div className="field">
              <label>Username</label>
              <input
                className={`input ${errors.username ? 'is-danger' : ''}`}
                placeholder="Username (for display)"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
              { errors.username && <p className="help is-danger">{errors.username.message}</p> }
            </div>
            <div className="field">
              <label>Profile Image</label>
              <ImageUploadField
                name="profilePic"
                value={formData.profilePic}
                handleImageUrl={handleImageUrl}
              />          
            </div>
            <div className="field">
              <label>Password</label>
              <input
                className={`input ${errors.password ? 'is-danger' : ''}`}
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              { errors.password && <p className="help is-danger">{errors.password.message}</p> }
            </div>
            <div className="field">
              <label>Password Comfirmation</label>
              <input
                className={`input ${errors.passwordConfirmation ? 'is-danger' : ''}`}
                type="password"
                placeholder="Password Confirmation"
                name="passwordConfirmation"
                value={formData.passwordConfirmation}
                onChange={handleChange}
              />
              { errors.passwordConfirmation && <p className="help is-danger">{errors.passwordConfirmation.message}</p> }
            </div>
            <div className="field">
            </div>
            <button onClick={handleRegisterConfirmation} className="ui basic button" type="submit" value="Registration successful!"> <i className="paper plane outline icon"/>Submit</button><br/>
            <span className="registerConfirmBox"><p>{confirmMessage}</p></span>
          </form>
        </div>
      </div>


     
    </>
  )
  
}

export default Register
