import axios from "axios";
import { config } from "dotenv";
config();

const { API_KEY } = process.env;
export const geocodingByName = async (msg) => {
  console.log(msg.text);
  const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${msg.text}&appid=${API_KEY}&units=metric`;
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    if (error.response.status === 404)
      console.error(`Request execution error:${error.response.status}`);
    return 404;
  }
};
