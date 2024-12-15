import './App.css';
import { useState } from 'react';
import Search from './components/Search';
import CurrentWeather from './components/CurrentWeather';


function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [description, setDescription] = useState(null);
  // const hardcodedWeather = {
  //   municipality: "Helsinki",
  //   temp: 15,
  //   condition: "Partly Cloudy"
  // };

  const handleSearch = async (muni) => {
    // console.log("Searching for:", muni);
    // if (muni.toLowerCase() === "helsinki"){
    //   setWeatherData(hardcodedWeather);
    // }
    // else {
    //   setWeatherData(null);
    // }
    let descriptionText = "";
    const geminiApiKey = process.env.REACT_APP_GEMINI_KEY;
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Tell me about the municipality of ${muni}.`
            }]
          }]
        }),
      });

      const data = await response.json();
      //console.log(data)
      descriptionText = data.candidates?.[0]?.content?.parts?.[0]?.text || "No description";
      setDescription(descriptionText)
      console.log(descriptionText)
    } catch (error) {
      console.error("Error fetching data: ", error);
    }


    const WEATHER_API_URL="https://api.openweathermap.org/data/2.5";
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    //const hardcodedMuni="Sottunga"
    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?q=${muni}&appid=${apiKey}&units=metric&lang=fi`);
    const forecastFetch = fetch(`${WEATHER_API_URL}/weather?q=${muni}&appid=${apiKey}&units=metric,jpdsjflsdjf`);
    //toggle option for units system
    //console.log(apiKey)

    Promise.all([currentWeatherFetch, forecastFetch])
    .then(async (response) => {
      const weatherResponse =await response[0].json();
      const forecastResponse = await response[1].json();
      setWeatherData({name: muni, details: descriptionText,...weatherResponse});
      setForecastData({name: muni, details: descriptionText, ...forecastResponse});
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