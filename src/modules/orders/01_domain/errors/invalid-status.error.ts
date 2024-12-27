import { OrderStatus } from '../entities'
import { OrderDomainError } from './order-domain.error'

export class InvalidStatusError extends OrderDomainError {
  constructor(status: string) {
    super(`The order status "${status}" is invalid. Valid statuses are: ${Object.values(OrderStatus).join(', ')}`)
  }
}
