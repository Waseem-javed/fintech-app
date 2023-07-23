import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString, Length, IsEmail, IsNotEmpty } from 'class-validator';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @IsString()
  @Length(1, 15)
  @IsNotEmpty()
  @Prop({ required: true })
  firstName: string;

  @IsString()
  @Length(1, 15)
  @IsNotEmpty()
  @Prop({ required: true })
  lastName: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @Prop({ required: true })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  @Prop({ required: true })
  organization: string;

  @IsString()
  @IsNotEmpty()
  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
