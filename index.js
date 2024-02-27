import express from "express";
import connectDB from "./connect.db.js";
import movie from "./netflix.model.js";
import mongoose from "mongoose";

const app = new express();
// make app understand json
app.use(express.json());
//?===========database connection=================
connectDB();
//?=====================routes====================
//? add new movie details in database table
app.post("/movie/add", async (req, res) => {
  try {
    const newMovie = req.body;
    //console.log(newMovie);
    await movie.create(newMovie); // create means insetOne()
    return res.status(201).send(`${newMovie.name} Movie added Successfully`);
  } catch (error) {
    console.log(error.message);
  }
});

//? Get movie details from database table

app.get("/movie/list", async (req, res) => {
  try {
    const movies = await movie.find();
    return res.status(200).send({ message: "Success", movies });
  } catch (error) {
    console.log(error.message);
  }
});

//? Search movie details in database table by _id

app.get("/movie/details/:id", async (req, res) => {
  try {
    // extract movie id from req.params
    const movieId = req.params.id;

    // check for mongo id validity
    const isValidMongoId = mongoose.isValidObjectId(movieId);

    // if not valid mongo id, throw error

    if (!isValidMongoId) {
      return res.status(400).send({ message: "Not Valid mongo ID" });
    }
    // find movie by id
    const requiredMovie = await movie.findOne({ _id: movieId });

    // if not movie, throw error
    if (!requiredMovie) {
      return res.status(400).send({ message: "Movie Not Found in database" });
    }
    //if movie found in db SEND response with movie details
    return res
      .status(200)
      .send({ message: "Success", MovieDetails: requiredMovie });
  } catch (error) {
    console.log(error.message);
  }
});

//? delete movie by id

app.delete("/movie/delete/:id", async (req, res) => {
  try {
    // extract movie id from req.params
    const movieId = req.params.id;

    // check for mongo id validity
    const isValidMongoId = mongoose.isValidObjectId(movieId);

    // if not valid mongo id, throw error

    if (!isValidMongoId) {
      return res.status(400).send({ message: "Not Valid mongo ID" });
    }
    // find movie by id
    const requiredMovie = await movie.findOne({ _id: movieId });

    // if not movie, throw error
    if (!requiredMovie) {
      return res.status(400).send({ message: "Movie Not Found in database" });
    }
    //if movie found in db delete it

    await movie.deleteOne({ _id: movieId });

    //SEND successful delete response
    return res.status(200).send({ message: "Movie deleted Successfully" });
  } catch (error) {
    console.log(error.message);
  }
});

// assign port to the app
const PORT = 4001;
app.listen(PORT, () => {
  console.log(`App is listening at: http://localhost:${PORT}`);
});
