import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController, PaymentController } from '@api/components';
import { AuthService, PaymentService } from '@services/index';
import { UserSchema } from '@models/components/user/user';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      secret: 'scret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController, PaymentController],
  providers: [AuthService, PaymentService],
})
export class AppModule {}
