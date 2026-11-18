import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      // GitHub now sends an "iss" parameter on the OAuth callback; next-auth 4.24.13
      // has no issuer for it and throws "issuer must be configured". Newer 4.24.x sets this itself.
      issuer: "https://github.com/login/oauth",
      authorization: {
        params: {
          scope: "read:user",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token ?? "";
        token.username = (profile as { login?: string })?.login ?? "";
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.user.username = token.username as string;
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
};
