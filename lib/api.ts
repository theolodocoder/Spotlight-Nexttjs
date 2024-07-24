import { API_URL } from "@/constants/api";
import { IProduct, Store } from "@/types";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://api.yourdomain.com",
});

export async function getStore(username: string): Promise<Store> {
  try {
    const response = await api.get<{ data: Store }>(
      `/api/v1/stores/search-username?name=${username}&data=true`
    );

    // Note: We can't use localStorage on the server side, so we'll skip the addOrUpdateStore call

    return response.data.data;
  } catch (error) {
    console.error(`Error fetching store data for ${username}:`, error);
    throw new Error(`Failed to fetch store data for ${username}`);
  }
}

export interface RecommendedProductsResponse {
  data: IProduct[];
}

export async function getRecommendedProducts(): Promise<any> {
  try {
    const response = await axios.post(
      `${API_URL}/api/v1/stores/anonymous-recommendations`,
      {
        data: {},
        page: 1,
        perPage: 100,
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching recommended products:", error);
    return [];
  }
}
