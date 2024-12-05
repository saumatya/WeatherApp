import './App.css';
import { useState } from 'react';
import Search from './components/Search';
import CurrentWeather from './components/CurrentWeather';


function App() {
  const [weatherData, setWeatherData] = useState(null);
  const hardcodedWeather = {
    municipality: "Helsinki",
    temp: 15,
    condition: "Partly Cloudy"
  };

  const handleSearch = (city) => {
    console.log("Searching for:", city);
    if (city.toLowerCase() === "helsinki"){
      setWeatherData(hardcodedWeather);
    }
    else {
      setWeatherData(null);
    }
  }
  return (
    <div className="App">
      <h1>Weather app</h1>
      <Search onSearch={handleSearch}/>
      {weatherData && <CurrentWeather data={weatherData}/>}
    </div>
  );
}

export default App;