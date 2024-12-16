import "./App.css";
import { useState, useEffect } from "react";
import Search from "./components/Search";
import CurrentWeather from "./components/CurrentWeather";
import WeekForecast from "./components/WeekForecast";
import HeartComponent from "./components/HeartComponent";
import { useTranslation } from "react-i18next";
import HeartButton from "./components/HeartComponent";
import HourlyWeatherGraph from "./components/HourlyGraph";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [description, setDescription] = useState(null);
  const [showHourly, setShowHourly] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [descriptionLoading, setDescriptionLoading] = useState(false);
  const { t, i18n } = useTranslation();
  const userLanguage = localStorage.getItem("i18nextLng") || "en";
  const [language, setLanguage] = useState(userLanguage);
  const [favoriteCities, setFavoriteCities] = useState([]);
  const [unit, setUnit] = useState("metric"); // default to "metric"

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
  };
  useEffect(() => {
    localStorage.setItem("i18nextLng", language);
    console.log("Language changed to: ", language);
    if (weatherData && weatherData.name) {
      handleSearch(weatherData.name);
    }

    // Load favorite cities from sessionStorage
    const storedFavorites =
      JSON.parse(sessionStorage.getItem("favoriteCities")) || [];
    setFavoriteCities(storedFavorites);

    // Fetch weather details for all favorite cities at startup
    if (storedFavorites.length > 0) {
      storedFavorites.forEach((city) => handleSearch(city));
    }
  }, [language, unit]);

  const handleSearch = async (muni) => {
    setDescription(null);

    let descriptionText = "";
    const geminiApiKey = process.env.REACT_APP_GEMINI_KEY;

    const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    //const hardcodedMuni="Sottunga"
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?q=${muni}&appid=${apiKey}&units=${unit}&lang=${language}`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?q=${muni}&appid=${apiKey}&units=${unit}&lang=${language}`
    );
    setShowButton(true);
    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        if (response[0].status === 200 && response[1].status === 200) {
          setShowButton(true); // Show the button if both requests are successful
        }
        
        const hourlyData = forecastResponse.list.map((item) => ({
          time: item.dt_txt,
          temp: item.main.temp,
          humi: item.main.humidity,
          weather: item.weather[0].description,
        }));

        setWeatherData({
          name: muni,
          details: descriptionText,
          ...weatherResponse,
        });
        setForecastData({
          name: muni,
          details: descriptionText,
          hourlyData: hourlyData,
          ...forecastResponse,
        });
      })
      .catch((err) => console.log(err));
  };

  console.log(weatherData);
  console.log(forecastData);

  console.log(`below ${userLanguage}`);

  const fetchDescription = async (muni) => {
    const geminiApiKey = process.env.REACT_APP_GEMINI_KEY;
    setDescriptionLoading(true);
    try {
      const promptText = t("descriptionPrompt", { muni });
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    // text: `Tell me about the location and area municipality of ${muni} in Finland`,
                    text: promptText,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.1,
              maxOutputTokens: 250,
              topP: 0.9,
              topK: 10,
              //stopSequences: ["area"],
            },
          }),
        }
      );
      const data = await response.json();
      let descriptionText =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        `${t("noDescription")}`;
      descriptionText = descriptionText.replace(/You.*/i, "").trim();
      //descriptionText = descriptionText.replace(/\*\*.*?\*\*/g, '');
      descriptionText = descriptionText.replace(/\*+/g, "");

      setDescription(descriptionText);
    } catch (error) {
      console.error("Error fetching description:", error);
      setDescription(t("errorLoadingDescription"));
    } finally {
      setDescriptionLoading(false);
    }
  };

  const handleDescriptionClick = () => {
    if (!description) {
      fetchDescription(weatherData.name); // Fetch description for the current municipality
    }
  };

  const handleFavoriteClick = (cityName) => {
    let updatedFavorites = [...favoriteCities];

    if (updatedFavorites.includes(cityName)) {
      updatedFavorites = updatedFavorites.filter((city) => city !== cityName); // Remove from favorites
    } else {
      updatedFavorites.push(cityName); // Add to favorites
    }

    setFavoriteCities(updatedFavorites);
    sessionStorage.setItem("favoriteCities", JSON.stringify(updatedFavorites)); // Save to sessionStorage
  };
  const isFavorited = weatherData
    ? favoriteCities.includes(weatherData.name)
    : false;

    const toggleHourlyForecast = () => {
      setShowHourly((prev) => !prev); // Toggles the state
    };

  return (
    <div className="App">
      <h1>{t("appTitle")}</h1>

      <div className="flex-container">
        <div className="language-selector">
          <label htmlFor="language-selector">
            {t("languageSelectorLabel")}
          </label>
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
        <Search onSearch={handleSearch} />
        <div className="unit-selector">
          <label htmlFor="unit-selector"></label>
          <select
            id="unit-selector"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          >
            <option value="metric">°C | m/s</option> {/* Celsius */}
            <option value="imperial">°F | mph</option> {/* Fahrenheit */}
            <option value="standard">K | Knots</option> {/* Kelvin */}
          </select>
        </div>
      </div>

      {/* {weatherData && (
        <CurrentWeather
          data={weatherData}
          description={description}
          fetchDescription={() => fetchDescription(weatherData.name)}
          isLoading={descriptionLoading}
        />
      )} */}

      {weatherData && (
        <div>
          <CurrentWeather
            data={weatherData}
            description={description}
            fetchDescription={() => fetchDescription(weatherData.name)}
            isLoading={descriptionLoading}
            unit={unit}
          />
          {/* <button onClick={() => handleFavoriteClick(weatherData.name)}>
            {favoriteCities.includes(weatherData.name) ? "Unfavorite" : "Favorite"}
          </button> */}

          {/* <div>
      <HeartButton
        isFavorited={isFavorited}
        onClick={() => handleFavoriteClick(weatherData.name)}
      />
    </div> */}

          <div className="centered">
            <div className="tooltip-container">
              <HeartButton
                isFavorited={isFavorited}
                onClick={() => handleFavoriteClick(weatherData.name)}
              />
              <span className="tooltip-text">{t("favorite")}</span>
            </div>
          </div>
        </div>
      )}
<div>
  {showButton && (
    <div>
  <button className="toggle-button" onClick={toggleHourlyForecast}>
  {showHourly ? t('hideHourly') : t('showHourly')}
  </button>

  {showHourly && forecastData?.hourlyData && (
    <HourlyWeatherGraph hourlyData={forecastData.hourlyData} />
  )}
</div>

  )}
</div>


      {forecastData && <WeekForecast data={forecastData} unit={unit} />}
    </div>
  );
}

export default App;
