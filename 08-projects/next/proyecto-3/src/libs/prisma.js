import { PrismaClient } from "@/generated/prisma/client"
import { PrismaBetterSQLite3 } from "@prisma/adapter-better-sqlite3"

const adapter = new PrismaBetterSQLite3({ url: process.env.DATABASE_URL })

export const prisma = new PrismaClient({ adapter })