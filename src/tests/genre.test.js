const request = require ("supertest")
const app = require("../app")


const BASE_URL = '/api/v1/genres'
let genreId

test ("POST -> 'BASE_URL', should return status code 201", async() =>{
    const genre = {
        name:"Action",
    }
    const res = await request(app)
        .post(BASE_URL)
        .send(genre)

        genreId = res.body.id 

    expect(res.status).toBe(201)
    expect(res.body.name).toBe(genre.name)
})

test("GET -> 'BASE_URL', should return status code 200 and res.body.length = 1", async()=>{
    const res = await request(app)
    .get(BASE_URL)

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
})


test("PUT 'BASE_URL/:id', should return status code 200 and res.body.name = body.name", async()=>{ 
    const genre = {
        name: "Fantasy"
    }

    const res = await request(app)
        .put(`${BASE_URL}/${genreId}`)
        .send(genre)

    expect(res.status).toBe(200)
    expect(res.body.name).toBe(genre.name)

})

test("DELETE 'BASE_URL/:id', should return status code 204", async()=>{ 
    const res = await request(app)
        .delete(`${BASE_URL}/${genreId}`)

    expect(res.status).toBe(204)
})