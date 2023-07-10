import { compare } from "bcrypt";
import prismadb from "../../libs/prismadb";
import { NextApiRequest, NextApiResponse } from "next";
import { get, set } from "lodash";

const rateLimit = 3; // Number of allowed requests per minute
const rateLimiter: { [ip: string]: number[] } = {};

const rateLimiterMiddleware = (ip: string | string[]) => {
  const now = Date.now();
  const windowStart = now - 60 * 1000; // 1 minute ago

  const requestTimestamps = get(rateLimiter, ip, []).filter(
    (timestamp: number) => timestamp > windowStart
  );
  requestTimestamps.push(now);

  set(rateLimiter, ip, requestTimestamps);

  return requestTimestamps.length <= rateLimit;
};

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

    const ip: string | string[] | undefined =
      req.headers["x-real-ip"] || req.socket.remoteAddress || "";

    const countdown = get(rateLimiter, ip, []).length;
    // convert to seconds
    const seconds = Math.floor(countdown / 1000);
    const timeRemaining = 60 - seconds;

    if (!rateLimiterMiddleware(ip)) {
      return res.status(429).json({
        error: `Too many requests, please try again later.`,
      });
    }

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
      return res
        .status(422)
        .json({ error: "Please enter a valid email address/phone number" });
    }

    const user = isPhone
      ? await prismadb.user.findFirst({
          where: {
            phone: email.replace(/\+/g, "").replace(/\s/g, ""),
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

    return res.status(200).json({ user, message: "Login successful" });
  } catch (error) {
    return res.status(400).json({
      error: `${error}`,
      status: "error",
      message: "",
    });
  }
}
