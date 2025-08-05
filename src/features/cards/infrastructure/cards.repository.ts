import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Card, CardDocument } from './schemas/card.schema';
import { Model, ObjectId, Types } from 'mongoose';
import { CreateCardDto } from '../domain/dto/cards.dto';

@Injectable()
export class CardsRepository {
  constructor(@InjectModel(Card.name) private cardModel: Model<CardDocument>) {}

  async createCard(dto: CreateCardDto): Promise<CardDocument> {
    const newCard = new this.cardModel(dto);
    await newCard.save();
    return newCard;
  }

  async getCardById(_id: Types.ObjectId): Promise<CardDocument | null> {
    const card = await this.cardModel.findOne({ _id });
    if (!card) return null;
    return card;
  }

  async getRandomCardByUser(
    userId: string | Types.ObjectId,
  ): Promise<Card | null> {
    const result = await this.cardModel.aggregate([
      { $match: { userId: new Types.ObjectId(userId) } },
      { $sample: { size: 1 } },
    ]);
    return result[0] ?? null;
  }

  async getRandomizedCardIdsByUser(
    userId: string | Types.ObjectId,
    category?: string,
  ): Promise<Types.ObjectId[]> {
    const result = await this.cardModel.aggregate([
      {
        $match: {
          userId: new Types.ObjectId(userId),
          ...(category ? { category } : {}),
        },
      },
      { $sample: { size: 1000 } },
      { $project: { _id: 1 } },
    ]);

    return result.map((doc) => doc._id);
  }

  async deleteCardById(cardId: string | Types.ObjectId): Promise<boolean> {
    const result = await this.cardModel.deleteOne({
      _id: new Types.ObjectId(cardId),
    });
    return result.deletedCount > 0;
  }
}
