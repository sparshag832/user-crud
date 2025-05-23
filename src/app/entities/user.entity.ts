import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UUID } from 'mongodb';

@Schema()
export class User extends Document {
  @Prop({ required: true})
  userId: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  password: string; 

  @Prop({default:false})
  isDeleted:boolean

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
