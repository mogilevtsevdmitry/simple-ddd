import { AggregateRoot } from '@nestjs/cqrs'
import { ItemEntity, OrderEntity, OrderStatus } from '../entities'
import { EmptyOrderError } from '../errors'
import { ItemAddedEvent, OrderCompletedEvent, OrderCreatedEvent } from '../events'

export class OrderAggregate extends AggregateRoot {
  private readonly _order: OrderEntity

  private constructor(order: OrderEntity) {
    super()
    this._order = order
    this.autoCommit = true
  }

  static create(customerId: string): OrderAggregate {
    const order = OrderEntity.create(customerId)
    return new OrderAggregate(order)
  }

  addItem(item: ItemEntity): void {
    this._order.addItem(item)
    this.apply(new ItemAddedEvent(this._order.id, item))
  }

  completeOrder(): void {
    if (this._order.items.length === 0) {
      throw new EmptyOrderError()
    }
    this._order.changeStatus(OrderStatus.COMPLETED)
    this.apply(new OrderCompletedEvent(this._order.id, this._order.customerId))
  }

  getOrder(): OrderEntity {
    return this._order
  }
}
