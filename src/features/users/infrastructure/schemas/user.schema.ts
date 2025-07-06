import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ unique: true })
  telegramId?: string;

  @Prop({ unique: true })
  username?: string;

  @Prop()
  password?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
