import axios from 'axios';
import { config } from "dotenv";
config();

const { API_KEY } = process.env;
console.log(API_KEY);


export const fetchCurrentDataByUserCords = async (latitude, longitude) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
    try {
      console.log(apiUrl);
    const response = await axios.get(apiUrl);
    console.log(response.data);
    return response.data
  } catch (error) {
    if(error.response.status === 404)
    console.error(`Request execution error:${error.response.status}`);
  return 404
  }
};