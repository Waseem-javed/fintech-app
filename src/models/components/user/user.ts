import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsEmail, IsNotEmpty } from 'class-validator';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @ApiProperty()
  @IsString()
  @Length(1, 15)
  @IsNotEmpty()
  @Prop({ required: true })
  firstName: string;

  @ApiProperty()
  @IsString()
  @Length(1, 15)
  @IsNotEmpty()
  @Prop({ required: true })
  lastName: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @Prop({ required: true })
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  @Prop({ required: true })
  organization: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
