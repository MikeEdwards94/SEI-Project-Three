import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import DisplayRecommendations from '../parks/DisplayRecommendations'
import DisplayComments from '../parks/DisplayComments'
import { userIsAuthenticated } from '../../helpers/auth'
import ParkWeather from './ParkWeather'
import AddParkCommentForm from '../forms/AddParkCommentForm'
import ParkWishlist from './ParkWishlist'
import ParkMap from './ParkMap'
import ParkMapTest from './ParkMapTest'





const ParkShow = ( { userData } ) => {

 

  const [park, setPark] = useState(null)


  // const [userData, setUserData] = useState(null)
  const params = useParams()

  // *pulling in the parks data
  useEffect(() =>{
    const getData = async () => {
      const { data } = await axios.get(`/api/parks/${params.id}`)
      setPark(data)
    }
    
    getData()
  }, [])






  // console.log('USER DATA>>>>>>>',userData, setUserData)



  const [mapDisplay, setMapDisplay] = useState('general')

  const handleMap = (event) => {
    if ( event.target.value === 'general' ) setMapDisplay('general')
    if ( event.target.value === 'trail' ) setMapDisplay('trail')
  }

  const changeMapFunction = () =>{
    if (mapDisplay === 'trail'){
      return <ParkMapTest {...park}/>

    }
  }

  if (!park ) return ''


  const { name, image, region, description, facts, recommendations, comments, country, parkUrl } = park

  const lowerCaseCountry = country.toLowerCase()
 
  
  return (
    <>
      

      <br/>      
      <h1 className="juliusFontCenterBig">{name}</h1>
      <div className="margin-container">
        <img src={image[0]} alt={name} width="100%"/>
      </div>
      <br/>
      {/* {userIsAuthenticated &&
        <div className='centerButton'>
          <ParkWishlist 
            userData = {userData}
            park = {park}
          />
        </div>
      } */}
      { !userIsAuthenticated() && 
        <div className="centerLoginToAddWishlist">
          <Link to={'/login'}>
            <h4 className="margin-container">Log in to save to your wishlist!</h4>
          </Link> 
        </div>
      }

      

      <div className="ui raised very padded text segment margin-container">
        <h2 className="ui header">{name}</h2>
        <h3 className="ui header">{region} - {country} <i className={`${lowerCaseCountry} flag`}></i></h3>
        <p>{description}</p>
        <br/>
        <a href={`${parkUrl}`} target="_blank" rel="noreferrer">{parkUrl}</a>
      </div>
      <br/>
      <br/>







      <div className="ui raised very padded text segment margin-container">
        <div className="ui celled stackable grid">
          <div className="row">
            <div className="eight wide column">
              <h3 className="juliusFontLeft">{name} Facts</h3>
              {facts.map(fact=>{
                return <><li className="item" key={fact}> {fact} </li><br/></>
              })}          
            </div>
            <div className="eight wide column">
              <img src={image[2]} alt={name} width="100%" height="100%"/>
            </div>
          </div>
        </div>
      </div>
      <br/>
      <br/>


      <div className="ui raised very padded text segment margin-container">
        <div className="ui celled stackable grid">
          <div className="row">
            <div className="eight wide column middle aligned">
              <img src={image[1]} alt={name} width="100%" height="100%"/>
            </div>
            <div className="eight wide column middle aligned center aligned">
                
              <div className="ui buttons">
                <button className="ui button" value="general" onClick={handleMap}>General Map</button>
                <div className="or"></div>
                <button className="ui olive button" value="trail" onClick={handleMap}>Plot a Map</button>
              </div>
                
              {mapDisplay === 'general' ? 
                <ParkMap {...park}/>
                :
                changeMapFunction()
              }
                
                
            </div>
          </div>
        </div>
      </div>
      <br/>
      <br/>


      <div className="ui raised very padded text segment margin-container">
        <div className="ui celled stackable grid">
          <div className="row">
            <div className="ten wide column middle aligned">
              <ParkWeather key={park.id} {...park}/>
            </div>
            <div className="six wide column center aligned middle aligned">
              <img src={image[3]} alt={name} width="80%" height="80%"/>
            </div>
          </div>
        </div>
      </div>
      <br/>
      <br/>


      <div className="ui segment very padded raised margin-container">
        <h1 className="juliusFontLeft"> Recommendations</h1>
        <div className="box reccomendation-box">
          { recommendations.map(recommendation => (
            <>
              <DisplayRecommendations key={recommendation.id} {...recommendation}/>
            </>
          ))}
        </div>
      </div>
      <div className="navbar-item">
        { userIsAuthenticated() && 
        <div className="centerButton">
          <Link to={`/addRecommendation/${params.id}`}>
            <button className="ui blue basic icon left labeled button"><i aria-hidden="true" className="add icon"></i>
            Add a recommendation
            </button>
          </Link>
        </div>
        }
      </div>
      { !userIsAuthenticated() && 
          <Link to={'/login'}>
            <h4 className="margin-container">Want to add a recommendation? Log in first!</h4>
          </Link> 
      }
      <br/>
      <br/>
    
      <div className="ui segment padded raised margin-container">
        <div className="ui large comments">
          <h1 className="ui dividing header">Comments</h1>
          { comments.map(comment => (
            <DisplayComments key={comment._id} {...comment}/>
          ))}
          <br/>
          <br/>
          <br/>
          { userIsAuthenticated() && 

          <>
            <AddParkCommentForm/>
          </>
          }
        </div>
        { !userIsAuthenticated() && 
          <Link to={'/login'}>
            <h4>Want to add a comment? Log in first!</h4>
          </Link> 
        }
      </div>
      
    </>
  )
}

export default ParkShow