import './App.css';
import { useState } from 'react';
import Search from './components/Search';
import CurrentWeather from './components/CurrentWeather';


function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  // const hardcodedWeather = {
  //   municipality: "Helsinki",
  //   temp: 15,
  //   condition: "Partly Cloudy"
  // };

  const handleSearch = (muni) => {
    // console.log("Searching for:", muni);
    // if (muni.toLowerCase() === "helsinki"){
    //   setWeatherData(hardcodedWeather);
    // }
    // else {
    //   setWeatherData(null);
    // }
    const WEATHER_API_URL="https://api.openweathermap.org/data/2.5";
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    //const hardcodedMuni="Sottunga"
    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?q=${muni}&appid=${apiKey}&units=metric`);
    const forecastFetch = fetch(`${WEATHER_API_URL}/weather?q=${muni}&appid=${apiKey}&units=metric`);
    //toggle option for units system
    //console.log(apiKey)

    Promise.all([currentWeatherFetch, forecastFetch])
    .then(async (response) => {
      const weatherResponse =await response[0].json();
      const forecastResponse = await response[1].json();
      setWeatherData({name: muni, ...weatherResponse});
      setForecastData({name: muni, ...forecastResponse});
    })
    .catch ((err) => console.log(err));
  }
  
  console.log(weatherData);
  console.log(forecastData);
  
  return (
    <div className="App">
      <h1>Weather app</h1>
      <Search onSearch={handleSearch}/>
      {weatherData && <CurrentWeather data={weatherData}/>}
    </div>
  );
}

export default App;