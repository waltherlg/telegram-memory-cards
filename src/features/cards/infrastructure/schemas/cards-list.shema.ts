import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Types } from 'mongoose';

export type CardListDocument = HydratedDocument<CardList>;

@Schema({ timestamps: true })
export class CardList {
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

  async removeFirstCardFromList(this: HydratedDocument<CardList>) {
    this.cardListToSend.shift();
    this.lastSentAt = new Date();
    this.markModified('cardListToSend');
    await this.save();
  }

  async addCardToList(this: HydratedDocument<CardList>, _id: Types.ObjectId) {
    this.cardListToSend.push(_id);
    this.markModified('cardListToSend');
    await this.save();
  }

  async removeCardFromList(
    this: HydratedDocument<CardList>,
    id: Types.ObjectId,
  ) {
    this.cardListToSend = this.cardListToSend.filter((_id) => !_id.equals(id));
    this.markModified('cardListToSend');
    await this.save();
  }
}

export const CardListSchema = SchemaFactory.createForClass(CardList);

CardListSchema.methods = {
  addCardToList: CardList.prototype.addCardToList,
  removeFirstCardFromList: CardList.prototype.removeFirstCardFromList,
  removeCardFromList: CardList.prototype.removeCardFromList,
};
