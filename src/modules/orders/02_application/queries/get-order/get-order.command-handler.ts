import { OrderEntity } from '@modules/orders/01_domain/entities'
import { IOrderRepository } from '@modules/orders/01_domain/repositories/i-order.repository'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { GetOrderQuery } from './get-order.query'

@QueryHandler(GetOrderQuery)
export class GetOrderQueryHandler implements IQueryHandler<GetOrderQuery> {
  constructor(private readonly repository: IOrderRepository) {}

  async execute(query: GetOrderQuery): Promise<OrderEntity | null> {
    const { orderId } = query

    const order = await this.repository.findOrderById(orderId)
    if (!order) {
      return null
    }

    return order.getOrder()
  }
}
