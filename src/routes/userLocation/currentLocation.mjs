import { fetchCurrentDataByUserCords } from "../../controllers/location/getWeatherByLocation.mjs";
import { startAction } from "../../commandActions/start.mjs";
import { initializeBot } from "../../app.mjs";
import { getWeatherIcon } from "../../controllers/icon/getIcon.mjs";

export const userLocation = async (bot, location) => {
  try {
    const latitude = location.location.latitude;
    const longitude = location.location.longitude;
    const data = await fetchCurrentDataByUserCords(latitude, longitude);
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const weatherDescription = data.weather[0].description;
    const windSpeed = data.wind.speed;
    const getIcon = getWeatherIcon(data.weather[0].icon);

    const message = `Weather at your coordinates: longitude <b>${longitude}</b>, latitude <b>${latitude}</b>:
    - <b>Description:</b> ${weatherDescription} ${getIcon}
    - <b>Temperature:</b> ${temperature}°С
    - <b>Humidity:</b> ${humidity}%;
    - <b>Wind speed:</b> ${windSpeed}m/s`;
    bot.sendMessage(location.chat.id, message, { parse_mode: "HTML" });
    bot.removeAllListeners("location");
    bot.removeAllListeners("text");

    startAction(bot, location);
    initializeBot();
  } catch (error) {
    await bot.sendMessage(location.chat.id, "Unknown error, please try again");
  }
};
