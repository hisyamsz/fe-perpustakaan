import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

export interface IRegister {
  nama: string;
  email: string;
  password: string;
  role: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IActivate {
  code: string;
}

export interface IForgotPasswordEmail {
  email: string;
}

export interface IResetPassword {
  password: string;
}

export interface IProfile {
  id?: string;
  nama?: string;
  email?: string;
  role?: string;
}

export interface UserExtended extends User {
  accessToken?: string;
  refreshToken?: string;
  role?: string;
  status?: string;
}

export interface SessionExtended extends Session {
  accessToken?: string;
  refreshToken?: string;
}

export interface JWTExtended extends JWT {
  user?: UserExtended;
}
