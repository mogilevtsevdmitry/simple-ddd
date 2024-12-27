import { CompleteOrderCommand, CreateOrderCommand } from '@modules/orders/02_application/commands'
import { GetOrderQuery, GetOrderTotalQuery } from '@modules/orders/02_application/queries'
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { CreateOrderDto } from './dto'
import { OrderResponse } from './response'

@Controller()
export class OrderController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('order')
  async createOrder(@Body() dto: CreateOrderDto) {
    const order = await this.commandBus.execute(new CreateOrderCommand(dto.customerId, dto.itemIds))
    return new OrderResponse(order)
  }

  @Put('order/complete/:id')
  async completeOrder(@Param('id') id: string) {
    const order = await this.commandBus.execute(new CompleteOrderCommand(id))
    return new OrderResponse(order)
  }

  @Get('order/:id')
  async getOrder(@Param('id') id: string) {
    const order = await this.queryBus.execute(new GetOrderQuery(id))
    return new OrderResponse(order)
  }

  @Get('order/total/:id')
  async getOrderTotal(@Param('id') id: string) {
    return this.queryBus.execute(new GetOrderTotalQuery(id))
  }
}
