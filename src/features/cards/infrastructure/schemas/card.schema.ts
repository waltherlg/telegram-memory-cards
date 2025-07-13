import { Prop, Schema } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CardDocument = HydratedDocument<Card>;

@Schema({ timestamps: true })
export class Card {
  @Prop()
  userId: string;
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
