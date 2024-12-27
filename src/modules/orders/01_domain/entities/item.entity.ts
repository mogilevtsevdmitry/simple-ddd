import { EmptyRequiredFieldError, InvalidFieldError } from '../errors'

export class ItemEntity {
  private constructor(
    private readonly _id: number,
    private readonly _name: string,
    private readonly _price: number,
  ) {}

  get id(): number {
    return this._id
  }

  get name(): string {
    return this._name
  }

  get price(): number {
    return this._price
  }

  static create(id: number, name: string, price: number): ItemEntity {
    if (!name) throw new EmptyRequiredFieldError('name')
    if (price <= 0) throw new InvalidFieldError('price must be greater than 0')
    return new ItemEntity(id, name, price)
  }
}
