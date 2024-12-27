import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'
import { randomUUID } from 'crypto'

describe('OrderController (e2e)', () => {
  let app: INestApplication
  let order

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('POST order/', async () => {
    const customerId = randomUUID()
    const response = await request(app.getHttpServer())
      .post('/order')
      .send({ customerId, itemIds: [1, 2] })
      .expect(201)
    order = response.body
    expect(response.body.customerId).toBe(customerId)
    expect(response.body.status).toBe('pending')
    expect(response.body.items.length).toBe(2)
  })

  it('PUT order/complete/:id', async () => {
    const response = await request(app.getHttpServer()).put(`/order/complete/${order.id}`).expect(200)
    expect(response.body.status).toBe('completed')
  })

  it('GET order/:id', async () => {
    const response = await request(app.getHttpServer()).get(`/order/${order.id}`).expect(200)
    expect(response.body.id).toBe(order.id)
  })

  it('GET order/total/:id', async () => {
    const response = await request(app.getHttpServer()).get(`/order/total/${order.id}`).expect(200)
    expect(+response.text).toBe(300)
  })
})
