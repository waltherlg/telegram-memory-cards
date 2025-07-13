import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Card, CardDocument } from './schemas/card.schema';
import { Model } from 'mongoose';
import { CreateCardDto } from '../domain/dto/cards.dto';

@Injectable()
export class CardsRepository {
  constructor(@InjectModel(Card.name) private cardModel: Model<CardDocument>) {}

  async createCard(dto: CreateCardDto): Promise<string> {
    const newCard = new this.cardModel(dto);
    await newCard.save();
    return newCard.title;
  }
}
