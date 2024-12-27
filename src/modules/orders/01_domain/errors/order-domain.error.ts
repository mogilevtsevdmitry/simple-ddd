import { HttpStatus } from '@nestjs/common'

export class OrderDomainError extends Error {
  constructor(message: string, status: HttpStatus = HttpStatus.BAD_REQUEST) {
    super(message)
    this.name = 'OrderDomainError'
  }
}
