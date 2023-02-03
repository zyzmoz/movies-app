import axios from "axios";
import { config } from "../../AppConfig";

const axiosClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: { api_key: config.api_key },
});

export {
  axiosClient
}
