import React, { useState } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'



const Login = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState()

  const history = useHistory()

  const handleChange = (event) => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post('/api/login', formData)
 
      window.localStorage.setItem('token', response.data.token)
      history.push('/')
      location.reload()
    } catch (err) {
      setErrors('Unauthorised')
    }
  }

  return (



    <>
      <div className="wholePage-login">
        <div className="ui container placeholder segment loginForm">
          <div className="ui two column very relaxed stackable grid">
            <div className="column">
              <form onSubmit={handleSubmit} className="ui form">
                <div className="field">
                  <label>Username</label>
                  <div className="ui left icon input">
                    <input
                      className="input "
                      type="email"
                      placeholder="Email"
                      name="email"
                      onChange={handleChange}
                      value={formData.email}
                    />
                    < i className="user icon"></i>
                  </div>
                </div>
                <div className="field">
                  <label>Password</label>
                  <div className="ui left icon input">
                    <input
                      className="input"
                      type="password"
                      placeholder="Password"
                      name="password"
                      onChange={handleChange}
                      value={formData.password}
                    />
                    <i className="lock icon"></i>
                  </div>
                </div>
              
                <button type="submit" className="ui basic submit button">Login</button>
                <div className="field">
                  { errors && 
                <div className="subtitle is-6">Access Unauthorised. Please try re-entering your credentials.</div>
                  }
                </div>
                <div className="field">
                  {/* <button type="submit" className="button is-fullwidth">Login</button> */}
                </div>
              </form>
            </div>
            <div className="middle aligned column">
              <Link to='/register' className="ui big button">
                <i className="signup icon"></i>
        Register
              </Link>
            </div>
          </div>
          <div className="ui vertical divider">
    Or
          </div>

        </div>
        
      
      </div>
    </>

    
  )
}

export default Login
