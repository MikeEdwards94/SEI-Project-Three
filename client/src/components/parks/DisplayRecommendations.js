import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { userIsOwner } from '../../helpers/auth'


const DisplayRecommendations = ({ parkName, activity, text, image, _id, owner, createdAt }) => {
  const params = useParams()

  const date = new Date(createdAt)
  const formattedTime = date.toUTCString()

 
  if (!userIsOwner) return ''
  return (
    <div className="box card-box">
      <div className="content">
        <div className="reccAddAvatar">
          <a className="ui avatar circular image">
            <img src={owner.profilePic} />
          </a>
          <p className="author">{owner.username}</p>
        </div>
        <div className="metadata">
          <span className="date">Added on {formattedTime}</span>
        </div>
      </div>
      <h4>Activity: {activity}</h4>
      <h4>Recommendation: {text}</h4>
      <img src={image} alt={parkName} width="400vw" height="260vh"/>
      { userIsOwner(owner._id) && 
      <div className="buttons">
        <Link to={`/parks/${params.id}/recommendations/${_id}`}> <i className="edit icon"/>Edit</Link>
      </div>
      }
    </div>
  )
}
export default DisplayRecommendations