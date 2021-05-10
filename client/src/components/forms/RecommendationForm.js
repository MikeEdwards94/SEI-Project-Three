import React, { useEffect, useState } from 'react'
import { ImageUploadField } from './ImageUploadField'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const recommendationForm = ({ handleChange, handleImageUrl, handleSubmit, formData }) => {

  const [parkData, setParkData] = useState(null)
  const params = useParams()
  

  useEffect(() =>{
    const getData = async () => {
      const { data } = await axios.get(`/api/parks/${params.id}`)
      setParkData(data)
    }
    getData()
  }, [])

  

  if (!parkData) return null
  console.log(formData)
  return (
    <>

      
      <div className="ui container raised  segment registerFrom">
        <form onSubmit={handleSubmit} className="ui form">
          <h2 className="label">{parkData.name}</h2>
          <div className="field">
            <label className="label"> Activity </label>
            <select onChange={handleChange} id="activity" name="activity">
              <option value="Choose">Choose an activity</option>
              <option value="Hiking">Hiking</option>
              <option value="Swimming">Swimming</option>
              <option value="climbing">Climbing/Mountaineering/Orienteering</option>
              <option value="Birdwatching">Birdwatching</option>
              <option value="Rafting">Rafting/Paddling/Canoeing</option>
              <option value="Snorkeling">Snorkeling</option>
              <option value="Camping">Camping</option>
              <option value="Food and Drink">Food and Drink</option>
            </select>
          </div>
          <div className="field">
            <label>Your Recommendation</label>
            {/* <textarea></textarea> */}
            <textarea
              className="input"
              placeholder="Add your reccomendation here ... "
              name="text"
              value={formData.text}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <label>Image</label>
            <ImageUploadField
              value={formData.image}
              name="image"
              handleImageUrl={handleImageUrl}
            />
          </div>
          <div className="field">
          </div>

          
          <p className="submit-recc"> <button className="ui blue button " type="submit">  <i className="paper plane outline icon"/> Submit</button></p>
        </form>
      </div>
    </>
  )
}

export default recommendationForm

// className="input"
// placeholder="Add your activity reccomendation here ... "
// name="activity"
// value={formData.activity}