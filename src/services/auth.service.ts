import instance from "@/libs/axios/instance";
import { ILogin, IRegister } from "@/types/Auth";
import endpoint from "./endpoint.constant";

const authServices = {
  register: (payload: IRegister) =>
    instance.post(`${endpoint.AUTH}/register`, payload),
  login: (payload: ILogin) => instance.post(`${endpoint.AUTH}/login`, payload),
  getProfileWithToken: (token: string) =>
    instance.get(`${endpoint.AUTH}/current`, {
      headers: { Authorization: `${token}` },
    }),
};

export default authServices;
