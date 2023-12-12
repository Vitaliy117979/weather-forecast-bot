import TelegramBot from "node-telegram-bot-api";
import { config } from "dotenv";
import { startAction } from "./src/commandActions/start.mjs";
import { backAction } from "./src/commandActions/start.mjs";
import { getWeatherForecastByCity } from "./src/routes/cityName/currentWeatherForCity.mjs";

import { fiveDayWeatherForCity } from "./src/routes/cityName/fiveDayWeatherForCity.mjs";
import { userLocation } from "./src/routes/userLocation/currentLocation.mjs";
config();

const { TG_BOT_ID } = process.env;

export const bot = new TelegramBot(TG_BOT_ID, {
  polling: true,
});
bot.on("polling_error", err => {
  console.log("Error occurred:", err);
});
export const initializeBot = () => {
  bot.on("text", async (msg) => {
    const text = msg.text;

    switch (text) {
      case "/start":
        startAction(bot, msg);
        break;
      case "5 days":
        backAction(bot, msg);
        bot.removeAllListeners("text");
        fiveDayWeatherForCity(bot);
        break;
      case "now":
        backAction(bot, msg);
        bot.removeAllListeners("text");
        getWeatherForecastByCity(bot, msg);
        break;
    }
  });

  bot.on("location", async (location) => {
    bot.removeAllListeners("text");
    bot.removeAllListeners("location");

    userLocation(bot, location);
  });
};
initializeBot();
