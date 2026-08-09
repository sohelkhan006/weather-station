import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import "./SearchBox.css";

const SearchBox = ({ updateInfo }) => {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const getWeatherInfo = async () => {
    const response = await fetch(
      `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`,
    );
    const jsonResponse = await response.json();

    if (String(jsonResponse.cod) !== "200") {
      throw new Error("City not found — check the spelling.");
    }

    return {
      City: city,
      tempreture: jsonResponse.main.temp,
      feelLike: jsonResponse.main.feels_like,
      Tempmax: jsonResponse.main.temp_max,
      Tempmin: jsonResponse.main.temp_min,
      Humidity: jsonResponse.main.humidity,
      Weather: jsonResponse.weather[0].main,
    };
  };

  const handleChangeCity = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const newInfo = await getWeatherInfo();
      updateInfo(newInfo);
      setCity("");
    } catch (err) {
      setError(err.message || "Couldn't fetch weather. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-shell">
      <p className="search-eyebrow">Weather Station</p>
      <h1 className="search-title">Where to?</h1>
      <form className="search-form" onSubmit={handleSubmit}>
        <TextField
          id="city"
          label="City name"
          variant="outlined"
          value={city}
          onChange={handleChangeCity}
          required
          size="small"
          className="search-input"
        />
        <Button
          variant="contained"
          endIcon={<SearchIcon />}
          type="submit"
          disabled={loading}
          className="search-button"
        >
          {loading ? "Searching" : "Search"}
        </Button>
      </form>
      {error && <p className="search-error">{error}</p>}
    </div>
  );
};

export default SearchBox;