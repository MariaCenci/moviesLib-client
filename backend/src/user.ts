import { Prisma } from '@prisma/client';

export const userPrismaModel = Prisma.validator<Prisma.UserArgs>()({
  select: {
    userId: true,
    email: true,
    // Outros campos que deseja armazenar
  },
});



export type User = Prisma.UserGetPayload<typeof userPrismaModel>;