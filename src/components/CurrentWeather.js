import "../styles/current-weather.css";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

const CurrentWeather = ({ data, description, fetchDescription, isLoading, unit  }) => {
    const [showDescription, setShowDescription] = useState(false);
  const userLanguage = localStorage.getItem("i18nextLng") || "en";
  const { t, i18n } = useTranslation();
  console.log(`inside current weather ${i18n.language}`);

  
  useEffect(() => {
    i18n.changeLanguage(i18n.language);
  }, [i18n.language]);


  console.log(`${i18n.language} CURRENT WEATHER ${data.name}`);
  return (

    <div className="container">
<div className="description-container">
  {isLoading ? (
    <p className="loading-text">{t("loading")}...</p>
  ) : (
    <button className="description-button" onClick={fetchDescription}>
      {t("viewDescription")}
    </button>
  )}
  <div className="description">
    {description && <p className="description-text">{description}</p>}
  </div>
</div>

        <div className="weather">
      <div className="top">
        <div>
          <p className="city">{data.name}</p>
          {/* <p className="weather-description">{data.details}</p> */}
          <p className="weather-description">{data.weather[0].description}</p>
        </div>
        <img
          alt="weather"
          className="weather-icon"
          src={`icons/${data.weather[0].icon}.png`}
        ></img>
      </div>
      <div className="bottom">
        <p className="temperature">{Math.round(data.main.temp)}{unit === "metric" ? "°C" : unit === "imperial" ? "°F" : "K"}</p>
        <div className="details">
          <div className="parameter-row">
            <span className="parameter-label">{t("temperature")}</span>
            <span className="parameter-value">
              {Math.round(data.main.temp)}{unit === "metric" ? "°C" : unit === "imperial" ? "°F" : "K"}
            </span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">{t("feelsLike")}</span>
            <span className="parameter-value">
              {Math.round(data.main.feels_like)}{unit === "metric" ? "°C" : unit === "imperial" ? "°F" : "K"}
            </span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">{t("maximum")}</span>
            <span className="parameter-value">
              {Math.round(data.main.temp_max)}{unit === "metric" ? "°C" : unit === "imperial" ? "°F" : "K"}
            </span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">{t("minimum")}</span>
            <span className="parameter-value">
              {Math.round(data.main.temp_min)}{unit === "metric" ? "°C" : unit === "imperial" ? "°F" : "K"}
            </span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">{t("humidity")}</span>
            <span className="parameter-value">{data.main.humidity}%</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">{t("pressure")}</span>
            <span className="parameter-value">{data.main.pressure} hPa</span>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};
export default CurrentWeather;
