// src/hooks/useRecommendedProducts.ts

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import api from "@/services/api.service";
import { transformData } from "@/lib/localstorage";

const PRODUCTS_PERPAGE = 100;
export interface RecommendedProduct {
  // Define the structure of a recommended product here
  id: string;
  name: string;
  // ... other properties
}

export interface RecommendedProductsResponse {
  data: RecommendedProduct[];
  // ... other response properties if any
}

export const useRecommendedProducts = (
  options?: UseQueryOptions<RecommendedProductsResponse>
) => {
  return useQuery<RecommendedProductsResponse>({
    queryKey: ["recommendedProducts"],
    queryFn: async () => {
      const storeData = JSON.parse(localStorage.getItem("storeData") || "{}");
      const postData = transformData(storeData);

      const response = await api.post(
        "/api/v1/stores/anonymous-recommendations",
        {
          data: postData,
          page: 1,
          perPage: PRODUCTS_PERPAGE,
        }
      );

      return response.data;
    },
    retry: 1,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    ...options,
  });
};
