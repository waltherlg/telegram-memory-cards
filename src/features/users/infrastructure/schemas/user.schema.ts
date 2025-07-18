import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User implements IUserBase {
  @Prop({ type: String, unique: true, sparse: true })
  telegramId?: string;

  @Prop({ unique: true })
  userName: string;

  @Prop({ type: String, unique: true, sparse: true })
  email?: string;

  @Prop({ type: String, default: null })
  password?: string;

  @Prop({ type: Number, default: null, min: -12, max: 14 })
  timeZone: number | null;

  @Prop({ type: Boolean, default: true })
  notificationOn: boolean;

  _id: Types.ObjectId;

  createdAt?: Date;
  updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
