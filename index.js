let { getAllMovies, getMovieById } = require("./controllers/index");
let express = require("express");
let cors = require("cors");

let app = express();

app.use(cors());
app.use(express.json());

// Endpoint: Get all movies
app.get("/movies", async (req, res) => {
  let movies = getAllMovies();
  res.status(200).json({ movies });
});

// Endpoint: Get movie by ID
app.get("/movies/details/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  let movie = getMovieById(id);
  res.status(200).json({ movie });
});

module.exports = { app };
