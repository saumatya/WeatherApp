import './App.css';
import { useState } from 'react';
import Search from './components/Search';
import CurrentWeather from './components/CurrentWeather';
import { useTranslation } from 'react-i18next';


function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [description, setDescription] = useState(null);
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState("en")
  // const hardcodedWeather = {
  //   municipality: "Helsinki",
  //   temp: 15,
  //   condition: "Partly Cloudy"
  // };
  const userLanguage = localStorage.getItem('i18nextLng') || 'en'; // Default to 'en' if no value found

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
  };

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
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}unblock later`, {
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
      descriptionText = data.candidates?.[0]?.content?.parts?.[0]?.text || `${muni} ${t('noDescription')}`;
      setDescription(descriptionText)
      console.log(descriptionText)
    } catch (error) {
      console.error("Error fetching data: ", error);
    }


    const WEATHER_API_URL="https://api.openweathermap.org/data/2.5";
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    //const hardcodedMuni="Sottunga"
    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?q=${muni}&appid=${apiKey}&units=metric&lang=${userLanguage}`);
    const forecastFetch = fetch(`${WEATHER_API_URL}/weather?q=${muni}&appid=${apiKey}&units=metric&lang=${userLanguage},jpdsjflsdjf`);
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
  
  // const handleLanguageChange = (e) => {
  //   const selectedLanguage = e.target.value;
  //   setLanguage(selectedLanguage)
  // }
  return (
    <div className="App">
      <h1>{t('appTitle')}</h1>
      <div>
        <label htmlFor="language-selector">{t('languageSelectorLabel')}</label>
        <select
          id="language-selector"
          value={language}
          onChange={(e) => changeLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="sv">Svenska</option>
          <option value="fi">Suomi</option>
        </select>
      </div>
      <Search onSearch={handleSearch}/>
      {weatherData && <CurrentWeather data={weatherData}/>}
    </div>
  );
}

export default App;