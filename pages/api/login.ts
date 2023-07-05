import { compare } from "bcrypt";
import prismadb from "../../lib/prismadb";
import { NextApiRequest, NextApiResponse } from "next";
import { signIn } from "next-auth/react";

// this is a custom error handler that will be used to handle errors thrown by the error in the url query by nextauth

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      return res.status(405).end();
    }

    const { email, password } = req.body;

    if (!email && !password) {
      return res
        .status(422)
        .json({ error: "Please fill the required fields!" });
    }

    if (!email) {
      return res.status(422).json({ error: `Please enter your email address` });
    }

    if (!password) {
      return res.status(422).json({ error: "Please enter your password" });
    }

    // Check if its an email or a phone number
    const isPhone = /^\+?[0-9]{1,3}[0-9]{9}$/.test(email);
    const isEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

    // Check if the email/phone number is valid
    if (!isPhone && !isEmail) {
      throw new Error("Please enter a valid email address/phone number");
    }

    const user = isPhone
      ? await prismadb.user.findFirst({
          where: {
            phone: email,
          },
        })
      : await prismadb.user.findUnique({
          where: {
            email: email,
          },
        });
    if (!user) {
      return res.status(422).json({ error: "Invalid login credentials" });
    }

    const isValid = await compare(password, user?.hashedPassword as string);

    if (!isValid) {
      return res.status(422).json({ error: "Invalid login credentials" });
    }

    const session = await signIn("credentials", {
      redirect: false,
      email: user?.email,
      password,
      callbackUrl: `/`,
    });
    if (!session) {
      return res.status(422).json({ error: "Invalid login credentials" });
    }

    return res.status(200).json({ user, message: "Login successful" });
  } catch (error) {
    return res.status(400).json({
      error: `Something went wrong: ${error}`,
      status: "error",
      message: "Something went wrong",
    });
  }
}
