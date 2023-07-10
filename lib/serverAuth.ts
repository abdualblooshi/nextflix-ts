import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import prismaDb from "./prismadb";

const serverAuth = async (req: NextApiRequest) => {
  const session = await getSession({ req });

  if (!session?.user?.email) {
    throw new Error("You are not logged in, please log in to proceed");
  }

  const user = await prismaDb.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    throw new Error("You are not logged in, please log in to proceed");
  }

  return { user };
};

export default serverAuth;
