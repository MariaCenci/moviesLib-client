import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";

const prisma = new PrismaClient();

const app = express();

app.use(cors());

const PORT = 4000;

app.use(express.json());

/*get fav movies */
app.get("/api/favoriteMovies/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const movies = await prisma.favoriteMovie.findMany({
      where: {
        user_id: Number(user_id),
      },
      select: {
        id: true,
        original_title: true,
        poster_path: true,
      },
    });
    res.status(200).send(movies);
  } catch (error) {
    res.status(400).send({ msg: error });
  }
});

/*add fav movie */
app.post("/api/addFavorite", async (req, res) => {
  const { user_id, id, original_title, poster_path } = req.body;

  if (typeof user_id !== undefined && id !== undefined) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          user_id: user_id,
        },
      });

      if (!user) {
        return res.status(401).send("user not found");
      }

      const favoriteMovie = await prisma.favoriteMovie.create({
        data: {
          id: id,
          original_title: original_title,
          poster_path: poster_path,
          user: {
            connect: {
              user_id: user_id,
            },
          },
        },
      });

      return res.send(favoriteMovie + `movie added to favorites successfully`);
    } catch (error) {
      return res
        .status(500)
        .send(console.log(error) + "error adding to favorites");
    }
  } else {
    res.send("params not valid");
  }
});

app.post("/api/markAsFavorite", async (req, res) => {
  const { userId, id, original_title, voteAverage, poster_path } = req.body;

  try {
    const existingFavorite = await prisma.favoriteMovie.findFirst({
      where: {
        user_id: userId,
        original_title: original_title,
      },
    });

    if (existingFavorite) {
      console.log("already favorite");
    } else {
      const newFavorite = await prisma.favoriteMovie.create({
        data: {
          id: id,
          original_title: original_title,
          vote_average: voteAverage,
          poster_path: poster_path,
          user: {
            connect: {
              user_id: userId,
            },
          },
        },
      });
      res.send(newFavorite)
    }
    
  } catch (error) {
    console.log(error);
  }
});

app.delete("/api/removeFavorite", async (req, res) => {
  const { user_id, id } = req.body;

  try {
    const favoriteMovie = await prisma.favoriteMovie.findUnique({
      where: {
        user_id: user_id,
        id: id,
      },
    });

    if (!favoriteMovie) {
      return res.status(404).send("favorite movie not found");
    }

    await prisma.favoriteMovie.delete({
      where: {
        id: favoriteMovie.id,
      },
    });

    res.status(200).send("favorite movie removed successfully");
  } catch (error) {
    res
      .status(500)
      .send(console.log(error) + "error at removing movie from favorite");
  }
});

app.get("/api/user/:userId", async (req, res) => {
  const userId = req.params.userId; // Você pode usar isso para encontrar o usuário no banco de dados.
  // Use o userId para buscar o usuário no banco de dados e retorne os detalhes do usuário.
  // Exemplo:
  const user = await prisma.user.findUnique({
    where: {
      user_id: Number(userId), // Certifique-se de converter userId para um número.
    },
  });

  if (user) {
    const userData = { ...user, user_id: user.user_id }; // Inclua o user_id nos dados do usuário.
    res.json(userData);
  } else {
    res.status(404).json({ error: "Usuário não encontrado" });
  }
});

app.listen(PORT, () => {
  console.log(`server initialized at http://localhost:${PORT}`);
});
