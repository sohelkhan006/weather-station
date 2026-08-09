import CloudIcon from "@mui/icons-material/Cloud";
import SunnyIcon from "@mui/icons-material/Sunny";
import GrainIcon from "@mui/icons-material/Grain";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import AcUnitIcon from "@mui/icons-material/AcUnit";

// Each theme drives the background gradient, glow color, and icon —
// this is the single source of truth so WeatherApp and DisplayInfo stay in sync.
export const weatherThemes = {
  clear: {
    key: "clear",
    label: "Clear skies",
    accent: "#F2A65A",
    glow: "rgba(242,166,90,0.35)",
    from: "#3A2E5C",
    via: "#1B2A4A",
    to: "#0B1220",
    Icon: SunnyIcon,
  },
  clouds: {
    key: "clouds",
    label: "Cloudy",
    accent: "#9FB3D9",
    glow: "rgba(159,179,217,0.25)",
    from: "#26314B",
    via: "#182238",
    to: "#0B1220",
    Icon: CloudIcon,
  },
  rain: {
    key: "rain",
    label: "Rainy",
    accent: "#5FD6C8",
    glow: "rgba(95,214,200,0.3)",
    from: "#123047",
    via: "#0D2233",
    to: "#050B14",
    Icon: GrainIcon,
  },
  thunderstorm: {
    key: "thunderstorm",
    label: "Stormy",
    accent: "#B98BFF",
    glow: "rgba(185,139,255,0.3)",
    from: "#241B3F",
    via: "#170F2B",
    to: "#0A0714",
    Icon: ThunderstormIcon,
  },
  snow: {
    key: "snow",
    label: "Snowy",
    accent: "#EDF1F7",
    glow: "rgba(237,241,247,0.25)",
    from: "#33415C",
    via: "#202B42",
    to: "#0B1220",
    Icon: AcUnitIcon,
  },
  mist: {
    key: "mist",
    label: "Misty",
    accent: "#B7C4D9",
    glow: "rgba(183,196,217,0.22)",
    from: "#222E44",
    via: "#161F32",
    to: "#0B1220",
    Icon: CloudIcon,
  },
};

export function resolveWeatherTheme(info) {
  const raw = (info?.Weather || "").toLowerCase();

  if (raw.includes("thunder")) return weatherThemes.thunderstorm;
  if (raw.includes("drizzle") || raw.includes("rain")) return weatherThemes.rain;
  if (raw.includes("snow")) return weatherThemes.snow;
  if (raw.includes("cloud")) return weatherThemes.clouds;
  if (raw.includes("clear") || raw.includes("sun")) return weatherThemes.clear;
  if (raw.includes("mist") || raw.includes("haze") || raw.includes("fog")) return weatherThemes.mist;

  // Fallback heuristic (mirrors your original temp/humidity logic) for when
  // `Weather` isn't set yet.
  const temp = info?.tempreture ?? 20;
  const humidity = info?.Humidity ?? 50;
  if (humidity > 90) return weatherThemes.thunderstorm;
  if (temp > 25) return weatherThemes.clear;
  if (temp < 10) return weatherThemes.snow;
  return weatherThemes.clouds;
}