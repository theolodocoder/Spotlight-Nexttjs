import { API_URL } from "@/constants/api";
import axios from "axios";
import { TEvent } from "@/types";

async function notify(eventType: TEvent, body) {
  return await axios.post(`${API_URL}/api/v1/trigger?event=${eventType}`, body);
}

export default notify;
