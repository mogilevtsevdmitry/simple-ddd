import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { IOrderRepository } from './01_domain/repositories/i-order.repository'
import { ORDER_COMMANDS } from './02_application/commands'
import { ORDER_EVENTS } from './02_application/events'
import { ORDER_QUERIES } from './02_application/queries'
import { OrderRepository } from './03_infrastructure/repositories/order.repository'
import { OrderController } from './04_controllers/order/order.controller'

@Module({
  imports: [CqrsModule],
  controllers: [OrderController],
  providers: [
    ...ORDER_COMMANDS,
    ...ORDER_QUERIES,
    ...ORDER_EVENTS,
    {
      provide: IOrderRepository,
      useClass: OrderRepository,
    },
  ],
})
export class OrdersModule {}
