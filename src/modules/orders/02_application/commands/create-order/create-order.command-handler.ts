import { OrderAggregate } from '@modules/orders/01_domain/aggregates'
import { ItemEntity, OrderEntity } from '@modules/orders/01_domain/entities'
import { IOrderRepository } from '@modules/orders/01_domain/repositories/i-order.repository'
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs'
import { CreateOrderCommand } from './create-order.command'
import { OrderCreatedEvent } from '@modules/orders/01_domain/events'

@CommandHandler(CreateOrderCommand)
export class CreateOrderCommandHandler implements ICommandHandler<CreateOrderCommand, OrderEntity> {
  constructor(
    private readonly repository: IOrderRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateOrderCommand): Promise<OrderEntity> {
    const { customerId, itemIds } = command

    const items = await this.repository.findItems(itemIds)
    const order = this.publisher.mergeObjectContext(OrderAggregate.create(customerId))

    for (const item of items) {
      const itemEntity = ItemEntity.create(item.id, item.name, item.price)
      order.addItem(itemEntity)
    }

    await this.repository.save(order)

    const response = order.getOrder()
    order.apply(new OrderCreatedEvent(response.id, response.customerId))

    return response
  }
}
