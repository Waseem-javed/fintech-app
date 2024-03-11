import { Controller, Post, Body } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderService } from '@services/index';

@ApiTags('Order')
@Controller('order')
export default class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiResponse({ status: 200, description: 'Booking Service' })
  @Post('bookService')
  bookService(@Body() bookingDetails: any) {
    // Add logic to handle service booking
    const orderId = this.orderService.processServiceBooking(bookingDetails);

    // Assuming orderId is returned after booking, initiate Pay After payment
    const paymentResult = this.orderService.initiatePayAfterPayment(orderId);

    return {
      orderId,
      paymentResult,
    };
  }
}
