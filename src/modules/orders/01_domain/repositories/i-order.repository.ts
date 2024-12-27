import { IItem } from '@modules/orders/03_infrastructure/repositories/state'
import { OrderAggregate } from '../aggregates'

export abstract class IOrderRepository {
  abstract findOrderById(id: string): Promise<OrderAggregate | null>
  abstract save(order: OrderAggregate): Promise<void>
  abstract findItems(ids: number[]): Promise<IItem[]>
}
