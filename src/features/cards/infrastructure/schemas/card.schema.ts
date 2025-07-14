import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CardDocument = HydratedDocument<Card>;

@Schema({ timestamps: true })
export class Card {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop()
  category: string;

  @Prop()
  title: string;

  @Prop()
  text: string;

  _id: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export const CardSchema = SchemaFactory.createForClass(Card);
