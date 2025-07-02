import './weather.css'
import searchicon from  '../assets/search.png'
import clearicon from  '../assets/clear.jpg'
import  cloudyicon from  '../assets/cloudy.jpg'
import drizzleicon from  '../assets/drizzle.jpg'
import humidityicon from  '../assets/humidity.png'
import rainyicon from  '../assets/rainy.jpg'
import snowicon from  '../assets/snow.jpg'
import windyicon from  '../assets/windy.png'
import pressureicon from '../assets/pressure.jpg'
import React, { useState } from 'react'
import feelsLike from '../assets/feelsLike.jpg'
import minTemp from '../assets/mintemp.jpg' //changed the file 
import maxTemp from '../assets/maxTemp.jpg'
import rain from '../assets/rain.jpg'
import sunrise from '../assets/sunrise.jpg'
import sunset from '../assets/sunset.jpg'
import thunderstorm from '../assets/thunderstorm.jpg'
// import logo from '../assets/logo.png';
// import Background from '../assets/back.jpg'

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
  "11d": thunderstorm, 
  "11n": thunderstorm,
  "13d" : snowicon,
  "13n" : snowicon,
};

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [hourlyData, setHourlyData] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const search = async (city) => {
    if (!city) {
      alert("Enter City Name");
      return;
    }
    try {
      // Get current weather for main card
      const urlCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const responseCurrent = await fetch(urlCurrent);
      const dataCurrent = await responseCurrent.json();
      if (dataCurrent.cod !== 200) {
        setWeatherData(null);
        setHourlyData([]);
        alert(dataCurrent.message || "City not found");
        return;
      }
      const icon = allIcons[dataCurrent.weather[0].icon] || clearicon;
      setWeatherData({
        humidity: dataCurrent.main.humidity,
        windSpeed: dataCurrent.wind.speed,
        temperature: Math.floor(dataCurrent.main.temp),
        location: dataCurrent.name,
        icon: icon,
        feelsLike: Math.floor(dataCurrent.main.feels_like),
        pressure: dataCurrent.main.pressure,
        minTemp: dataCurrent.main.temp_min,
        maxTemp: dataCurrent.main.temp_max,
        clouds: dataCurrent.clouds.all,
        visibility: dataCurrent.visibility,
        sunrise: dataCurrent.sys.sunrise,
        sunset: dataCurrent.sys.sunset,
        rain: dataCurrent.rain ? dataCurrent.rain['1h'] : 0,
        snow: dataCurrent.snow ? dataCurrent.snow['1h'] : 0,
      });

      // Get forecast for hourly data
      const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const responseForecast = await fetch(urlForecast);
      const dataForecast = await responseForecast.json();
      if (dataForecast.cod !== "200") {
        setHourlyData([]);
        return;
      }
      // Get next 7 forecast entries (each is 3 hours apart)
      setHourlyData(dataForecast.list.slice(0, 7));
    } catch (error) {
      setWeatherData(false);
      setHourlyData([]);
      console.error("Error fetching weather data", error);
    }
  };

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
        <div className="search-input-container">
          <input
            type="text"
            placeholder='Search'
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <div className="search-divider"></div>
          <img src={searchicon} alt="Search" onClick={() => search(inputValue)}
            tabIndex={0}
            role="button"
            style={{ cursor: 'pointer'}} />
        </div>
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
                  <span>Max Temperature</span>
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
                  <span>Pressure</span>
                </div>
              </div>
              <div className="col">
                <img src={minTemp} alt="" />
                <div>
                  <p>{weatherData.minTemp}°C </p>
                  <span>Min Temperature</span>
                </div>
              </div>
            </div>
            <div className="row">
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
                  <p>{sunriseTime}</p>
                  <span>Sunrise</span>
                </div>
              </div>
              <div className="col">
                <img src={sunset} alt=""/>
                <div>
                  <p>{sunsetTime}</p>
                  <span>Sunset</span>
                </div>
              </div>
            </div>
          </div>
     
          {hourlyData.length > 0 && (
            <div className="forecast-items-container" style={{marginTop: "24px"}}>
              {hourlyData.map((item, idx) => (
                <div className="forecast-item" key={idx}>
                  <h5 className="forecast-item-date regular-txt">
                    {new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </h5>
                  <img
                    src={allIcons[item.weather[0].icon] || clearicon}
                    className="forecast-item-img"
                    alt={item.weather[0].main}
                  />
                  <span className="forecast-temp">{Math.round(item.main.temp)}°C</span>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Weather