import { Accordion, AccordionItemHeading, AccordionItemPanel, AccordionItem, AccordionItemButton } from "react-accessible-accordion";
import "../styles/forecast.css"
import { useTranslation } from 'react-i18next';


const Forecast = ({ data , unit}) => {
    console.log("FORECAST Data received:", data);
    const { t } = useTranslation();
    const WEEK_DAYS = [
        t('WEEK_DAYS.monday'),
        t('WEEK_DAYS.tuesday'),
        t('WEEK_DAYS.wednesday'),
        t('WEEK_DAYS.thursday'),
        t('WEEK_DAYS.friday'),
        t('WEEK_DAYS.saturday'),
        t('WEEK_DAYS.sunday')
    ];
  const dayInWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInWeek).concat(WEEK_DAYS.slice(0, dayInWeek));

  const renderTemperature = (min, max) => `${Math.round(min)}${unit === "metric" ? "°C" : unit === "imperial" ? "°F" : "K"}/ ${Math.round(max)} ${unit === "metric" ? "°C" : unit === "imperial" ? "°F" : "K"}`;

  return (
    <>
    <div className="forecast-container">
      <label className="title">{t('upcomingDays')}</label>
      <Accordion allowZeroExpanded>
        {data.list.slice(0, 7).map((item, idx) => {
          const { weather, main, clouds, wind } = item;
          const { icon, description } = weather[0];
          const { temp_min, temp_max, feels_like, pressure, humidity, sea_level } = main;

          return (
            <AccordionItem key={idx}>
              <AccordionItemHeading>
                <AccordionItemButton>
                  <div className="daily-item" title={t('clickDetails')}>
                    <img alt={`${description} icon`} className="icon-small" src={`icons/${icon}.png`} />
                    <label className="day">{forecastDays[idx]}</label>
                    <label className="description">{description}</label>
                    <label className="min-max">{renderTemperature(temp_min, temp_max)}</label>
                  </div>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <div className="daily-details-grid">
                  <div className="daily-details-grid-item">
                    <label>{t('pressure')}</label>
                    <label>{pressure} hPa</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>{t('humidity')}</label>
                    <label>{humidity} %</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>{t('clouds')}</label>
                    <label>{clouds.all} %</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>{t('wind')}</label>
                    <label>{wind.speed} {unit === "metric" ? "m/s" : unit === "imperial" ? "mph" : "Knots"}</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>{t('seaLevel')}</label>
                    <label>{sea_level} m</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>{t('feelsLike')}</label>
                    <label>{Math.round(feels_like)} {unit === "metric" ? "°C" : unit === "imperial" ? "°F" : "K"}</label>
                  </div>
                </div>
              </AccordionItemPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
      </div>
    </>
  );
}

export default Forecast;
