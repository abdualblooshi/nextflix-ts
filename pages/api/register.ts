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

    // our response body on the client side is going to be an object JSON.Stringfiy() with keys of email, username, and password
    const { email, username, password } = req.body;

    if (!email) {
      return res
        .status(422)
        .json({ error: `Please fill all the fields 1 + ${email}` });
    } else if (!username) {
      return res.status(422).json({ error: "Please fill all the fields 2" });
    } else if (!password) {
      return res.status(422).json({ error: "Please fill all the fields 3" });
    }

    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(422).json({ error: "Email taken" });
    }

    if (password.length < 6) {
      return res
        .status(422)
        .json({ error: "Password must be at least 6 characters long" });
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      return res.status(422).json({ error: "Invalid email address" });
    }

    if (username.length < 3) {
      return res
        .status(422)
        .json({ error: "Username must be at least 3 characters long" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prismadb.user.create({
      data: {
        email,
        username,
        hashedPassword: hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ error: `Something went wrong: ${error}` });
  }
}
