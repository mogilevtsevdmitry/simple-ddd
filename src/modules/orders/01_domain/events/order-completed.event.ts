export class OrderCompletedEvent {
    constructor(
      public readonly orderId: string,
      public readonly customerId: string,
    ) {}
  }
  