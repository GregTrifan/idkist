import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsersDocument = Users & Document;

@Schema()
export class Users {
  @Prop({ required: true, unique: true })
  username: string;
  @Prop({ required: true })
  password: string;
  @Prop({ minlength: 10 })
  description: string;
}
export const UsersSchema = SchemaFactory.createForClass(Users);
