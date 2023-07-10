import { PrismaClient } from "@prisma/client";

const client = global.prismadb || new PrismaClient(); // If the client is already defined, use it. Otherwise, create a new one, avoids creating a new client on every request due to hot reloading.
if (process.env.NODE_ENV === "production") global.prismadb = client;

export default client;
