const request = require ("supertest")
const app = require("../app")


const BASE_URL = '/api/v1/actors'
let actorsId

test ("POST -> 'BASE_URL', should return status code 201", async() =>{
    const actor = {
        firstName: "Keanu",
        lastName:"Reeve",
        nationality:"USA",
        image:"img.pgn",
        birthday:"1964-09-02",
    }
    const res = await request(app)
        .post(BASE_URL)
        .send(actor)

        actorsId = res.body.id 

    expect(res.status).toBe(201)
    expect(res.body.firstName).toBe(actor.firstName)
})

test("GET -> 'BASE_URL', should return status code 200 and res.body.length ==== 1", async()=>{
    const res = await request(app)
    .get(BASE_URL)

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
    expect(res.body).toBeDefined()

})


test("PUT -> 'BASE_URL/:id', should return status code 200 and res.body.firstName === body.firstName", async()=>{ 
    const actor = {
        firstName: "Keanu"
    }

    const res = await request(app)
        .put(`${BASE_URL}/${actorsId}`)
        .send(actor)

    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe(actor.firstName)

})

test("DELETE 'BASE_URL/:id', should return status code 204", async()=>{ 
    const res = await request(app)
        .delete(`${BASE_URL}/${actorsId}`)

    expect(res.status).toBe(204)
})