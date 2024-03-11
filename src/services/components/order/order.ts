import { Injectable } from '@nestjs/common';
import { PaymentService } from '@services/index';

@Injectable()
export class OrderService {
  constructor(private readonly paymentService: PaymentService) {}

  async processServiceBooking(bookingDetails: any) {
    // Add logic to handle the service booking
    const orderId = '123'; // Replace with actual order ID generation logic
    return orderId;
  }

  initiatePayAfterPayment(orderId: Promise<string>) {
    // Add logic to initiate Pay After payment
    const paymentDetails = {
      orderId,
      amount: 50.0, // Replace with the actual amount
    };

    return this.paymentService.processPayAfter(paymentDetails);
  }
}
