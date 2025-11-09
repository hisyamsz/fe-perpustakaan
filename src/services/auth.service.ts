import instance from "@/libs/axios/instance";
import { IRegister } from "@/types/Auth";
import endpoint from "./endpoint.constant";

const authServices = {
  register: (payload: IRegister) =>
    instance.post(`${endpoint.AUTH}/register`, payload),
};

export default authServices;
