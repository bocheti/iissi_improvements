import request from 'supertest'
import { shutdownApp, getApp } from './utils/testApp'
import { getLoggedInOwner } from './utils/auth'

const validCat = {
  name: 'testCategory'
}

describe('Get all restaurant categories', () => {
  let app, owner
  beforeAll(async () => {
    app = await getApp()
    owner = await getLoggedInOwner()
  })
  it('There must be more than one restaurant category', async () => {
    const response = await request(app).get('/restaurantCategories').send()
    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBeTruthy()
    expect(response.body).not.toHaveLength(0)
  })
  it('Should create restaurant category', async () => {
    const validCategory = { ...validCat }
    const response = (await request(app).post('/restaurantCategories').set('Authorization', `Bearer ${owner.token}`).send(validCategory)).body
    expect(response.status).toBe(200)
  })

  afterAll(async () => {
    await shutdownApp()
  })
})
