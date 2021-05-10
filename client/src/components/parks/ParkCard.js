import React from 'react'
import { Link } from 'react-router-dom'


const ParkCard = ({ _id, name, image }) => {
  return (

    <div className="column">
      <Link to={`/parks/${_id}`}>
        <div className="ui fluid raised link card eq-card">
          <div className="content content-height">
            <h5 className='juliusFontCenter'>{name}</h5>
          </div>
          <div className="image image-index-container">
            <img className="cardImage" src={image[0]} alt={`${name}`} height="100%" />
          </div>
        </div>
      </Link>
    </div>

  )
}

export default ParkCard
