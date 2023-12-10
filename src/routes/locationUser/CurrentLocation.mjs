import { fetchCurrentDataByUserCords } from "../../../controllers/location/getWeatherByLocation.mjs";
import { startAction } from "../../commandActions/start.mjs";
import { initializeBot } from "../../../app.mjs";

export const userLocation = async (bot, location) => {
  const latitude = location.location.latitude;
  const longitude = location.location.longitude;
  try {
    const data = await fetchCurrentDataByUserCords(latitude, longitude);
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const weatherDescription = data.weather[0].description;
    const message = `Weather at your coordinates: longitude ${longitude}, latitude ${latitude}:
    \nTemperature: ${temperature}°C\nHumidity: ${humidity}%\nDescription: ${weatherDescription}`;

    bot.sendMessage(location.chat.id, message);
    bot.removeAllListeners("location");
    bot.removeAllListeners("text");

    startAction(bot, location);
    initializeBot();
  } catch (error) {
    return await bot.sendMessage(
      location.chat.id,
      "Unknown error, please try again"
    );
  }
};
