import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    const result = await prisma.favoriteMovie.findMany();
    console.log("Resultado da consulta:", result);
  } catch (error) {
    console.error("Erro ao consultar o banco de dados:", error);
  } finally {
    await prisma.$disconnect();
  }

  const printUsers = async () => {
    const users = await prisma.user.findMany();
    console.log("all users:", users);
  };

  const user1 = await prisma.user.create({
    data: {
      email: "teste@teste.com",
    },
  });
  console.log(user1, "created new user");

  const user2 = await prisma.user.create({
    data: {
      email: "teste@teste.com",
    },
  });
  console.log(user2, "created new user");

  await printUsers();
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

