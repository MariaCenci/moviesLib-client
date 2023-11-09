
import { PrismaClient } from "@prisma/client";
import { compareSync, hashSync } from "bcrypt";
import express from "express";
import { Router } from "express";
import cors from "cors";

const prisma = new PrismaClient();

 const server = express();
 const PORT = 4000;

 
 

server.use(cors());

server.use(express.json());


server.get('/', (req, res) => {
  res.send('test')
})

server.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const passwordHash = await hashSync(password, 10);

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
      },
    });
    console.log(user)

    return res.status(201).send({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).send({ error: "Unable to save user in the database" });
  }
});

// Rota de login
server.post("/login", async (req, res) => {
  try {
    const { email, password, userId } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
        userId: userId
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

   const passwordMatch = await compareSync(password, user.passwordHash);

    if (!passwordMatch) {
     return res.status(401).send({ error: "Invalid authentication" });
  }
console.log(userId)
    // Autenticação bem-sucedida
   return  res.status(200).send({ message: "Logged in successfully", userId: user.userId});
  } catch (error) {
    res.status(500).send({ error: "Login error" });
  }
});

  /*get fav movies */
  server.get("/api/favoriteMovies/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const movies = await prisma.favoriteMovie.findMany({
        where: {
          userId: userId,
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
  server.post("/api/addFavorite", async (req, res) => {
    const { userId, id, original_title, poster_path } = req.body;
  
    if (typeof userId !== undefined && id !== undefined) {

    
      if (!id || !original_title || !poster_path) {
        return res.status(400).send({ error: 'Invalid request' });
      }
  
  
      try {
        const user = await prisma.user.findUnique({
          where: {
            userId: userId,
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
                userId: userId,
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
  
  server.post("/api/markAsFavorite", async (req, res) => {
    const { userId, id, original_title, voteAverage, poster_path } = req.body;
  
    try {
      const existingFavorite = await prisma.favoriteMovie.findFirst({
        where: {
          userId: userId,
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
                userId: userId,
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
  
  server.delete("/api/removeFavorite", async (req, res) => {
    const { user_id, id } = req.body;
  
    try {
      const favoriteMovie = await prisma.favoriteMovie.findUnique({
        where: {
          userId: user_id,
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
  
  

 
 
 server.listen(PORT, () => {
    console.log(`server initialized at http://localhost:${PORT}`);
 })

