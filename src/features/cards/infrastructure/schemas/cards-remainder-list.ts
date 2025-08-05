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
  @Prop({ type: Date, default: null })
  lastSentAt?: Date;

  _id: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;

  async removeCardFromList(
    this: HydratedDocument<RemainderList>,
    id: Types.ObjectId,
  ) {
    this.cardListToSend = this.cardListToSend.filter((_id) => !_id.equals(id));
    this.markModified('cardListToSend');
    await this.save();
  }
}

export const ReminderListSchema = SchemaFactory.createForClass(RemainderList);
