/* global describe it before*/
const expect = require('chai').expect
const supertest = require('supertest')
const app = require('../app')
const api = supertest('http://localhost:3000')

// index
describe('Get /candies', () => {
  it('should return a 200 response', (done) => {
    api.get('/candies')
    .set('Accept', 'application/json')
    .expect(200, done)
  })

  it('should return an array', (done) => {
    api.get('/candies')
    .set('Accept', 'application/json')
    .end((err, response) => {
      expect(err).to.be.a('null')
      expect(response.body).to.be.an('array')
      done()
    })
  })

// TODO expect assertions not completed!
  // it('should return all the records in the database', (done) => {
  //   api.get('/candies')
  //   .set('Accept', 'application/json')
  //   .end((err, response) => {
  //     expect(err).to.be.a('null')
  //     expect(response.body).to.equal()
  //   })
  // })
})

// show
describe('GET /candies/:id', () => {
  it('should return a 200 response', (done) => {
    api.get('/candies/0')
    .set('Accept', 'application/json')
    .expect(200, done)
  })
  it('should return an object containing fields "name" and "color"', (done) => {
    api.get('/candies/0')
    .set('Accept', 'application/json')
    .end((err, response) => {
      expect(err).to.be.a('null')
      expect(response.body).to.have.property('id')
      expect(response.body).to.have.property('name')
      expect(response.body).to.have.property('color')
      done()
    })
  })
})

// create
describe('POST /candies', () => {
  before((done) => {
    api.post('/candies')
    .set('Accept', 'application/json')
    .send({
      'name': 'lollipop',
      'color': 'rainbow'
    }).end(done)
  })
  it('should return a 422 response if the field color is wrong', (done) => {
    api.post('/candies')
    .set('Accept', 'application/json')
    .send({
      'name': 'lollipop',
      'color': 'haha'
    })
    .expect(422, done)
  })
  it('should return an error message if the color field is wrong', (done) => {
    api.post('/candies')
    .set('Accept', 'application/json')
    .send({
      'name': 'lollipop',
      'color': 'haha'
    })
    .end((err, response) => {
      expect(err).to.be.a('null')
      expect(response.body).to.equal('Invalid Color')
      done()
    })
  })

  it('should add a new candy to the database', (done) => {
    api.get('/candies')
    .set('Accept', 'application/json')
    .end((err, response) => {
      expect(err).to.be.a('null')
      expect(response.body[response.body.length - 1].name).to.equal('lollipop')
      done()
    })
  })
})

describe('PUT /candies/:id', () => {
  before((done) => {
    api.put('/candies/1')
    .set('Accept', 'application/json')
    .send({
      'name': 'testing',
      'color': 'blue'
    }).end(done)
  })

  it('should return a 200 response', (done) => {
    api.get('/candies/1')
    .set('Accept', 'application/json')
    .expect(200, done)
  })

  it('should update a candy document', (done) => {
    api.get('/candies/1')
    .set('Accept', 'application/json')
    .end((err, response) => {
      expect(err).to.be.a('null')
      expect(response.body.id).to.equal(2)
      expect(response.body.name).to.equal('testing')
      expect(response.body.color).to.equal('blue')
      done()
    })
  })
})

describe('DELETE /candies/:id', () => {
  before((done) => {
    api.delete('/candies/2')
    .set('Accept', 'application/json')
    .end(done)
  })
  it('should remove a candy document', (done) => {
    api.get('/candies/2')
    .set('Accept', 'application/json')
    .end((err, response) => {
      expect(err).to.be.a('null')
      expect(response.body.name).to.equal('Candy Stick')
      done()
    })
  })
})
