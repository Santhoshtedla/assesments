let chai=require('chai')
let chaiHttp=require('chai-http')
let server= require('./api')

chai.should()

chai.use(chaiHttp)

describe('categories API',()=>{

    describe("GET /api/login",()=>{
        it("it should GET all the users",(done)=>{
            chai.request(server)
            .get("/users")
            .end((err,response)=>{
                response.body.should.be.a('array');
                response.should.have.status(200);
            done();
            })
        })
    })
})