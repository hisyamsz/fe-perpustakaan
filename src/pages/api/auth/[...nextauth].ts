import CredentialsProvider from "next-auth/providers/credentials";
import environment from "@/config/environment";
import { JWTExtended, SessionExtended, UserExtended } from "@/types/Auth";
import authServices from "@/services/auth.service";
import NextAuth from "next-auth";

export default NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  secret: environment.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { email, password } = credentials as {
            email: string;
            password: string;
          };

          // Coba login
          const resultToken = await authServices.login({ email, password });
          const accessToken = resultToken.data?.data?.token_access;

          if (!accessToken) {
            throw new Error(
              resultToken.data?.message ||
                resultToken.data?.errors ||
                "Gagal mendapatkan token.",
            );
          }

          // Ambil profile
          const me = await authServices.getProfileWithToken(accessToken);
          const user = me?.data?.data;

          if (!user?.id) {
            throw new Error(
              me.data?.message ||
                me.data?.errors ||
                "Gagal mendapatkan data pengguna.",
            );
          }

          user.accessToken = accessToken;
          return user;
        } catch (err: any) {
          // Jika error dari backend (axios)
          const msg =
            err?.response?.data?.message ||
            err?.response?.data?.errors ||
            err?.message ||
            "Terjadi kesalahan saat memproses login.";

          throw new Error(msg);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({
      token,
      user,
    }: {
      token: JWTExtended;
      user: UserExtended | null;
    }) {
      if (user) {
        token.user = user;
      }

      return token;
    },
    async session({
      session,
      token,
    }: {
      session: SessionExtended;
      token: JWTExtended;
    }) {
      session.user = token.user;
      session.accessToken = token.user?.accessToken;

      return session;
    },
  },
});
