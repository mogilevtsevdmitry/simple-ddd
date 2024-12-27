import { OrderNotFoundError } from '@modules/orders/01_domain/errors'
import { IOrderRepository } from '@modules/orders/01_domain/repositories/i-order.repository'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { GetOrderTotalQuery } from './get-order-total.query'

@QueryHandler(GetOrderTotalQuery)
export class GetOrderTotalQueryHandler implements IQueryHandler<GetOrderTotalQuery> {
  constructor(private readonly repository: IOrderRepository) {}

  async execute(query: GetOrderTotalQuery): Promise<number> {
    const { orderId } = query

    const order = await this.repository.findOrderById(orderId)
    if (!order) throw new OrderNotFoundError(orderId)

    return order.getOrder().calculateTotal()
  }
}
