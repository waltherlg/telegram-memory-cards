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

  async removeFirstCardFromList(this: HydratedDocument<RemainderList>) {
    this.cardListToSend.shift();
    this.lastSentAt = new Date();
    this.markModified('cardListToSend');
    await this.save();
  }

  async addCardToList(
    this: HydratedDocument<RemainderList>,
    _id: Types.ObjectId,
  ) {
    this.cardListToSend.push(_id);
    this.markModified('cardListToSend');
    await this.save();
  }

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

ReminderListSchema.methods = {
  addCardToList: RemainderList.prototype.addCardToList,
  removeFirstCardFromList: RemainderList.prototype.removeFirstCardFromList,
  removeCardFromList: RemainderList.prototype.removeCardFromList,
};
