import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import "../styles/search.css";
import config from "../config";
const Search = ({ onSearch, setErrorMessage }) => {

  const [muni, setMuni] = useState("");
  const [dropdownMuni, setDropdownMuni] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [municipalities, setMunicipalities] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchMunicipalities = async () => {
      try {
        const userLanguage = localStorage.getItem("i18nextLng") || "en";
        const response = await fetch(
          `${config.municipalityURL}&lang=${userLanguage}`
        );
        const data = await response.json();
        console.log(data);
        const municipalitiesList = data.map((item) => ({
          name: item.classificationItemNames[0].name,
          code: item.code,
        }));

        setMunicipalities(municipalitiesList);
      } catch (error) {
        console.error("Error fetching municipalities:", error);
      }
    };
    console.log(municipalities[0]);
    console.log();
    fetchMunicipalities();
  }, [localStorage.getItem("i18nextLng")]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    const regex = /^[\p{L}\s]*$/u;
    if (regex.test(value)) {
      setMuni(value);
      if (value.trim()) {
        const filtered = municipalities.filter((municipality) =>
          municipality.name.toLowerCase().startsWith(value.trim().toLowerCase())
        );
        setDropdownMuni(filtered);
        setHighlightedIndex(-1);
      } else {
        setDropdownMuni([]);
      }
    } else {
      setErrorMessage(t("inputError"));
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setHighlightedIndex((prevIndex) =>
        prevIndex < dropdownMuni.length - 1 ? prevIndex + 1 : prevIndex
      );
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
      e.preventDefault();
    } else if (e.key === "Enter") {
      if (highlightedIndex >= 0) {
        handleSuggestionClick(dropdownMuni[highlightedIndex]);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (muni.trim()) {
      onSearch(muni);
      setMuni("");
      setDropdownMuni([]);
      setHighlightedIndex(-1);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setMuni(suggestion.name);
    setDropdownMuni([]);
    setHighlightedIndex(-1);
    onSearch(suggestion.name);
    console.log(`Municipality: ${suggestion.name}, Code: ${suggestion.code}`);
    setMuni("");
    setDropdownMuni([]);
    setHighlightedIndex(-1);
  };
  const handleLocationClick = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
        try {
          const response = await fetch(
            `${config.currentWeatherUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
          );
          const data = await response.json();
          const city = data.name; 

          setMuni(city);
          onSearch(city);
        } catch (error) {
          console.error("Error fetching location:", error);
        }
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };


  return (
    <>
    <button
    type="button"
    onClick={handleLocationClick}
    className="location-button"
  >
       {t("yourLocation")}

  </button>
    <form onSubmit={handleSubmit} className="search-form">

      <div className="input-container">
        <input
          type="text"
          // placeholder="Enter municipality"
          placeholder={t("searchPlaceholder")}
          value={muni}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          required
        />


        {dropdownMuni.length > 0 && (
          <ul className="dropdown">
            {dropdownMuni.map((municipality, index) => (
              <li
                key={municipality.code}
                onClick={() => handleSuggestionClick(municipality)}
                className={highlightedIndex === index ? "highlighted" : ""}
                ref={(el) => {
                  if (highlightedIndex === index && el) {
                    el.scrollIntoView({
                      behavior: "smooth",
                      block: "nearest",
                    });
                  }
                }}
              >
                {municipality.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* <div className='search-button'> */}
      <button type="submit">{t("search")}</button>
      {/* </div> */}
    </form>
    </>
  );
};

export default Search;
