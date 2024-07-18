"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { Store } from "@/types";
import api from "@/services/api.service";
import { addOrUpdateStore } from "@/lib/localstorage";

export const useGetStore = (
  username: string,
  options?: UseQueryOptions<Store>
) => {
  return useQuery<Store>({
    queryKey: ["fetchStore", username],
    queryFn: () =>
      api
        .get(`/api/v1/stores/search-username?name=${username}&data=true`)
        .then((res) => {
          addOrUpdateStore(username, res.data.data?.categories);
          return res.data.data;
        }),
    retry: 1,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    ...options,
  });
};
