import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  RemainderList,
  RemainderListDocument,
  ReminderListSchema,
} from './schemas/cards-remainder-list';
import { Model, ObjectId } from 'mongoose';

@Injectable()
export class RemainderListRepository {
  constructor(
    @InjectModel(RemainderList.name)
    private ReminderListModel: Model<RemainderListDocument>,
  ) {}

  async createReminderList(userId: ObjectId): Promise<RemainderListDocument> {
    const newList = new this.ReminderListModel(userId);
    await newList.save();
    return newList;
  }

  async getReminderList(userId: ObjectId): Promise<RemainderListDocument> {
    const list = await this.ReminderListModel.find({ userId });
    if (!list) return await this.createReminderList(userId);
  }

  async saveList(list: RemainderListDocument): Promise<RemainderListDocument> {
    const savedList = await list.save();
    return savedList;
  }
}
