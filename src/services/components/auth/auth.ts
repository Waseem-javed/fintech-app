import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from '@models/components/user/user';

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(user: User): Promise<User> {
    const newUser = await new this.userModel(user);
    const hashedPassword = await bcrypt.hash(newUser.password, 12);
    newUser.password = hashedPassword;
    return newUser.save();
  }

  async findOne(condition: any): Promise<User> {
    return await this.userModel.findOne(condition);
  }
}
