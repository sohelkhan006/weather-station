import React, { useState } from "react";
import SearchBox from "./SearchBox";
import DisplayInfo from "./DisplayInfo";
import { resolveWeatherTheme } from '../WeatherTheme.js';
import "./WeatherApp.css";

const WeatherApp = () => {
  const [WeatherInfo, setWeatherInfo] = useState({
    City: "Pune",
    Humidity: 53,
    Tempmax: 24.67,
    Tempmin: 23.66,
    Weather: "Clouds",
    feelLike: 24.58,
    tempreture: 24.67,
  });

  const updateInfo = (newInfo) => {
    setWeatherInfo(newInfo);
  };

  const theme = resolveWeatherTheme(WeatherInfo);

  return (
    <div
      className="weather-shell"
      data-weather={theme.key}
      style={{
        "--accent": theme.accent,
        "--glow": theme.glow,
        "--grad-from": theme.from,
        "--grad-via": theme.via,
        "--grad-to": theme.to,
      }}
    >
      <div className="weather-atmosphere" aria-hidden="true">
        <div className="atmosphere-layer atmosphere-glow" />
        <div className="atmosphere-layer atmosphere-rain" />
        <div className="atmosphere-layer atmosphere-snow" />
      </div>

      <div className="weather-content">
        <SearchBox updateInfo={updateInfo} />
        <DisplayInfo info={WeatherInfo} />
      </div>
    </div>
  );
};

export default WeatherApp;