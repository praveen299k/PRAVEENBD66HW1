let { getAllMovies } = require("../controllers");
let { app } = require("../index");
let request = require("supertest");
let http = require("http");

jest.mock("../controllers/index.js", () => ({
  ...jest.requireActual("../controllers/index.js"),
  getAllMovies: jest.fn(),
}));

let server;

beforeAll(async () => {
  server = http.createServer(app);
  server.listen(3001);
});

afterAll(async () => {
  server.close();
});

describe("Controller function tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should get all movies", () => {
    let mockMovies = [
      {
        movieId: 1,
        title: "Inception",
        genre: "Sci-Fi",
        director: "Christopher Nolan",
      },
      {
        movieId: 2,
        title: "The Shawshank Redemption",
        genre: "Drama",
        director: "Frank Darabont",
      },
      {
        movieId: 3,
        title: "The Godfather",
        genre: "Crime",
        director: "Francis Ford Coppola",
      },
    ];

    getAllMovies.mockReturnValue(mockMovies);
    let result = getAllMovies();

    expect(result).toEqual(mockMovies);
    expect(result.length).toBe(3);
  });
});

describe("API Endpoint tests", () => {
  it("GET /movies endpoint successfully retrieves all movie records.", async () => {
    let res = await request(server).get("/movies");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      movies: [
        {
          movieId: 1,
          title: "Inception",
          genre: "Sci-Fi",
          director: "Christopher Nolan",
        },
        {
          movieId: 2,
          title: "The Shawshank Redemption",
          genre: "Drama",
          director: "Frank Darabont",
        },
        {
          movieId: 3,
          title: "The Godfather",
          genre: "Crime",
          director: "Francis Ford Coppola",
        },
      ],
    });
    expect(res.body.movies.length).toBe(3);
  });

  it("GET /movies/details/:id endpoint successfully retrieves a specific movie record by ID.", async () => {
    let res = await request(server).get("/movies/details/2");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      movie: {
        movieId: 2,
        title: "The Shawshank Redemption",
        genre: "Drama",
        director: "Frank Darabont",
      },
    });
  });
});
