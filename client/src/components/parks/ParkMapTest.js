import React from 'react'
import ReactMapboxGl from 'react-mapbox-gl'
import DrawControl from 'react-mapbox-gl-draw'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'


const ParkMapTest = ({ longitude , latitude }) => {



  const newLat = parseFloat(latitude)
  const newLon = parseFloat(longitude)

  const Map = ReactMapboxGl({
    accessToken:
  'pk.eyJ1IjoibWVkd2FyZHM5NCIsImEiOiJja21uOXgzaGswZmF0Mm9wZWk1cjVtOXZrIn0.5l4LxypsZSbHsRgvnDT74A'

  })

  const onDrawCreate = ({ features }) => {
    console.log(features)
  }

  const onDrawUpdate = ({ features }) => {
    console.log(features)
  }

  return (
    <div className="map-container"> 
      <h3 className="juliusFontCenter">Use the buttons to plot your route</h3>
      <Map
        style="mapbox://styles/mapbox/outdoors-v11"
        containerStyle={{
          height: '400px',
          width: '400px'
        }}
        center={{
          lng: newLon,
          lat: newLat
        }}
      >
        <DrawControl onDrawCreate={onDrawCreate} onDrawUpdate={onDrawUpdate} />
      </Map>
    </div>
  )
}




export default ParkMapTest