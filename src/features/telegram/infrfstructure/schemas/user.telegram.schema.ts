import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserTelegramDocument = HydratedDocument<UserTelegram>;

@Schema({ timestamps: true })
export class UserTelegram implements IUserTelegramBase {
  @Prop({ unique: true })
  telegramId: string;

  _id: Types.ObjectId;

  createdAt?: Date;
  updatedAt?: Date;
}

export const UserTelegramSchema = SchemaFactory.createForClass(UserTelegram);
