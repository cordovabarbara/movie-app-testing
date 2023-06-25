const request = require ("supertest")
const app = require ("../app")

BASE_URL =  '/api/v1/movies'
let moviesId

test("POST -> 'BASE_URL', should return status code 201 and contain the movie name", async() =>{
    const movie = {
        name:"Matrix",
        image:"img.png",
        synopsis:"lorem",
        releaseYear:"1999"
    }
const res = await request(app)
    .post(BASE_URL)
    .send(movie)

    moviesId = res.body.id

expect(res.status).toBe(201)
expect(res.body.name).toContain(movie.name)
})

test("GET 'BASE_URL', should return status code 200 and res.body.length === 1", async()=>{
    const res = await request(app)
    .get(BASE_URL)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
})

test("PUT 'BASE_URL/:id', should return status code 200 and res.body.name === body.name", async()=>{ 
    const movie = {
        name: "Matrix"
    }

    const res = await request(app)
        .put(`${BASE_URL}/${moviesId}`)
        .send(movie)

        console.log(res.body);
    expect(res.status).toBe(200)
    expect(res.body.name).toBe(movie.name)  

})

test("DELETE 'BASE_URL', should return status code 204", async()=>{ 
    const res = await request(app)
        .delete(`${BASE_URL}/${moviesId}`)

    expect(res.status).toBe(204)
})