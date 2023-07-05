import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "../../lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      return res.status(405).end();
    }

    // get current environment
    const env = process.env.NODE_ENV;

    // our response body on the client side is going to be an object JSON.Stringfiy() with keys of email, username, and password
    const { email, phone, password, ipAddress } = req.body;

    // Limit the number of accounts that can be created from the same IP address in production in a short amount of time
    const existingUsers = await prismadb.user.findMany({
      where: {
        ipAddress,
      },
    });

    if (env === "production" && existingUsers.length === 3) {
      return res.status(422).json({
        error:
          "Too many accounts have been created from this IP address, please try again later",
      });
    }

    if (!email && !phone && !password) {
      return res
        .status(422)
        .json({ error: "Please fill the required fields!" });
    } else if (!email) {
      return res.status(422).json({ error: `Please enter an email address` });
    } else if (!phone) {
      return res.status(422).json({ error: "Please enter a phone number" });
    } else if (!password) {
      return res.status(422).json({ error: "Please enter a password" });
    }

    const existingEmail = await prismadb.user.findUnique({
      where: {
        email,
      },
    });

    // existingPhone is a phone number that already exists in the database (if it does) and is the same as the phone number that the user is trying to register with (phone)

    const existingPhone = await prismadb.user.findFirst({
      where: {
        phone: phone,
      },
    });

    // Check if the user already exists
    if (existingPhone || existingEmail) {
      return res
        .status(422)
        .json({ error: "Account already exists, please login instead" });
    }

    // Check if the password is at least 6 characters long
    if (password.length < 6) {
      return res
        .status(422)
        .json({ error: "Password must be at least 6 characters long" });
    }

    // Check if the email is valid
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      return res.status(422).json({ error: "Invalid email address" });
    }

    // Check the length of the phone number
    if (phone.length < 10 || phone.length > 16) {
      return res
        .status(422)
        .json({ error: "Phone number must be at least 10 characters long" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    // check if the email is a phone number
    // if it is, create a user with the phone number as the email
    // if it is not, create a user with the email as the email

    const isPhone = /^\+?[0-9]{1,3}[0-9]{9}$/.test(phone);

    if (!isPhone) {
      return res.status(422).json({
        error: "Invalid phone number, please use the format +1123456789",
      });
    }

    const user = await prismadb.user.create({
      data: {
        email,
        phone,
        hashedPassword: hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });

    return res.status(200).json({
      user: user,
      status: "success",
      message: "Account created successfully",
    });
  } catch (error) {
    return res.status(400).json({
      error: `Something went wrong: ${error}`,
      status: "error",
      message: "Something went wrong",
    });
  }
}
