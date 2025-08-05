import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CardList, CardListDocument } from './schemas/cards-list.shema';
import { Model, Types } from 'mongoose';

@Injectable()
export class CardListRepository {
  constructor(
    @InjectModel(CardList.name)
    private CardListModel: Model<CardListDocument>,
  ) {}

  async createCardList(userId: Types.ObjectId): Promise<CardListDocument> {
    const newList = new this.CardListModel({
      userId: new Types.ObjectId(userId),
    });

    await newList.save();
    return newList;
  }

  async getCardList(
    userId: Types.ObjectId | string,
  ): Promise<CardListDocument> {
    const list: CardListDocument = await this.CardListModel.findOne({
      userId: new Types.ObjectId(userId),
    });
    if (!list) return await this.createCardList(new Types.ObjectId(userId));
    return list;
  }

  async saveList(list: CardListDocument): Promise<CardListDocument> {
    const savedList = await list.save();
    return savedList;
  }
}
