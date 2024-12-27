import { OrderDomainError } from './order-domain.error'

export class InvalidFieldError extends OrderDomainError {
  constructor(message: string) {
    super(message)
  }
}
