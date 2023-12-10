import axios from "axios";
import { config } from "dotenv";
config();

const { API_KEY } = process.env;

export const fetchDataForLongTermByCityName = async (msg) => {

  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${msg.text}&appid=${API_KEY}&units=metric`;
    console.log(apiUrl);
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    return 404;
  }
};
