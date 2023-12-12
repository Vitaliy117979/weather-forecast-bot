import { fetchDataByCityName } from "../../../controllers/name/getWeatherByCityName.mjs";
import { startAction } from "../../commandActions/start.mjs";
import { initializeBot } from "../../../app.mjs";
import { getWeatherIcon } from "../../../controllers/icon/getIcon.mjs";

export const getWeatherForecastByCity = async (bot) => {
  try {
    bot.on("text", async (msg) => {
      if (msg.text === "back"|| msg.text=== "/start") {
      
        bot.removeAllListeners("text");
        startAction(bot, msg);
        initializeBot();
        return;
      }
      const data = await fetchDataByCityName(msg);
      if (data === 404) {
        return await bot.sendMessage(msg.chat.id, "try another name");
      }
      const temperature = data.main.temp;
      const humidity = data.main.humidity;
      const weatherDescription = data.weather[0].description;
      const windSpeed = data.wind.speed;
      const getIcon = getWeatherIcon(data.weather[0].icon);

      const name = msg.text.toLowerCase().charAt(0).toUpperCase() + msg.text.slice(1);
      console.log(name);
      const message = `Weather in the city <b>${name}</b>:
      - <b>Description:</b> ${weatherDescription} ${getIcon}
      - <b>Temperature:</b> ${temperature}°C
      - <b>Humidity:</b> ${humidity}%
      - <b>Wind speed:</b> ${windSpeed}m/s
      `;

      bot.sendMessage(msg.chat.id, message, { parse_mode: "HTML" });
      bot.removeAllListeners("text");
      bot.removeAllListeners("location");

      startAction(bot, msg);
      initializeBot();
    });
  } catch (error) {
    return await bot.sendMessage(
      msg.chat.id,
      "Unknown error, please try again"
    );
  }
};
