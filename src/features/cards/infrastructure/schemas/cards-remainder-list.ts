import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Types } from 'mongoose';

export type RemainderListDocument = HydratedDocument<RemainderList>;

@Schema({ timestamps: true })
export class RemainderList {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;
  @Prop({ default: null })
  currentCategory: string | null;
  @Prop()
  cardListToSend: Types.ObjectId[];

  _id: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export const ReminderListSchema = SchemaFactory.createForClass(RemainderList);
