/* eslint-disable indent */
import React from 'react'

const WeekWeather = ({ weather }) => {

  console.log('weekly forecast no map', weather.daily)




  
   return (

<div className="weatherContainer">

      <div className="day"> 

        { weather.daily.map((item, i)=>(
          <div className="weather-day" key={i}>
          <div className="ui raised segment">
          <>
            <div className="ui grid celled center aligned">
              <div className="sixteen wide column">
                <div className="ui three column divided grid middle aligned">
                  <div className="column">
                    <p>{ new Date(item.dt * 1000).toLocaleDateString() }</p>
                    <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt={item.weather[0].description}/>
                  </div>
                  <div className="column">
                    <p>Day:  { Math.round((item.temp.day - 273.15) * 10) / 10 } &deg;C,<br/> Feels like: { Math.round((item.feels_like.day - 273.15) * 10) / 10 } &deg;C  </p>
                    <p>Evening: { Math.round((item.temp.eve - 273.15) * 10) / 10 } &deg;C,<br/> Feels like: { Math.round((item.feels_like.eve - 273.15) * 10) / 10 } &deg;C  </p>                  
                  </div>
                  <div className="column">
                    <p>Weather: {item.weather[0].description}</p>
                    <p>Max: { Math.round((item.temp.max - 273.15) * 10) / 10 } &deg;C <br/>Min: { Math.round((item.temp.min - 273.15) * 10) / 10 } &deg;C  </p>
                  </div>
                </div>
              </div>
              <div className="eight wide column middle aligned">
                <p>Humidity: { item.humidity}%</p>
              </div>
              <div className="eight wide column middle aligned">
                <p> Sunrise { new Date(item.sunrise * 1000).toLocaleTimeString() }</p>
                <p> Sunset { new Date(item.sunset * 1000).toLocaleTimeString() }</p>
              </div>
            </div>
    
    
    
    
            {/* <p> Temperature: {Math.round((weather.current.temp - 273.15) * 10) / 10} &deg;C  </p>
            <p>Humidity: {weather.current.humidity} % </p>
            <p> Weather: {weather.current.weather[0].main} </p>
            <p> Weather description: {weather.current.weather[0].description} </p>
            <img src={`http://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`} alt={weather.current.weather[0].description}/>
            <p> Sunrise { new Date(weather.current.sunrise * 1000).toLocaleTimeString() }</p>
            <p> Sunset { new Date(weather.current.sunset * 1000).toLocaleTimeString() }</p> */}
          </>
        </div>
        </div>
        ))} 

      </div>

  
</div>




  )
}

export default WeekWeather
