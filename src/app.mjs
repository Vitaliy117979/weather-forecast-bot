import TelegramBot from "node-telegram-bot-api";
import { config } from "dotenv";
import { startAction } from "./commandActions/start.mjs";
import { backAction } from "./commandActions/start.mjs";
import { getWeatherForecastByCity } from "./routes/cityName/currentWeatherForCity.mjs";

import { fiveDayWeatherForCity } from "./routes/cityName/fiveDayWeatherForCity.mjs";
import { userLocation } from "./routes/userLocation/currentLocation.mjs";
config();

const { TG_BOT_ID } = process.env;

export const bot = new TelegramBot(TG_BOT_ID, {
  polling: true,
});
export const initializeBot = () => {
  bot.on("polling_error", err => {
    console.log("Error occurred:", err);
  });
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
