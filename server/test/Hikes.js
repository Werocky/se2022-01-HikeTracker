const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require("../index");

//assertion style
chai.should();
chai.use(chaiHttp);

describe("POST /getHikes ",()=>{
    describe("Post GetHikes ",()=>{
        it("Should Post GetHikes",(done)=>{
            chai.request(server).post('/getHikeByID').send('1').end(
                (err,response)=>{
                    response.should.not.have.status(201);
                    done();

                }
            )
        });
    });
});


