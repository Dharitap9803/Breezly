import './Weather.css'
import searchicon from  '../assets/search.png'
import clearicon from  '../assets/clear.jpg'
import  cloudyicon from  '../assets/cloudy.jpg'
import drizzleicon from  '../assets/drizzle.jpg'
import humidityicon from  '../assets/humidity.png'
import rainyicon from  '../assets/rainy.jpg'
import snowicon from  '../assets/snow.jpg'
import windyicon from  '../assets/windy.png'
import React, { useState, useEffect } from 'react'

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
        icon: icon
      });
    } catch (error) {
      setWeatherData(false);
      console.error("Error fetching weather data");
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
          </div>
        </>
      )}
    </div>
  )
}

export default Weather