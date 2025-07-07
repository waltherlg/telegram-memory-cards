import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User implements IUserBase {
  @Prop({ type: String, unique: true, sparse: true, default: null })
  telegramId?: string;

  @Prop({ unique: true })
  userName: string;

  @Prop({ type: String, unique: true, sparse: true, default: null })
  email?: string;

  @Prop({ type: String, default: null })
  password?: string;

  _id: Types.ObjectId;

  createdAt?: Date;
  updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
