import React from 'react'


const CommentsForm = ({ handleChange, handleSubmit, formData }) => {

  return (
    <div>


      
      
      <form onSubmit={handleSubmit} className="ui reply form">
       
        <div className="field " >
          <label className="label">Rating</label>
          <input
            placeholder="Rating out of 5"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label className="label">Comment</label>
          <textarea
            className="input"
            placeholder="Add your comment here.."
            name="text"
            value={formData.text}
            onChange={handleChange}
          />
        </div>
        <div className="ui blue basic labeled submit icon button" onClick={handleSubmit}>
          <i className="paper plane outline icon"></i> Submit
        </div>
      </form>
    </div>
  )
}

export default CommentsForm
