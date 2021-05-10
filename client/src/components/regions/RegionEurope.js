import React from 'react'
import { useParams } from 'react-router-dom'
import ParkIndex from '../parks/ParkIndex'

const RegionEurope = () => {


  const params = useParams()



 



  return (
    <>
      <br/>
      <div>
        <h1 className="margin-container juliusFontLeft">
          {(params.region === 'NorthAmerica' || params.region === 'SouthAmerica')
            ?
            params.region.split('h').join('h ')
            :
            params.region
          }
        </h1>
      </div>
      <br/>
      <ParkIndex />
    </>
  )
}

export default RegionEurope 