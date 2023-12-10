import TelegramBot from "node-telegram-bot-api";
import { config } from "dotenv";
import { commands } from "./src/botCommands.mjs";
import { startAction } from "./src/commandActions/start.mjs";
import { backAction } from "./src/commandActions/start.mjs";
import { getWeatherForecastByCity } from "./src/routes/cityName/currentWeatherForCity.mjs";
import { fetchDataForLongTermByCityName } from "./controllers/name/getWeatherForLongTermByName.mjs";

import { userLocation } from "./src/routes/locationUser/currentLocation.mjs";
import { fiveDayWeatherForCity } from "./src/routes/cityName/fiveDayWeatherForCity.mjs";
config();

const { TG_BOT_ID } = process.env;
// console.log(TG_BOT_ID);
export const bot = new TelegramBot(TG_BOT_ID, {
  polling: true,
});

bot.on("polling_error", (err) => console.log(err.data.error.message));

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
