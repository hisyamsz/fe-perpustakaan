import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

export interface SessionExtended extends Session {
  accessToken?: string;
}

export interface IRegister {
  nama: string;
  email: string;
  password: string;
  role: string;
}

interface ILogin {
  email: string;
  password: string;
}

interface IActivation {
  otp: string;
}

interface UserExtended extends User {
  accessToken?: string;
  role?: string;
}

interface SessionExtended extends Session {
  accessToken?: string;
}

interface JWTExtended extends JWT {
  user?: UserExtended;
}
