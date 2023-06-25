const request = require ("supertest")
const app = require("../app")


const BASE_URL = '/api/v1/directors'
let directorsId

test ("POST -> 'BASE_URL', should return status code 201", async() =>{
    const director = {
        firstName: "Lana",
        lastName:"Wachowski",
        nationality:"USA",
        image:"img.pgn",
        birthday:"1966-06-21",
    }
    const res = await request(app)
        .post(BASE_URL)
        .send(director)

        directorsId = res.body.id 

    expect(res.status).toBe(201)
    expect(res.body.firstName).toBe(director.firstName)
})

test("GET -> 'BASE_URL', should return status code 200 and res.body.length = 1", async()=>{
    const res = await request(app)
    .get(BASE_URL)

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
    expect(res.body).toBeDefined()

})


test("PUT 'BASE_URL/:id', should return status code 200 and res.body.firstName = body.firstName", async()=>{ 
    const director = {
        firstName: "Lana"
    }

    const res = await request(app)
        .put(`${BASE_URL}/${directorsId}`)
        .send(director)

    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe(director.firstName)

})

test("DELETE 'BASE_URL/:id', should return status code 204", async()=>{ 
    const res = await request(app)
        .delete(`${BASE_URL}/${directorsId}`)

    expect(res.status).toBe(204)
})