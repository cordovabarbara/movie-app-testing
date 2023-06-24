const request = require ("supertest")
const app = require("../app")

const URL_BASE = '/api/v1/actors'
let actorsId

test ("POST -> 'URL_BASE', should return status code 201 and with correct properties", async() =>{
    const actor = {
        firstName: "keanu",
        lastName:"reeve",
        nationality:"USA",
        image:"img.pgn",
        birthday:"1964-09-02",
    }
    const res = await request(app)
        .post(URL_BASE)
        .send(actor)

        actorsId = res.body.id 
console.log(res)

    expect(res.status).toBe(201)
    expect(res.body.firstName).toBe(actor.firstName)
})