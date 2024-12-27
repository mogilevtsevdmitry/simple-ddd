import { ItemEntity, OrderEntity, OrderStatus } from '@modules/orders/01_domain/entities'

class ItemResponse {
  id: number
  name: string
  price: number

  constructor(item: ItemEntity) {
    this.id = item.id
    this.name = item.name
    this.price = item.price
  }
}

export class OrderResponse {
  id: string
  customerId: string
  items: ItemResponse[]
  status: OrderStatus

  constructor(order: OrderEntity) {
    this.id = order.id
    this.customerId = order.customerId
    this.items = order.items.map((item) => new ItemResponse(item))
    this.status = order.status
  }
}
