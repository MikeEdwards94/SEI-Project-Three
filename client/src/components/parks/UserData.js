import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { userID } from '../../helpers/auth'
// import ParkWishlist from './ParkWishlist'
import ParkShow from './ParkShow'
// import ParkWishlist from './ParkWishlist'

const UserData = () => {

  const [userData, setUserData] = useState(null)
  // * pulling in the user data for adding info to wishlist
  useEffect(() =>{
    const getData = async () => {
      const { data } = await axios.get(`/api/profile/${userID()}`)
      setUserData(data)
    }
    getData()
  }, [])


  // console.log('userData of userData page', userData)
  // if (!userData) return ''

  
  return (
    <div>
      {/* <ParkWishlist
        userData = {userData}
      /> */}
      <ParkShow
        userData = {userData}
      />
      

      


      
    </div>
  )
}

export default UserData
