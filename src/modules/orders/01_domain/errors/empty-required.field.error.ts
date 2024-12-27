import { OrderDomainError } from './order-domain.error'

export class EmptyRequiredFieldError extends OrderDomainError {
  constructor(fieldName: string) {
    super(`The required field "${fieldName}" cannot be empty.`)
  }
}
