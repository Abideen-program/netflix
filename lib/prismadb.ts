import { PrismaClient } from "@prisma/client";

const Prismadb = global.prismadb || new PrismaClient();

if (process.env.NODE_ENV === "production") global.prismadb = Prismadb;

export default Prismadb;
