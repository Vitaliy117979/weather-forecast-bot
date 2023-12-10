import {initializeBot} from "../../app.mjs"
export const startAction = async (bot, msg) => {
  const message = "Select the desired option, or send your geolocation";
  await bot.sendMessage(msg.chat.id, message, {
    reply_markup: {
      keyboard: [[{text: "5 days"}, {text: "now"},], [{ text: "Geolocation", request_location: true }], ],
      resize_keyboard: true,
    },
  });

};

export const backAction = async (bot, msg) =>{
const messageId = msg.message_id;
const chatId = msg.chat.id;

if (messageId && chatId) {
  bot.sendMessage(chatId, "Enter city name", {
    reply_markup: {
      keyboard: [[{ text: "back" }]],
      resize_keyboard: true,

      remove_keyboard: true,
    },
  });
}}