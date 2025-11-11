import instance from "@/libs/axios/instance";
import {
  IActivate,
  IForgotPasswordEmail,
  ILogin,
  IProfile,
  IRegister,
  IResetPassword,
} from "@/types/Auth";
import endpoint from "./endpoint.constant";

const authServices = {
  register: (payload: IRegister) =>
    instance.post(`${endpoint.AUTH}/register`, payload),
  login: (payload: ILogin) => instance.post(`${endpoint.AUTH}/login`, payload),
  getProfileWithToken: (token: string) =>
    instance.get(`${endpoint.AUTH}/current`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  getProfile: () => instance.get(`${endpoint.AUTH}/current`),
  activate: (payload: IActivate) =>
    instance.post(`${endpoint.AUTH}/activate`, payload),
  updateProfile: (payload: IProfile) =>
    instance.patch(`${endpoint.AUTH}/update`, payload),
  forgotPasswordEmail: (payload: IForgotPasswordEmail) =>
    instance.post(`${endpoint.AUTH}/forgotPasswordRequest`, payload),
  resetPassword: (token: string, payload: IResetPassword) =>
    instance.patch(`${endpoint.AUTH}/changePassword/${token}`, payload),
};

export default authServices;
