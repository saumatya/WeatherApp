import "../styles/current-weather.css"
import { useTranslation } from 'react-i18next';
const CurrentWeather = ({data}) => {
    const { t } = useTranslation();
    return (
        <div className="current-weather">
            <h1>{data.name}</h1>
            <h1>{data.details}</h1>
            <h2>{t('temperature')}: {data.main.temp} °C</h2>
            <h3>{t('feelsLike')}:{data.main.feels_like} °C</h3>
            <h3>{t('maximum')}:{data.main.temp_max} °C</h3>
            <h3>{t('minimum')}:{data.main.temp_min} °C</h3>
            <h3>{t('humidity')}:{data.main.humidity} %</h3>
            <h3>{t('pressure')}:{data.main.pressure} hPa</h3>

        </div>
    )
}
export default CurrentWeather;
