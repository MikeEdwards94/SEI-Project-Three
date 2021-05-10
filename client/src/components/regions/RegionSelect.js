import React from 'react'
import {  useParams, Link } from 'react-router-dom'
import EuropeSlides from './EuropeSlides'
import Slider from './Slider'
import AfricaSlides from './AfricaSlides'
import AsiaSlides from './AsiaSlides'
import NorthAmericaSlides from './NorthAmericaSlides'
import OceaniaSlides from './OceaniaSlides'
import SouthAmericaSlides from './SouthAmericaSlides'


const RegionSelect = ({ region }) => {

 
  console.log(region)
  const params = useParams()
  console.log('params', params.region)


  return (
    <>
      <h1 className="regions-title">Regions</h1>
      <div className="region-slider-container">
        
        <div value='Europe' className="region-slider">
          <p className="single-region-title">EUROPE</p>
          <Link to='/regions/Europe'>
            
            <Slider slides={EuropeSlides}/>
          
          </Link>
        </div>
        
        <div value='Africa' className="region-slider">
          <p className="single-region-title">AFRICA</p>
          <Link to="/regions/Africa">
            
            {/* <h1>Africa</h1> */}
            <Slider slides={AfricaSlides}/>
            
          </Link>
        </div>
        
        <div  value='Asia' className="region-slider">
          <p className="single-region-title">ASIA</p>
          <Link to="/regions/Asia">
          
            {/* <h1>Asia</h1> */}
            <Slider slides={AsiaSlides}/>
          
          </Link>
        </div>

        <div  value='NorthAmerica' className="region-slider">
          <p className="single-region-title">NORTH AMERICA</p>
          <Link to="/regions/NorthAmerica">
          
            {/* <h1>North America</h1> */}
            <Slider slides={NorthAmericaSlides}/>
          
          </Link>
        </div>

        <div  value='Oceania' className="region-slider">
          <p className="single-region-title">OCEANIA</p>
          <Link to="/regions/Oceania">
          
            {/* <h1>Oceania</h1> */}
            <Slider slides={OceaniaSlides}/>
          
          </Link>
        </div>

        <div  value='SouthAmerica' className="region-slider">
          <p className="single-region-title">SOUTH AMERICA</p>
          <Link to="/regions/SouthAmerica">
          
            {/* <h1>South America</h1> */}
            <Slider slides={SouthAmericaSlides}/>
          
          </Link>
        </div>
        
      </div>
    </>
  )
}

export default RegionSelect
