import * as bcrypt from 'bcrypt';
import { Response, Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@models/components/user/user';
import { AuthService } from 'services/components/auth/auth';

@Controller('api/auth')
export default class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() user: User, @Res() res: Response) {
    const existUser = await this.authService.findOne({ email: user.email });
    if (existUser) {
      res.status(409).json({ msg: `${user.email} Already Exist!` });
    }
    const newUser = this.authService.create(user);
    return res
      .status(200)
      .json({ msg: 'User Registered Successfully!', data: newUser });
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const existUser = await this.authService.findOne({ email: email });

    if (!existUser) {
      response.status(404).json({ msg: `${email} not Found!` });
    }

    if (!(await bcrypt.compare(password, existUser.password))) {
      response.status(404).json({ msg: `Password not Matched!` });
    }

    const jwt = await this.jwtService.signAsync({ id: existUser._id });
    response.cookie('jwt', jwt, { httpOnly: true });
    return { msg: 'Login Successfully!' };
  }

  @Get('user')
  async user(@Req() request: Request) {
    try {
      const cookie = request.cookies['jwt'];
      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) {
        throw new UnauthorizedException();
      }
      const user = await this.authService.findOne({ _id: data.id });
      return { msg: 'User Login Successfully', data: user };
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    return {
      msg: 'Logout Successfully!',
    };
  }
}
