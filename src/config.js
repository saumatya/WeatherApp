const config = {
    forecastWeatherUrl: "http://api.openweathermap.org/data/2.5/forecast",
    currentWeatherUrl: "http://api.openweathermap.org/data/2.5/weather",
    descriptionFetchUrl: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
    municipalityURL: "https://data.stat.fi/api/classifications/v2/classifications/kunta_1_20240101/classificationItems?content=data&meta=max&format=json",
    units: "metric", 
    language: "en",
  };
  
  export default config;
  