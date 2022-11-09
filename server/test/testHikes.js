const chai = require('chai');
const chaiHttp = require('chai-http');
const { getHikes } = require('../modules/Hikes');
chai.use(chaiHttp);
chai.should();

const app = require('../server');
var agent = chai.request.agent(app);

describe('API Test', function(){
    describe('GET test /', function(){
        getHikes();
    })
})

function getHikes(expectedHTTPStatus){
    it('get Item', function(done){
        agent.get('/api/test').end(
            function (err, res){
                if(err)
                    done(err);
                res.should.have.status(expectedHTTPStatus);
                
                done();
            }
        )
    })
}


