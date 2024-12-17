import { Line } from "react-chartjs-2";
import { Chart } from "chart.js";
import "chartjs-adapter-date-fns";
import "../styles/hourly.css";
import { useTranslation } from "react-i18next";
import {
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const HourlyWeatherGraph = ({ hourlyData }) => {
    const { t, i18n } = useTranslation();

  const limitedHourlyData = hourlyData.slice(0, 12);


  const tempData = {
    labels: limitedHourlyData.map((hour) => hour.time),
    datasets: [
      {
        label: `${t("temperature")} °C`,
        data: limitedHourlyData.map((hour) => hour.temp),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        tension: 0.3,
      },
    ],
  };


  const humidityData = {
    labels: limitedHourlyData.map((hour) => hour.time),
    datasets: [
      {
        label: `${t("humidity")} %`,
        data: limitedHourlyData.map((hour) => hour.humi),
        borderColor: "rgba(255,159,64,1)",
        backgroundColor: "rgba(255,159,64,0.2)",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "hour",
          stepSize: 3,
        },
        ticks: {
          autoSkip: false,
          callback: function (value, index, ticks) {
            const date = new Date(value);
            const hours = date.getHours();
      
            return hours % 3 === 0
              ? date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
              : "";
          },
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="chart-container">
      <div className="temperature-chart">
        <h3>{t("temperature")} (°C)</h3>
        <Line data={tempData} options={options} />
      </div>
      <div className="humidity-chart">
        <h3>{t("humidity")} (%)</h3>
        <Line data={humidityData} options={options} />
      </div>
    </div>
  );
};

export default HourlyWeatherGraph;
