import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// import RegionSelect from '../regions/RegionSelect'
import ParkCard from './ParkCard'

const ParkIndex = () => {

  const params = useParams()

  const urlRegion = params.region

  const [parks, setParks] = useState([])

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/parks')
      setParks(data)
    }
    getData()
  }, [])
  


  const filteredArray = parks.filter(parks => {
   
    return parks.region.toString().split(' ').join('') === urlRegion
  })
 

  if (!parks) return ''
  return (
    <>
      
      <div className="section">
        <div className="margin-container">
          { parks &&
      <div className="ui three column relaxed grid">
        { filteredArray.map( park => (
          <ParkCard key={park._id} {...park}
          />
        ))}
      </div>
          }
        </div>
      </div>
    </>
  )
}

export default ParkIndex