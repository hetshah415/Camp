process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp =  require('chai-http');
const app = require('../backend/backend.js');

chai.use(chaiHttp);

describe('/campground route',()=>{
    it('should retrive all the campgrounds', async()=>{
        const res = await chai.request(app).get('/campgrounds/');

        expect(res).to.have.status(200);
        expect(res.body).to.be.an('Array');
    })
})