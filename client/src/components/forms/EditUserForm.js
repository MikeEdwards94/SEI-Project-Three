import React from 'react'
import { ImageUploadField } from './ImageUploadField'

const EditUserForm = ({ handleChange, handleImageUrl, handleSubmit, formData }) => {

  return (



    <>
      <h1 className="register-form-header">Edit your Account</h1>
      <div className="ui container raised  segment registerFrom">
        <div className="register-component">
          <form onSubmit={handleSubmit} className="ui form">
            <div className="field">
              <label>Full Name</label>
              <input
                placeholder="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
            <div className="field">
              <label>Email</label>
              <input
                placeholder="email@example.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>        
            <div className="field">
              <label>Username</label>
              <input
                placeholder="Username (for display)"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="field">
              <label>Profile Picture</label>
              <ImageUploadField
                name="profilePic"
                value={formData.profilePic}
                handleImageUrl={handleImageUrl}
              />
            </div>
            <div className="field">
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="field">
              <label>Last Name</label>
              <input
                type="password"
                placeholder="Password Confirmation"
                name="passwordConfirmation"
                value={formData.passwordConfirmation}
                onChange={handleChange}
              />
            </div>
            <button className="ui basic button " type="submit">Submit</button>
          </form>
        </div>
      </div>



      

    </>
  )
}


export default EditUserForm