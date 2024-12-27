import { OrderDomainError } from './order-domain.error'

export class OrderNotFoundError extends OrderDomainError {
  constructor(orderId: string) {
    super(`Order with ID ${orderId} not found`)
  }
}
