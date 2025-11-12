import environment from "@/config/environment";
import { SessionExtended } from "@/types/Auth";
import axios from "axios";
import { getSession } from "next-auth/react";
import { onErrorHandler } from "./responseHandler";

const headers = {
  "Content-Type": "application/json",
};

const instance = axios.create({
  baseURL: environment.API_URL,
  headers,
  timeout: 60 * 1000,
});

instance.interceptors.request.use(
  async (request) => {
    if (typeof window !== "undefined") {
      const session: SessionExtended | null = await getSession();
      if (session?.accessToken) {
        request.headers.Authorization = `Bearer ${session.accessToken}`;
      }
    }
    return request;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    onErrorHandler(error);
    return Promise.reject(error);
  },
);

export default instance;
