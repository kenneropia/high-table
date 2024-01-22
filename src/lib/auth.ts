import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { SHA256 as sha256 } from "crypto-js";

export const hashPassword = (string: string) => {
  return sha256(string).toString();
};
import { db } from "@/lib/db";
import { AdapterUser } from "next-auth/adapters";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      //@ts-ignore
      async authorize(credentials: any) {
        const user = await db.user.findUnique({
          where: { email: credentials.email },
        });

        // Check if user exists
        if (!user) {
          throw new Error("Wrong cred");
        }

        // Validate password
        const isPasswordMatch =
          user && user.password === hashPassword(credentials.password);

        if (!isPasswordMatch) {
          throw new Error("Invalid credentials");
        }

        return {
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return "/weather";
    },

    async session({ session, user, token }) {
      return session;
    },

    async jwt({ token, user }) {
      return token;
    },
  },
  // debug: process.env.NODE_ENV !== "production"
};
