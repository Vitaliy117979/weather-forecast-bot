import axios from "axios";
import { config } from "dotenv";
config();

const { API_KEY } = process.env;

export const getWeatherIcon =  (weatherCode) => {
  switch (weatherCode) {
    case "01d":
      return "☀️"; // clear sky - day
    case "01n":
      return "🌙"; // clear sky - night
    case "02d":
    case "02n":
    case "03d":
    case "03n":
    case "04d":
    case "04n":
      return "☁️"; // clouds
    case "09d":
    case "09n":
    case "10d":
    case "10n":
      return "🌧️"; // rain
    case "11d":
    case "11n":
      return "⛈️"; // thunderstorm
    case "13d":
    case "13n":
      return "❄️"; // snow
    case "50d":
    case "50n":
      return "🌫️"; // mist
    default:
      return "";
  }
};
