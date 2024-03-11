import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaymentService } from '@services/components/payment/payment';

@ApiTags('Payment')
@Controller('api/payment')
export default class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiResponse({ status: 200, description: 'PayAfter' })
  @Post('payAfter')
  payAfter(@Body() paymentDetails: any) {
    return this.paymentService.processPayAfter(paymentDetails);
  }
}
