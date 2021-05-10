import React, { useState } from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'
// import ReactMapboxGl from 'react-mapbox-gl'
// import DrawControl from 'react-mapbox-gl-draw'
// import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'


const ParkMap = ({ longitude , latitude, name }) => {


  const [viewport, setViewport] = useState({
    latitude: latitude,
    longitude: longitude,
    zoom: 10
  })
  console.log(latitude, longitude)

  const permaLat = latitude
  const permaLong = longitude
  console.log(viewport.zoom)


  // function App() {
  //   const onDrawCreate = ({ features }) => {
  //     console.log(features);
  //   }
  
  //   const onDrawUpdate = ({ features }) => {
  //     console.log(features);
  //   }




  return (
    <div className="map-container"> 
    
      <h3 className="juliusFontCenter">Explore { name }</h3>
      {viewport ?
        <ReactMapGL
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          height='400px'
          width='400px'
          mapStyle='mapbox://styles/mapbox/outdoors-v11'
          {...viewport}
          onViewportChange={(viewport) => setViewport(viewport)}
        >
          {viewport.zoom < 7 &&
          <Marker key={location.id} longitude={permaLong} latitude={permaLat}>
            📍{name}
          </Marker>
          }
        </ReactMapGL>
        :
        <h1>Loading your location...</h1>
      }
    </div>
    
  )
}

export default ParkMap