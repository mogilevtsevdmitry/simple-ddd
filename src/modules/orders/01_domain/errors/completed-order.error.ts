import { OrderDomainError } from './order-domain.error'

export class CompletedOrderError extends OrderDomainError {
  constructor() {
    super('Cannot add items to a completed order.')
  }
}
