import { PrismaClient } from '@prisma/client'

export * from '@prisma/client'

declare const process: any

const globalForPrisma = globalThis as unknown as {
  prisma: any
}

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: (process.env?.NODE_ENV === 'development') ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env?.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
