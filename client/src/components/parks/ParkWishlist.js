import React , { useState } from 'react'
import axios from 'axios'
// import { userID } from '../../helpers/auth'

const parkWishlist = ({  park, userData }) => {



  if (!userData) return ''
  const [wishlist] =  useState({
    wishList: [...userData.wishList, park._id]
  })

  if (!wishlist) return ''
  const handleWishlist = async () =>{
    await axios.put(
      `/api/profile/${userData.id}`,
      wishlist
    )
  }
  return (
    <>
      <div className="ui labeled button" tabIndex="0">
        <button className="ui basic blue button" onClick={ handleWishlist} value="Added to your wishlist!"><i className="heart icon"></i>Add to wishlist</button>
      </div>
      
    </>
    
  )
}

export default parkWishlist
