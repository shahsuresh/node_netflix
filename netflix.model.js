import mongoose from "mongoose";
//? set Rule for collection fields
const movieSchema = new mongoose.Schema({
  name: String,
  length: Number,
  actorName: String,
  rating: Number,
});
//? create table/model for movie

const movie = mongoose.model("movie", movieSchema);

//? Export Schema
export default movie;
