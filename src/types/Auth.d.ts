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

export interface IActivation {
  otp: string;
}

export interface UserExtended extends User {
  accessToken?: string;
  role?: string;
}

export interface SessionExtended extends Session {
  accessToken?: string;
}

export interface JWTExtended extends JWT {
  user?: UserExtended;
}
