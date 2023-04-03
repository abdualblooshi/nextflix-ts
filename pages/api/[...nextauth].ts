import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

import { compare } from "bcrypt";
import prismadb from "../../lib/prismadb";
export default NextAuth({
  providers: [
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Check if the email and password are provided
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter your email address and password");
        }

        // Find the user in the database
        const user = await prismadb.user.findUnique({
          where: { email: credentials.email },
        });

        // Check if the user exists
        if (!user) {
          throw new Error("Invalid email address or password");
        }

        // Compare the password with the hash stored in the database
        const isValid = await compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isValid) {
          throw new Error("Invalid email address or password");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
});
