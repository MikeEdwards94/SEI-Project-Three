import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import Popup from 'reactjs-popup'


// import { getTokenFromLocalStorage } from '../helpers/auth'
const UserProfile = () => {
  const [userData, setUserData] = useState('')
  const [parksData, setParksData] = useState('')
  const params = useParams()
  const [wishlist, setUpdateWishlist] =  useState({
    wishList: []
  })
  const [confirm, setConfirm] = useState(null)

  
  useEffect(() => {
    const userInfo = async () => {
      const response = await axios.get(`/api/profile/${params.id}`)
      setUserData(response)
      const allParks = await axios.get('/api/parks/') 
      setParksData(allParks)
    }
    userInfo()
  }, [confirm])

  if (!userData || !parksData) return ''
  let arrayOfFilteredPark = []
  const { username, email, fullName, profilePic, wishList } = userData.data

  // * for Each lopp to make array of parks in wishlist
  wishList.forEach((wishlist, index)=>{
    const filteredParks = parksData.data.filter((item) =>{
      return item._id === wishList[index].toString()    
    }) 
    arrayOfFilteredPark = [...arrayOfFilteredPark, filteredParks]
  })
  

  // * function to remove the item from the wishlist 
  const removeFromWishlist = (event)=>{
    setConfirm('confirm')
    const filteredWishlistConst = wishList.filter(filter => {
      return filter !== event.target.value
    })
    const newWishList = { [event.target.name]: filteredWishlistConst }
    setUpdateWishlist(newWishList)
  }

  const handleConfirm = async () =>{
    setConfirm('')
    await axios.put(
      `/api/profile/${userData.data.id}`,
      wishlist
    )
  }

  const handleCancel = () =>{
    setConfirm('')
  }


  const PopupExample = () => (
    <Popup trigger={<button> Trigger</button>} position="right center">
      <div>Popup content here !!</div>
    </Popup>
  )
  PopupExample()

  return (
    <div className=" ui container">
      <div className="profile-page-container">
        <h1 className="profile-title">{`Welcome back ${username}!`}</h1>

        <div className="user-info-container">
          <div className="profile-image-container">
            <img src={profilePic} className="ui medium circular image ui medium bordered image"/>
          </div>
          
          <div className="text-container">
            <h2 className="user-info-title">Full Name: {fullName}</h2>
            <hr/>
            <h2 className="user-info-title">Username (for display): {username}</h2>
            <hr/>
            <h2 className="user-info-title">Email: {email}</h2>
            <div className="profile-edit-button">
              <Link to={ `/profile/${params.id}/${username} ` }>
                <button className="ui icon left labeled standard basic button"><i aria-hidden="true" className="edit icon"></i>Edit details</button>
              </Link>
            </div>
          </div>
        </div>

        <h2 className="user-info-title">SAVED PARKS</h2>
        <div className="wishlist-items">
          {wishList.length === 0 
            ?
            <h3 className="user-info-title">You have not saved any parks yet!</h3> 
            :
            <>
              { arrayOfFilteredPark.map((item, i) =>(
                <div className="parks-saved" key={i}>
                  <Link to={`/parks/${item[0]._id}`}>
                    <h3 className="user-info-title">{item[0].name}</h3>
                    <img className="wishlist-img" src={item[0].image[0]} alt={item[0].name} />
                  </Link>
                  {!confirm ?
                    <button className="ui red basic button remove-park" name="wishList" value={item[0]._id} onClick={removeFromWishlist} > Remove {item[0].name} from your wishlist</button>
                    :
                    <div className="park-buttons">
                      <button className="ui green basic left floated button"  value={item[0]._id} onClick={handleConfirm} > Confirm? </button>
                      <button className="ui red basic right floated button" value={item[0]._id} onClick={handleCancel} > Cancel </button>
                    </div>
                  }

                  {/* <Popup trigger={<button name="wishList" value={item[0]._id} onClick={removeFromWishlist} > Trigger</button>} position="right center">
                    <div>
                      <button value={item[0]._id} onClick={handleConfirm} > Confirm? </button>
                      <button value={item[0]._id} onClick={handleCancel} > Cancel </button>
                    </div>
                  </Popup> */}

                </div>
                
              ))}
            </>
          }
        </div>
      </div>
    </div>
  )
}
export default UserProfile

