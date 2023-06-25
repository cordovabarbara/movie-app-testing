const request = require("supertest");
const app = require("./../app");
const Genre = require("../models/Genre");
const Actor = require("../models/Actor");
const Director = require("../models/Director");
require("../models");

const BASE_URL = "/api/v1/movies";
let movieId;

test("POST => 'BASE_URL', should return status 201, and res.body.name = body.name", async () => {
  const body = {
    name:"Matrix",
    image:"img.jpg",
    synopsis:"Lorem",
    releaseYear: 1999,
  };

  const res = await request(app)
    .post(BASE_URL)
    .send(body);

  movieId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body.name).toBe(body.name);
});

test("GET => 'BASE_URL', should return status 200 and res.body.lenght = 1", async () => {
  const res = await request(app).get(BASE_URL);

  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});


test("PUT => 'BASE_URL/:id', should return 200 and res.body.name = body.name", async () => {
  const movie = {
    name: "Matrix",
  };

  const res = await request(app)
    .put(`${BASE_URL}/${movieId}`)
    .send(movie);

  expect(res.status).toBe(200);
  expect(res.body.name).toBe(movie.name);
});


//movies/:id/actors
test("POST BASE_URL/:id/actors => , should return 200 and res.body.length = 1", async () => {
  
    const actorbody = {
    firstName: "Carrie-Anne",
    lastName: "Moss",
    nationality: "USA",
    image: "img.jpg",
    birthday: "1967-08-21",
  };

  const actor = await Actor.create(actorbody);

  const res = await request(app)
    .post(`${BASE_URL}/${movieId}/actors`)
    .send([actor.id]);

  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1)

  actor.destroy();
});

//movies/:id/directors
test("POST BASE_URL/:id/directors => should return 200 and res.body.name = director.name", async () => {
  
    const directorBody = {
    firstName: "Lana",
    lastName: "Wachowski",
    nationality: "USA",
    image: "image.jpg",
    birthday: "1965-06-21",
  };


  const director = await Director.create(directorBody);

  const res = await request(app)
    .post(`${BASE_URL}/${movieId}/directors`)
    .send([director.id]);

    expect(res.status).toBe(200);
    expect(res.body.name).toBe(director.name);

  director.destroy();
});


//movies/:id/genres
test("POST BASE_URL/:id/genres => should return 200 and res.body.length = 1", async () => {
    const genreBody = {
      name: "Action",
    };
    const genre = await Genre.create(genreBody)

    const res = await request(app)
      .post(`${BASE_URL}/${movieId}/genres`)
      .send([genre.id]);

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);

    genre.destroy();
  });


test("DELETE 'BASE_URL/:id', should return status code 204", async()=>{ 
    const res = await request(app)
    .delete(`${BASE_URL}/${movieId}`)

    expect(res.status).toBe(204)
})