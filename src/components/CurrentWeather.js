import "../styles/current-weather.css"
const CurrentWeather = ({data}) => {
    return (
        <div className="current-weather">
            <h1>{data.name}</h1>
            <h1>{data.details}</h1>
            <h2>Temperature: {data.main.temp} °C</h2>
            <h3>Feels like:{data.main.feels_like} °C</h3>
            <h3>Maximum:{data.main.temp_max} °C</h3>
            <h3>Minimum:{data.main.temp_min} °C</h3>
            <h3>Humidity:{data.main.humidity} %</h3>
            <h3>Pressure:{data.main.pressure} hPa</h3>

        </div>
    )
}
export default CurrentWeather;
