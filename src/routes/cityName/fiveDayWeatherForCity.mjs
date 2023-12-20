import { fetchDataForLongTermByCityName } from "../../controllers/name/getWeatherForLongTermByName.mjs";
import { startAction } from "../../commandActions/start.mjs";
import { getWeatherIcon } from "../../controllers/icon/getIcon.mjs";
import { initializeBot } from "../../app.mjs";
const uniqueDates = (data) => {
  return data.list.reduce((uniqueList, current) => {
    const dateTxt = current.dt_txt;
    const existingItem = uniqueList.find(
      (item) => item.dt_txt.split(" ")[0] === dateTxt.split(" ")[0]
    );
    if (!existingItem) {
      uniqueList.push(current);
    }
    return uniqueList;
  }, []);
};

export const fiveDayWeatherForCity = async (bot) => {
  bot.on("text", async function foo(msg) {
    try {
      if (msg.text === "back"||msg.text=== "/start") {
        bot.removeAllListeners("text");
        startAction(bot, msg);
        initializeBot();
        return;
      }
      const data = await fetchDataForLongTermByCityName(msg);
      if (data === 404) {
        return await bot.sendMessage(msg.chat.id, "try another name");
      }
      const dataForecast = uniqueDates(data);
      const messages = dataForecast.map((item) => {
        const date = item.dt_txt.split(" ")[0].split("-").reverse().join("-");
        const temp = item.main.temp;
        const humidity = item.main.humidity;
        const weatherDescription = item.weather[0].description;
        const windSpeed = item.wind.speed;
        const getIcon = getWeatherIcon(item.weather[0].icon);
        const cityName = data.city.name;

        return `<b>Date:</b> <i>${date}</i>
        - <b>Description:</b> ${weatherDescription} ${getIcon}
        - <b>Temperature:</b> ${temp}°С
        - <b>Humidity:</b> ${humidity}%;
        - <b>Wind speed:</b> ${windSpeed}m/s`;
      });
      const combinedMessage =
        `Weather forecast <b>${data.city.name}</b> :\n` + messages.join("\n");
      bot.sendMessage(msg.chat.id, combinedMessage, { parse_mode: "HTML" });
      bot.removeAllListeners("text");
      bot.removeAllListeners("location");

      startAction(bot, msg);
      initializeBot();
    } catch (error) {
      console.log(error);
      bot.sendMessage(msg.chat.id, "Unknown error, please try again");
    }
  });
};

// export const fiveDayWeatherForCity = async (bot) => {
//   const onTextHandler = async (msg) => {
//     const data = await fetchDataForLongTermByCityName(msg);
//     try {
//       if (data === 404) {
//         await bot.sendMessage(msg.chat.id, "try another name");
//       }
//         const uniqueDates = data.list.reduce((uniqueList, current) => {
//           const dateTxt = current.dt_txt;
//           const existingItem = uniqueList.find(
//             (item) => item.dt_txt.split(" ")[0] === dateTxt.split(" ")[0]
//           );
//           if (!existingItem) {
//             uniqueList.push(current);
//           }
//           return uniqueList;
//         }, []);
//         const messages = uniqueDates.map((item) => {
//           const date = item.dt_txt.split(" ")[0];
//           const temp = item.main.temp;
//           const humidity = item.main.humidity;
//           const weatherDescription = item.weather[0].description;
//           const cityName = data.city.name;
//           return `
//           Weather forecast <b>${cityName}</b> :
//           - Date: ${date}
//           - Temperature ${temp}°С
//           - Humidity: ${humidity}%;
//           - Description ${weatherDescription}`;
//         });
//         const combinedMessage = messages.join("\n\n");
//         console.log(combinedMessage);
//         await bot.sendMessage(msg.chat.id, combinedMessage);
//       }
//      catch (error) {
//       console.log(error);
//       await bot.sendMessage(
//         msg.chat.id,
//         "Unknown error, please try again"
//       );
//     } finally {
//       bot.removeListener("text", onTextHandler);
//       initializeBot()
//     }
// }}
