import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UUID } from 'mongodb';
import { Document } from 'mongoose';

@Schema()
export class Url extends Document {

  @Prop({required:true})  
  urlId:UUID

  @Prop({required:true})  
  userId:UUID

  @Prop({ required: true })
  originalUrl: string;

  @Prop({ required: true, unique: true })
  shortCode: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const UrlSchema = SchemaFactory.createForClass(Url);
