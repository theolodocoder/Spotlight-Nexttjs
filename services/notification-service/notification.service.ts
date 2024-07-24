import { API_URL } from "@/constants/api";
import axios from "axios";
import { TEvent } from "@/types";
import { ShareMedium } from "@/hooks/use-share";

async function notify(
  eventType: TEvent,
  body: {
    storeUsername: any;
    productId: any;
    productName: any;
    medium?: ShareMedium;
  }
) {
  return await axios.post(`${API_URL}/api/v1/trigger?event=${eventType}`, body);
}

export default notify;
