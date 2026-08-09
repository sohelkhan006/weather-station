import "./DisplayInfo.css";
import { resolveWeatherTheme } from "../WeatherTheme.js";

const DisplayInfo = ({ info }) => {
  const theme = resolveWeatherTheme(info);
  const Icon = theme.Icon;

  return (
    <div className="weather-card">
      <div className="weather-card-eyebrow">
        <span>{info.City}</span>
        <span className="dot">•</span>
        <span>{theme.label}</span>
      </div>

      <div className="weather-hero">
        <Icon className="weather-hero-icon" sx={{ fontSize: 48 }} />
        <span className="weather-hero-temp">{Math.round(info.tempreture)}°</span>
      </div>

      <p className="weather-feels-like">Feels like {Math.round(info.feelLike)}°C</p>

      <div className="weather-stats">
        <div className="stat">
          <span className="stat-label">Min</span>
          <span className="stat-value">{Math.round(info.Tempmin)}°C</span>
        </div>
        <div className="stat">
          <span className="stat-label">Max</span>
          <span className="stat-value">{Math.round(info.Tempmax)}°C</span>
        </div>
        <div className="stat">
          <span className="stat-label">Humidity</span>
          <span className="stat-value">{info.Humidity}%</span>
        </div>
        <div className="stat">
          <span className="stat-label">Condition</span>
          <span className="stat-value">{info.Weather}</span>
        </div>
      </div>
    </div>
  );
};

export default DisplayInfo;