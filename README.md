# Breezly Weather App

Breezly is a simple and intuitive weather application designed to provide users with real-time weather updates and forecasts. Built using React, this app fetches weather data from the OpenWeatherMap API to display current weather conditions and hourly forecasts for any city worldwide.

## [Live Demo](https://breezly-two.vercel.app)

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Code Structure](#code-structure)
- [Dependencies](#dependencies)
- [Abstract](#abstract)

## Features

- **Real-time Weather Data**: Fetch and display current weather conditions including temperature, humidity, wind speed, and more.
- **Hourly Forecast**: View weather forecasts for the next few hours.
- **Search Functionality**: Easily search for weather information by city name.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-repo/breezly-weather.git
   cd breezly-weather
2.Install dependencies:
npm install

3.Create a .env file in the root directory and add your OpenWeatherMap API key:
VITE_APP_ID=your_openweathermap_api_key

4.Start the development server:
npm run dev

Usage

Enter the name of a city in the search bar and press Enter or click the search icon.
View the current weather conditions and hourly forecast for the searched city.

Environment Variables
To run this project, you will need to add the following environment variable to your .env file:

VITE_APP_ID: Your OpenWeatherMap API key, which you can obtain by signing up on the OpenWeatherMap website.

Code Structure

App.jsx: The main application component.
Weather.jsx: The weather component that handles data fetching and display.
weather.css: Styles for the weather component.
index.css: Global styles for the application.
assets/: Contains all the image assets used in the application.
Dependencies

React: A JavaScript library for building user interfaces.
Vite: A build tool that provides a faster and leaner development experience for modern web projects.
Abstract

Breezly is a lightweight weather application built with React, designed to deliver real-time weather updates and forecasts. By leveraging the OpenWeatherMap API, Breezly provides users with essential weather information such as temperature, humidity, wind speed, and more. The application features a clean and intuitive interface, allowing users to search for weather conditions in any city and view hourly forecasts. With its responsive design, Breezly ensures a seamless experience across various devices, making it a handy tool for anyone looking to stay informed about the weather.



