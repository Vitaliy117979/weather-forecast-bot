import axios from 'axios';
import { config } from "dotenv";
config();

const { API_KEY } = process.env;

export const fetchDataByCityName = async (msg) => {

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${msg.text}&appid=${API_KEY}&units=metric`;
    try {
      console.log(apiUrl);
    const response = await axios.get(apiUrl);
    console.log(response.cod);
    return response.data
  } catch (error) {
    if(error.response.status === 404)
    console.error(`Request execution error:${error.response.status}`);
  return 404
  }
};



