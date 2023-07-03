import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import prismadb from "../../../lib/prismadb";

export default NextAuth({
  providers: [
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" } || {
          label: "Phone Number",
          type: "text",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Check if the email and password are provided
        if (!credentials?.email || !credentials?.password) {
          throw new Error(
            "Please enter your email address/phone number and password"
          );
        }

        // Check if its an email or a phone number
        const isPhone = /^\+?[0-9]{1,3}[0-9]{9}$/.test(credentials?.email);
        const isEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
          credentials?.email
        );

        // Check if the email/phone number is valid
        if (!isPhone && !isEmail) {
          throw new Error("Please enter a valid email address/phone number");
        }

        const user = isPhone
          ? await prismadb.user.findFirst({
              where: {
                phone: credentials?.email,
              },
            })
          : await prismadb.user.findUnique({
              where: {
                email: credentials.email,
              },
            });

        // Check if the user exists
        if (!user) {
          throw new Error("Invalid login credentials");
        }

        // Compare the password with the hash stored in the database
        const isValid = await compare(
          credentials.password,
          user?.hashedPassword as string
        );

        if (!isValid) {
          throw new Error("Invalid login credentials");
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
