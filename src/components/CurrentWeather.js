const CurrentWeather = ({data}) => {
    return (
        <div className="current-weather">
            <h1>{data.municipality}</h1>
            <h2>Temperature: {data.temp}</h2>
            <h3>{data.condition}</h3>
        </div>
    )
}
export default CurrentWeather;