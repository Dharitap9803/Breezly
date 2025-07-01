import './Weather.css'
import searchicon from  '../assets/search.png'
import clearicon from  '../assets/clear.jpg'
import  cloudyicon from  '../assets/cloudy.jpg'
import drizzleicon from  '../assets/drizzle.jpg'
import humidityicon from  '../assets/humidity.png'
import rainyicon from  '../assets/rainy.jpg'
import snowicon from  '../assets/snow.jpg'
import windyicon from  '../assets/windy.png'
import pressureicon from '../assets/pressure.jpg'
import React, { useState, useEffect } from 'react'
import feelsLike from '../assets/feelsLike.jpg'
import minTemp from '../assets/minTemp.jpg'
import maxTemp from '../assets/maxTemp.jpg'
import clouds from '../assets/clouds.jpg'
import visibility from '../assets/visibility.png'
import rain from '../assets/rain.jpg'
import sunrise from '../assets/sunrise.jpg'
import sunset from '../assets/sunset.jpg'

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const allIcons = {
    "01d" : clearicon,
    "01n" : clearicon,
    "02d" : cloudyicon,
    "02n" : cloudyicon,
    "03d" : cloudyicon,
    "03n" : cloudyicon,
    "04d" : drizzleicon,
    "04n" : drizzleicon,
    "09d" : rainyicon,
    "09n" : rainyicon,
    "10d" : rainyicon,
    "10n" : rainyicon,
    "13d" : snowicon,
    "13n" : snowicon,
  }

  const search = async (city) => {
    if (!city) {
      alert("Enter City Name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.cod !== 200) {
        setWeatherData(null);
        alert(data.message || "City not found");
        return;
      }
      const icon = allIcons[data.weather[0].icon] || clearicon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
        feelsLike: Math.floor(data.main.feels_like),
        pressure: data.main.pressure,
        minTemp: data.main.temp_min,
        maxTemp: data.main.temp_max,
        clouds: data.clouds.all,
        visibility: data.visibility,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        rain: data.rain ? data.rain['1h'] : 0,
        snow: data.snow ? data.snow['1h'] : 0,
      });
    } catch (error) {
     setWeatherData(false);
     console.error("Error fetching weather data", error);
    }
  }
//   useEffect(() => {
//     search("Ahmedabad");
//   }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      search(inputValue);
    }
  };

  let sunriseTime = '';
  if (weatherData && weatherData.sunrise) {
    sunriseTime = new Date(weatherData.sunrise * 1000).toLocaleTimeString();
  }

  let sunsetTime = '';
  if (weatherData && weatherData.sunset) {
    sunsetTime = new Date(weatherData.sunset * 1000).toLocaleTimeString();
  }

  return (
    <div className='weather'>
      <div className="search-bar">
        <input
          type="text"
          placeholder='Search'
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <img src={searchicon} alt="" onClick={() => search(inputValue)} />
      </div>
      {weatherData && (
        <>
          <img src={weatherData.icon} alt="" className='weather-icon' />
          <p className='temperature'>{weatherData.temperature}°C</p>
          <p className='location'>{weatherData.location}</p>
          <div className="weather-data">
            <div className="row">
            <div className="col">
              <img src={humidityicon} alt="" />
              <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={windyicon} alt="" />
              <div>
                <p>{weatherData.windSpeed} Km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
              <div className="col">
              <img src={maxTemp} alt="" />
              <div>
                <p>{weatherData.maxTemp} °C</p>
                <span>Max Temperarture</span>
              </div>
            </div>
         </div>
         <div className="row">
            <div className="col">
                <img src={feelsLike} alt="" />
            <div>
                <p>{weatherData.feelsLike} °C</p>
                <span>Feels Like</span>
               </div>
            </div>
            <div className="col">
                <img src={pressureicon} alt="" />
                <div> 
                    <p>{weatherData.pressure} hPa </p>
                    <span> Pressure </span>
                </div>
            </div>
            <br>
            </br>
              <div className="col">
                <img src={minTemp} alt="" />
                <div> 
                    <p>{weatherData.minTemp}°C </p>
                    <span> Min Temperature </span>
                </div>
            </div>
          </div>
          <div className= "row">
            <div className="col">
                <img src={rain} alt="" />
                <div>
                    <p>{weatherData.rain}mm/h</p>
                    <span>Rain</span>
               </div>
            </div>
             <div className="col">
                <img src={sunrise} alt="" />
                <div>
                    <p>{sunriseTime}am</p>
                    <span>Sunrise</span>
               </div>
            </div>
            <div className="col">
                <img src={sunset} alt=""/>
                <div>
                    <p>{sunsetTime}pm</p>
                    <span>Sunset</span>
                </div>
            </div>

          </div>
        </div>
        </>
      )}
    </div>
  )
}

export default Weather