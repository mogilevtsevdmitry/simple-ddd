import { OrderDomainError } from './order-domain.error'

export class EmptyOrderError extends OrderDomainError {
  constructor() {
    super(`Cannot complete an empty order.`)
  }
}
