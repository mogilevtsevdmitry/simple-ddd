import { OrderEntity } from '@modules/orders/01_domain/entities'
import { OrderNotFoundError } from '@modules/orders/01_domain/errors'
import { IOrderRepository } from '@modules/orders/01_domain/repositories/i-order.repository'
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs'
import { CompleteOrderCommand } from './complete-order.command'

@CommandHandler(CompleteOrderCommand)
export class CompleteOrderCommandHandler implements ICommandHandler<CompleteOrderCommand, OrderEntity> {
  constructor(
    private readonly repository: IOrderRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CompleteOrderCommand): Promise<OrderEntity> {
    try {
      const { orderId } = command

      const order = await this.repository.findOrderById(orderId)
      if (!order) throw new OrderNotFoundError(orderId)

      const orderAggregate = this.publisher.mergeObjectContext(order)
      orderAggregate.completeOrder()

      await this.repository.save(orderAggregate)

      return orderAggregate.getOrder()
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
