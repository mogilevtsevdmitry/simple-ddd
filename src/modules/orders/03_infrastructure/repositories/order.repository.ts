import { OrderAggregate } from '@modules/orders/01_domain/aggregates'
import { IOrderRepository } from '@modules/orders/01_domain/repositories/i-order.repository'
import { Injectable } from '@nestjs/common'
import { IItem, items, orders } from './state'

@Injectable()
export class OrderRepository implements IOrderRepository {
  async findOrderById(id: string): Promise<OrderAggregate | null> {
    return orders.get(id) || null
  }

  async save(order: OrderAggregate): Promise<void> {
    orders.set(order.getOrder().id, order)
  }

  async findItems(ids: number[]): Promise<IItem[]> {
    return items.filter((item) => ids.includes(item.id))
  }
}
